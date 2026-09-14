# CPU Microarchitecture, SIMD Vectorization & Instruction Optimization (x86-64 & ARM)

Modern CPUs are deeply pipelined, superscalar, out-of-order execution machines. Writing compute-dense software requires mechanical sympathy with the execution pipeline, vector register widths, memory hierarchy, branch prediction units, and hardware thread topology.

This reference provides the microarchitectural foundation, vector instruction sets (AVX-512, AMX, NEON, SVE/SVE2, SME), branchless optimization techniques, and production-grade implementations in C/C++ and Rust.

---

## 1. Superscalar Out-of-Order (OoO) Execution Pipeline

Modern x86-64 (Intel Golden Cove, AMD Zen 4/5) and ARM64 (Cortex-X4, Apple M-Series Firestorm/Avalanche) microarchitectures share a unified conceptual pipeline structure:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              INSTRUCTION FETCH                              │
│  Branch Predictor (TAGE / BTB / RAS) ──► Instruction Cache (L1I 32-64KB)   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DECODE & RENAME                                │
│  Instruction Decoder ──► Micro-op (uOp) Cache ──► Register Alias Table (RAT)│
│                                                   Physical Reg File (PRF)   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           OUT-OF-ORDER SCHEDULING                           │
│  Reorder Buffer (ROB: 320-512 entries) ◄──► Reservation Stations / Scheduler│
└──────────┬───────────────────────────┬───────────────────────────┬──────────┘
           ▼                           ▼                           ▼
    Port 0 / 1 (ALU)           Port 2 / 3 (AGU Load)       Port 4 / 7 (Store)
   [Vector FMA / INT]             [L1D Cache Read]          [Store Buffer]
           │                           │                           │
           └───────────────────────────┼───────────────────────────┘
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              IN-ORDER RETIRE                                │
│                     Reorder Buffer (ROB) ──► Commit                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 1.1 Key Microarchitectural Stages

1. **Instruction Fetch & Branch Prediction:**
   * Instructions are fetched in 16-to-64-byte blocks from the L1 Instruction Cache (L1I).
   * The **Branch Target Buffer (BTB)** predicts destination addresses.
   * The **TAGE (TAgged GEometric history length)** predictor evaluates branch outcomes based on branch histories spanning hundreds of instructions.
   * The **Return Address Stack (RAS)** tracks call/ret depth.
   * **Penalty:** A branch misprediction incurs a pipeline flush penalty of **14 to 22 cycles** (x86) or **11 to 16 cycles** (ARM), discarding all decoded in-flight micro-ops.

2. **Decode & Macro-op Fusion:**
   * Decodes variable-length x86 instructions (1–15 bytes) or fixed-length ARM64 instructions (4 bytes) into internal RISC-like micro-operations ($\mu\text{ops}$).
   * **Macro-op fusion:** Adjacent instructions (e.g., `cmp` followed by `jcc`) fuse into a single $\mu\text{op}$, saving decode bandwidth and ROB space.

3. **Register Renaming & Allocator:**
   * Eliminates false data dependencies (Write-After-Read `WAR`, Write-After-Write `WAW`) by mapping architectural registers (e.g., `rax`, `x0`) to a large pool of Physical Registers (typically 200–350+ entries).
   * Allocates entries in the **Reorder Buffer (ROB)** and **Store Buffer (SB)**.

4. **Reservation Stations (RS) & Execution Ports:**
   * Micro-ops sit in the RS/scheduler until their source operands are ready (dataflow-driven).
   * When ready, the scheduler dispatches them to execution ports. Multiple ALU/FMA ports can dispatch in parallel if independent instructions exist.

5. **In-Order Retirement / Commit:**
   * Results write to the Physical Register File out-of-order, but instructions commit architectural state strictly **in program order** via the ROB to maintain precise exception semantics.

---

### 1.2 Instruction Latency vs. Reciprocal Throughput

* **Latency:** Cycles elapsed between operand readiness and result generation.
* **Reciprocal Throughput (1/Rate):** Average cycles elapsed between successive issuances of the same instruction type on available ports.

| Architecture | Instruction | Operation | Latency (Cycles) | Reciprocal Throughput | Execution Ports |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Intel Sapphire Rapids** | `VADDPS` (zmm) | 512-bit FP32 Add | 3 | 0.5 | Port 0, Port 5 |
| **Intel Sapphire Rapids** | `VFMADD231PS` (zmm)| 512-bit FP32 FMA | 4 | 0.5 | Port 0, Port 5 |
| **AMD Zen 4** | `VFMADD231PS` (ymm)| 256-bit FP32 FMA | 4 | 0.5 | Port 0, Port 1 |
| **ARM Cortex-X4** | `FMLA` (v0.4s) | 128-bit FP32 FMA | 4 | 0.5 | Port 0, Port 1 |
| **ARM Cortex-X4** | `SDOT` (v0.4s) | INT8 Dot Product | 3 | 0.5 | Port 0, Port 1 |

#### Breaking Dependency Chains with Independent Accumulators
When an instruction has a latency of 4 cycles and reciprocal throughput of 0.5, dispatching into a single accumulator serializes execution to 1 operation every 4 cycles (throughput = $0.25 \text{ ops/cycle}$).

By interleaving **8 independent accumulators** ($N = \text{Latency} / \text{RecipThroughput} = 4 / 0.5 = 8$), the hardware execution units remain fully saturated ($2.0 \text{ ops/cycle}$), achieving theoretical peak compute throughput.

---

## 2. Advanced x86-64 Architecture & Intrinsics

### 2.1 AVX-512 Instruction Extensions

AVX-512 expands register widths to 512 bits (`zmm0`–`zmm31`) and introduces 8 dedicated opmask registers (`k0`–`k7`):

```
       511                               255              127          0
zmm0:  [                                  |               |            ] (512 bits)
ymm0:                                     [               |            ] (256 bits)
xmm0:                                                     [            ] (128 bits)
k0-k7: [ 64-bit / 16-bit Opmask Bitmask                                ]
```

* **AVX-512F (Foundation):** Core 512-bit vector operations, FP32/FP64 arithmetic, masking, rounding control.
* **AVX-512BW (Byte & Word):** Extends 512-bit masking and vector arithmetic to 8-bit (`uint8_t`) and 16-bit (`int16_t`) integers.
* **AVX-512CD (Conflict Detection):** Detects duplicate entries in a vector register (`_mm512_detectconflict_epi32`), enabling vectorization of irregular histogram loops.
* **AVX-512DQ (Doubleword & Quadword):** Additional conversions, integer arithmetic on 64-bit integers, mask register manipulation.
* **AVX-512VL (Vector Length Extensions):** Crucial architectural enhancement. Allows applying AVX-512 instructions, predicates, and registers to **128-bit (`xmm`) and 256-bit (`ymm`)** registers without frequency throttling.
* **AVX-512VNNI (Vector Neural Network Instructions):** Computes INT8 dot products with INT32 accumulation via `_mm512_dpbusd_epi32` (`vpdpbusd`), delivering 4x INT8 arithmetic throughput compared to standard FP32.

#### Frequency Throttling Dynamics: Skylake-SP vs. Modern Architectures
* **Skylake-SP / Cascade Lake:** Firing 512-bit heavy instructions (FMA) causes the CPU to enter **License 2 (AVX-512 Heavy)**, reducing core frequency by 15–25% across the socket for ~1ms.
* **Sapphire Rapids / Emerald Rapids / AMD Zen 4 & Zen 5:** Modern processors decouple voltage planes or split 512-bit execution across dual 256-bit pipes without core-wide frequency penalties. AVX-512VL allows 256-bit operations with AVX-512 features at full turbo clocks.

---

### 2.2 Intel AMX (Advanced Matrix Extensions)

Intel AMX introduces 2D tile registers and an accelerator matrix multiplication unit (TMUL) implemented on Intel 4th Gen Xeon (Sapphire Rapids) and later.

```
                      Intel AMX Architecture
  ┌────────────────────────────────────────────────────────┐
  │                 Tile Registers (TMM0 - TMM7)            │
  │     8 2D Register Tiles (Up to 16 rows x 64 bytes)      │
  │     Total Capacity: 8 KB (1024 bytes per tile)         │
  └──────────────────────────┬─────────────────────────────┘
                             ▼
  ┌────────────────────────────────────────────────────────┐
  │               Tile Matrix Multiply (TMUL)              │
  │  - tdpbf16ps: Bfloat16 dot-product -> FP32 Accumulator  │
  │  - tdpbusd:   INT8 dot-product   -> INT32 Accumulator  │
  │  Throughput: 16 FLOPs/cycle per row = 1024-2048 INT8/c │
  └────────────────────────────────────────────────────────┘
```

#### OS Kernel Configuration Requirement
Operating systems disable AMX state by default to prevent thread context-switch overhead. The Linux kernel requires dynamic state allocation via `arch_prctl` before executing AMX instructions:

```c
#include <sys/syscall.h>
#include <unistd.h>
#include <asm/prctl.h>

#define ARCH_REQ_XCOMP_PERM 0x1023
#define XFEATURE_XTILEDATA  18

static inline bool init_amx(void) {
    unsigned long bitmask = 0;
    if (syscall(SYS_arch_prctl, ARCH_REQ_XCOMP_PERM, XFEATURE_XTILEDATA) != 0) {
        return false; // Kernel refused or CPU does not support AMX
    }
    return true;
}
```

---

### 2.3 Memory Subsystem, Fences & Cache Alignment

#### 64-Byte Cache Line Boundary & False Sharing
CPUs transfer memory between L1/L2/L3 caches and DRAM in discrete **64-byte chunks (cache lines)**.
When two threads on separate cores write to independent variables located within the same 64-byte boundary, the MESI/MOESI cache coherence protocol forces repeated invalidation of the entire line (Cache Line Bouncing):

```
Core 0 writes varA ──► Cache line invalidated in Core 1 L1
Core 1 writes varB ──► Cache line invalidated in Core 0 L1
Result: Complete serialization, bus saturation, 10x-50x latency penalty.
```

**Prevention:** Align hot structures to 64 bytes and pad thread-local slots:
```cpp
struct alignas(64) ThreadWorkerSlot {
    uint64_t processed_frames;
    uint8_t  pad[56]; // Guarantees 64-byte isolation
};
```

#### Store Buffers & Store-to-Load Forwarding (STLF)
Stores do not write directly to the L1 cache; they sit in a temporary FIFO **Store Buffer (SB)** until retirement. When a load reads an address currently in the Store Buffer:
* **STLF Success:** If the load address and size exactly match or fit cleanly within the stored range, data is forwarded directly from the SB to the load register in 1 cycle.
* **STLF Failure:** If a load partially overlaps a store or crosses cache lines, the store buffer cannot forward. The load stalls until the store commits to L1 (10–18 cycle penalty).

#### Memory Fences and Streaming Stores
* `_mm_lfence()`: Serializes instruction dispatch. Loads before the fence finish before loads after the fence execute.
* `_mm_sfence()`: Flushes the Store Buffer and Write-Combining (WC) buffers. Guarantees all prior stores are visible to other cores.
* `_mm_mfence()`: Full memory barrier. Drains both store and load buffers.
* **Non-Temporal Stores (`_mm_stream_ps`, `_mm_stream_si128`):** Write directly to write-combining buffers, bypassing L1/L2/L3 caches. Essential for large data writes (>L3 size) to prevent cache pollution.

---

## 3. Advanced ARM Architecture & Vector Extensions

### 3.1 ARM NEON (Advanced SIMD)

NEON provides 32 fixed-width 128-bit vector registers (`v0`–`v31`). It supports signed/unsigned integers (8, 16, 32, 64-bit) and floating point (16, 32, 64-bit).

* **Arrangement specifiers:** `v0.16b` (16 bytes), `v0.8h` (8 halfwords/16-bit), `v0.4s` (4 singlewords/32-bit), `v0.2d` (2 doublewords/64-bit).
* **Dot-Product Extension (ARMv8.2-A+):** `sdot` / `udot` (`vdotq_s32`, `vdotq_u32`) calculates a 4-element INT8 dot-product with 32-bit integer accumulation in a single cycle.

---

### 3.2 SVE and SVE2 (Scalable Vector Extension)

SVE eliminates hardcoded vector widths. Instead of compiling for fixed 128-bit or 512-bit registers, SVE implements **Vector-Length Agnostic (VLA)** programming:
* Vector registers (`z0`–`z31`) scale dynamically from **128 bits up to 2048 bits** (in 128-bit increments) determined at hardware fabrication time.
* The exact vector length is queried at runtime via `svcntb()` (count bytes), `svcntw()` (count 32-bit words), or `svcnth()` (count 16-bit halfwords).
* **Predication (`p0`–`p15`):** Mask registers control which lanes execute, completely eliminating scalar loop peel/tail epilogues.

```
       SVE Vector-Length Agnostic Execution (No Epilogue Loop)
┌─────────────────────────────────────────────────────────────┐
│ Hardware SVL = 512 bits (16 lanes of 32-bit words)          │
├─────────────────────────────────────────────────────────────┤
│ Iteration 1: Active mask = 1111111111111111 (16 elements)   │
│ Iteration 2: Active mask = 1111111111111111 (16 elements)   │
│ Iteration 3: Active mask = 1111100000000000 (Last 5 elem)   │
└─────────────────────────────────────────────────────────────┘
```

* **SVE vs. SVE2:** SVE focused primarily on high-performance computing (HPC) scientific floating-point. **SVE2** (standard in ARMv9, e.g., Cortex-X2/X3/X4) adds DSP primitives, bit manipulation, string handling, saturating arithmetic, and non-widening multiply-accumulate operations.

---

### 3.3 Scalable Matrix Extension (SME)

ARM SME introduces hardware 2D matrix accumulation:
* **Streaming SVE Mode (`SVCR.SM=1`):** Switches the core into high-throughput streaming vector mode.
* **Matrix Array (ZA Storage):** Dedicated 2D matrix tiles ($SVL \times SVL$) capable of executing outer-product operations (`MOPA`, `MOPS`) directly in hardware accumulators without reading/writing back to vector registers.

---

### 3.4 ARM Heterogeneous Core Topology & Scheduling (big.LITTLE / DynamIQ)

Modern ARM chips (Qualcomm Snapdragon, MediaTek Dimensity, Apple Silicon, Rockchip RK3588) combine asymmetric microarchitectures connected via a DynamIQ Shared Unit (DSU):

```
┌────────────────────────────────────────────────────────┐
│             DynamIQ Shared Unit (DSU / L3)             │
├──────────────────────┬─────────────────────────────────┤
│ Performance Cluster  │ Efficiency Cluster              │
│ 4x Cortex-A78 / X4   │ 4x Cortex-A55 / A520            │
│ - Deep OoO (320 ROB) │ - In-Order / Shallow OoO        │
│ - 4-way Decode       │ - 2-way Decode                  │
│ - Full NEON/SVE2 FMA │ - Half-rate / Single SIMD pipe  │
│ - High Power / Clock │ - Ultra-low static leakage      │
└──────────────────────┴─────────────────────────────────┘
```

**Thread Pinning Mandate:**
Never let the OS scheduler migrate compute-bound SIMD loops between big and LITTLE cores:
1. Moving across clusters causes an **L1/L2 cache blowout**.
2. Efficiency cores execute vector operations with 2x–4x higher latency and narrower issue width.
3. Threads must be explicitly pinned using `pthread_setaffinity_np` or CPU affinity masks to the high-performance cluster.

---

### 3.5 Cache Prefetch Hints (`PRFM`)

ARM provides explicit prefetch instructions (`PRFM`) to prime the cache hierarchy before memory access:

$$\text{PRFM } \langle\text{type}\rangle\langle\text{target}\rangle\langle\text{policy}\rangle\text{, [Xn, \#imm]}$$

* **Type:** `PLD` (Prefetch for Load), `PST` (Prefetch for Store).
* **Target:** `L1`, `L2`, `L3`.
* **Policy:** `KEEP` (Retain in cache / temporal), `STRM` (Streaming / non-temporal, discard immediately after read).

```c
// Preload 256 bytes ahead into L1 cache for streaming load
asm volatile("prfm pldl1strm, [%0, #256]" :: "r"(ptr));
```

---

## 4. Branch Prediction & Branchless Optimization

### 4.1 Mechanics of Branch Prediction

The branch prediction unit maintains two distinct tables:
1. **Direction Predictor:** Predicts whether a conditional branch is Taken (T) or Not Taken (NT) using local/global history shift registers and saturating 2-bit counters.
2. **Branch Target Buffer (BTB):** A direct-mapped or set-associative cache storing the target address of branches.

When branch execution evaluates at retirement, a misprediction requires:
1. **Flushing the pipeline:** Invalidating all instructions younger than the branch in the decode queue, reservation stations, and ROB.
2. **Restoring the register alias table (RAT)** to the architectural snapshot.
3. **Refetching:** Restarting instruction fetch from the correct path (cost: 14–20+ cycles).

---

### 4.2 Branchless Programming Patterns

When branch outcomes cannot be predicted with $>95\%$ accuracy (e.g., random data, threshold filtering, parsing), branches must be converted to **predicated instructions or arithmetic masks**.

#### Pattern A: Conditional Select (`cmov` / `csel`)
Compilers lower ternary operators to `cmov` (x86) or `csel` (ARM64) when optimization flags are enabled (`-O3`), avoiding conditional jump instructions (`jne`, `jge`).

```c
// Branched (Emits jle / pipeline hazard on random data)
int max_val_branched(int a, int b) {
    return (a > b) ? a : b;
}

// Branchless Assembly (x86):
// cmp     edi, esi
// cmovl   edi, esi
// mov     eax, edi
// ret

// Branchless Assembly (ARM64):
// cmp     w0, w1
// csel    w0, w0, w1, ge
// ret
```

#### Pattern B: Branchless Clamping
Clamping values between $[0, 255]$ (e.g., pixel processing, ReLU):

```c
// Branchless Clamp between [min_val, max_val] using bitwise operations
static inline int32_t branchless_clamp(int32_t val, int32_t min_val, int32_t max_val) {
    // Branchless min
    int32_t diff1 = val - max_val;
    val = val - (diff1 & (diff1 >> 31)); // If val > max_val, diff1 > 0 -> subtract diff1
    // Branchless max
    int32_t diff2 = min_val - val;
    val = val + (diff2 & (diff2 >> 31)); // If val < min_val, diff2 > 0 -> add diff2
    return val;
}
```

#### Pattern C: Arithmetic Mask Generation
Create an all-ones (`0xFFFFFFFF`) or all-zeros (`0x00000000`) mask from a boolean condition without conditional jumps:

```c
// Condition: x > threshold -> mask = -1 (all 1s), else 0 (all 0s)
int32_t mask = -(int32_t)(x > threshold);
int32_t result = (a & mask) | (b & ~mask);
```

---

## 5. Production Vectorized Code Implementations

### 5.1 x86-64 AVX-512 VNNI: High-Speed INT8 Dot-Product (C++)

This implementation utilizes AVX-512 VNNI (`_mm512_dpbusd_epi32`) with 4 independent accumulation registers to fully saturate execution port throughput.

```cpp
#include <immintrin.h>
#include <cstdint>
#include <cstddef>

/**
 * Computes dot product of unsigned 8-bit array 'a' and signed 8-bit array 'b'.
 * Uses AVX-512 VNNI with 4x unrolling to break dependency chains.
 * Array size N must be a multiple of 256.
 */
int32_t dot_product_vnni_avx512(const uint8_t* a, const int8_t* b, size_t n) {
    __m512i acc0 = _mm512_setzero_si512();
    __m512i acc1 = _mm512_setzero_si512();
    __m512i acc2 = _mm512_setzero_si512();
    __m512i acc3 = _mm512_setzero_si512();

    for (size_t i = 0; i < n; i += 256) {
        // Load 4 blocks of 64 bytes (256 elements total per iteration)
        __m512i va0 = _mm512_loadu_si512(reinterpret_cast<const __m512i*>(a + i));
        __m512i vb0 = _mm512_loadu_si512(reinterpret_cast<const __m512i*>(b + i));

        __m512i va1 = _mm512_loadu_si512(reinterpret_cast<const __m512i*>(a + i + 64));
        __m512i vb1 = _mm512_loadu_si512(reinterpret_cast<const __m512i*>(b + i + 64));

        __m512i va2 = _mm512_loadu_si512(reinterpret_cast<const __m512i*>(a + i + 128));
        __m512i vb2 = _mm512_loadu_si512(reinterpret_cast<const __m512i*>(b + i + 128));

        __m512i va3 = _mm512_loadu_si512(reinterpret_cast<const __m512i*>(a + i + 192));
        __m512i vb3 = _mm512_loadu_si512(reinterpret_cast<const __m512i*>(b + i + 192));

        // Multiply unsigned 8-bit by signed 8-bit and accumulate to 32-bit ints
        acc0 = _mm512_dpbusd_epi32(acc0, va0, vb0);
        acc1 = _mm512_dpbusd_epi32(acc1, va1, vb1);
        acc2 = _mm512_dpbusd_epi32(acc2, va2, vb2);
        acc3 = _mm512_dpbusd_epi32(acc3, va3, vb3);
    }

    // Merge accumulators
    acc0 = _mm512_add_epi32(acc0, acc1);
    acc2 = _mm512_add_epi32(acc2, acc3);
    acc0 = _mm512_add_epi32(acc0, acc2);

    // Horizontal reduction of 16x 32-bit lanes into a single scalar int32_t
    return _mm512_reduce_add_epi32(acc0);
}
```

---

### 5.2 ARM NEON: INT8 Dot-Product with Accumulator Unrolling (C++)

```cpp
#include <arm_neon.h>
#include <cstdint>
#include <cstddef>

/**
 * Computes dot product of signed 8-bit arrays using ARM NEON SDOT instruction.
 * Processes 64 bytes per iteration across 4 independent 128-bit accumulators.
 */
int32_t dot_product_neon(const int8_t* a, const int8_t* b, size_t n) {
    int32x4_t acc0 = vdupq_n_s32(0);
    int32x4_t acc1 = vdupq_n_s32(0);
    int32x4_t acc2 = vdupq_n_s32(0);
    int32x4_t acc3 = vdupq_n_s32(0);

    for (size_t i = 0; i < n; i += 64) {
        // Prefetch data 128 bytes ahead into L1 cache
        __builtin_prefetch(a + i + 128, 0, 1);
        __builtin_prefetch(b + i + 128, 0, 1);

        int8x16_t va0 = vld1q_s8(a + i);
        int8x16_t vb0 = vld1q_s8(b + i);
        int8x16_t va1 = vld1q_s8(a + i + 16);
        int8x16_t vb1 = vld1q_s8(b + i + 16);

        int8x16_t va2 = vld1q_s8(a + i + 32);
        int8x16_t vb2 = vld1q_s8(b + i + 32);
        int8x16_t va3 = vld1q_s8(a + i + 48);
        int8x16_t vb3 = vld1q_s8(b + i + 48);

        // SDOT performs 4 pairwise int8 multiplies and accumulates into int32 lanes
        acc0 = vdotq_s32(acc0, va0, vb0);
        acc1 = vdotq_s32(acc1, va1, vb1);
        acc2 = vdotq_s32(acc2, va2, vb2);
        acc3 = vdotq_s32(acc3, va3, vb3);
    }

    acc0 = vaddq_s32(acc0, acc1);
    acc2 = vaddq_s32(acc2, acc3);
    acc0 = vaddq_s32(acc0, acc2);

    // Horizontal add of 4 lanes
    return vaddvq_s32(acc0);
}
```

---

### 5.3 ARM SVE: Vector-Length Agnostic Float Reduction (C++)

Compiled with `-march=armv8.2-a+sve` or `-march=armv9-a`. This function adapts dynamically to any hardware vector width (128, 256, 512, or 1024 bits) with zero tail loops.

```cpp
#if defined(__ARM_FEATURE_SVE)
#include <arm_sve.h>
#include <cstddef>

/**
 * Vector-Length Agnostic (VLA) FP32 Array Summation using ARM SVE.
 * Automatically utilizes maximum physical hardware vector length.
 */
float sum_float_sve(const float* data, size_t n) {
    svfloat32_t acc = svdup_n_f32(0.0f);
    size_t i = 0;

    // svwhilelt generates predicate mask for indices [i, i + vector_len) < n
    svbool_t pg = svwhilelt_b32(i, n);

    while (svptest_any(svptrue_b32(), pg)) {
        // Predicated load: only loads valid active elements into vector
        svfloat32_t vdata = svld1_f32(pg, data + i);
        
        // Predicated add: inactive lanes remain untouched
        acc = svadd_f32_m(pg, acc, vdata);

        // Advance index by the hardware vector length (number of 32-bit lanes)
        i += svcntw();
        pg = svwhilelt_b32(i, n);
    }

    // Horizontal reduction of vector accumulator to scalar float
    return svaddv_f32(svptrue_b32(), acc);
}
#endif
```

---

### 5.4 Rust: High-Performance Portable SIMD (`std::simd`) & Intrinsics

Modern Rust supports both portable SIMD (`std::simd`) on nightly and stabilized architecture-specific intrinsics (`core::arch`).

#### Portable SIMD Implementation (`std::simd`):
```rust
#![feature(portable_simd)]
use std::simd::prelude::*;

/// Portable SIMD 8-lane FP32 Dot Product with 4x unrolling.
/// Compiles to AVX-512 on x86, NEON on ARM, and SVE when targeted.
pub fn dot_product_simd(a: &[f32], b: &[f32]) -> f32 {
    assert_eq!(a.len(), b.len());
    const LANES: usize = 8;
    type F32x8 = Simd<f32, LANES>;

    let chunks_a = a.chunks_exact(LANES * 4);
    let chunks_b = b.chunks_exact(LANES * 4);
    let rem_a = chunks_a.remainder();
    let rem_b = chunks_b.remainder();

    let mut sum0 = F32x8::splat(0.0);
    let mut sum1 = F32x8::splat(0.0);
    let mut sum2 = F32x8::splat(0.0);
    let mut sum3 = F32x8::splat(0.0);

    for (ca, cb) in chunks_a.zip(chunks_b) {
        let va0 = F32x8::from_slice(&ca[0..8]);
        let vb0 = F32x8::from_slice(&cb[0..8]);
        let va1 = F32x8::from_slice(&ca[8..16]);
        let vb1 = F32x8::from_slice(&cb[8..16]);
        let va2 = F32x8::from_slice(&ca[16..24]);
        let vb2 = F32x8::from_slice(&cb[16..24]);
        let va3 = F32x8::from_slice(&ca[24..32]);
        let vb3 = F32x8::from_slice(&cb[24..32]);

        sum0 += va0 * vb0;
        sum1 += va1 * vb1;
        sum2 += va2 * vb2;
        sum3 += va3 * vb3;
    }

    let mut total = (sum0 + sum1 + sum2 + sum3).reduce_sum();

    // Scalar epilogue for remainder
    for (x, y) in rem_a.iter().zip(rem_b.iter()) {
        total += x * y;
    }

    total
}
```

#### Rust Explicit Target Intrinsics (x86-64 AVX2 / FMA):
```rust
#[cfg(target_arch = "x86_64")]
use core::arch::x86_64::*;

#[target_feature(enable = "avx2,fma")]
pub unsafe fn dot_product_x86_fma(a: &[f32], b: &[f32]) -> f32 {
    let mut acc0 = _mm256_setzero_ps();
    let mut acc1 = _mm256_setzero_ps();
    let n = a.len();
    let ptr_a = a.as_ptr();
    let ptr_b = b.as_ptr();

    let mut i = 0;
    while i + 16 <= n {
        let va0 = _mm256_loadu_ps(ptr_a.add(i));
        let vb0 = _mm256_loadu_ps(ptr_b.add(i));
        let va1 = _mm256_loadu_ps(ptr_a.add(i + 8));
        let vb1 = _mm256_loadu_ps(ptr_b.add(i + 8));

        acc0 = _mm256_fmadd_ps(va0, vb0, acc0);
        acc1 = _mm256_fmadd_ps(va1, vb1, acc1);
        i += 16;
    }

    acc0 = _mm256_add_ps(acc0, acc1);

    // Horizontal reduction of 8 floats
    let hi = _mm256_extractf128_ps(acc0, 1);
    let lo = _mm256_castps256_ps128(acc0);
    let sum128 = _mm_add_ps(lo, hi);
    let shuf = _mm_movehl_ps(sum128, sum128);
    let sums = _mm_add_ps(sum128, shuf);
    let shuf2 = _mm_shuffle_ps(sums, sums, 1);
    let res = _mm_add_ss(sums, shuf2);

    let mut final_sum = _mm_cvtss_f32(res);
    while i < n {
        final_sum += *ptr_a.add(i) * *ptr_b.add(i);
        i += 1;
    }

    final_sum
}
```

---

## 6. Microarchitectural Optimization Checklist

1. [ ] **Eliminate Loop-Carried Dependencies:** Unroll compute loops across at least 4 to 8 independent vector accumulators to match the instruction execution latency.
2. [ ] **Enforce Cache Line Isolation:** Align hot structs to `alignas(64)` and pad thread-local slots to avoid false sharing.
3. [ ] **Non-Temporal Streaming Stores for Large Outputs:** Use `_mm_stream_*` or `PRFM PSTL1STRM` when writing memory buffers exceeding L3 cache capacity.
4. [ ] **Convert Unpredictable Branches to Selects:** Use ternary operators or bitwise masking to force the generation of `cmov` (x86) or `csel` (ARM64).
5. [ ] **Vector Length Awareness:** On x86, prefer AVX-512VL (256-bit) if running on older Skylake-SP architectures to avoid AVX-512 frequency throttle licenses; on Sapphire Rapids and Zen 4/5, utilize full 512-bit ZMM registers without downclocking.
6. [ ] **ARM Cluster Pinning:** Always pin compute-intensive threads to the big performance cluster (Cortex-X or Cortex-A7xx) to avoid migration to in-order efficiency cores.
