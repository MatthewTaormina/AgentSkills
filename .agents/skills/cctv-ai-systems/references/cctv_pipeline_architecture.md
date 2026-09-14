# CCTV SmartHub & Edge AI Reference Architecture

This document provides the definitive end-to-end systems architecture for a **SmartHub CCTV system running AI workloads**. It integrates ingestion, hardware decoding, zero-copy memory pipelines, cascaded computer vision, and high-performance video storage.

---

## 1. End-to-End System Topology

```
                         ┌───────────────────────────────┐
                         │  IP Camera (RTSP / WebRTC)     │
                         └───────┬───────────────┬───────┘
                                 │               │
                    Main Stream  │               │ Sub-Stream
              (4K / 1080p H.264) │               │ (640x360 H.264 @ 5-10 FPS)
                                 ▼               ▼
     ┌───────────────────────────────────────────────────────────────┐
     │                     Go Ingestion Daemon                       │
     │  - Multiplex concurrent RTSP streams (goroutine-per-stream)   │
     │  - Extract NAL units & write fMP4 to disk (Passthrough)       │
     │  - Feed sub-stream packets to native hardware decoder         │
     └───────────────────────────────┬───────────────────────────────┘
                                     │ Raw H.264 NAL packets
                                     ▼
     ┌───────────────────────────────────────────────────────────────┐
     │             Native Hardware Decoder (C / Rust)                │
     │  - Decode via VA-API / NVDEC / QSV / VideoToolbox             │
     │  - Output: NV12 / YUV420p raw video surfaces                  │
     └───────────────────────────────┬───────────────────────────────┘
                                     │
                                     ▼
     ┌───────────────────────────────────────────────────────────────┐
     │           POSIX Shared Memory Ring Buffer (/dev/shm)          │
     │  - 64-byte cache-line aligned frame descriptors               │
     │  - Lock-free atomic head/tail pointers (SPSC)                 │
     └───────────────┬───────────────────────────────────────────────┘
                     │
                     ├────────────────────────────────────────┐
                     ▼                                        ▼
┌─────────────────────────────────────────┐  ┌─────────────────────────────────────────┐
│     Phase 1: Motion Gating (CPU)        │  │       Phase 2: AI Inference Worker       │
│ - Ultra-fast SIMD luminance diff        │  │ - Gated: Executes only on motion trigger│
│ - AVX2 / AVX-512 / ARM NEON             │  │ - ONNX Runtime / TensorRT / OpenVINO    │
│ - Rejects >90% of idle frames (< 0.1ms) │  │ - Quantized INT8 / FP16 YOLOv8 / v11    │
└─────────────────────────────────────────┘  └────────────────────┬────────────────────┘
                                                                  │ Detections & Tracks
                                                                  ▼
                                             ┌─────────────────────────────────────────┐
                                             │      Tracking & Event Dispatcher        │
                                             │ - ByteTrack Kalman filter tracking      │
                                             │ - SQLite WAL event metadata logging     │
                                             │ - WebSocket broadcast to Node.js / Web  │
                                             └─────────────────────────────────────────┘
```

---

## 2. Polyglot Responsibilities Matrix

| Subsystem | Preferred Language | Communication Boundary | Key Responsibility |
| :--- | :--- | :--- | :--- |
| **Stream Ingester** | **Go** | Network $\rightarrow$ `/dev/shm` | RTSP demuxing, container packaging, direct-to-disk writing. |
| **Video Decoder** | **C / C++ / Rust** | `/dev/shm` | Hardware acceleration interfaces (VA-API, NVDEC, QSV). |
| **Vision Analytics** | **Rust / C++** | `/dev/shm` $\rightarrow$ GPU DMA | SIMD luminance differencing, MOG2 background subtractor, ROI masks. |
| **Inference Engine** | **Rust / C++** | Shared Memory $\rightarrow$ IPC | ONNX Runtime C API, TensorRT execution provider. |
| **Event Database** | **Go / Rust** | SQLite C-ABI | Fast batch event insertions in WAL mode. |
| **API & Web Gateway** | **Node.js (TypeScript)** | Unix Domain Socket / IPC | User dashboard, WebSockets, notification push, cloud integrations. |

---

## 3. Deployment Runbook & Hardware Adaptation

1. **Low-Power ARM / Intel N100 Mini PC (6W–15W):**
   * Passthrough main-stream recording to disk (no re-encoding).
   * Decode sub-stream at 640x360 @ 5 FPS.
   * Gated INT8 MobileNetV2 / YOLO-Nano on CPU or embedded NPU (RKNN/Coral).
2. **Mid-Tier (Intel i5/i7 iGPU / Apple Silicon / Jetson Orin Nano):**
   * Hardware VA-API / QSV / VideoToolbox decode.
   * YOLOv8-Small via OpenVINO or CoreML sampled at 10 FPS during motion events.
3. **High-End Server (NVIDIA RTX / L4):**
   * Full NVDEC hardware decode.
   * Continuous 30 FPS inference + ByteTrack + Face Re-ID / CLIP embeddings via TensorRT FP16/FP8 engines.
