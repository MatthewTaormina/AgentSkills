---
name: cctv-ai-systems
description: >-
  Authoritative guide for architecting, building, and deploying 24/7 SmartHub CCTV and Edge AI surveillance systems.
  Use when implementing RTSP/WebRTC/ONVIF camera ingestion, direct-to-disk recording pipelines, cascaded computer
  vision (SIMD motion gating, MOG2, YOLO, ByteTrack), storage retention and ring buffers, or polyglot CCTV architecture
  (Go, Node.js, Rust, C++).
---

# CCTV SmartHub & Edge AI Systems

This skill provides an authoritative architectural framework for building high-reliability, 24/7 **SmartHub CCTV systems** with integrated **Edge AI computer vision**. 

It details the end-to-end surveillance pipeline: multi-camera ingestion, direct-to-disk recording, zero-copy shared memory frame delivery, cascaded motion detection, real-time object detection and tracking, and storage retention.

---

### Detailed References
* [CCTV SmartHub & Edge AI Reference Architecture](./references/cctv_pipeline_architecture.md)
* [Stream Ingestion, Protocols & Media Demuxing](./references/stream_ingestion_protocols.md)
* [Vision Analytics, Motion Gating & Tracking Pipeline](./references/vision_analytics_motion_gating.md)
* [24/7 Storage, Retention & Video Recording Pipelines](./references/storage_retention_recording.md)

### Underlying Compute Optimization Companion
For low-level microarchitectural tuning, SIMD intrinsics, zero-copy memory ring buffers, and OS kernel governance, see the companion skill:
* [Hardware-Aware Compute Optimization (`hardware-aware-compute`)](../hardware-aware-compute/SKILL.md)

---

## 1. Core Architectural Pillars

### 1.1 The Dual-Stream Law
Never decode a high-resolution main stream (4K/1080p) for AI computer vision:
1. **Main Stream (High-Res):** Demux RTP/H.264 packets and write directly to segmented MP4 containers on disk without decoding. CPU cost is $< 0.2\%$ per camera.
2. **Sub Stream (640x360 @ 5–10 FPS):** Pass to hardware decoders (VA-API / NVDEC / QSV) for motion gating and neural network inference.

### 1.2 Cascaded Vision Analytics
Neural networks must never process static or irrelevant frames:
1. **SIMD Frame Difference (CPU):** Compute absolute luminance difference ($F_t - F_{t-1}$) in $< 0.05\text{ms}$. If changed pixels $< 0.5\%$, discard immediately.
2. **Background & ROI Modeling:** Filter repetitive foliage movement and privacy masks.
3. **Neural Detection:** Dispatch to quantized INT8/FP16 models (YOLOv8-Nano / MobileNetV4) only when motion zones are triggered.
4. **Multi-Object Tracking:** Maintain track continuity with ByteTrack to prevent repeated duplicate alerts.

### 1.3 Zero-Copy Ingestion-to-Inference IPC
Avoid passing raw pixel buffers over network sockets or serializing across runtimes. Use POSIX Shared Memory (`/dev/shm` + `mmap`) with 64-byte cache-line aligned C-ABI structs to share decoded frames between the ingestion process (Go/Rust) and the AI engine (C++/CUDA).

### 1.4 Hybrid Storage & Smart Watermark Pruning
* Combine continuous low-bitrate sub-stream recording with motion-triggered 4K main-stream recording (buffered with 5–10 second pre-event RAM chunks).
* Prune historical video using high/low disk watermarks (90% to 85%) via batched SQLite queries, avoiding heavy filesystem `rm -rf` scans that freeze disk I/O.

---

## 2. Polyglot Architecture & Workload Division

```
┌────────────────────────────────────────────────────────┐
│             Stream Ingester & NVR Daemon (Go)          │
│  - RTSP TCP / WebRTC ingestion with M:N goroutines     │
│  - Direct-to-disk fragmented MP4 segmentation          │
│  - Circular RAM pre-event buffers                      │
└──────────────────────────┬─────────────────────────────┘
                           │ Raw Sub-Stream NALs
                           ▼
┌────────────────────────────────────────────────────────┐
│          Native Vision & AI Engine (Rust / C++)        │
│  - VA-API / NVDEC / VideoToolbox hardware decode       │
│  - SIMD luminance motion differencing (NEON / AVX2)    │
│  - ONNX Runtime / TensorRT neural inference            │
│  - ByteTrack Kalman filter tracking                    │
└──────────────────────────┬─────────────────────────────┘
                           │ Detection Events & Bounding Boxes
                           ▼
┌────────────────────────────────────────────────────────┐
│        Management & User Gateway (Node.js / Go)        │
│  - SQLite WAL event metadata persistence               │
│  - WebSocket live client push                          │
│  - User dashboard, rules engine, notification webhooks │
└────────────────────────────────────────────────────────┘
```

---

## 3. Production Verification Checklist

1. [ ] **Is RTSP transport set to interleaved TCP?** Avoid UDP packet drop artifacts.
2. [ ] **Is the 4K main stream being recorded direct-to-disk?** Verify no CPU/GPU re-encoding occurs on the recording path.
3. [ ] **Are MP4 segments aligned to IDR keyframes?** Ensure GOP boundary cuts to maintain chunk playability.
4. [ ] **Is neural inference gated by motion?** Ensure idle camera streams consume 0% inference compute.
5. [ ] **Is SQLite configured with `PRAGMA journal_mode = WAL;` and `synchronous = NORMAL;`?** Prevent disk stalls during continuous event logging.
