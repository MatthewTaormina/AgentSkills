# Memory Architecture, Storage & High-Throughput Disk I/O

This reference provides an authoritative, hardware-grounded operational guide for optimizing memory hierarchy traversal, eliminating allocation fragmentation, and maximizing storage throughput across modern x86-64 and ARM64 platforms.

---

## 1. Cache Topology, Hierarchy & Mechanical Sympathy

Modern superscalar processors execute instructions in fractions of a nanosecond, but main memory (DRAM) accesses incur a penalty orders of magnitude higher (the "Memory Wall"). High-performance systems must be designed around cache line boundaries, hardware prefetchers, and cache coherency protocols.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      L1 Data Cache (32KB - 128KB)                       │
│             Latency: 3 - 5 cycles (0.8 - 1.2 ns) | Line: 64B            │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Miss
┌────────────────────────────────────▼────────────────────────────────────┐
│                       L2 Unified (512KB - 2MB)                          │
│             Latency: 10 - 16 cycles (2.5 - 4.0 ns) | Line: 64B          │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Miss
┌────────────────────────────────────▼────────────────────────────────────┐
│                    L3 Shared / LLC (16MB - 96MB+)                       │
│             Latency: 35 - 60 cycles (10 - 18 ns) | Line: 64B            │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Miss
┌────────────────────────────────────▼────────────────────────────────────┐
│                   Local System DRAM (DDR4 / DDR5)                       │
│           Latency: 60 - 90 ns (200 - 300 cycles) | Page: 4KB / 2MB      │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ NUMA Cross-Socket Interconnect (UPI / IF)
┌────────────────────────────────────▼────────────────────────────────────┐
│                     Remote Socket DRAM (NUMA Node 1)                    │
│     Latency: 120 - 240 ns (400 - 800 cycles) | 40-50% Bandwidth Drop    │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.1 Microarchitectural Cache Hierarchy: x86-64 vs. ARM64

Every read or write from CPU execution pipelines operates in chunks of **64 bytes** (the cache line). While both x86 and standard ARM64 CPUs share this 64-byte line standard, their internal sizing, associative sets, and latencies differ substantially:

| Parameter | Intel Raptor Lake / Emerald Rapids | AMD Zen 4 / Zen 5 | Apple Silicon (M3 / M4) | ARM Neoverse V2 / N1 |
| :--- | :--- | :--- | :--- | :--- |
| **ISA Architecture** | x86-64 (Raptor Cove P-Core) | x86-64 (Zen 4 Core) | ARMv9.2-A (Firestorm/Avalon) | ARMv9-A / ARMv8.2-A |
| **L1 Data Cache** | 48 KB, 12-way associative | 32 KB, 8-way associative | 128 KB, 8-way associative | 64 KB, 4-way associative |
| **L1D Latency** | 4–5 clock cycles | 4 clock cycles | 3–4 clock cycles | 4 clock cycles |
| **L1 Cache Line** | **64 bytes** | **64 bytes** | **64 bytes** (128B prefetch pair) | **64 bytes** |
| **L2 Cache (Per Core)**| 2 MB, 16-way associative | 1 MB, 16-way associative | 16 MB (Shared Cluster) | 1 MB / 2 MB private |
| **L2 Latency** | 16 clock cycles | 14 clock cycles | ~12–16 clock cycles | 10–11 clock cycles |
| **L3 Cache (LLC)** | 36 MB shared (up to 300MB) | 32 MB / CCD (96MB 3D V-Cache)| 24–48 MB System Level Cache | 32–64 MB Shared System Cache |
| **L3 Latency** | 50–60 clock cycles | 46–50 clock cycles | ~35–45 clock cycles | 35–45 clock cycles |
| **Local DRAM Latency** | ~65–85 ns (~280 cycles) | ~65–80 ns (~260 cycles) | ~70–95 ns (Unified LPDDR5X) | ~70–90 ns (DDR5) |
| **NUMA Cross-Socket** | 1.8x – 2.4x local latency | 1.6x – 2.2x local latency | Uniform Memory (UMA) | 1.7x – 2.5x local latency |

#### Cache Coherency & Bus Snooping Mechanics
Multi-core architectures maintain coherency via variants of the **MESI** (Modified, Exclusive, Shared, Invalid) protocol:
* **Intel:** MESIF (Modified, Exclusive, Shared, Invalid, **Forward** - designated forwarder sends cache lines to minimize point-to-point crossbar traffic).
* **AMD / ARM:** MOESI (Modified, **Owner**, Exclusive, Shared, Invalid - dirty lines can be shared among cores without flushing to DRAM first).
* When a core modifies a shared cache line, it broadcasts an **Invalidate Request** across the interconnect. All sibling cores holding that 64-byte line must transition to `Invalid`, discarding their copy.

---

### 1.2 Structure of Arrays (SoA) vs. Array of Structures (AoS)

The choice of in-memory data layout dictates cache line utilization, prefetch efficiency, and vectorization capability.

#### Memory Layout Anatomy
Consider an entity tracking system storing 3D coordinates $(x, y, z)$, velocity vector $(vx, vy, vz)$, mass, and an entity ID:

```
Array of Structures (AoS) - Memory Layout:
[x0, y0, z0, vx0, vy0, vz0, m0, id0][x1, y1, z1, vx1, vy1, vz1, m1, id1]...
│◄───────────── 32 bytes ───────────►│◄───────────── 32 bytes ───────────►│
└────────────────────────── 64-Byte Cache Line 0 ──────────────────────────┘

Structure of Arrays (SoA) - Memory Layout:
X-Array:  [x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15] (64B)
Y-Array:  [y0, y1, y2, y3, y4, y5, y6, y7, y8, y9, y10, y11, y12, y13, y14, y15] (64B)
Z-Array:  [z0, z1, z2, z3, z4, z5, z6, z7, z8, z9, z10, z11, z12, z13, z14, z15] (64B)
VX-Array: [vx0, vx1, vx2, vx3, vx4, vx5, vx6, vx7, vx8, vx9, vx10, vx11, ...]   (64B)
```

#### Microarchitectural Implications
1. **Cache Bandwidth Utilization:**
   * If a physics or computer vision loop only updates position based on velocity ($x \leftarrow x + vx \cdot \Delta t$), the **AoS** layout pulls in unused fields ($y, z, vy, vz, m, id$) on every line. Cache utilization drops to $\frac{8 \text{ bytes}}{32 \text{ bytes}} = 25\%$.
   * In **SoA**, 100% of the loaded 64-byte cache line contains relevant floating-point floats ($16 \times 4\text{-byte floats} = 64\text{ bytes}$).
2. **SIMD Vector Stride Efficiency:**
   * **Contiguous Loads (`_mm256_load_ps`, `vld1q_f32`):** In SoA, 8 floats (AVX2) or 16 floats (AVX-512) are loaded into a vector register in a single instruction with **1-cycle throughput**.
   * **Non-Contiguous Gather (`_mm256_i32gather_ps`):** In AoS, vectorizing requires hardware gather instructions. Modern x86 processors decompose gather instructions into individual micro-ops that generate 8 separate L1D cache queries, incurring a 15–25 cycle latency penalty and saturating L1D load ports.
3. **Hardware Stream Prefetcher Synergies:**
   * CPU hardware prefetchers (L1 Stream Prefetcher, L2 Stream/Spatial Prefetcher) track sequential cache line access streams. SoA yields purely linear sequential streams ($\Delta = +64\text{ bytes}$), allowing the prefetcher to pull lines into L2/L1 before the instruction pipeline requests them, hiding DRAM latency completely.

#### Hybrid Layout: Array of Structures of Arrays (AoSoA / Tiled SoA)
When algorithms require access to all components of a single entity while preserving vectorization, **AoSoA** groups items into chunks matching the target SIMD register width:

```c
// AoSoA for AVX-512 (16-lane float vectors)
typedef struct {
    float x[16];
    float y[16];
    float z[16];
    float vx[16];
    float vy[16];
    float vz[16];
} EntityTile16; // Perfectly aligned to multiple of 64 bytes
```

---

### 1.3 Cache Line Padding & False Sharing Elimination

False sharing is an acute performance degradation scenario in multithreaded systems that occurs when distinct threads modify logically independent variables that reside within the **same 64-byte physical cache line**.

```
                       64-Byte Cache Line
┌───────────────────────────────────┬───────────────────────────────────┐
│       Core 0: thread_stats[0]     │       Core 1: thread_stats[1]     │
│        (Target of Thread 0)       │        (Target of Thread 1)       │
└───────────────────────────────────┴───────────────────────────────────┘
                 ▲                                     ▲
                 │ Write Invalidate                    │ Write Invalidate
                 ▼                                     ▼
        ┌─────────────────┐                   ┌─────────────────┐
        │     Core 0      │                   │     Core 1      │
        │  L1 Cache Line  │◄═════════════════►│  L1 Cache Line  │
        │  Status: INVALID│   HitM Snooping   │  Status: INVALID│
        └─────────────────┘                   └─────────────────┘
```

#### The False Sharing Degradation Cycle:
1. Core 0 modifies `thread_stats[0]`. The cache line transitions to `Modified` (M) in Core 0's L1 cache.
2. Core 0 broadcasts an invalidation notice across the cache coherency bus.
3. Core 1's copy of the entire 64-byte line is invalidated (`Invalid` state).
4. Core 1 attempts to write `thread_stats[1]`. It suffers an immediate L1 cache miss (`HitM` - Hit on Modified in peer cache).
5. The hardware bus controller forces Core 0 to flush its line to L3/interconnect, Core 1 re-reads the line, marks it `Modified`, and invalidates Core 0.
6. **Result:** Throughput collapses by 10x–50x due to continuous interconnect contention and pipeline stalls, despite zero algorithmic locks.

#### Alignment Directives & Safe Padding Implementations

##### C / C++ Implementation
```c
#include <stdint.h>
#include <stdalign.h>

// BAD: False sharing occurs across cores updating adjacent array slots
typedef struct {
    uint64_t operations_count; // 8 bytes
} WorkerStatsBad;

// GOOD: alignas(64) forces each structure to start on a new 64-byte boundary
typedef struct {
    alignas(64) uint64_t operations_count;
    // Explicit padding guarantees isolation even in dense arrays
    uint8_t padding[64 - sizeof(uint64_t)];
} WorkerStatsPadded;

_Static_assert(sizeof(WorkerStatsPadded) == 64, "WorkerStatsPadded must be exactly 64 bytes");
```

In modern C++17, use `std::hardware_destructive_interference_size`:
```cpp
#include <new>

struct alignas(std::hardware_destructive_interference_size) ThreadBucket {
    uint64_t counter;
    // Guaranteed no false sharing across cache lines
};
```

##### Rust Implementation
```rust
// Rust: Enforce 64-byte alignment to prevent false sharing across threads
#[repr(align(64))]
pub struct ThreadCounter {
    pub count: u64,
}

// In contiguous collections:
pub struct ThreadPoolMetrics {
    // Each counter is placed in an isolated 64-byte cache line
    pub counters: Vec<ThreadCounter>,
}
```

---

## 2. Custom Allocators & Memory Footprint Optimization

### 2.1 The Crisis of General-Purpose Allocators in 24/7 Daemons

Standard system allocators (`ptmalloc3` in glibc, `jemalloc`, `tcmalloc`) are general-purpose allocators designed for arbitrary lifecycles. In long-running 24/7 edge daemons processing streams (e.g., CCTV feeds, high-frequency network packets, time-series ingest), they present three chronic failure modes:

1. **Virtual & Physical Memory Fragmentation (RSS Creep):**
   * High-frequency mixed allocations (e.g., 20-byte strings mixed with 2MB uncompressed video frames) leave small "pinned" live blocks scattered across memory pages.
   * Even if 95% of allocated objects are freed, glibc cannot return pages to the Linux kernel via `brk(2)` or `madvise(MADV_DONTNEED)` because a single active 16-byte object anchors an entire 4KB physical page. The daemon's Resident Set Size (RSS) balloons over days until the Linux Out-Of-Memory (OOM) killer terminates the process.
2. **ptmalloc Arena Contention:**
   * glibc ptmalloc pools allocations into per-thread or shared heaps called *arenas* (limited to $8 \times N_{\text{cores}}$ on 64-bit).
   * High thread concurrency creates mutual exclusion spinlock contention inside `malloc()` and `free()` critical paths.
3. **Metadata Overhead:**
   * General-purpose allocators store allocation size headers (8–16 bytes per allocation) and maintain internal bucket linked lists. Allocating millions of tiny payloads wastes up to 50% of heap memory on bookkeeping headers alone.

---

### 2.2 Arena (Bump) Allocator

An Arena (or Linear/Bump Allocator) allocates memory sequentially from a pre-reserved contiguous slab.
* **Allocation Cost:** $O(1)$ — an integer addition and pointer bump.
* **Deallocation Cost:** $O(1)$ — resetting the offset back to 0.
* **Use Case:** Scoped per-frame lifecycles (e.g., all motion detection intermediate buffers for Frame $N$ are allocated from the frame arena and discarded en-masse before Frame $N+1$).

```
Arena Contiguous Memory Buffer (e.g., 16 MB pre-allocated)
┌───────────────┬───────────────────┬───────────────┬────────────────────────┐
│ Allocation 1  │ Padding │ Alloc 2 │ Padding │ Alloc 3 │ Unallocated Free Space │
└───────────────┴─────────┴─────────┴─────────┴─────────┴────────────────────────┘
▲                                                       ▲                        ▲
│                                                       │                        │
Base Pointer                                      Current Offset              Capacity
                                                 (Bump Pointer)
```

#### Production-Grade Compilable C Implementation
```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
#include <stdalign.h>
#include <string.h>
#include <assert.h>

typedef struct {
    uint8_t *buffer;
    size_t capacity;
    size_t offset;
    size_t prev_offset;
} Arena;

static inline uintptr_t arena_align_forward(uintptr_t ptr, size_t alignment) {
    assert((alignment & (alignment - 1)) == 0 && "Alignment must be power of two");
    return (ptr + alignment - 1) & ~(alignment - 1);
}

Arena arena_create(size_t capacity) {
    Arena a;
    a.buffer = (uint8_t *)malloc(capacity);
    assert(a.buffer != NULL && "Failed to reserve arena memory backing");
    a.capacity = capacity;
    a.offset = 0;
    a.prev_offset = 0;
    return a;
}

void *arena_alloc(Arena *a, size_t size, size_t alignment) {
    uintptr_t curr_ptr = (uintptr_t)(a->buffer + a->offset);
    uintptr_t aligned_ptr = arena_align_forward(curr_ptr, alignment);
    size_t padding = aligned_ptr - curr_ptr;

    if (a->offset + padding + size > a->capacity) {
        return NULL; // Out of memory in arena slab
    }

    a->prev_offset = a->offset;
    a->offset += padding + size;
    return (void *)aligned_ptr;
}

void arena_reset(Arena *a) {
    // O(1) deallocation: instantaneous bulk reuse without metadata traversal
    a->offset = 0;
    a->prev_offset = 0;
}

void arena_destroy(Arena *a) {
    free(a->buffer);
    a->buffer = NULL;
    a->capacity = 0;
    a->offset = 0;
    a->prev_offset = 0;
}
```

#### Production-Grade Rust Bump Arena Implementation
```rust
use std::alloc::{alloc, dealloc, Layout};
use std::cell::UnsafeCell;
use std::ptr::NonNull;

pub struct BumpArena {
    memory: NonNull<u8>,
    capacity: usize,
    offset: UnsafeCell<usize>,
    layout: Layout,
}

impl BumpArena {
    pub fn new(capacity: usize) -> Self {
        assert!(capacity > 0);
        // Align the entire arena base to a 64-byte cache line boundary
        let layout = Layout::from_size_align(capacity, 64).expect("Invalid arena layout");
        let raw = unsafe { alloc(layout) };
        let memory = NonNull::new(raw).expect("Failed to allocate backing buffer");

        Self {
            memory,
            capacity,
            offset: UnsafeCell::new(0),
            layout,
        }
    }

    #[inline]
    pub fn alloc_raw(&self, size: usize, align: usize) -> Option<NonNull<u8>> {
        assert!(align.is_power_of_two(), "Alignment must be power of two");
        let current_offset = unsafe { *self.offset.get() };
        let current_addr = self.memory.as_ptr() as usize + current_offset;
        let aligned_addr = (current_addr + align - 1) & !(align - 1);
        let padding = aligned_addr - current_addr;

        if current_offset + padding + size > self.capacity {
            return None; // Capacity exhausted
        }

        unsafe {
            *self.offset.get() = current_offset + padding + size;
        }

        NonNull::new(aligned_addr as *mut u8)
    }

    #[inline]
    pub fn reset(&self) {
        unsafe {
            *self.offset.get() = 0;
        }
    }
}

impl Drop for BumpArena {
    fn drop(&mut self) {
        unsafe {
            dealloc(self.memory.as_ptr(), self.layout);
        }
    }
}
```

---

### 2.3 Pool & Slab Allocator for Fixed-Size Payloads

When payloads have identical fixed dimensions (e.g., 1080p NV12 raw video frames of size $1920 \times 1080 \times 1.5 = 3{,}110{,}400\text{ bytes}$, or 1500-byte network MTU frames), an **Intrusive Slab/Pool Allocator** eliminates runtime allocations and external fragmentation completely.

* **Intrusive Free-List Design:** Free blocks embed a pointer to the next free block directly inside their own unallocated memory space. **Metadata memory overhead is strictly 0 bytes.**
* **LIFO Reuse:** Returning a freed block to the head of the list guarantees that the next request retrieves the most recently used block, maximizing **L1/L2 cache warmth**.

```
Free List Head ──► [ Block A: next ──► [ Block C: next ──► NULL ] ]
                   (Free Block)        (Free Block)

                   [ Block B: Active Data Payload (In Use) ]
```

#### Compilable C Intrusive Slab Allocator
```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <stdbool.h>
#include <assert.h>

// Intrusive Node: Zero extra memory footprint
typedef struct SlabNode {
    struct SlabNode *next;
} SlabNode;

typedef struct {
    uint8_t *raw_memory;
    SlabNode *free_list;
    size_t block_size;
    size_t total_blocks;
    size_t active_allocations;
} SlabPool;

SlabPool slab_create(size_t block_size, size_t count, size_t alignment) {
    SlabPool pool;
    if (block_size < sizeof(SlabNode)) {
        block_size = sizeof(SlabNode);
    }
    // Round block size up to alignment boundary (e.g., 64 bytes)
    if (alignment > 0) {
        block_size = (block_size + alignment - 1) & ~(alignment - 1);
    }

    pool.block_size = block_size;
    pool.total_blocks = count;
    pool.active_allocations = 0;

    size_t total_bytes = block_size * count;
    pool.raw_memory = (uint8_t *)aligned_alloc(alignment ? alignment : 64, total_bytes);
    assert(pool.raw_memory != NULL && "Slab memory allocation failed");

    // Initialize intrusive linked free list
    pool.free_list = (SlabNode *)pool.raw_memory;
    SlabNode *curr = pool.free_list;
    for (size_t i = 1; i < count; i++) {
        SlabNode *next = (SlabNode *)(pool.raw_memory + i * block_size);
        curr->next = next;
        curr = next;
    }
    curr->next = NULL;

    return pool;
}

void *slab_alloc(SlabPool *pool) {
    if (!pool->free_list) {
        return NULL; // Pool exhausted
    }
    SlabNode *node = pool->free_list;
    pool->free_list = node->next;
    pool->active_allocations++;
    return (void *)node;
}

void slab_free(SlabPool *pool, void *ptr) {
    if (!ptr) return;
    // Boundary sanity check
    assert((uint8_t *)ptr >= pool->raw_memory &&
           (uint8_t *)ptr < pool->raw_memory + (pool->block_size * pool->total_blocks));

    SlabNode *node = (SlabNode *)ptr;
    node->next = pool->free_list;
    pool->free_list = node;
    pool->active_allocations--;
}

void slab_destroy(SlabPool *pool) {
    free(pool->raw_memory);
    pool->raw_memory = NULL;
    pool->free_list = NULL;
    pool->active_allocations = 0;
    pool->total_blocks = 0;
}
```

---

### 2.4 Linux HugePages: Transparent HugePages (THP) vs. Explicit HugeTLB

#### The Translation Lookaside Buffer (TLB) Bottleneck
Modern CPU virtual memory uses hierarchical page tables. Under standard x86-64 4-level paging (PML4 $\rightarrow$ PDPT $\rightarrow$ PD $\rightarrow$ PT $\rightarrow$ Physical Page), resolving an address on a **TLB Miss** requires **4 serialized DRAM memory reads** (up to 250–350 clock cycles) before the target byte can even be queried.

* Standard page size: **4 KB** ($2^{12}$ bytes).
* L1 Data TLB capacity: Typically **64 entries**.
* With 4 KB pages, the entire L1 dTLB only covers: $64 \times 4\text{ KB} = \mathbf{256\text{ KB}}$ of working set!
* A continuous video ring buffer of 512 MB requires $131{,}072$ individual 4 KB page table entries, thrashing the TLB constantly.

#### 2 MB vs. 1 GB Pages
* **2 MB HugePages:** Bypasses the 4th level Page Table (PT). 1 TLB entry maps $512 \times 4\text{ KB} = 2\text{ MB}$. The same 64-entry dTLB now covers **128 MB** of working memory (a $512\times$ coverage boost).
* **1 GB Gigantic Pages:** Bypasses both PT and Page Directory (PD). 1 TLB entry maps 1 GB.

```
Standard 4KB Paging (4-Level Page Walk):
CR3 ──► PML4 (Level 4) ──► PDPT (Level 3) ──► PD (Level 2) ──► PT (Level 1) ──► 4KB Page

2MB HugePage (3-Level Page Walk - Bypasses PT):
CR3 ──► PML4 (Level 4) ──► PDPT (Level 3) ──► PD (Level 2) ───────────────────► 2MB Page
```

#### Transparent HugePages (THP) Latency Hazards
Linux Transparent HugePages (`/sys/kernel/mm/transparent_hugepage/enabled`) attempts to dynamically group 4 KB pages into 2 MB pages in the background via the `khugepaged` kernel thread.
* **The Hazard:** In real-time video or trading pipelines, `khugepaged` can trigger synchronous page compaction and direct reclamation when allocations occur.
* During compaction, the kernel locks `mmap_lock` (`mmap_sem`) for whole processes, generating multi-millisecond tail latency spikes.
* **Authoritative Production Recommendation:** Set Linux THP to `madvise`, never `always`. Use explicit HugeTLB or scoped `madvise(MADV_HUGEPAGE)` on pre-allocated ring buffers.

```bash
# Production Host Configuration
echo madvise | sudo tee /sys/kernel/mm/transparent_hugepage/enabled
echo madvise | sudo tee /sys/kernel/mm/transparent_hugepage/defrag

# Pre-allocate 512 pool HugePages of 2MB (1 GB total)
echo 512 | sudo tee /proc/sys/vm/nr_hugepages
```

#### Compilable Explicit HugeTLB Mapping in C
```c
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <sys/mman.h>
#include <unistd.h>
#include <assert.h>

#define HUGEPAGE_2MB (2ULL * 1024 * 1024)

void *allocate_hugepage_ring_buffer(size_t total_bytes) {
    // Round up to nearest 2MB multiple
    size_t aligned_len = (total_bytes + HUGEPAGE_2MB - 1) & ~(HUGEPAGE_2MB - 1);

    // Attempt explicit 2MB HugeTLB allocation via MAP_HUGETLB
    void *addr = mmap(NULL, aligned_len,
                      PROT_READ | PROT_WRITE,
                      MAP_PRIVATE | MAP_ANONYMOUS | MAP_HUGETLB | (21 << MAP_HUGE_SHIFT),
                      -1, 0);

    if (addr == MAP_FAILED) {
        // Fallback: allocate standard anonymous memory and instruct kernel via madvise
        perror("Explicit MAP_HUGETLB failed, falling back to madvise(MADV_HUGEPAGE)");
        addr = mmap(NULL, aligned_len,
                    PROT_READ | PROT_WRITE,
                    MAP_PRIVATE | MAP_ANONYMOUS,
                    -1, 0);
        assert(addr != MAP_FAILED && "Standard anonymous mmap failed");
        madvise(addr, aligned_len, MADV_HUGEPAGE);
    }

    return addr;
}
```

---

## 3. High-Throughput Disk & Storage I/O

Traditional UNIX I/O operates via `read(2)` and `write(2)` system calls, which involve redundant data copies and context switches across the user/kernel privilege boundary:

```
Standard read() + write() (4 Context Switches, 2 CPU Copies, 2 DMA Copies):
Disk DMA ──► OS Page Cache ──► User Space Buffer ──► Socket Buffer ──► NIC DMA
             (Kernel Memory)  [CPU Copy via read]   [CPU Copy via write]
```

### 3.1 Memory-Mapped Files (`mmap`)

Memory-mapped I/O binds an on-disk file directly to the process's virtual address space.
* **Mechanism:** Eliminates userspace buffer allocation. Reading and writing memory triggers page faults handled transparently by the Linux page cache.
* **Kernel Readahead Control via `madvise(2)`:**
  * `MADV_SEQUENTIAL`: Tells the kernel that pages will be read linearly. The kernel doubles its read-ahead window (up to 512 KB or 1 MB) and aggressively frees pages behind the read head.
  * `MADV_WILLNEED`: Triggers non-blocking, asynchronous pre-faulting of specified ranges into the page cache ahead of computation.
  * `MADV_DONTNEED`: Informs the kernel to drop dirty/clean pages immediately, preventing page cache pollution during high-speed video recording.

#### Safety: Protecting Against `SIGBUS`
If a mapped file is truncated by another process or underlying storage runs out of physical space, accessing the mapped pointer triggers a `SIGBUS` (Bus Error) signal, which terminates the process by default. Robust production implementations must capture `SIGBUS` via `sigaction` and `siglongjmp`.

#### Complete Compilable Memory-Mapped File Implementation
```c
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <signal.h>
#include <setjmp.h>
#include <assert.h>

static sigjmp_buf g_sigbus_env;

static void sigbus_signal_handler(int sig) {
    (void)sig;
    siglongjmp(g_sigbus_env, 1);
}

typedef struct {
    int fd;
    void *addr;
    size_t length;
} MappedFile;

MappedFile mmap_file_open(const char *path, size_t initial_size, bool write_access) {
    MappedFile mf = {-1, MAP_FAILED, 0};
    int open_flags = write_access ? (O_RDWR | O_CREAT) : O_RDONLY;
    int prot = PROT_READ | (write_access ? PROT_WRITE : 0);

    mf.fd = open(path, open_flags, 0644);
    if (mf.fd < 0) {
        perror("open failed");
        return mf;
    }

    struct stat st;
    if (fstat(mf.fd, &st) < 0) {
        perror("fstat failed");
        close(mf.fd);
        return mf;
    }

    size_t file_size = (size_t)st.st_size;
    if (write_access && file_size < initial_size) {
        if (ftruncate(mf.fd, (off_t)initial_size) < 0) {
            perror("ftruncate failed");
            close(mf.fd);
            return mf;
        }
        file_size = initial_size;
    }

    if (file_size == 0) {
        close(mf.fd);
        return mf;
    }

    mf.length = file_size;
    mf.addr = mmap(NULL, mf.length, prot, MAP_SHARED | MAP_POPULATE, mf.fd, 0);
    if (mf.addr == MAP_FAILED) {
        perror("mmap failed");
        close(mf.fd);
        return mf;
    }

    // Advise kernel to optimize for linear high-throughput streaming
    madvise(mf.addr, mf.length, MADV_SEQUENTIAL);

    return mf;
}

void mmap_file_close(MappedFile *mf) {
    if (mf->addr != MAP_FAILED) {
        msync(mf->addr, mf->length, MS_SYNC);
        munmap(mf->addr, mf->length);
        mf->addr = MAP_FAILED;
    }
    if (mf->fd >= 0) {
        close(mf->fd);
        mf->fd = -1;
    }
    mf->length = 0;
}
```

---

### 3.2 Zero-Copy Data Streaming: `sendfile(2)` and `splice(2)`

When routing high-bandwidth streams (e.g., recorded video MP4 files to network sockets or demuxer pipes), moving bytes through userspace memory buffers introduces severe bus saturation and CPU cache thrashing.

```
Zero-Copy splice() Pipeline (0 CPU Copies, Kernel Pipe Buffer Pointers):
Disk DMA ──► OS Page Cache ──► Kernel Pipe Buffer ──► Destination FD (Socket/File)
                               [Page Reference Transfer]
```

* **`sendfile(2)`:** Special-purpose syscall: moves data directly from a file descriptor to a network socket within kernel space.
* **`splice(2)`:** General zero-copy primitive: moves arbitrary data between a file/socket and a kernel pipe without copying bytes into userspace. It operates by manipulating kernel `pipe_buffer` page pointer tables.
* **`vmsplice(2)`:** Maps userspace memory buffers directly into a pipe without data copy.

#### Compilable C Zero-Copy Streaming Pipeline via `splice(2)`
```c
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <assert.h>

ssize_t zero_copy_splice_stream(int fd_in, int fd_out, size_t len) {
    int pipefd[2];
    if (pipe(pipefd) < 0) {
        perror("pipe allocation failed");
        return -1;
    }

    // Expand pipe buffer capacity up to kernel ceiling (e.g., 1MB)
    fcntl(pipefd[0], F_SETPIPE_SZ, 1048576);

    size_t total_transferred = 0;
    while (total_transferred < len) {
        size_t chunk = len - total_transferred;
        if (chunk > 65536) chunk = 65536;

        // Splice from source FD directly into the kernel pipe buffer
        ssize_t n_in = splice(fd_in, NULL, pipefd[1], NULL, chunk,
                              SPLICE_F_MOVE | SPLICE_F_MORE);
        if (n_in <= 0) break;

        // Splice from kernel pipe buffer into destination FD
        ssize_t n_out = splice(pipefd[0], NULL, fd_out, NULL, (size_t)n_in,
                               SPLICE_F_MOVE | SPLICE_F_MORE);
        if (n_out <= 0) break;

        total_transferred += (size_t)n_out;
    }

    close(pipefd[0]);
    close(pipefd[1]);
    return (ssize_t)total_transferred;
}
```

---

### 3.3 Next-Generation Asynchronous Kernel-Bypass I/O: `io_uring`

#### The Failure of Legacy Linux AIO (`libaio`)
Prior to Linux 5.1, `io_submit(2)` was the primary asynchronous storage API. However:
1. It blocked unpredictably on buffered files, metadata updates, extents allocation, and filesystem journal commits.
2. It did not support sockets, pipes, or character devices.
3. Every submission and completion required distinct system calls, generating context-switch overhead under high IOPS.

#### `io_uring` Architecture: Shared Ring Buffers
`io_uring` resolves these bottlenecks through a pair of circular ring buffers residing in **shared memory** between user space and the Linux kernel:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        User Space Application                          │
└──────────────┬──────────────────────────────────────────▲──────────────┘
               │ 1. Write SQE (Submission Queue Entry)     │ 4. Read CQE
               │    Update SQ Tail                        │    Update CQ Head
┌──────────────▼──────────────────────────────────────────┴──────────────┐
│                  Shared Ring Memory (mmap'd by App)                    │
│  ┌───────────────────────────────────┐  ┌───────────────────────────┐  │
│  │   Submission Queue (SQ) Ring      │  │  Completion Queue (CQ) Ring│  │
│  │   Head (Kernel) | Tail (User)     │  │  Head (User) | Tail (Kernel)│ │
│  └───────────────────────────────────┘  └───────────────────────────┘  │
└──────────────┬──────────────────────────────────────────▲──────────────┘
               │ io_uring_enter(to_submit)                │ Completions
               ▼ (or 0 syscalls with IORING_SETUP_SQPOLL) │
┌─────────────────────────────────────────────────────────┴──────────────┐
│                         Linux Kernel Core                              │
│            Asynchronous Storage & Socket Workqueues                    │
└────────────────────────────────────────────────────────────────────────┘
```

#### Key Microarchitectural Capabilities
1. **Zero-Syscall Operation (`IORING_SETUP_SQPOLL`):**
   * Spawns a dedicated kernel polling thread (`io_uring-sq`). The application writes SQEs and updates the tail pointer using atomic memory releases. The kernel thread picks up tasks automatically without requiring `enter()` syscalls.
2. **Pre-Registered Buffers (`IORING_REGISTER_BUFFERS`):**
   * In traditional I/O, every disk request forces the kernel to call `get_user_pages()`, walk the page table, pin physical pages in memory, map them into the kernel address space, and unpin them upon completion.
   * `io_uring_register_buffers` pins the buffers once during initialization. Subsequent reads/writes use registered buffer indexes, eliminating page table pinning overhead entirely.
3. **Fixed Files (`IORING_REGISTER_FILES`):**
   * Eliminates atomic reference counting (`fget()` and `fput()`) on file descriptors for every I/O transaction.

#### Complete Compilable Raw `io_uring` Implementation in C
This implementation directly interacts with the Linux kernel's ring buffers via `mmap`, operating with zero external library dependencies:

```c
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/syscall.h>
#include <linux/io_uring.h>
#include <stdatomic.h>
#include <assert.h>

#define QUEUE_DEPTH 32

struct app_io_sq_ring {
    unsigned *head;
    unsigned *tail;
    unsigned *ring_mask;
    unsigned *ring_entries;
    unsigned *flags;
    unsigned *array;
};

struct app_io_cq_ring {
    unsigned *head;
    unsigned *tail;
    unsigned *ring_mask;
    unsigned *ring_entries;
    struct io_uring_cqe *cqes;
};

struct submitter {
    int ring_fd;
    struct app_io_sq_ring sq_ring;
    struct io_uring_sqe *sqes;
    struct app_io_cq_ring cq_ring;
};

static inline int sys_io_uring_setup(unsigned entries, struct io_uring_params *p) {
    return (int)syscall(__NR_io_uring_setup, entries, p);
}

static inline int sys_io_uring_enter(int fd, unsigned to_submit, unsigned min_complete,
                                     unsigned flags, sigset_t *sig) {
    return (int)syscall(__NR_io_uring_enter, fd, to_submit, min_complete, flags, sig);
}

int init_io_uring(struct submitter *s) {
    struct io_uring_params p;
    memset(&p, 0, sizeof(p));

    s->ring_fd = sys_io_uring_setup(QUEUE_DEPTH, &p);
    if (s->ring_fd < 0) {
        perror("io_uring_setup");
        return -1;
    }

    // Calculate ring buffer mapping dimensions
    size_t sring_sz = p.sq_off.array + p.sq_entries * sizeof(unsigned);
    size_t cring_sz = p.cq_off.cqes + p.cq_entries * sizeof(struct io_uring_cqe);

    if (p.features & IORING_FEAT_SINGLE_MMAP) {
        if (cring_sz > sring_sz) sring_sz = cring_sz;
        cring_sz = sring_sz;
    }

    // Map Submission Queue Ring
    void *sq_ptr = mmap(0, sring_sz, PROT_READ | PROT_WRITE,
                        MAP_SHARED | MAP_POPULATE, s->ring_fd, IORING_OFF_SQ_RING);
    if (sq_ptr == MAP_FAILED) return -1;

    void *cq_ptr = sq_ptr;
    if (!(p.features & IORING_FEAT_SINGLE_MMAP)) {
        cq_ptr = mmap(0, cring_sz, PROT_READ | PROT_WRITE,
                      MAP_SHARED | MAP_POPULATE, s->ring_fd, IORING_OFF_CQ_RING);
        if (cq_ptr == MAP_FAILED) return -1;
    }

    // Initialize SQ Ring Pointers
    s->sq_ring.head = (unsigned *)((uint8_t *)sq_ptr + p.sq_off.head);
    s->sq_ring.tail = (unsigned *)((uint8_t *)sq_ptr + p.sq_off.tail);
    s->sq_ring.ring_mask = (unsigned *)((uint8_t *)sq_ptr + p.sq_off.ring_mask);
    s->sq_ring.ring_entries = (unsigned *)((uint8_t *)sq_ptr + p.sq_off.ring_entries);
    s->sq_ring.flags = (unsigned *)((uint8_t *)sq_ptr + p.sq_off.flags);
    s->sq_ring.array = (unsigned *)((uint8_t *)sq_ptr + p.sq_off.array);

    // Map Submission Queue Entries (SQEs) Array
    size_t sqes_sz = p.sq_entries * sizeof(struct io_uring_sqe);
    s->sqes = (struct io_uring_sqe *)mmap(0, sqes_sz, PROT_READ | PROT_WRITE,
                                          MAP_SHARED | MAP_POPULATE, s->ring_fd, IORING_OFF_SQES);
    if (s->sqes == MAP_FAILED) return -1;

    // Initialize CQ Ring Pointers
    s->cq_ring.head = (unsigned *)((uint8_t *)cq_ptr + p.cq_off.head);
    s->cq_ring.tail = (unsigned *)((uint8_t *)cq_ptr + p.cq_off.tail);
    s->cq_ring.ring_mask = (unsigned *)((uint8_t *)cq_ptr + p.cq_off.ring_mask);
    s->cq_ring.ring_entries = (unsigned *)((uint8_t *)cq_ptr + p.cq_off.ring_entries);
    s->cq_ring.cqes = (struct io_uring_cqe *)((uint8_t *)cq_ptr + p.cq_off.cqes);

    return 0;
}

int async_write_block(struct submitter *s, int fd, const void *buf, size_t len, off_t offset) {
    unsigned tail = *s->sq_ring.tail;
    unsigned index = tail & *s->sq_ring.ring_mask;
    struct io_uring_sqe *sqe = &s->sqes[index];

    memset(sqe, 0, sizeof(*sqe));
    sqe->opcode = IORING_OP_WRITE;
    sqe->fd = fd;
    sqe->addr = (uintptr_t)buf;
    sqe->len = len;
    sqe->off = offset;
    sqe->user_data = (uint64_t)offset;

    s->sq_ring.array[index] = index;
    // Release barrier ensures SQE content is visible before kernel reads tail
    atomic_store_explicit((_Atomic unsigned *)s->sq_ring.tail, tail + 1, memory_order_release);

    // Enter kernel to submit 1 entry and await 1 completion
    int ret = sys_io_uring_enter(s->ring_fd, 1, 1, IORING_ENTER_GETEVENTS, NULL);
    if (ret < 0) return -1;

    // Reap completion from CQ
    unsigned head = *s->cq_ring.head;
    if (head != *s->cq_ring.tail) {
        struct io_uring_cqe *cqe = &s->cq_ring.cqes[head & *s->cq_ring.ring_mask];
        int res = cqe->res;
        atomic_store_explicit((_Atomic unsigned *)s->cq_ring.head, head + 1, memory_order_release);
        return res; // Number of bytes written or -errno
    }

    return -1;
}
```

#### High-Performance Rust Implementation with `io-uring`
```rust
use io_uring::{opcode, IoUring};
use std::fs::OpenOptions;
use std::os::unix::fs::OpenOptionsExt;
use std::os::unix::io::AsRawFd;

pub fn async_flush_recording(path: &str, buffer: &[u8]) -> Result<usize, std::io::Error> {
    // Direct I/O bypasses the Linux page cache entirely for recording streams
    let file = OpenOptions::new()
        .write(true)
        .create(true)
        .custom_flags(libc::O_DIRECT)
        .open(path)?;

    let mut ring = IoUring::new(64)?;
    let write_op = opcode::Write::new(
        io_uring::types::Fd(file.as_raw_fd()),
        buffer.as_ptr(),
        buffer.len() as u32,
    )
    .offset(0)
    .build()
    .user_data(0x101);

    unsafe {
        ring.submission()
            .push(&write_op)
            .expect("Submission queue full");
    }

    // Submit request and block until at least 1 completion event is ready
    ring.submit_and_wait(1)?;

    let cqe = ring.completion().next().expect("Expected completion queue event");
    if cqe.result() < 0 {
        return Err(std::io::Error::from_raw_os_error(-cqe.result()));
    }

    Ok(cqe.result() as usize)
}
```

---

## 4. Hardware-Aware Telemetry & Profiling Cheatsheet

### 4.1 Cache & Bus Contention Diagnostics

```bash
# 1. Profile L1D and Last Level Cache (LLC) misses with IPC (Instructions Per Cycle)
perf stat -e cycles,instructions,cache-references,cache-misses,\
L1-dcache-loads,L1-dcache-load-misses,\
LLC-loads,LLC-load-misses \
./your_daemon

# 2. Detect False Sharing across CPU cores (Cache-to-Cache HitM snooping)
sudo perf c2c record -- ./your_daemon
sudo perf c2c report --stdio

# 3. Monitor Minor (Page Cache / Allocation) and Major (Disk Access) Page Faults
perf stat -e minor-faults,major-faults,page-faults ./your_daemon
```

### 4.2 NUMA Pinning & Memory Placement

```bash
# Inspect NUMA topology, memory distances, and CPU socket allocation
numactl --hardware

# Pin compute worker to Socket 0 cores and bind memory allocations to Socket 0 DRAM
numactl --cpunodebind=0 --membind=0 ./your_high_throughput_worker
```

### 4.3 Storage I/O Benchmark: `fio` Comparison Matrix

To objectively evaluate storage subsystems on NVMe / SATA drives, execute this `fio` benchmark suite:

```ini
# fio_storage_matrix.ini
[global]
ioengine=io_uring
direct=1
bs=64k
size=4G
runtime=30
time_based
filename=/dev/nvme0n1p2   # or test scratch file

[io_uring_async]
ioengine=io_uring
iodepth=32
hipri=1

[posix_mmap]
ioengine=mmap
bs=64k

[sync_traditional]
ioengine=sync
```
