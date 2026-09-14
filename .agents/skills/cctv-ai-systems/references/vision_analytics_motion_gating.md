# Vision Analytics, Motion Gating & Tracking Pipeline

In a 24/7 SmartHub CCTV system with multiple cameras, running continuous neural network inference across every frame is computationally prohibitive and thermally unsustainable.

The core design principle is **Cascaded Vision Analytics**: progressive filtering where cheap, deterministic algorithms eliminate >90% of frames before dispatching to neural networks.

---

## 1. Cascaded Processing Stages

```
Raw Sub-Stream (640x360 @ 5-10 FPS)
  │
  ▼
[ Stage 1: SIMD Absolute Difference ] ──(No change < 0.5%)──► Discard frame / Idle
  │
  ▼ (Change detected)
[ Stage 2: Background Modeling & ROI Mask ] ──(Outside zone / Shadow)──► Discard
  │
  ▼ (Valid zone trigger)
[ Stage 3: Neural Object Detection ] ──(YOLOv8-Nano / MobileNetV4)
  │
  ▼ (Bounding boxes: Person, Vehicle, Animal)
[ Stage 4: Multi-Object Tracking ] ──(ByteTrack / Kalman Filter)
  │
  ▼ (Stationary or high-confidence track)
[ Stage 5: Secondary Feature Extractors ] ──(ALPR / FaceNet / CLIP Embedding)
```

---

## 2. Stage 1: Ultra-Fast Motion Differencing (SIMD)

* **Operation:** Subtract the luminance (Y-plane) of frame $F_t$ from $F_{t-1}$.
* **Cost:** Less than **0.05 milliseconds** on a single CPU core for a 640x360 frame.
* **Vectorization:** Use AVX2/AVX-512 or ARM NEON to process 32 to 64 pixels per clock cycle:
  * x86: `_mm256_subs_epu8` (subtraction with unsigned saturation) + `_mm256_cmpgt_epi8` (thresholding).
  * ARM: `vqsub_u8` (saturating subtraction) + `vcgt_u8`.
* **Early Rejection:** If total non-zero pixels $< \text{Threshold}$ (e.g., 0.5% of total pixel count), pipeline terminates immediately.

---

## 3. Stage 2: Spatial Zones, Tripwires & Background Modeling

* **Privacy Masks:** Zero out pixel data in excluded regions (e.g., neighbor's window, public sidewalk) before motion detection to comply with privacy laws.
* **Regions of Interest (ROIs):** Binary bitmask specifying where alerts are active (e.g., driveway, porch). Bitwise AND between motion mask and ROI mask.
* **Directional Tripwires:** Track centroid vectors across 2–3 frames. If vector does not cross the directed vector $(\vec{A} \rightarrow \vec{B})$, suppress alert.
* **MOG2 (Mixture of Gaussians):** Eliminates repetitive background motion (tree branches blowing in wind, water ripples) and identifies shadows by modeling chrominance/luminance distributions.

---

## 4. Stage 3: Neural Object Detection

* **Model Selection Matrix:**
  * **Constrained ARM / N100 Mini PC:** INT8 MobileNetV2-SSD or YOLOv8-Nano (640x640 or 320x320). Latency: 15–30ms on NPU/CPU.
  * **Mid-Tier (Intel iGPU / Apple Silicon):** FP16/INT8 YOLOv8-Small / YOLOv11-Small via OpenVINO or CoreML. Latency: 8–15ms.
  * **High-End Server (NVIDIA RTX / L4):** FP16 YOLOv11-Medium or Large via TensorRT. Latency: 2–5ms.
* **Filtered Classes:** Restrict output parsing to relevant classes (`person`, `car`, `truck`, `bicycle`, `dog`, `cat`). Suppress background classes immediately.

---

## 5. Stage 4: Multi-Object Tracking (ByteTrack)

* **The Problem:** Object detection runs frame-by-frame without temporal memory. Re-detecting a parked car on every frame generates thousands of duplicate alerts.
* **The Solution:** ByteTrack associates detections across consecutive frames using:
  1. **Kalman Filter:** Predicts object bounding box and velocity in frame $t$ based on historical trajectory.
  2. **Intersection over Union (IoU) Distance:** Associates high-score and low-score detections with existing tracklets using the Hungarian algorithm.
* **Track Lifecycle:**
  * `TrackState::New` $\rightarrow$ Observed for $\ge 3$ consecutive frames $\rightarrow$ `TrackState::Tracked`.
  * If occluded or missing for $> 30$ frames $\rightarrow$ `TrackState::Lost` $\rightarrow$ Evicted.
* **Alert Suppression:** Send notifications only upon transition to `TrackState::Tracked` or when entering a restricted zone, not continuously while tracked.

---

## 6. Stage 5: Secondary Feature Extractors (Gated Execution)

Never run heavy models (License Plate Recognition / ALPR, Facial Re-ID, CLIP embeddings) on raw video frames. Only trigger them when:
1. ByteTrack confirms a `person` or `vehicle` track is stationary or moving toward the camera.
2. The bounding box reaches minimum resolution (e.g., height $\ge 120$ pixels for faces; width $\ge 100$ pixels for license plates).
3. Crop the bounding box directly from the **Main Stream (4K/1080p)** surface in shared memory, yielding high-detail embeddings without downscaling artifacts.
