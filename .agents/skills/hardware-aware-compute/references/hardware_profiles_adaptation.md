# Dynamic Hardware Probing & Adaptive Runtime Profiles

To operate efficiently across divergent hardware targets—from a 6-watt ARM/Intel N100 mini PC to an enterprise rack server with multiple NVIDIA GPUs—an application must implement **Hardware Probing** and **Adaptive Runtime Profiles**.

Hardcoding fixed resolutions, frame rates, or neural network models leads to system crashes on low-end hardware or severe compute underutilization on high-end nodes.

---

## 1. Hardware Probing Architecture

At initialization, the host orchestrator must interrogate the host platform across five primary dimensions:

```
┌────────────────────────────────────────────────────────┐
│               Hardware Probing Engine                  │
├─────────────────┬───────────────────┬──────────────────┤
│ 1. CPU Topology │ 2. Accelerators   │ 3. Media Codecs  │
│ - ISA flags     │ - NVIDIA CUDA/VRAM│ - VA-API         │
│ - Physical cores│ - Apple Silicon   │ - Intel QSV      │
│ - Cache sizes   │ - NPUs (RKNN/TPU) │ - NVDEC / NVENC  │
├─────────────────┴───────────────────┴──────────────────┤
│ 4. Memory Ceiling & Bus Bandwidth                      │
│ - Total RAM & Swap limit                               │
│ - Unified vs. Discrete VRAM boundary                   │
└────────────────────────────────────────────────────────┘
```

### 1.1 Probing Heuristics

* **CPU Instruction Set Architecture (ISA):**
  * **x86-64:** Check `/proc/cpuinfo` or `cpuid` for `avx512f`, `avx512vnni`, `avx2`, `fma`, `sse4_2`.
  * **ARM:** Check `/proc/cpuinfo` or `getauxval(AT_HWCAP)` for `neon`, `asimd`, `sve`, `sve2`, `sme`.
* **Hardware Video Decoders:**
  * Probe `/dev/dri/renderD128` (Linux DRM/VA-API for Intel/AMD).
  * Probe NVIDIA driver availability (`libcuda.so`, `nvidia-smi`, or NVDEC capability).
  * Probe Apple VideoToolbox availability via macOS CoreMedia APIs.
* **Neural Accelerators & NPUs:**
  * Probe `/dev/rknpu` (Rockchip RK3588/RK3568 NPU).
  * Probe `/dev/apex_0` (Google Coral Edge TPU).
  * Probe `/dev/hailo0` (Hailo-8 / 8L PCIe NPU).
  * Probe CUDA devices: Compute Capability, total VRAM, and unified memory support.
* **Memory & Storage:**
  * Available physical RAM (never allocate more than 60% of total host RAM for video frame ring buffers).
  * Storage I/O throughput: NVMe SSD vs. SATA HDD vs. eMMC/SD Card (governs disk buffer flushing frequency).

---

## 2. Three-Tier Adaptive Profile Matrix

| Feature / Setting | Tier 1: Constrained (ARM / Mini PC) | Tier 2: Balanced (x86 iGPU / Mid-Tier) | Tier 3: High-End (Discrete GPU / Server) |
| :--- | :--- | :--- | :--- |
| **Typical Hardware** | Raspberry Pi 5, Intel N100 / N95, RK3588, Orange Pi 5 | Intel Core i5/i7 (Iris Xe/UHD), AMD Ryzen 7 APU, Jetson Orin Nano, Apple M1-M4 | AMD Ryzen 9 / Threadripper / EPYC, Intel Xeon + NVIDIA RTX 3060–4090 / L4 |
| **Video Ingest Strategy** | Direct-to-Disk (zero transcode); decode low-res sub-stream only | Direct-to-Disk; VA-API / QSV decode of sub-stream or 1080p | Hardware NVDEC decode of all streams; direct NV12 surface access |
| **Motion Gating** | 4-8 FPS sub-stream downscaled to 320x180, SIMD bitwise diff | 10-15 FPS sub-stream 640x360, MOG2 background subtractor | 25-30 FPS full-resolution or multi-region optical flow |
| **AI Model Architecture** | MobileNetV2-SSD / YOLOv8-Nano / MobileNetV4 | YOLOv8-Small / YOLOv11-Small / MobileSAM | YOLOv11-Large, Florence-2 / CLIP embeddings, FaceNet / ReID |
| **Precision & Format** | INT8 (via RKNN, OpenVINO CPU, or Coral TPU) | FP16 / INT8 (via OpenVINO iGPU or DirectML) | FP16 / FP8 / TensorRT optimized engines |
| **Buffer Management** | Compact ring buffer: 3-5 seconds in RAM, flush to disk | Standard ring buffer: 10-15 seconds in RAM | Generous pre-event buffer: 30-60 seconds in RAM or `/dev/shm` |
| **Inference Frequency** | Triggered solely on motion threshold; 2-4 inferences/sec | Sampled at 5-10 FPS during active motion events | Continuous or 15-30 FPS real-time per active camera stream |

---

## 3. Dynamic Runtime Feedback Loop & Degradation

Hardware capacity changes dynamically during system operation (e.g., thermal throttling, simultaneous camera triggers, or background backups). The system must adjust its operating profile in real time.

```
       ┌────────────────────────┐
       │ Ingest Frame Queue     │
       └───────────┬────────────┘
                   │
         [ Queue Depth Check ]
         ┌─────────┴─────────┐
         ▼                   ▼
    [ Normal ]          [ Saturated ]
  (Latency < 100ms)   (Latency > 500ms)
         │                   │
         │                   ├─► 1. Drop non-keyframes (B/P frames) in inference queue
         │                   ├─► 2. Downscale motion detection resolution
         │                   ├─► 3. Throttle AI inference sampling (e.g. 5 FPS -> 2 FPS)
         │                   └─► 4. Suppress non-critical secondary models (e.g. Face ReID)
         ▼
  Full Pipeline Run
```

### 3.1 Degradation Hierarchy (Preserve Video Over AI)
1. **Never drop recording frames:** Raw video recording to disk has top priority. Storage pipelines bypass inference queues entirely via direct stream muxing (`copy` codec).
2. **Drop inference frames gracefully:** If the inference worker queue fills beyond 3 frames, drop the oldest un-inferred frame immediately. Never allow inference latency to cascade into stream ingestion.
3. **Dynamic Stride Sampling:**
   * 0–30% GPU/CPU load: Run inference every frame during motion ($N=1$).
   * 31–75% GPU/CPU load: Run inference every 2nd frame during motion ($N=2$).
   * 76–90% GPU/CPU load: Run inference every 4th frame during motion ($N=4$).
   * >90% or Thermal Throttling: Fall back to bounding-box centroid tracking between keyframes ($N=10$).
