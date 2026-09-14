# Hardware-Aware Concurrency, Threading & Asynchronous I/O

Modern compute pipelines must navigate physical CPU topologies, runtime interpreter locks, and operating system scheduling overhead. High-throughput computing requires choosing the correct concurrency model, enforcing thread-to-core affinity on hybrid processors, eliminating lock contention via lock-free atomic rings, and bypassing system call overhead through Linux `io_uring`.

---

## 1. Concurrency Models & Compute Paradigms

Selecting an inappropriate concurrency paradigm leads to severe pipeline degradation: CPU starvation, cache line thrashing, OS context-switching storms, or serialized locks.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CONCURRENCY TAXONOMY                             │
├─────────────────────┬───────────────────────────┬───────────────────────────┤
│ Model               │ Primary Architecture      │ Ideal Workload Domain     │
├─────────────────────┼───────────────────────────┼───────────────────────────┤
│ Work-Stealing Pool  │ Deque per worker thread;  │ Dynamic, irregular,       │
│ (Rayon, TBB, Go M:N)│ LIFO local, FIFO steal    │ recursive compute tasks   │
├─────────────────────┼───────────────────────────┼───────────────────────────┤
│ Thread-per-Core     │ Fixed pinned threads;     │ Saturated real-time data, │
│ (Seastar, DPDK)     │ Zero-sharing, SPSC queues │ media streaming, LMAX     │
├─────────────────────┼───────────────────────────┼───────────────────────────┤
│ Async Event Loop    │ Cooperative multiplexing; │ High-concurrency I/O,     │
│ (epoll, io_uring)   │ Single-threaded state mach│ 100k+ idle/slow sockets   │
└─────────────────────┴───────────────────────────┴───────────────────────────┘
```

### 1.1 Work-Stealing Pools vs. Thread-per-Core vs. Coroutines

#### Work-Stealing Architecture (Chase-Lev Deque)
* Each physical worker core maintains a double-ended queue (deque) of tasks.
* **Worker Thread (Owner):** Pushes and pops tasks from the **bottom (LIFO)**. Because the most recently created subtask is warm in the L1/L2 data cache, LIFO processing maximizes temporal cache locality.
* **Thief Thread (Idle Worker):** When a worker exhausts its local deque, it randomly selects a victim thread and steals from the **top (FIFO)**. Stealing from the top takes the coarsest, oldest parent task (highest compute volume), minimizing future steal operations and reducing lock contention with the owner.

#### Thread-per-Core (Shared-Nothing Architecture)
* Exactly $N$ threads pinned to $N$ physical CPU cores ($N = \text{physical cores}$, excluding hyperthreads).
* Threads never share mutable state across cores. No global mutexes, no dynamic memory allocation from a shared heap.
* Inter-core communication occurs exclusively via bounded lock-free Single-Producer Single-Consumer (SPSC) ring buffers.
* Eliminates OS scheduler migrations, cross-core cache invalidations, and lock convoys entirely.

#### Cooperative Coroutines & Async Event Loops
* Tasks are non-blocking state machines scheduled cooperatively on an event loop.
* Stackless coroutines consume only bytes of heap memory versus 2MB–8MB for an OS thread stack.
* **Critical Hazard:** Never execute CPU-bound compute tasks (SIMD loops, image filtering) on an event loop thread. Doing so blocks the loop, causing head-of-line blocking for thousands of concurrent connections.

---

## 2. Thread-to-Core Pinning on Hybrid Architectures

Modern processors feature heterogeneous core topologies:
* **Intel Hybrid (Alder Lake, Raptor Lake, Arrow Lake):** Performance Cores (P-cores, Golden Cove/Raptor Cove with SMT/Hyperthreading) and Efficient Cores (E-cores, Gracemont/Skymont without SMT).
* **ARM DynamIQ (big.LITTLE):** Cortex-X (Super-core), Cortex-A7xx (Big core), Cortex-A5xx (LITTLE core).

```
 Intel Hybrid Core Topology (Example: i7-14700K: 8 P-cores / 12 E-cores)
┌─────────────────────────────────────────────────────────────────────────────┐
│ P-Cores (Physical Cores 0-7, Logical 0-15 with Hyper-Threading)              │
│ - 32KB L1D, 2MB L2 per core, 36MB shared L3                                 │
│ - AVX2 / FMA / High IPC (Width 6)                                           │
│ Target: Real-time SIMD frame processing, inference, video decode            │
├─────────────────────────────────────────────────────────────────────────────┤
│ E-Cores (Physical Cores 8-19, No SMT)                                        │
│ - Shared 4MB L2 per 4-core cluster                                          │
│ - Width 4 Decode, narrower execution pipes                                  │
│ Target: Disk flushing, metrics, RTSP socket polling, housekeeping           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Topology Discovery via Linux `sysfs`

Linux exposes CPU core classifications under `/sys/devices/system/cpu/`:
```bash
# Check maximum frequency or capacity to distinguish P-cores from E-cores
cat /sys/devices/system/cpu/cpu*/cpu_capacity
cat /sys/devices/system/cpu/cpu*/cpufreq/cpuinfo_max_freq

# Intel hybrid core types (0x40 = Atom/E-core, 0x20 = Core/P-core):
cat /sys/devices/system/cpu/cpu*/topology/core_type
```

### 2.2 Pinning Implementation in C/C++ (`pthread_setaffinity_np`)

```c
#define _GNU_SOURCE
#include <pthread.h>
#include <sched.h>
#include <stdio.h>
#include <stdbool.h>

/**
 * Pins the calling thread to a specific physical CPU core.
 * Returns true on success, false on error.
 */
bool pin_thread_to_core(int core_id) {
    cpu_set_t cpuset;
    CPU_ZERO(&cpuset);
    CPU_SET(core_id, &cpuset);

    pthread_t current_thread = pthread_self();
    int result = pthread_setaffinity_np(current_thread, sizeof(cpu_set_t), &cpuset);
    if (result != 0) {
        perror("pthread_setaffinity_np failed");
        return false;
    }
    return true;
}
```

### 2.3 Pinning Implementation in Rust

```rust
use std::thread;

/// Pin current thread to designated CPU core ID using libc bindings
pub fn pin_current_thread_to_core(core_id: usize) -> Result<(), &'static str> {
    #[cfg(target_os = "linux")]
    unsafe {
        let mut cpuset: libc::cpu_set_t = std::mem::zeroed();
        libc::CPU_SET(core_id, &mut cpuset);
        
        let thread_id = libc::pthread_self();
        let res = libc::pthread_setaffinity_np(
            thread_id,
            std::mem::size_of::<libc::cpu_set_t>(),
            &cpuset,
        );
        if res == 0 {
            Ok(())
        } else {
            Err("Failed to set thread affinity")
        }
    }
    #[cfg(not(target_os = "linux"))]
    {
        let _ = core_id;
        Err("Affinity pinning unsupported on non-Linux platforms")
    }
}
```

### 2.4 Command-Line Pinning & OS Isolation
* **`taskset` Execution:** Pin compute pipeline to P-cores (e.g., cores 0–7):
  ```bash
  taskset -c 0-7 ./video_ai_engine
  ```
* **Kernel Real-Time Isolation (`isolcpus`):** Prevent Linux kernel scheduler from scheduling arbitrary processes on dedicated cores by passing boot parameters in `/etc/default/grub`:
  ```
  GRUB_CMDLINE_LINUX_DEFAULT="isolcpus=2-7 nohz_full=2-7 rcu_nocbs=2-7"
  ```
  Applications must manually assign threads to cores 2–7 via `pthread_setaffinity_np`.

---

## 3. Multiprocessing & Runtime Lock Bypass (e.g., Python GIL)

### 3.1 The GIL Bottleneck
In runtimes like CPython or Ruby (GVL), a global lock serializes bytecode evaluation across all OS threads. Multiple threads executing CPU-bound workloads (e.g., video analytics or matrix operations) suffer from:
1. **Thread Convulsion:** Cores constantly fight for the GIL, wasting CPU cycles on lock negotiation rather than computation.
2. **Cache Eviction:** Threads ping-pong across CPU cores, wiping L1/L2 caches.

### 3.2 High-Throughput Zero-Copy Architecture via POSIX Shared Memory
To achieve multi-core scaling in GIL-constrained runtimes, deploy a **Multi-Process Architecture** with **Zero-Copy Shared Memory**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        POSIX SHARED MEMORY PIPELINE                         │
│                                                                             │
│  [ Process 1: RTSP Ingestion (C/Rust) ]                                     │
│                     │                                                       │
│                     │ Writes raw NV12 / RGB frame directly                  │
│                     ▼                                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                /dev/shm/frame_pipeline_shm (RAM Buffer)               │  │
│  │  - Slot 0: [Header: Timestamp, ID | 1920x1080 Frame Data: 3.1 MB]    │  │
│  │  - Slot 1: [Header: Timestamp, ID | 1920x1080 Frame Data: 3.1 MB]    │  │
│  │  - Slot 2: [Header: Timestamp, ID | 1920x1080 Frame Data: 3.1 MB]    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                     ▲                                       ▲               │
│                     │ Zero-Copy Read (mmap)                 │ Zero-Copy Read│
│                     │                                       │               │
│  [ Process 2: Python/PyTorch Worker ]    [ Process 3: Motion Filter (C++) ] │
│  (Direct numpy array over shm buffer)    (SIMD L1 cache-resident scan)      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 POSIX Shared Memory Implementation (C++)

```cpp
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <unistd.h>
#include <cstring>
#include <iostream>

struct SharedFrameBuffer {
    uint32_t width;
    uint32_t height;
    uint64_t frame_index;
    uint8_t  pixel_data[1920 * 1080 * 3]; // 1080p RGB24
};

SharedFrameBuffer* create_shared_memory_segment(const char* shm_name) {
    // 1. Create or open POSIX shared memory object
    int fd = shm_open(shm_name, O_CREAT | O_RDWR, 0666);
    if (fd == -1) {
        perror("shm_open failed");
        return nullptr;
    }

    // 2. Set memory segment size
    size_t size = sizeof(SharedFrameBuffer);
    if (ftruncate(fd, size) == -1) {
        perror("ftruncate failed");
        close(fd);
        return nullptr;
    }

    // 3. Map memory into process virtual address space
    void* addr = mmap(nullptr, size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);
    close(fd); // File descriptor no longer needed after mmap

    if (addr == MAP_FAILED) {
        perror("mmap failed");
        return nullptr;
    }

    return reinterpret_cast<SharedFrameBuffer*>(addr);
}
```

### 3.4 Zero-Copy Consumer in Python via `multiprocessing.shared_memory`

```python
from multiprocessing import shared_memory
import numpy as np

# Connect directly to the existing POSIX shared memory segment
shm = shared_memory.SharedMemory(name="frame_pipeline_shm")

# Structure offset: 16 bytes header (uint32 width, uint32 height, uint64 frame_index)
HEADER_SIZE = 16
FRAME_SHAPE = (1080, 1920, 3)

# Zero-copy view into shared memory using NumPy
frame_array = np.ndarray(
    shape=FRAME_SHAPE,
    dtype=np.uint8,
    buffer=shm.buf,
    offset=HEADER_SIZE
)

# Process frame with zero memory allocation or serialization overhead
# Modifications directly reflect in shared memory
print(f"Processed frame mean pixel value: {frame_array.mean()}")

shm.close()
```

---

## 4. Asynchronous Event Loops & Kernel I/O Multiplexing

### 4.1 Architectural Evolution: `select` -> `epoll` -> `io_uring`

```
 1. select() / poll()          2. epoll / kqueue             3. Linux io_uring
┌─────────────────────┐       ┌─────────────────────┐       ┌─────────────────────┐
│ User space          │       │ User space          │       │ User & Kernel Space │
│ Pass array of 1000s │       │ epoll_ctl adds FD   │       │ Shared Ring Buffers │
│ of FDs to kernel    │       │ epoll_wait blocks   │       │ (Zero-copy rings)   │
└──────────┬──────────┘       └──────────┬──────────┘       └──────────┬──────────┘
           │ Syscall                     │ Syscall                     │ Zero Syscalls
           ▼                             ▼                             ▼ (SQPOLL mode)
┌─────────────────────┐       ┌─────────────────────┐       ┌─────────────────────┐
│ Kernel scans array  │       │ Kernel notifies via │       │ App submits SQE     │
│ linearly: O(N)      │       │ ready list: O(1)    │       │ Kernel consumes SQE │
│ High syscall cost   │       │ Syscall per batch   │       │ App reads CQE       │
└─────────────────────┘       └─────────────────────┘       └─────────────────────┘
```

* **`select`/`poll` ($O(N)$):** User space passes complete descriptor sets into kernel on every call. Kernel performs linear scan across all sockets.
* **`epoll` ($O(1)$ readiness):** Descriptors registered once via `epoll_ctl` in a kernel red-black tree. `epoll_wait` wakes only when ready. However, processing still requires two transitions per event: one `epoll_wait` syscall and one `read`/`write` syscall.
* **`io_uring` ($O(1)$ asynchronous completion):** Communicates via two memory-mapped lock-free ring buffers shared between user and kernel space:
  * **Submission Queue (SQ):** Application enqueues I/O requests (SQEs).
  * **Completion Queue (CQ):** Kernel posts completion results (CQEs).
  * **Zero Syscalls in SQPOLL Mode:** A dedicated kernel thread (`io_uring-sq`) continuously monitors the Submission Queue. The application submits batch I/O operations without triggering a single system call or context switch.

---

### 4.2 High-Throughput Batched File I/O with `liburing` (C)

```c
#include <liburing.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>

#define QUEUE_DEPTH 64
#define BUFFER_SIZE 4096

int main() {
    struct io_uring ring;
    int ret = io_uring_queue_init(QUEUE_DEPTH, &ring, 0);
    if (ret < 0) {
        fprintf(stderr, "Queue init failed: %s\n", strerror(-ret));
        return 1;
    }

    int fd = open("/tmp/benchmark_io.dat", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (fd < 0) {
        perror("open failed");
        return 1;
    }

    char write_buffer[BUFFER_SIZE];
    memset(write_buffer, 'A', BUFFER_SIZE);

    // 1. Acquire Submission Queue Entry (SQE)
    struct io_uring_sqe *sqe = io_uring_get_sqe(&ring);
    if (!sqe) {
        fprintf(stderr, "SQE full\n");
        return 1;
    }

    // 2. Prepare asynchronous vectored write
    io_uring_prep_write(sqe, fd, write_buffer, BUFFER_SIZE, 0);
    sqe->user_data = 1001; // Tag request

    // 3. Submit queue entry to kernel
    io_uring_submit(&ring);

    // 4. Wait for completion event (CQE)
    struct io_uring_cqe *cqe;
    ret = io_uring_wait_cqe(&ring, &cqe);
    if (ret < 0) {
        fprintf(stderr, "Wait CQE failed: %s\n", strerror(-ret));
        return 1;
    }

    if (cqe->res < 0) {
        fprintf(stderr, "Async write failed: %s\n", strerror(-cqe->res));
    } else {
        printf("Successfully wrote %d bytes asynchronously via io_uring!\n", cqe->res);
    }

    // 5. Mark completion consumed
    io_uring_cqe_seen(&ring, cqe);

    close(fd);
    io_uring_queue_exit(&ring);
    return 0;
}
```

---

## 5. Lock-Free Single-Producer Single-Consumer (SPSC) Ring Buffer

When passing data between two threads running on different cores (e.g., Frame Ingest Core $\to$ AI Inference Core), standard mutexes cause:
* Thread descheduling and context switches (~1.5–5 $\mu\text{s}$ penalty).
* Unbounded lock convoys under latency spikes.

A **Lock-Free SPSC Ring Buffer** operates with zero mutexes, zero syscalls, and bounded memory.

### 5.1 Memory Ordering Mechanics

* **`std::memory_order_relaxed`:** Atomicity guaranteed, but no synchronization or instruction ordering.
* **`std::memory_order_release`:** Prevents prior memory stores from being reordered *after* this store. Publishes written data to other cores.
* **`std::memory_order_acquire`:** Prevents subsequent memory loads from being reordered *before* this load. Ensures reader sees all writes made before the producer's release.
* **x86 vs. ARM Hardware Mapping:**
  * On x86 (TSO - Total Store Order), all loads have implicit acquire semantics and stores have release semantics. `acquire` and `release` compile to simple `mov` instructions with zero barrier overhead.
  * On ARM (Weakly Ordered), `acquire` compiles to `ldar` and `release` compiles to `stlr`.

### 5.2 Cache-Line Alignment & False-Sharing Prevention
The producer thread frequently writes `tail_` and reads `head_`. The consumer thread frequently writes `head_` and reads `tail_`.
If `head_` and `tail_` occupy the same 64-byte cache line, the cores repeatedly invalidate each other's L1 cache line (Cache Line Bouncing).
Each pointer must be isolated in its own 64-byte aligned boundary (`alignas(64)` / `#[repr(align(64))]`).

---

### 5.3 Complete C++20 Implementation

```cpp
#include <atomic>
#include <cstddef>
#include <optional>
#include <vector>

template <typename T, size_t Capacity>
class SpscRingBuffer {
    static_assert((Capacity & (Capacity - 1)) == 0, "Capacity must be a power of two");

public:
    SpscRingBuffer() : buffer_(Capacity) {}

    /**
     * Producer: Enqueue item.
     * Returns true on success, false if buffer is full.
     */
    bool push(const T& item) {
        const size_t current_tail = tail_.load(std::memory_order_relaxed);
        const size_t current_head = head_cache_;

        if ((current_tail - current_head) >= Capacity) {
            // Refresh head pointer cache from atomic consumer head
            head_cache_ = head_.load(std::memory_order_acquire);
            if ((current_tail - head_cache_) >= Capacity) {
                return false; // Buffer is completely full
            }
        }

        buffer_[current_tail & BufferMask] = item;
        // Release ordering publishes written item to consumer
        tail_.store(current_tail + 1, std::memory_order_release);
        return true;
    }

    /**
     * Consumer: Dequeue item.
     * Returns item on success, std::nullopt if buffer is empty.
     */
    std::optional<T> pop() {
        const size_t current_head = head_.load(std::memory_order_relaxed);
        const size_t current_tail = tail_cache_;

        if (current_head == current_tail) {
            // Refresh tail pointer cache from atomic producer tail
            tail_cache_ = tail_.load(std::memory_order_acquire);
            if (current_head == tail_cache_) {
                return std::nullopt; // Buffer is empty
            }
        }

        T item = buffer_[current_head & BufferMask];
        // Release ordering notifies producer that slot has been vacated
        head_.store(current_head + 1, std::memory_order_release);
        return item;
    }

private:
    static constexpr size_t BufferMask = Capacity - 1;
    std::vector<T> buffer_;

    // Producer cache line
    alignas(64) std::atomic<size_t> tail_{0};
    size_t head_cache_{0};

    // Consumer cache line (isolated by 64-byte boundary)
    alignas(64) std::atomic<size_t> head_{0};
    size_t tail_cache_{0};
};
```

---

### 5.4 Complete Production Rust Implementation

```rust
use std::sync::atomic::{AtomicUsize, Ordering};

const CACHE_LINE: usize = 64;

#[repr(align(64))]
struct CachePadded<T>(T);

/// Bounded Lock-Free Single-Producer Single-Consumer (SPSC) Ring Buffer.
/// Guaranteed zero false-sharing and wait-free execution.
pub struct SpscQueue<T, const CAP: usize> {
    buffer: Vec<Option<T>>,
    // Producer variables aligned to private 64-byte cache line
    tail: CachePadded<AtomicUsize>,
    head_cached: CachePadded<AtomicUsize>,
    // Consumer variables aligned to separate 64-byte cache line
    head: CachePadded<AtomicUsize>,
    tail_cached: CachePadded<AtomicUsize>,
}

unsafe impl<T: Send, const CAP: usize> Sync for SpscQueue<T, CAP> {}
unsafe impl<T: Send, const CAP: usize> Send for SpscQueue<T, CAP> {}

impl<T: Copy, const CAP: usize> SpscQueue<T, CAP> {
    pub fn new() -> Self {
        assert!(CAP > 0 && (CAP & (CAP - 1)) == 0, "Capacity must be power of two");
        let mut buf = Vec::with_capacity(CAP);
        for _ in 0..CAP {
            buf.push(None);
        }

        Self {
            buffer: buf,
            tail: CachePadded(AtomicUsize::new(0)),
            head_cached: CachePadded(AtomicUsize::new(0)),
            head: CachePadded(AtomicUsize::new(0)),
            tail_cached: CachePadded(AtomicUsize::new(0)),
        }
    }

    /// Enqueue an item (Producer thread only).
    #[inline]
    pub fn push(&mut self, item: T) -> Result<(), T> {
        let tail = self.tail.0.load(Ordering::Relaxed);
        let mut head = self.head_cached.0.load(Ordering::Relaxed);

        if tail.wrapping_sub(head) >= CAP {
            head = self.head.0.load(Ordering::Acquire);
            self.head_cached.0.store(head, Ordering::Relaxed);
            if tail.wrapping_sub(head) >= CAP {
                return Err(item); // Queue is full
            }
        }

        let idx = tail & (CAP - 1);
        self.buffer[idx] = Some(item);
        self.tail.0.store(tail.wrapping_add(1), Ordering::Release);
        Ok(())
    }

    /// Dequeue an item (Consumer thread only).
    #[inline]
    pub fn pop(&mut self) -> Option<T> {
        let head = self.head.0.load(Ordering::Relaxed);
        let mut tail = self.tail_cached.0.load(Ordering::Relaxed);

        if head == tail {
            tail = self.tail.0.load(Ordering::Acquire);
            self.tail_cached.0.store(tail, Ordering::Relaxed);
            if head == tail {
                return None; // Queue is empty
            }
        }

        let idx = head & (CAP - 1);
        let item = self.buffer[idx].take();
        self.head.0.store(head.wrapping_add(1), Ordering::Release);
        item
    }
}
```

---

## 6. Architectural Checklist for Concurrency Engineering

1. [ ] **Eliminate False Sharing:** Verify every thread-modified counter or queue index is separated by `alignas(64)` or `#[repr(align(64))]`.
2. [ ] **Acquire-Release Over Sequential Consistency:** Ban `std::memory_order_seq_cst` in hot ring buffers. Use `Release` on store, `Acquire` on load.
3. [ ] **Pin Critical Workers to Physical Cores:** Avoid OS context switches and L1/L2 thrashing by binding compute-heavy threads with `pthread_setaffinity_np`.
4. [ ] **Partition Heterogeneous Cores:** Assign high-throughput SIMD/inference pipelines to P-cores; delegate socket polling, logging, and metrics to E-cores.
5. [ ] **Zero-Copy IPC for Interpreted Runtimes:** Bypass runtime interpreter locks (e.g. Python GIL) by streaming raw frames across processes using POSIX shared memory (`/dev/shm`).
6. [ ] **Batch Kernel I/O with `io_uring`:** Replace high-frequency read/write syscall chains with memory-mapped submission/completion rings.
