# CCTV SmartHub & Edge AI Reference Architecture

This document outlines the optimal, zero-copy, hardware-sympathetic architecture for a **SmartHub CCTV system running AI workloads**. It integrates the HACOO principles to balance compute saturation across overloaded CPUs and GPUs, catering to deployments ranging from low-power ARM mini PCs to multi-GPU x86 servers.

---

## 1. End-to-End Pipeline Architecture

```
                    ┌───────────────────────────────┐
                    │  IP Camera (RTSP / WebRTC)     │
                    └───────┬───────────────┬───────┘
                            │               │
               Main Stream  │               │ Sub-Stream
         (4K / 1080p H.264) │               │ (640x360 H.264 @ 5-10 FPS)
                            ▼               ▼
┌───────────────────────────────────────────────┐
│              Go Ingestion Daemon              │
│  - Demux NAL units without re-encoding        │
│  - Direct-to-Disk Recording (zero CPU decode) │
│  - Push sub-stream packets to native decoder  │
└───────────────────────────────────────┬───────┘
                                        │ Raw NAL packets
                                        ▼
┌───────────────────────────────────────────────┐
│      Native Video Decoder (C / Rust / FFI)    │
│  - Hardware surface decode (VA-API/NVDEC/QSV) │
│  - Output: NV12 / YUV420p raw frame           │
└───────────────────────────────────────┬───────┘
                                        │
                                        ▼
┌───────────────────────────────────────────────┐
│     POSIX Shared Memory Ring Buffer (/dev/shm)│
│  - Cache-line aligned (64 bytes)              │
│  - SPSC lock-free atomic head/tail pointers   │
└───────────────┬───────────────────────────────┘
                │
                ├────────────────────────────────────────┐
                ▼                                        ▼
┌───────────────────────────────┐        ┌───────────────────────────────┐
│ Phase 1: Motion Gating (CPU)  │        │ Phase 2: AI Inference Worker  │
│ - Downscaled frame difference │        │ - Gated: Only runs on motion  │
│ - SIMD AVX-512 / ARM NEON     │        │ - ONNX Runtime / TensorRT     │
│ - Skip inference if static    │──Pass─►│ - INT8 / FP16 quantized model │
└───────────────────────────────┘        └───────────────┬───────────────┘
                                                         │ Detected objects & boxes
                                                         ▼
                                         ┌───────────────────────────────┐
                                         │ SQLite Event Log & WebSocket  │
                                         │ - WAL mode, memory-mapped I/O │
                                         │ - Go/Node.js event broadcast  │
                                         └───────────────────────────────┘
```

---

## 2. Core Architectural Pillars

### 2.1 The Dual-Stream Strategy (Compute Elimination)
* **The Anti-Pattern:** Decoding a 4K 30 FPS H.264/H.265 main stream in software to run YOLO object detection. This single mistake saturates an 8-core CPU or burns 80% of an entry-level GPU's video engine.
* **The HACOO Solution:**
  1. **Main Stream (4K/1080p):** Never decode for AI. Stream demuxer extracts raw H.264/H.265 NAL units and passes them directly to MP4 container segmentation (`movflags=frag_keyframe+empty_moov`) on disk. **CPU consumption: < 0.5% per camera.**
  2. **Sub-Stream (640x360 or 720p @ 5–10 FPS):** Feed this low-bitrate stream to the hardware/SIMD decoder for motion detection and neural network inference.

---

### 2.2 Zero-Copy Shared Memory Inter-Process Communication (IPC)

Crossing between network demuxing (Go/Node) and high-performance native inference (C++/Rust/CUDA) must not copy pixel buffers.

* Create a circular ring buffer in POSIX shared memory:
  ```c
  // C-ABI representation of shared frame descriptor
  typedef struct {
      uint64_t frame_id;
      uint64_t timestamp_ns;
      uint32_t width;
      uint32_t height;
      uint32_t stride;
      uint32_t pixel_format; // e.g., NV12, YUV420P
      uint32_t motion_detected;
      uint8_t  reserved[24]; // Pad to 64-byte cache boundary
      uint8_t  data[];       // Flexible array member pointing to raw pixels
  } SharedFrameHeader;
  ```
* Allocate via `shm_open("/cctv_frame_ring", O_CREAT | O_RDWR, 0666)` and map with `mmap(2)`.
* Ingestion process writes decoded frames; AI workers read directly via memory-mapped pointer without serialization or socket overhead.

---

### 2.3 Cascaded Motion Detection Gating

Neural network inference (even INT8 quantized) is 100x to 1,000x more expensive than a SIMD bitwise diff.
1. **Pixel Differencing:** Compare Y-channel (luminance) of current frame $F_t$ against background model $B_{t-1}$.
2. **Vectorization:** Use AVX2/AVX-512 (`_mm256_subs_epu8`, `_mm512_subs_epu8`) on x86 or NEON (`vqsub1_u8`) on ARM to compute absolute difference across 32 or 64 bytes per instruction.
3. **Threshold Gate:** If changed pixel count $< 0.5\%$ of active region, **abort pipeline immediately**. Skip tensor construction, skip GPU DMA transfer, skip model execution.

---

### 2.4 High-Performance SQLite Event Database Configuration

All camera motion events, tracking metadata, and bounding boxes should be persisted in embedded SQLite with optimized PRAGMAs:

```sql
-- Enforce write-ahead log for non-blocking concurrent readers & writers
PRAGMA journal_mode = WAL;

-- NORMAL synchronous mode is fully safe in WAL mode against app crashes
PRAGMA synchronous = NORMAL;

-- Allocate 64MB memory cache for index pages
PRAGMA cache_size = -64000;

-- Memory-map up to 10GB of the database file to eliminate read syscalls
PRAGMA mmap_size = 10737418240;

-- Store temporary tables, sorts, and intermediate hashes in RAM
PRAGMA temp_store = MEMORY;

-- Optimize database page size to match NVMe/SSD physical sector size (4KB)
PRAGMA page_size = 4096;
```
