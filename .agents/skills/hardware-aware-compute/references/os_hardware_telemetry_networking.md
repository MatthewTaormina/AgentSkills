# OS Hardware Governance, Kernel Telemetry & High-Throughput Networking

This reference provides an authoritative, hardware-grounded operational guide for kernel instrumentation, PMU telemetry, CPU/memory topology management, and low-latency, line-rate network engineering on Linux and Darwin (macOS) platforms.

---

## 1. Hardware & System Profiling Tools

Optimizing compute systems requires empirical observation before code modification. System performance is governed by microarchitectural execution bottlenecks (branch mispredictions, cache misses, memory stalls) and kernel-space scheduling anomalies (off-CPU wait states, runqueue latency, page faults).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          SYSTEM OBSERVABILITY STACK                         │
├─────────────────────────────────────────────────────────────────────────────┤
│ User Space       │ Application Stacks, JIT Runtimes, SIMD Kernels           │
│                  │ Instrumentation: DWARF Stack Unwinding, USDT Probes      │
├──────────────────┼──────────────────────────────────────────────────────────┤
│ Kernel Space     │ Linux perf / BPF Virtual Machine / Darwin DTrace         │
│                  │ Tracepoints, kprobes, ftrace, perf_event_open            │
├──────────────────┼──────────────────────────────────────────────────────────┤
│ Microarch / HW   │ Performance Monitoring Unit (PMU): MSRs, PEBS, IBS       │
│                  │ Architectural Performance Counters (Cycles, LLC Misses)  │
└──────────────────┴──────────────────────────────────────────────────────────┘
```

### 1.1 Linux `perf` Subsystem & PMU Performance Counters

The Linux `perf` subsystem interfaces directly with the hardware **Performance Monitoring Unit (PMU)** embedded within modern CPU execution cores. Hardware counters are specialized Model-Specific Registers (MSRs) that increment when specific microarchitectural events occur inside the processor execution pipeline.

#### Hardware PMU Architecture & Mechanics
* **Fixed Counters:** Dedicated MSRs that track invariant events without taking up programmable slots: `CPU_CLK_UNHALTED.THREAD`, `CPU_CLK_UNHALTED.REF_TSC`, and `INST_RETIRED.ANY`.
* **General-Purpose Programmable Counters:** 4 to 8 counters per core (e.g., Intel Performance Event Select Registers `IA32_PERFEVTSELx` and Event Counters `IA32_PMCx`) configured via raw event masks to monitor specific microarchitectural states.
* **Precise Event-Based Sampling (PEBS / IBS):** On Intel (PEBS) and AMD (Instruction-Based Sampling / IBS), the CPU saves architectural register state (EIP/RIP, registers, memory access addresses) into a dedicated memory buffer when a counter overflows, eliminating the "instruction skid" inherent in standard interrupt-based sampling.

#### Essential PMU Events & Microarchitectural Metric Formulas

| Event Metric | `perf` Event Identifier | Physical Meaning & Diagnostic Interpretation | Healthy Target |
| :--- | :--- | :--- | :--- |
| **Instructions Per Cycle (IPC)** | `instructions`, `cycles` | Efficiency of superscalar execution. $\text{IPC} = \frac{\text{instructions}}{\text{cycles}}$. $\text{IPC} < 1.0$ indicates execution pipeline stalls (memory bound or frontend starvation). $\text{IPC} > 2.5$ demonstrates high instruction-level parallelism. | $> 1.5 - 3.0$ |
| **Last-Level Cache Miss Rate** | `cache-misses`, `cache-references` | Percentage of LLC (L3) queries that miss and fetch from main DRAM. Miss rate $> 20\%$ indicates severe memory-bound stalls. | $< 10\%$ |
| **Branch Mispredict Rate** | `branch-misses`, `branch-instructions` | Ratio of speculative branch flushes. Mispredict penalty: 15–20 clock cycles wasted clearing and reloading pipeline stages. | $< 2.0\%$ |
| **L1D Cache Miss Rate** | `L1-dcache-load-misses`, `L1-dcache-loads` | Ratio of L1 Data cache misses fetching from L2/L3. High rates indicate non-contiguous striding or poor spatial/temporal locality. | $< 5.0\%$ |
| **Data TLB Miss Rate** | `dTLB-load-misses`, `dTLB-loads` | Frequency of page directory walks. High values mandate Transparent HugePages (2MB) or explicit static HugePages. | $< 0.5\%$ |

#### Concrete `perf stat` Invocations

Run detailed hardware counters across all CPU cores for a specific command:

```bash
# Capture full L1, LLC, branch, and TLB metrics with 5 repeat runs
perf stat -r 5 -e \
  cycles,instructions,\
  cache-references,cache-misses,\
  branch-instructions,branch-misses,\
  L1-dcache-loads,L1-dcache-load-misses,\
  dTLB-loads,dTLB-load-misses \
  ./high_throughput_worker --threads=16
```

Profile an already-running process and its threads system-wide:

```bash
# Monitor PID 48291 across all CPU cores for 10 seconds with sub-second interval reporting
perf stat -p 48291 -I 1000 -e \
  cycles,instructions,cache-misses,branch-misses
```

#### On-CPU Profiling and Flame Graph Generation

To identify hot CPU code paths without significant profiling distortion:

```bash
# 1. Record call graphs at 997 Hz (prime number avoids aliasing with periodic timers)
# Using DWARF unwinding for binaries compiled without frame pointers
perf record -F 997 -p <PID> -g --call-graph dwarf,4096 -- sleep 30

# Alternatively, using Frame Pointer unwinding (requires -fno-omit-frame-pointer, much lower overhead)
perf record -F 997 -p <PID> -g --call-graph fp -- sleep 30

# 2. Extract trace text
perf script -i perf.data > out.perf

# 3. Collapse stacks and render interactive SVG Flame Graph
stackcollapse-perf.pl out.perf > out.folded
flamegraph.pl out.folded > cpu_flamegraph.svg
```

#### Topdown Microarchitecture Analysis Method (TMAM)

TMAM categorizes execution pipeline slot allocation on modern x86 out-of-order processors into four fundamental bottlenecks:

```
                              ┌───────────────────────────┐
                              │      Pipeline Slots       │
                              └─────────────┬─────────────┘
                     ┌──────────────────────┴──────────────────────┐
            Issued uOps (Allocated)                       Unallocated Slots
          ┌──────────┴──────────┐                       ┌──────────┴──────────┐
          ▼                     ▼                       ▼                     ▼
     [Retiring]          [Bad Speculation]      [Frontend Bound]       [Backend Bound]
          │                     │                       │                     │
   Useful Work           Branch Mispredicts      Fetch Latency/BW       Core vs Memory
```

1. **Retiring ($> 40\%$ ideal):** Micro-ops that completed successfully and committed their results.
2. **Bad Speculation ($< 10\%$ ideal):** Slots wasted executing speculative micro-ops that were discarded due to branch mispredictions.
3. **Frontend Bound ($< 15\%$ ideal):** Execution units starved because the instruction fetcher and decoder could not supply micro-ops (ICache misses, ITLB misses, branch decoder bottlenecks).
4. **Backend Bound ($< 20\%$ ideal):** Micro-ops stalled waiting for hardware resources. Subdivided into:
   * **Memory Bound:** Stalls waiting for L1/L2/L3 misses, DRAM latency, or store buffer drain.
   * **Core Bound:** Stalls waiting for execution port contention, divider latency, or vector unit saturation.

To run Level-1 and Level-2 Topdown analysis directly via `perf`:

```bash
# Level-1 Topdown breakdown on modern Intel/AMD processors
perf stat --topdown -a -C 0-7 -- sleep 10

# Raw hardware counter topdown collection when --topdown flag is unsupported
perf stat -e cpu/event=0x00,umask=0x81,name=slots/,\
cpu/event=0x00,umask=0x82,name=slots_retired/,\
cpu/event=0x9c,umask=0x01,name=idq_uops_not_delivered.core/,\
cpu/event=0x0e,umask=0x01,name=uops_issued.any/ \
./compute_pipeline
```

---

### 1.2 Kernel Tracing: eBPF, BCC & `bpftrace`

While `perf` profiles code paths executing instructions on CPU cores, **eBPF (Extended Berkeley Packet Filter)** enables safe, sandboxed execution of in-kernel bytecode at tracepoints, kprobes, and uprobes. This enables measuring **off-CPU latency**, scheduler queue delays, file system stalls, and network stack drops without mutating kernel source or loading unsafe kernel modules.

#### 1.2.1 Tracing Off-CPU Latency

Compute pipelines frequently stall due to lock contention (mutexes, futexes), system calls, paging, or synchronous socket I/O. Standard sampling profilers miss these stalls because the thread is descheduled (`TASK_INTERRUPTIBLE` or `TASK_UNINTERRUPTIBLE`).

The following `bpftrace` script tracks off-CPU time by recording the exact microsecond timestamp when a thread is switched out and computing the elapsed time when it is switched back in:

```awk
#!/usr/bin/env bpftrace
/* offcpu_trace.bt: Measure off-CPU blocking time with kernel stack traces */

#include <linux/sched.h>

BEGIN
{
  printf("Tracing off-CPU time for process matching name '%s'... Hit Ctrl-C to end.\n", str($1));
}

tracepoint:sched:sched_switch
{
  // Record time when target thread leaves the CPU
  if (args->prev_comm == str($1)) {
    @start_offcpu[args->prev_pid] = nsecs;
    @prev_stack[args->prev_pid] = kstack;
  }

  // Calculate duration when target thread returns to the CPU
  if (args->next_comm == str($1)) {
    $start = @start_offcpu[args->next_pid];
    if ($start > 0) {
      $duration_us = (nsecs - $start) / 1000;
      
      // Filter out negligible switches (< 100 microseconds)
      if ($duration_us > 100) {
        @offcpu_latency_us[@prev_stack[args->next_pid]] = hist($duration_us);
        @total_offcpu_time_us[args->next_comm] = sum($duration_us);
      }
      delete(@start_offcpu[args->next_pid]);
      delete(@prev_stack[args->next_pid]);
    }
  }
}

END
{
  clear(@start_offcpu);
  clear(@prev_stack);
}
```

Run with:
```bash
sudo bpftrace offcpu_trace.bt "video_worker"
```

#### 1.2.2 Scheduler Wakeup & Runqueue Latency

Runqueue latency measures the delay between a thread becoming runnable (e.g., when a network packet arrives or a mutex is unlocked) and the Linux Completely Fair Scheduler (CFS) or Earliest Eligible Virtual Deadline First (EEVDF) scheduler dispatching it onto a physical CPU core. High runqueue latency indicates CPU saturation, thread oversubscription, or core contention.

```awk
#!/usr/bin/env bpftrace
/* runqlat.bt: Measure scheduler runqueue latency (wakeup to execution) */

tracepoint:sched:sched_wakeup,
tracepoint:sched:sched_wakeup_new
{
  @enqueued_at[args->pid] = nsecs;
}

tracepoint:sched:sched_switch
{
  $start = @enqueued_at[args->next_pid];
  if ($start > 0) {
    $latency_us = (nsecs - $start) / 1000;
    @runqueue_latency_us = hist($latency_us);
    
    // Alert on severe scheduler delay (> 5ms)
    if ($latency_us > 5000) {
      printf("WARN: Scheduler stall %d us for PID %d (%s)\n", 
             $latency_us, args->next_pid, args->next_comm);
    }
    delete(@enqueued_at[args->next_pid]);
  }
}

interval:s:5
{
  print(@runqueue_latency_us);
}
```

#### 1.2.3 Disk Block I/O Latency Histograms

I/O operations block processes when disk controllers or NVMe queues saturate. Tracing at the block layer captures the true end-to-end hardware latency from device request dispatch to interrupt completion:

```awk
#!/usr/bin/env bpftrace
/* biolatency.bt: Trace block I/O latency distribution */

tracepoint:block:block_rq_issue
{
  @start_io[args->dev, args->sector] = nsecs;
}

tracepoint:block:block_rq_complete
{
  $start = @start_io[args->dev, args->sector];
  if ($start > 0) {
    $duration_us = (nsecs - $start) / 1000;
    @block_io_lat_us[args->rwbs] = hist($duration_us);
    delete(@start_io[args->dev, args->sector]);
  }
}

END
{
  clear(@start_io);
}
```

#### 1.2.4 Socket Buffer Exhaustion & Network Drops

When network traffic bursts exceed the kernel's receive buffer allocation, packets are dropped inside `tcp_v4_rcv` or `sock_queue_rcv_skb` without sending TCP reset notifications. This `bpftrace` script tracks packet drops and records the exact kernel function triggering the drop:

```awk
#!/usr/bin/env bpftrace
/* tcp_drops.bt: Trace TCP drops and kernel drop reasons */

#include <net/sock.h>
#include <linux/skbuff.h>

kprobe:tcp_drop
{
  $sk = (struct sock *)arg0;
  $skb = (struct sk_buff *)arg1;

  $daddr = ntop($sk->__sk_common.skc_daddr);
  $saddr = ntop($sk->__sk_common.skc_rcv_saddr);
  $dport = $sk->__sk_common.skc_dport;
  $sport = $sk->__sk_common.skc_num;

  printf("TCP DROP: %s:%d -> %s:%d | Reason: %d\n",
         $saddr, $sport, $daddr, $dport, arg2);
  @drop_stack[kstack] = count();
}

tracepoint:skb:kfree_skb
{
  @skb_free_locations[kstack] = count();
}
```

---

### 1.3 macOS Performance Telemetry: Instruments & DTrace

macOS operates on the XNU kernel (Mach core, BSD layer, and I/O Kit). While Linux uses `perf` and eBPF, Darwin profiling relies on Apple's `xctrace` command-line utility and `dtrace`.

#### Headless Profiling via `xctrace`

`xctrace` enables headless profiling in automated scripts, CI pipelines, and remote SSH terminal sessions:

```bash
# List available tracing templates
xcrun xctrace list templates

# 1. Capture CPU Time Profiler trace with call stacks for 20 seconds
xcrun xctrace record \
  --template 'Time Profiler' \
  --attach <PID> \
  --time-limit 20s \
  --output ./profiles/time_profile.trace

# 2. Capture dynamic memory allocations and heap growth
xcrun xctrace record \
  --template 'Allocations' \
  --launch -- ./bin/video_transcoder --input stream.raw \
  --output ./profiles/transcoder_allocs.trace

# 3. Capture Metal System Trace (GPU dispatch, compute shader execution, command queues)
xcrun xctrace record \
  --template 'Metal System Trace' \
  --attach <PID> \
  --time-limit 10s \
  --output ./profiles/metal_trace.trace

# Export trace data to XML for headless machine parsing
xcrun xctrace export \
  --input ./profiles/time_profile.trace \
  --xpath '/trace-toc/nodes/node' \
  --output ./profiles/time_profile_summary.xml
```

#### Darwin DTrace Telemetry

DTrace provides dynamic instrumentation of user-space and kernel probes across Darwin.

> [!NOTE]
> On modern macOS versions, DTrace kernel tracing requires configuring System Integrity Protection (SIP) via Recovery Mode (`csrutil enable --without dtrace`). User-space process tracing (`pid$target:::`) works without modifying SIP for binaries signed with developer debugging entitlements.

```bash
# Trace system call execution count and total elapsed nanoseconds by process
sudo dtrace -n '
sysinfo:::syscall-entry
{
  @calls[execname] = count();
}
syscall:::entry
{
  self->ts = timestamp;
}
syscall:::return
/self->ts/
{
  @latency[execname, probefunc] = quantize(timestamp - self->ts);
  self->ts = 0;
}'
```

Off-CPU thread scheduling trace on macOS:

```bash
# Measure off-CPU sleep time across Mach scheduling threads
sudo dtrace -n '
sched:::off-cpu
/execname == "smart_hub"/
{
  self->start = timestamp;
}

sched:::on-cpu
/self->start/
{
  @offcpu_ns[ustack(8)] = quantize(timestamp - self->start);
  self->start = 0;
}'
```

---

## 2. OS Kernel Hardware Governance & Compute Topology

High-throughput systems must prevent kernel scheduler heuristics from introducing jitter, migrating threads across physical cache boundaries, or throttling CPU execution frequencies.

### 2.1 CPU Frequency Governors & Energy Performance Preferences (EPP)

The Linux kernel CPUFreq infrastructure regulates dynamic clock frequencies and voltage scaling (DVFS) across hardware cores.

#### Governors Compared

| Governor | Operational Mechanics | Ramp-Up Latency | Compute Use Case |
| :--- | :--- | :--- | :--- |
| **`performance`** | Statically locks CPU core clocks to the maximum non-turbo or maximum turbo frequency. Disables power-saving downclocking. | **0 ms** | Required for real-time video decoding, line-rate networking, and SIMD inference pipelines. |
| **`schedutil`** | Integrated directly into CFS/EEVDF scheduler. Scales CPU frequency dynamically based on Per-Entity Load Tracking (PELT). | **5 ms – 25 ms** | General workloads. Unsuitable for bursty, latency-sensitive pipelines due to frequency transition lag. |
| **`powersave`** | Statically forces CPU to its lowest available P-State frequency. | **N/A** | Battery operation only; creates severe compute bottlenecks on server workloads. |
| **`ondemand`** | Legacy timer-driven governor. Polls CPU load at fixed periodic intervals. | **10 ms – 50 ms** | Deprecated; causes noticeable tail latency jitter. |

#### Energy Performance Preference (EPP)
Modern Intel (`intel_pstate`) and AMD (`amd_pstate` / `amd_pstate_epp`) drivers utilize Hardware-Controlled P-States (HWP). In HWP mode, the governor works in conjunction with the Energy Performance Preference (`energy_perf_preference`):

* `performance`: Bias hardware strictly toward maximum execution throughput and minimum latency.
* `balance_performance`: Bias slightly toward responsiveness while allowing deep C-states at idle.
* `balance_power`: Standard desktop/laptop default.
* `power`: Maximum energy conservation.

#### Shell Configuration & Persistent Systemd Units

Set all CPU cores to maximum performance and disable energy throttle:

```bash
# Configure CPU frequency governor across all logical cores
for cpu in /sys/devices/system/cpu/cpu*/cpufreq; do
  echo "performance" | sudo tee "$cpu/scaling_governor"
done

# Configure Intel / AMD EPP to performance
for epp in /sys/devices/system/cpu/cpu*/cpufreq/energy_perf_preference; do
  if [ -f "$epp" ]; then
    echo "performance" | sudo tee "$epp"
  fi
done

# Disable CPU Turbo boost disable flag (enables max turbo clocking)
if [ -f /sys/devices/system/cpu/intel_pstate/no_turbo ]; then
  echo 0 | sudo tee /sys/devices/system/cpu/intel_pstate/no_turbo
fi
```

Create a persistent systemd service (`/etc/systemd/system/cpu-governor-performance.service`):

```ini
[Unit]
Description=Enforce CPU Performance Governor and EPP Performance Mode
After=sysinit.target local-fs.target
DefaultDependencies=no

[Service]
Type=oneshot
ExecStart=/bin/sh -c '\
  for g in /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor; do echo performance > "$g"; done; \
  for e in /sys/devices/system/cpu/cpu*/cpufreq/energy_perf_preference; do echo performance > "$e" 2>/dev/null || true; done'
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

---

### 2.2 Core Affinity Pinning: `taskset` & `sched_setaffinity`

By default, the OS scheduler moves threads across physical cores to balance thermal loads and total core utilization. This thread migration incurs severe penalties:
1. **L1/L2 Cache Eviction:** Moving a thread to another core flushes up to 2MB of warm cache data.
2. **SMT / Hyper-Threading Resource Contention:** Co-locating two compute-bound execution threads on sibling hardware threads of the same physical core degrades SIMD and FMA execution units by 30%–45%.
3. **Cross-CCD / Cross-Cluster Penalty:** On AMD Zen (multi-CCD) or Intel Hybrid (P-core vs E-core) processors, cross-cluster migration requires moving data across the interconnect bus, causing instruction execution pipeline stalls.

#### Linux Core Isolation Boot Parameters
To dedicate CPU cores exclusively to high-throughput compute tasks, isolate them from the OS scheduler at kernel boot time in `/etc/default/grub`:

```bash
# GRUB_CMDLINE_LINUX_DEFAULT additions:
# isolcpus: Remove cores 4-15 from general OS task scheduling
# nohz_full: Stop scheduler clock tick interrupts on idle/single-process isolated cores
# rcu_nocbs: Offload RCU callbacks away from isolated cores to cores 0-3
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash isolcpus=4-15 nohz_full=4-15 rcu_nocbs=4-15 processor.max_cstate=1 intel_idle.max_cstate=1"
```

Update grub and reboot:
```bash
sudo update-grub
```

#### CLI Pinning with `taskset`

```bash
# Launch process pinned strictly to physical cores 4, 6, 8, 10
taskset -c 4,6,8,10 ./high_throughput_pipeline --channels=4

# Repin all threads of an already-running process (PID 5021) to cores 8-15
taskset -a -cp 8-15 5021

# Query current affinity mask of PID 5021
taskset -p 5021
```

#### Programmatic Thread Pinning in C/C++ (`sched_setaffinity`)

```c
#define _GNU_SOURCE
#include <sched.h>
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

/**
 * Pins the calling thread to a specific logical CPU ID and
 * sets real-time SCHED_FIFO scheduling priority.
 */
int pin_thread_to_core(int core_id, int realtime_prio) {
    cpu_set_t cpuset;
    CPU_ZERO(&cpuset);
    CPU_SET(core_id, &cpuset);

    pthread_t current_thread = pthread_self();

    // 1. Set thread affinity mask
    int rc = pthread_setaffinity_np(current_thread, sizeof(cpu_set_t), &cpuset);
    if (rc != 0) {
        perror("pthread_setaffinity_np failed");
        return rc;
    }

    // 2. Configure real-time FIFO scheduling policy (if privileged and requested)
    if (realtime_prio > 0) {
        struct sched_param param;
        param.sched_priority = realtime_prio; // 1 (lowest RT) to 99 (highest RT)
        rc = pthread_setschedparam(current_thread, SCHED_FIFO, &param);
        if (rc != 0) {
            perror("pthread_setschedparam (SCHED_FIFO) failed - verify CAP_SYS_NICE");
            return rc;
        }
    }

    return 0;
}
```

---

### 2.3 NUMA Node Placement & Memory Interleaving

On multi-socket servers and modern multi-die processors (AMD EPYC, AMD Threadripper, Intel Xeon Scalable), memory is distributed across **Non-Uniform Memory Access (NUMA)** nodes. Each NUMA node consists of a group of physical CPU cores directly coupled to an on-board memory controller and local DRAM channels.

```
┌─────────────────────────────────┐               ┌─────────────────────────────────┐
│           NUMA NODE 0           │               │           NUMA NODE 1           │
│  ┌───────────────────────────┐  │               │  ┌───────────────────────────┐  │
│  │   CPU Cores 0 - 31        │  │               │  │   CPU Cores 32 - 63       │  │
│  └─────────────┬─────────────┘  │               │  └─────────────┬─────────────┘  │
│                │ Local Bus      │               │                │ Local Bus      │
│  ┌─────────────▼─────────────┐  │   Cross-Node  │  ┌─────────────▼─────────────┐  │
│  │   Local DDR5 DRAM         │◄─┼──────────────┼─►│   Local DDR5 DRAM         │  │
│  │ Latency: 70ns | BW: 100%  │  │ Interconnect  │  │ Latency: 70ns | BW: 100%  │  │
│  └───────────────────────────┘  │ (UPI / IF)    │  └───────────────────────────┘  │
└─────────────────────────────────┘ 140ns | 50% BW└─────────────────────────────────┘
```

#### NUMA Access Penalty Metrics

| Access Path | Typical Latency (DDR5) | Memory Bandwidth Relative to Local | Operational Impact |
| :--- | :--- | :--- | :--- |
| **Local Node Access** | **65 ns – 80 ns** | **100%** | Full memory controller throughput. Zero interconnect hops. |
| **Remote Node Access (1 Hop)** | **130 ns – 180 ns** | **45% – 60%** | Traverses UPI / Infinity Fabric. Saturates interconnect, limits memory-bound compute. |

#### Topology Discovery

```bash
# View complete NUMA hardware configuration, node distances, and core distributions
numactl --hardware

# View NUMA allocation statistics and remote cross-node miss counts
numastat -c

# Show mapping of logical CPUs to Sockets, Nodes, and Caches
lscpu -e=NODE,CPU,CORE,SOCKET,L1D:L1I:L2:L3
```

Interpreting `numastat` telemetry:
* `numa_hit`: Allocations successfully placed on the thread's local node.
* `numa_miss`: Allocations intended for another node that fell back to this node.
* `numa_foreign`: Allocations intended for this node that fell back to a remote node due to local memory exhaustion.

#### Node Binding vs. Memory Interleaving

```bash
# 1. Strict Node Confinement (Ideal for independent compute workers)
# Restricts process execution to Cores on Node 0 and allocates memory strictly from Node 0
numactl --cpunodebind=0 --membind=0 ./worker_instance_0

# 2. Memory Interleaving (Ideal for large shared memory buffers and network gateways)
# Allocates physical pages round-robin across all NUMA nodes (0, 1, 2, 3)
# Maximizes combined aggregate memory bus bandwidth across all memory controllers
numactl --interleave=all ./network_streaming_gateway
```

#### Programmatic NUMA Allocation in C (`libnuma`)

```c
#include <numa.h>
#include <numaif.h>
#include <stdio.h>
#include <stdlib.h>

void* allocate_numa_local_buffer(size_t size_bytes, int target_node) {
    if (numa_available() < 0) {
        // Fallback for non-NUMA platforms
        return malloc(size_bytes);
    }

    // Allocate memory bound strictly to the local physical memory of target_node
    void *buf = numa_alloc_onnode(size_bytes, target_node);
    if (!buf) {
        perror("numa_alloc_onnode failed");
        return NULL;
    }
    return buf;
}

void free_numa_buffer(void *buf, size_t size_bytes) {
    if (numa_available() < 0) {
        free(buf);
    } else {
        numa_free(buf, size_bytes);
    }
}
```

> [!IMPORTANT]
> **Disable Automatic NUMA Balancing on Latency-Sensitive Nodes:**
> The Linux kernel includes an automated NUMA balancer (`kernel.numa_balancing = 1`) that periodically unmaps memory pages to induce soft page faults, checking if pages should migrate to another node. This background scanning introduces major tail-latency spikes in real-time pipelines. Disable it:
> ```bash
> sudo sysctl -w kernel.numa_balancing=0
> ```

---

### 2.4 Kernel Sysctl Parameters for High-Throughput Compute Nodes

Default Linux kernel settings are tuned for general-purpose desktop and low-volume server workloads. High-throughput compute and ingestion nodes require explicit tuning for memory writebacks, swap behavior, and file descriptors.

#### Memory Writeback & Paging Parameters

When processes write large streams of data (e.g., continuous CCTV video recording, model checkpoint writes), dirty pages accumulate in the page cache. If the volume of dirty memory exceeds default thresholds, the kernel halts userspace processes and forces synchronous I/O writebacks, causing system freezes lasting hundreds of milliseconds.

| Sysctl Key | Recommended Setting | Rationale |
| :--- | :--- | :--- |
| `vm.swappiness` | `1` (or `10`) | Minimizes aggressive page-swapping of process heaps while avoiding `0` (which can trigger premature Out-Of-Memory / OOM kills under severe file cache pressure). |
| `vm.dirty_background_ratio` | `5` | Flushes dirty pages in the background via `pdflush`/`kworker` threads once dirty memory reaches 5% of total RAM. |
| `vm.dirty_ratio` | `10` | Hard cap: if dirty memory reaches 10% of total RAM, writes block until background flush catches up. Prevents massive writeback stalls. |
| `vm.dirty_expire_centisecs` | `1500` | Limits maximum time unwritten dirty pages reside in memory to 15 seconds (default is 30s). |
| `vm.dirty_writeback_centisecs` | `500` | Wakes kernel writeback threads every 5 seconds to flush dirty memory. |
| `vm.vfs_cache_pressure` | `50` | Values below 100 bias the kernel toward keeping VFS directory and inode caches in memory rather than reclaiming them. |
| `vm.overcommit_memory` | `1` | Kernel always overcommits memory. Prevents allocation rejections for processes with large sparse virtual mappings. |

#### File Descriptor and Event Subsystem Limits

High-throughput streaming gateways handle thousands of simultaneous camera connections, socket descriptors, and disk storage channels:

| Sysctl Key | Recommended Setting | Rationale |
| :--- | :--- | :--- |
| `fs.file-max` | `20971520` (20M) | Maximum system-wide file descriptors allocated by the kernel. |
| `fs.nr_open` | `1048576` (1M) | Maximum file descriptors an individual process is permitted to open. |
| `fs.aio-max-nr` | `1048576` (1M) | Maximum concurrent asynchronous I/O operations for POSIX AIO. |

#### Complete Drop-in Configuration: `/etc/sysctl.d/99-high-compute.conf`

```ini
# /etc/sysctl.d/99-high-compute.conf
# Systems & OS Telemetry Configuration for High-Throughput Compute Nodes

# Virtual Memory Management
vm.swappiness = 1
vm.dirty_background_ratio = 5
vm.dirty_ratio = 10
vm.dirty_expire_centisecs = 1500
vm.dirty_writeback_centisecs = 500
vm.vfs_cache_pressure = 50
vm.overcommit_memory = 1
vm.max_map_count = 1048576

# NUMA Balancing (Eliminates page-scan jitter on static pinned workloads)
kernel.numa_balancing = 0

# File System & IPC Resource Limits
fs.file-max = 20971520
fs.nr_open = 1048576
fs.aio-max-nr = 1048576
fs.inotify.max_user_watches = 524288
fs.inotify.max_user_instances = 1024

# Process Scheduling Priorities
kernel.sched_migration_cost_ns = 5000000
kernel.sched_autogroup_enabled = 0
```

Apply immediately without rebooting:
```bash
sudo sysctl --system
```

Also update security limits in `/etc/security/limits.d/99-compute.conf`:
```ini
# /etc/security/limits.d/99-compute.conf
* soft nofile 1048576
* hard nofile 1048576
* soft memlock unlimited
* hard memlock unlimited
* soft rtprio 99
* hard rtprio 99
```

---

## 3. High-Throughput & Low-Latency Networking

Network performance at 10GbE to 100GbE line rates requires tuning the entire stack—from NIC interrupt handling and ring buffers up through TCP congestion control algorithms and socket buffer allocations.

### 3.1 Socket Buffer Architecture & Dynamic Autotuning

The Linux network stack allocates memory for incoming and outgoing packets as `sk_buff` structures. The TCP window size determines how much in-flight unacknowledged data can be transmitted before the sender must wait for an ACK.

#### Bandwidth-Delay Product (BDP) Formula

To saturate a high-bandwidth network pipe, the socket buffer must be at least as large as the Bandwidth-Delay Product:

$$\text{BDP (bytes)} = \frac{\text{Bandwidth (bits/sec)} \times \text{Round Trip Time (seconds)}}{8}$$

Due to Linux `sk_buff` internal overhead (packet headers, alignment, slab allocators), the actual buffer capacity must be multiplied by a factor of 2:

$$\text{Buffer Allocation} \ge 2 \times \text{BDP}$$

#### BDP Sizing Reference Table

| Link Bandwidth | Network Round-Trip Time (RTT) | Calculated BDP | Required Buffer Allocation ($2 \times \text{BDP}$) |
| :--- | :--- | :--- | :--- |
| **1 Gbps** | 1 ms (Local Datacenter / LAN) | 125 KB | 250 KB |
| **1 Gbps** | 40 ms (Cross-Country WAN) | 5.0 MB | 10.0 MB |
| **10 Gbps** | 1 ms (Local Datacenter / LAN) | 1.25 MB | 2.5 MB |
| **10 Gbps** | 40 ms (Cross-Country WAN) | 50.0 MB | 100.0 MB |
| **100 Gbps** | 0.5 ms (HPC Fabric / InfiniBand) | 6.25 MB | 12.5 MB |
| **100 Gbps** | 20 ms (Regional Optical Fiber) | 250.0 MB | 500.0 MB |

#### TCP Buffer Sysctl Configuration

Linux manages TCP buffer limits using dynamic autotuning (`tcp_moderate_rcvbuf = 1`). The vector parameters define: `<min_bytes> <default_bytes> <max_bytes>`.

```ini
# Network Core Buffers (Max OS socket limits)
net.core.rmem_max = 67108864
net.core.wmem_max = 67108864
net.core.rmem_default = 33554432
net.core.wmem_default = 33554432
net.core.optmem_max = 2048576

# TCP Read Buffer Auto-tuning Vector: min (4KB), default (8MB), max (64MB)
net.ipv4.tcp_rmem = 4096 8388608 67108864

# TCP Write Buffer Auto-tuning Vector: min (4KB), default (8MB), max (64MB)
net.ipv4.tcp_wmem = 4096 8388608 67108864

# Global TCP Memory Pressure (Specified in ARCHITECTURE PAGES, typically 4KB)
# Min: 2GB, Pressure: 4GB, Max: 8GB (for a system with 32GB+ RAM)
net.ipv4.tcp_mem = 524288 1048576 2097152

# Enable dynamic receive buffer autotuning
net.ipv4.tcp_moderate_rcvbuf = 1

# Enable Window Scaling (RFC 1323)
net.ipv4.tcp_window_scaling = 1
```

> [!CAUTION]
> **Avoid Hardcoding `SO_RCVBUF` / `SO_SNDBUF` in Application Code:**
> Calling `setsockopt(fd, SOL_SOCKET, SO_RCVBUF, &val, sizeof(val))` disables the Linux kernel's dynamic TCP receive window auto-tuning. The kernel doubles the assigned value to account for overhead and permanently clamps the TCP window size, preventing the socket from adapting if network latency changes. Instead, adjust system-wide `tcp_rmem` and allow the kernel autotuner to manage buffer expansion dynamically.

---

### 3.2 TCP BBR vs. Cubic for Video & Real-Time Streaming

TCP Cubic is a loss-based congestion control algorithm designed for bulk file transfers. It interprets any packet loss as a signal of network link congestion, cutting its Congestion Window ($cwnd$) by 30% to 50%. On wireless links, congested transit backbones, or long-distance camera streams (RTSP/WebRTC) experiencing non-congestive loss, Cubic starves available throughput and fills upstream network buffers, causing **Bufferbloat**.

```
TCP Cubic Behavior (Loss-Based):
Throughput
 ▲
 │        /|      /|      /|   <- Sawtooth pattern: Inflates queues until packet
 │       / |     / |     / |      loss occurs, then sharply cuts throughput.
 │      /  |    /  |    /  |      Creates bufferbloat and massive latency jitter.
 └─────/───┴───/───┴───/───┴────────► Time

TCP BBR Behavior (Model-Based):
Throughput
 ▲
 │     ┌────────────────────────┐  <- Tracks Bottleneck Bandwidth (BtlBw) and
 │    ┌┘                        └┐    Round-Trip Propagation Time (RTprop).
 │   ┌┘                          └    Maintains maximum throughput at minimum
 └───┘────────────────────────────► Time  queue delay. 1-5% packet loss has zero impact.
```

#### Bottleneck Bandwidth and RTT (BBR) Principles
Developed by Google, BBR models the physical network pipe:
* **$BtlBw$ (Bottleneck Bandwidth):** Measured max transmission rate over a sliding time window.
* **$RTprop$ (Round-Trip Propagation Time):** Measured physical path delay without queuing.
* **Kleinrock's Optimal Operating Point:** BBR caps in-flight data strictly to $BDP = BtlBw \times RTprop$. Because it prevents packets from accumulating in switch buffers, queuing delay is minimized and bufferbloat is eliminated.

#### Performance Comparison Matrix

| Metric / Scenario | TCP Cubic | TCP BBR (v1 / v2 / v3) | Operational Impact on Streaming |
| :--- | :--- | :--- | :--- |
| **Congestion Metric** | Packet Loss | Delivery Rate + RTT changes | BBR ignores random packet loss (e.g. WiFi drops). |
| **Throughput at 1% Loss** | Drops by **70% – 85%** | **Sustains ~99%** of line rate | RTSP streams remain smooth; Cubic stutters and buffers. |
| **Queuing Latency (Bufferbloat)** | High (inflates switch buffers) | Minimal (pacing limits in-flight bytes) | Dramatically reduces WebRTC glass-to-glass latency. |
| **Fairness with Co-existing Flows**| Aggressive in deep buffers | Fair in BBRv2/v3; BBRv1 can bully Cubic | BBRv2 balances RTT and loss fairness. |

#### Enabling TCP BBR on Linux

BBR requires the Fair Queuing (`fq`) packet scheduler queue discipline to perform pacing at the socket layer.

```bash
# 1. Load the BBR kernel module
sudo modprobe tcp_bbr

# 2. Configure sysctls for persistent BBR operation
cat <<EOF | sudo tee /etc/sysctl.d/99-bbr.conf
# Enforce Fair Queuing qdisc
net.core.default_qdisc = fq

# Set BBR as default TCP congestion control algorithm
net.ipv4.tcp_congestion_control = bbr
EOF

# 3. Apply changes immediately
sudo sysctl --system

# 4. Verify BBR activation
sysctl net.ipv4.tcp_congestion_control
# Output: net.ipv4.tcp_congestion_control = bbr

lsmod | grep bbr
# Output: tcp_bbr                24576  15
```

Inspect active socket-level BBR telemetry in real time:

```bash
# View BBR pacing rate, estimated bandwidth, and min RTT on active TCP connections
ss -t -i 'sport = :554 or dport = :554'
# Output demonstrates: bbr:(bw:48.2Mbps,mrtt:12.4,pacing_rate:57.8Mbps)
```

---

### 3.3 Kernel-Bypass Networking: AF_XDP & DPDK

The standard Linux kernel network stack introduces significant overhead per packet:
1. Hard IRQ fires when the NIC DMA finishes writing a packet to memory.
2. Software interrupt (NAPI softirq) executes to service the ring.
3. Memory allocation overhead (`sk_buff` slab allocation).
4. Full traversal of the IP routing table, iptables/nftables, and TCP protocol state machine.
5. Context switch to userspace and memory copy from kernel socket buffer to user buffer during `recvfrom()`.

This overhead caps standard Linux socket throughput at **1.5M – 2M packets per second (Mpps) per CPU core**. For 10GbE–100GbE line-rate packet ingestion (where a 100GbE link handles up to 148.8 Mpps of 64-byte packets), standard socket processing is completely inadequate.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 STANDARD LINUX STACK vs. AF_XDP vs. DPDK                    │
├─────────────────────┬───────────────────────────┬───────────────────────────┤
│ Standard Linux SKB  │ AF_XDP (eXpress Data Path)│ DPDK                      │
├─────────────────────┼───────────────────────────┼───────────────────────────┤
│ NIC DMA to Memory   │ NIC DMA to UMEM Ring      │ NIC DMA to HugePages      │
│         ▼           │         ▼                 │         ▼                 │
│ Kernel IRQ / NAPI   │ Kernel XDP Driver Hook    │ Userspace PMD Poll Loop   │
│         ▼           │         ▼                 │ (100% Core Utilization)   │
│ Allocate sk_buff    │ Zero-Copy to Userspace    │ (Kernel completely        │
│         ▼           │ (Bypasses SKB & TCP/IP)   │  bypassed)                │
│ TCP/IP Stack        │                           │                           │
│         ▼           │                           │                           │
│ Copy to User Space  │                           │                           │
├─────────────────────┼───────────────────────────┼───────────────────────────┤
│ Max: ~1.8 Mpps/core │ Max: ~25 - 35 Mpps/core   │ Max: ~100+ Mpps/core      │
└─────────────────────┴───────────────────────────┴───────────────────────────┘
```

#### 3.3.1 AF_XDP (XDP Sockets)

AF_XDP brings kernel-bypass performance to Linux while preserving standard kernel device drivers and security boundaries.

* **UMEM (Userspace Memory):** A pre-allocated pool of memory frames registered with the kernel via `setsockopt(..., SOL_XDP, XDP_UMEM_REG, ...)`.
* **Four Ring Buffers:**
  1. **Fill Ring:** Userspace populates this with empty UMEM frame addresses for the NIC to receive packets into.
  2. **RX Ring:** Kernel informs userspace of incoming packets by placing descriptors here.
  3. **TX Ring:** Userspace places outgoing packet descriptors here.
  4. **Completion Ring:** Kernel notifies userspace that transmission is complete and the frame can be reused.
* **Operation Modes:**
  * **Generic Mode (`XDP_FLAGS_SKB_MODE`):** Fallback mode; packets traverse the driver before hitting XDP. Works on any NIC (~3 Mpps).
  * **Native Driver Mode (`XDP_FLAGS_DRV_MODE`):** Executed directly in the NIC driver's NAPI poll loop before `sk_buff` allocation (~12–18 Mpps).
  * **Zero-Copy Mode (`XDP_ZERO_COPY`):** Hardware DMAs packet payloads directly into userspace UMEM memory. Bypasses the CPU cache completely (~25–35 Mpps per core).

#### Concrete C AF_XDP Socket (XSK) Setup Skeleton

```c
#include <linux/if_xdp.h>
#include <bpf/xsk.h>
#include <sys/mman.h>
#include <stdio.h>
#include <stdlib.h>

#define NUM_FRAMES         4096
#define FRAME_SIZE         XSK_UMEM__DEFAULT_FRAME_SIZE // 4096 bytes
#define BATCH_SIZE         64

struct xsk_umem_info {
    struct xsk_ring_prod fq;
    struct xsk_ring_cons cq;
    struct xsk_umem *umem;
    void *buffer;
};

struct xsk_socket_info {
    struct xsk_ring_cons rx;
    struct xsk_ring_prod tx;
    struct xsk_umem_info *umem;
    struct xsk_socket *xsk;
};

// Initializes a Zero-Copy AF_XDP UMEM and Socket
int init_af_xdp(const char *ifname, int queue_id, struct xsk_socket_info *xsk_info) {
    struct xsk_umem_info *umem_info = calloc(1, sizeof(*umem_info));
    xsk_info->umem = umem_info;

    // 1. Allocate page-aligned UMEM memory buffer
    size_t umem_size = NUM_FRAMES * FRAME_SIZE;
    if (posix_memalign(&umem_info->buffer, getpagesize(), umem_size)) {
        perror("posix_memalign failed");
        return -1;
    }

    // 2. Register UMEM with kernel
    struct xsk_umem_config ucfg = {
        .fill_size = NUM_FRAMES,
        .comp_size = NUM_FRAMES,
        .frame_size = FRAME_SIZE,
        .frame_headroom = XSK_UMEM__DEFAULT_FRAME_HEADROOM,
        .flags = 0
    };
    if (xsk_umem__create(&umem_info->umem, umem_info->buffer, umem_size,
                         &umem_info->fq, &umem_info->cq, &ucfg)) {
        perror("xsk_umem__create failed");
        return -1;
    }

    // 3. Configure and bind XDP socket in ZERO-COPY mode
    struct xsk_socket_config scfg = {
        .rx_size = NUM_FRAMES,
        .tx_size = NUM_FRAMES,
        .bind_flags = XDP_COPY, // Use XDP_ZERO_COPY if supported by NIC driver (e.g. i40e, mlx5)
    };

    if (xsk_socket__create(&xsk_info->xsk, ifname, queue_id,
                           umem_info->umem, &xsk_info->rx, &xsk_info->tx, &scfg)) {
        perror("xsk_socket__create failed");
        return -1;
    }

    return 0;
}
```

#### 3.3.2 DPDK (Data Plane Development Kit)

DPDK is an extreme kernel-bypass framework:
* **Poll Mode Drivers (PMD):** Completely unbinds network interfaces from the Linux kernel and maps PCIe MMIO registers directly into userspace processes.
* **Zero Interrupt Overhead:** PMDs poll NIC receive queues in a 100% busy loop on dedicated CPU cores, completely eliminating interrupt latency and context switching.
* **Memory Management:** Operates exclusively out of 1GB or 2MB HugePages locked into physical memory, bypassing Linux virtual memory page walks.

#### Architectural Comparison: AF_XDP vs. DPDK

| Feature / Dimension | Linux AF_XDP | DPDK (Data Plane Development Kit) |
| :--- | :--- | :--- |
| **Kernel Relationship** | In-kernel integration via BPF/XDP | Complete kernel bypass (kernel unbind) |
| **Driver Dependency** | Standard Linux drivers (mlx5, ice, i40e) | Specialized DPDK PMD drivers |
| **Standard Tools Visibility** | Visible in `ethtool`, `ip`, `tcpdump` (via generic XDP) | **Invisible** to OS network tools and firewall |
| **CPU Utilization** | Can sleep on epoll/poll or busy-poll | 100% spinlock/busy-polling on dedicated cores |
| **Security Boundaries** | Standard Linux file permissions & namespaces | Userspace process requires raw PCIe / VFIO access |
| **Throughput Ceiling** | 25 – 35 Mpps per core | 40 – 100+ Mpps per core |
| **Engineering Complexity**| Moderate (Clean C/Go/Rust bindings) | High (Requires custom hardware management) |

---

### 3.4 Hardware Offloads & Multi-Queue NIC Architecture

Modern Network Interface Cards (NICs) incorporate dedicated ASICs capable of performing protocol segmentation, checksumming, and flow steering directly on the network hardware.

#### 3.4.1 Hardware Offload Mechanisms

* **TCP Segmentation Offload (TSO):** Enables the OS TCP stack to create giant packets up to 64KB (`GSO_MAX_SIZE`), offloading TCP packet fragmentation into MTU-sized segments (typically 1500 bytes) to the NIC hardware. Eliminates CPU per-packet segmentation overhead on transmission.
* **Large Receive Offload (LRO) / Generic Receive Offload (GRO):** Reassembles incoming sequential TCP packets into single large frames before passing them to the OS network stack, reducing the number of `sk_buff` allocations and protocol traversals by up to 90%.
* **Checksum Offloading (`rx-checksumming`, `tx-checksumming`):** Hardware computes and validates IPv4 header and TCP/UDP checksums on the fly.

Inspect and enable hardware offloads via `ethtool`:

```bash
# Query current offload state on interface eth0
ethtool -k eth0

# Enable all primary hardware offloads for maximum throughput
sudo ethtool -K eth0 \
  rx on \
  tx on \
  tso on \
  gso on \
  gro on \
  lro off \
  rx-vlan-offload on \
  tx-vlan-offload on
```

> [!NOTE]
> Keep `lro` disabled (`lro off`) if the server acts as a router, bridge, or NAT gateway, as LRO alters packet headers in ways that break packet forwarding. Use `gro on` instead.

#### 3.4.2 Receive Side Scaling (RSS) & Multi-Queue NICs

High-performance NICs expose multiple Hardware Ring Buffers (Queues) for both RX and TX (e.g., 8, 16, or 32 queues).

```
Incoming 10GbE / 100GbE Ethernet Packets
                  │
                  ▼
       [NIC Hardware Hash Engine]
 (Toeplitz Hash of 4-Tuple: SIP, DIP, SPort, DPort)
                  │
  ┌───────────────┼───────────────┬───────────────┐
  ▼               ▼               ▼               ▼
[RX Queue 0]    [RX Queue 1]    [RX Queue 2]    [RX Queue 3]
  │               │               │               │
  │ MSI-X IRQ 41  │ MSI-X IRQ 42  │ MSI-X IRQ 43  │ MSI-X IRQ 44
  ▼               ▼               ▼               ▼
[CPU Core 0]    [CPU Core 1]    [CPU Core 2]    [CPU Core 3]
```

1. **Toeplitz Hashing:** The NIC computes a hash over the packet's IP 4-tuple (source IP, destination IP, source port, destination port) and indexes into an Indirection Table to assign the packet to a specific RX queue.
2. **Deterministic Flow Affinity:** All packets belonging to a specific TCP connection consistently map to the same RX queue, preserving packet ordering and keeping TCP connection state warm in the L1/L2 cache of the servicing CPU core.

```bash
# View current number of hardware queues
ethtool -l eth0

# Set hardware queues to match the number of available physical compute cores (e.g. 8)
sudo ethtool -L eth0 combined 8

# Expand hardware ring buffer descriptor depths to maximum to eliminate packet drops under bursts
ethtool -g eth0
sudo ethtool -G eth0 rx 4096 tx 4096
```

#### 3.4.3 IRQ Affinity & Interrupt Steering

By default, the system `irqbalance` daemon may route network interrupts across all CPU cores or concentrate them on Core 0. When processing millions of packets per second, Core 0 saturates in `ksoftirqd/0`, dropping packets while other cores remain idle.

To fix this, disable `irqbalance` and manually pin each NIC queue's MSI-X interrupt vector to its corresponding physical CPU core:

```bash
# 1. Stop and disable irqbalance
sudo systemctl stop irqbalance
sudo systemctl disable irqbalance

# 2. Identify the MSI-X interrupt numbers for the target NIC interface
grep -E "eth0|mlx5|i40e" /proc/interrupts | awk '{print $1}' | tr -d ':'
```

Script to automatically bind NIC queues 0..N to CPU cores 0..N:

```bash
#!/usr/bin/env bash
# pin_nic_irqs.sh: Bind NIC MSI-X interrupt vectors to specific physical cores

IFACE="eth0"
START_CORE=0

# Find IRQs associated with interface
IRQS=$(grep "$IFACE" /proc/interrupts | awk '{print $1}' | tr -d ':')

CORE=$START_CORE
for IRQ in $IRQS; do
  # Write hex affinity mask or core list to smp_affinity_list
  echo "Binding IRQ $IRQ to CPU core $CORE"
  echo "$CORE" | sudo tee "/proc/irq/$IRQ/smp_affinity_list"
  CORE=$((CORE + 1))
done
```

---

## 4. Production Tuning Profiles & Diagnostic Checklist

### 4.1 Master Production Sysctl Profile

Save to `/etc/sysctl.d/99-telemetry-networking.conf`:

```ini
# /etc/sysctl.d/99-telemetry-networking.conf
# Comprehensive OS Hardware Governance & High-Throughput Networking Profile

# ------------------------------------------------------------------------------
# 1. Memory & Page Cache Governance
# ------------------------------------------------------------------------------
vm.swappiness = 1
vm.dirty_background_ratio = 5
vm.dirty_ratio = 10
vm.dirty_expire_centisecs = 1500
vm.dirty_writeback_centisecs = 500
vm.vfs_cache_pressure = 50
vm.overcommit_memory = 1
vm.max_map_count = 1048576

# ------------------------------------------------------------------------------
# 2. NUMA & Process Scheduling
# ------------------------------------------------------------------------------
kernel.numa_balancing = 0
kernel.sched_migration_cost_ns = 5000000
kernel.sched_autogroup_enabled = 0

# ------------------------------------------------------------------------------
# 3. File System & OS Descriptors
# ------------------------------------------------------------------------------
fs.file-max = 20971520
fs.nr_open = 1048576
fs.aio-max-nr = 1048576

# ------------------------------------------------------------------------------
# 4. Network Core Buffers & Queues
# ------------------------------------------------------------------------------
net.core.netdev_max_backlog = 250000
net.core.somaxconn = 65535
net.core.rmem_default = 33554432
net.core.wmem_default = 33554432
net.core.rmem_max = 67108864
net.core.wmem_max = 67108864
net.core.optmem_max = 2048576

# ------------------------------------------------------------------------------
# 5. TCP Protocol Stack & Window Scaling
# ------------------------------------------------------------------------------
net.ipv4.tcp_rmem = 4096 8388608 67108864
net.ipv4.tcp_wmem = 4096 8388608 67108864
net.ipv4.tcp_mem = 524288 1048576 2097152
net.ipv4.tcp_moderate_rcvbuf = 1
net.ipv4.tcp_window_scaling = 1
net.ipv4.tcp_timestamps = 1
net.ipv4.tcp_sack = 1
net.ipv4.tcp_dsack = 1
net.ipv4.tcp_fastopen = 3

# ------------------------------------------------------------------------------
# 6. Congestion Control & Queue Discipline
# ------------------------------------------------------------------------------
net.core.default_qdisc = fq
net.ipv4.tcp_congestion_control = bbr

# ------------------------------------------------------------------------------
# 7. Connection Tracking & Ephemeral Ports
# ------------------------------------------------------------------------------
net.ipv4.tcp_max_syn_backlog = 3240000
net.ipv4.tcp_fin_timeout = 15
net.ipv4.tcp_tw_reuse = 1
net.ipv4.ip_local_port_range = 1024 65535
```

---

### 4.2 Systematic Telemetry & Troubleshooting Runbook

When diagnosing throughput bottlenecks, frame drops, or latency spikes in production compute nodes, execute diagnostics in this exact sequence:

```
                          [System Bottleneck Detected]
                                       │
                 ┌─────────────────────┴─────────────────────┐
                 ▼                                           ▼
         [Compute Stalls]                            [Network Drops]
                 │                                           │
    Run: perf stat -d <app>                     Run: ethtool -S <iface>
                 │                                           │
        ┌────────┴────────┐                         ┌────────┴────────┐
        ▼                 ▼                         ▼                 ▼
   IPC < 1.0         Branch Miss > 2%          rx_discards > 0    tcp_drop trace
   (Stalled)         (Bad Speculation)         (Ring Buffer Full) (Socket Exhaustion)
        │                 │                         │                 │
   Run TMAM:         Replace dynamic           Expand Ring:       Increase rmem:
   perf stat         branches with             ethtool -G         tcp_rmem /
   --topdown         branchless SIMD           rx 4096            rmem_max
```

#### Diagnostic Commands Reference

```bash
# 1. Check for physical NIC packet drops and ring buffer overruns
ethtool -S eth0 | grep -E "drop|discard|miss|error|fifo"

# 2. Check for kernel socket backlog and buffer overflow drops
netstat -s | grep -E "buffer errors|pruned|overflowed|dropped"

# 3. Inspect active socket queue depths and pacing rates
ss -ntip

# 4. Measure CPU softirq saturation across physical cores
mpstat -P ALL 1

# 5. Profile top hardware counter bottlenecks (IPC, Cache, Branches)
perf stat -a -d -- sleep 5

# 6. Trace off-CPU thread descheduling reasons
sudo bpftrace offcpu_trace.bt "<process_name>"
```
