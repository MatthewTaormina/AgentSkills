---
name: hardware-aware-compute
description: >-
  Authoritative guide for hardware-aware software efficiency, compute reduction, and polyglot runtime
  orchestration across x86-64, ARM, and GPU platforms. Use when resolving overloaded CPU/GPU compute bottlenecks,
  designing zero-copy IPC and shared-memory pipelines, configuring media/CCTV AI streaming workloads,
  selecting optimal runtimes (Go, Node.js, Rust, C++, Python), or tuning adaptive hardware profiles.
---

# Hardware-Aware Compute Optimization (HACOO)

This skill provides an authoritative operational framework for maximizing computational throughput, eliminating memory bandwidth saturation, and minimizing instruction count and energy consumption across heterogeneous hardware (x86-64, ARM, NVIDIA, Apple Silicon, embedded NPUs).

It is designed for systems that must run flexibly across a spectrum of computing environments—from 6-watt low-power ARM / mini PCs to multi-GPU enterprise rack servers—without code bloat or excessive external dependencies.

---

### Detailed References
* [Polyglot Language & Runtime Selection Matrix](./references/language_selection_matrix.md)
* [Dynamic Hardware Probing & Adaptive Runtime Profiles](./references/hardware_profiles_adaptation.md)
* [CCTV SmartHub & Edge AI Reference Architecture](./references/cctv_ai_pipeline_architecture.md)
* [Media Codecs, Compression & Cryptography Reference Architecture](./references/media_codecs_compression_crypto.md)
* [Embedded Storage & SQLite Performance Optimization](./references/sqlite_embedded_optimization.md)
* [GPU Offload, Tensor Acceleration & Neural Runtime Optimization](./references/gpu_tensor_neural_acceleration.md)
* [CPU Microarchitecture, SIMD Vectorization & Instruction Optimization](./references/cpu_microarchitecture_x86_arm.md)
* [Hardware-Aware Concurrency, Threading & Asynchronous I/O](./references/concurrency_threading_async.md)
* [Memory Architecture, Storage & High-Throughput Disk I/O](./references/memory_storage_disk_io.md)
* [OS Hardware Telemetry, Kernel Governance & High-Throughput Networking](./references/os_hardware_telemetry_networking.md)

### Domain Implementation Companion
* [CCTV SmartHub & Edge AI Systems (`cctv-ai-systems`)](../cctv-ai-systems/SKILL.md)

---

## 1. Core Guiding Principles

### 1.1 Measure Before Modifying
Never optimize based on intuition. Always capture empirical telemetry:
* **CPU:** PMU counters (instructions per cycle/IPC, L1/L2/L3 cache misses, branch mispredictions) via Linux `perf` or eBPF.
* **GPU:** Warp divergence, memory bus saturation, SM occupancy via `ncu` (Nsight Compute) or `nvprof`.
* **I/O:** Off-CPU wait time and page fault frequency via `bpftrace`.

### 1.2 Mechanical Sympathy
Design algorithms around physical hardware structures:
* Align hot data structures to **64-byte cache line boundaries** (`alignas(64)` / `#[repr(align(64))]`) to avoid false sharing across cores.
* Organize continuous memory into **Structure of Arrays (SoA)** rather than Array of Structures (AoS) to enable auto-vectorization across SIMD registers (AVX-512, ARM NEON/SVE).
* Keep thread pool sizing pinned to **physical cores** for compute-bound tasks, avoiding SMT/hyperthreading resource contention.

### 1.3 Compute Elimination Over Acceleration
> **The fastest instruction is the one never executed.**
* Eliminate redundant work before reaching for SIMD or GPU offloading.
* Use cheap early-exit filters (bitwise hashes, bounding-box checks, pixel difference thresholds) to reject negative samples before invoking expensive neural network models.
* Enforce **Arithmetic Intensity Gating**: Do not dispatch memory-bound tasks to GPUs if PCIe transfer overhead exceeds the computational advantage.

### 1.4 Zero-Copy & Zero-Serialization
* Ban JSON, Pickle, or Protobuf serialization in high-frequency data loops.
* Share raw frame buffers, audio chunks, and sensor streams across language boundaries (e.g. Go, Rust, C++, Node.js) via POSIX Shared Memory (`/dev/shm` + `mmap`) using C-ABI packed structs.

---

## 2. Specialized Subagent Domains

When analyzing and optimizing complex workloads, partition responsibilities across these six specialized domains:

| Subagent | Domain | Key Responsibilities |
| :--- | :--- | :--- |
| **`@cpu-arch`** | Microarchitecture & CPU Execution | AVX-512, AMX, ARM NEON/SVE2, branch minimization, ILP, cache line padding, thread pinning (`taskset`), work-stealing |
| **`@gpu-tensor`** | GPU & Tensor Acceleration | Triton/CUDA kernels, shared memory bank conflict elimination, quantization (FP8/INT8/AWQ), FlashAttention, TensorRT |
| **`@memory-io`** | Memory, Storage & Disk I/O | Arena allocators, SoA layouts, Linux HugePages (`THP`), Linux `io_uring`, `mmap`, zero-copy ring buffers |
| **`@media-crypto`** | Media Codecs & Cryptography | NVENC/NVDEC, Intel QuickSync/VA-API, Apple VideoToolbox, zero-copy NV12 pipelines, `LZ4`/`zstd` compression, AES-NI |
| **`@os-network`** | Systems, Network & OS Telemetry | Linux `perf`, eBPF/BCC latency tracing, CPU governors (`performance`), NUMA node placement (`numactl`), TCP BBR |
| **`@sqlite-perf`** | Embedded Storage & SQLite | WAL journal mode, memory-mapped I/O (`mmap_size`), covering indexes, transaction batching (`BEGIN IMMEDIATE`) |

---

## 3. Polyglot Language Selection Quick Guide

For high-throughput, compute-saturated systems (e.g., CCTV ingestion, streaming, and edge AI):

* **Stream Ingestion & Demuxing (RTSP/WebRTC):** Use **Go** or **Rust**. Go’s M:N runtime handles thousands of concurrent socket connections with minimal footprint and low cognitive overhead.
* **Video Decoding & Hardware Acceleration:** Use **C/C++** or **Rust** with direct hardware bindings (VA-API, NVDEC, VideoToolbox). Avoid copying raw frames into managed GC heaps.
* **Motion Detection & Frame Pre-filtering:** Use **Rust** or **C++** with SIMD intrinsics. Zero runtime allocations per frame.
* **Neural Network Inference:** Dispatch via **Rust**, **C++**, or **Go** using C-ABI bindings to ONNX Runtime, TensorRT, or OpenVINO.
* **API Gateway, WebSockets & User UI:** Use **Node.js (TypeScript)** or **Go**. Fast developer iteration, rich ecosystem for web protocols, and non-blocking I/O.
* **Metadata & Event Storage:** Use **Go** or **Rust** with embedded SQLite configured in WAL mode.

---

## 4. Adaptive Hardware Profiles

Systems must probe hardware at initialization and dynamically select runtime profiles:

* **Tier 1: Constrained (ARM SBC / Intel N100 Mini PC - 6W to 15W)**
  * **Video:** Direct-to-Disk recording without re-encoding; decode sub-stream only (640x360 @ 5 FPS).
  * **AI:** SIMD motion filter gating; INT8 quantized lightweight models (MobileNetV2, YOLO-Nano) on CPU or embedded NPU (RKNN/Coral).
  * **Memory:** Strict buffer cap (3–5 seconds in RAM).
* **Tier 2: Balanced (Intel i5/i7 iGPU / AMD APU / Jetson / Apple Silicon)**
  * **Video:** Hardware-accelerated decode via VA-API / QSV / VideoToolbox.
  * **AI:** YOLO-Small or MobileSAM via OpenVINO / CoreML / TensorRT at 10–15 FPS during motion events.
  * **Memory:** 10–15 second pre-event ring buffers.
* **Tier 3: High-End (Discrete NVIDIA GPU / Multi-Core Server)**
  * **Video:** Full NVDEC hardware decode across all incoming streams.
  * **AI:** Continuous 30 FPS inference, multi-camera tracking, embedding generation (CLIP/Florence-2) via TensorRT FP16/FP8 engines.
  * **Memory:** Generous RAM-backed `/dev/shm` buffers for zero-latency instant replay.

---

## 5. Architectural Checklist Before Writing Code

1. [ ] **Is the task compute-bound or memory-bound?** If memory-bound, do not offload to GPU unless data is already resident on the device.
2. [ ] **Are frames/buffers copied across language boundaries?** Replace network/pipe serialization with POSIX shared memory pointers.
3. [ ] **Are high-resolution streams being unnecessarily decoded?** Passthrough main streams direct-to-disk; decode only low-resolution sub-streams for computer vision.
4. [ ] **Is neural inference running unconditionally?** Insert an ultra-fast SIMD motion detection gate to eliminate 90%+ of idle model runs.
5. [ ] **Is SQLite configured for concurrent high-speed writes?** Verify `PRAGMA journal_mode = WAL;` and `PRAGMA synchronous = NORMAL;`.
