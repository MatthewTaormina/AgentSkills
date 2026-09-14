# 24/7 Storage, Retention & Video Recording Pipelines

Video storage is the primary consumer of disk write bandwidth and long-term capacity in any SmartHub CCTV system. Naive approaches destroy flash memory wear limits, cause filesystem fragmentation, and drop frames during sudden disk sync spikes.

---

## 1. Recording Strategies

| Strategy | Disk Bandwidth | Storage Footprint | Investigation Utility | Recommended Target |
| :--- | :--- | :--- | :--- | :--- |
| **Continuous 24/7 (All Streams)** | Very High (10–30 MB/s per 4K camera) | ~1 TB per camera / week | 100% complete; no missed events | High-security enterprise installations |
| **Motion-Only Recording** | Burst only (0 MB/s idle; 10 MB/s active) | ~50–100 GB per camera / week | Misses events if motion filter fails | Constrained low-capacity setups |
| **Hybrid Tiered (Recommended)** | Low (sub-stream continuous) + Burst (main-stream on motion) | ~150–250 GB per camera / week | 100% continuous context + 4K evidence | **SmartHub default standard** |

### 1.1 The Hybrid Strategy Workflow
1. **Continuous Baseline:** Write the 640x360 sub-stream continuously (requires only ~200–400 Kbps per camera).
2. **Pre-Event RAM Ring Buffer:** Keep the last **5–10 seconds of 4K main-stream keyframe chunks** in a circular RAM ring buffer.
3. **Motion / AI Trigger:** When a person, vehicle, or zone intrusion is confirmed:
   - Flush the 10-second pre-event buffer to disk.
   - Record the 4K main-stream until motion clears + 10 seconds post-event buffer.

---

## 2. Circular Ring Buffer & Disk Retention

### 2.1 File Segmentation Rules
* **Segment Duration:** 10–60 seconds per file segment (e.g., `camera_1/2026-09-14/14-30-00.mp4`).
* **Keyframe Alignment:** Every segment **must begin with an IDR keyframe**. Align camera encoder GOP (Group of Pictures) length (e.g., GOP = 30 or 60 at 30 FPS = 1 or 2 second keyframes).
* **Direct Muxing:** Append NAL packets directly into the fragmented MP4 (fMP4) structure.

### 2.2 Storage Pruning & Retention Management
* **Never use periodic `cron` jobs with recursive `rm -rf`:** Running a heavy directory scan on millions of MP4 files locks the filesystem journal and causes camera ingest buffers to overflow.
* **Database-Driven Watermark Pruning:**
  * Define High Watermark (e.g., 90% disk utilization) and Low Watermark (85%).
  * When disk space reaches 90%, query the SQLite catalog for the oldest segment IDs:
    ```sql
    SELECT id, file_path FROM video_segments 
    WHERE locked = 0 
    ORDER BY start_timestamp ASC 
    LIMIT 100;
    ```
  * Unlink files sequentially and delete DB records in a single batched transaction until disk utilization drops below 85%.

---

## 3. Storage Tiering (Hot NVMe vs. Cold HDD/NAS)

```
Incoming Stream (RTSP)
         │
         ▼
┌─────────────────────────────────────────┐
│     Tier 1: Hot NVMe SSD Ring Buffer     │
│  - Holds recent 24–48 hours of video     │
│  - Fast timeline scrubbing & AI crops   │
└────────────────────┬────────────────────┘
                     │ (Background Migration Daemon)
                     ▼
┌─────────────────────────────────────────┐
│     Tier 2: Cold SATA HDD / NAS / ZFS   │
│  - Sequential large block writes (1MB+) │
│  - Retains 14–60 days of historical data│
│  - Low spin-up wear, energy efficient   │
└─────────────────────────────────────────┘
```

* **Flash Memory Wear Prevention:**
  * Never flush small buffers (< 64KB) directly to SSDs. Aggregate packets in memory and flush in 1MB to 4MB chunks aligned to 4KB sector boundaries.
  * Enable `noatime` mount option in `/etc/fstab` to eliminate metadata read writes.

---

## 4. SQLite Video Catalog Schema

High-speed timeline lookups and event playback rely on an optimized, indexed schema:

```sql
-- Camera video segment index
CREATE TABLE video_segments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    camera_id TEXT NOT NULL,
    stream_type TEXT NOT NULL, -- 'main' or 'sub'
    file_path TEXT NOT NULL,
    start_timestamp INTEGER NOT NULL, -- Epoch milliseconds
    end_timestamp INTEGER NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    has_motion INTEGER DEFAULT 0,
    locked INTEGER DEFAULT 0 -- 1 = Protected from auto-pruning
);

-- Fast range lookup index for timeline playback
CREATE INDEX idx_segments_camera_time 
ON video_segments(camera_id, start_timestamp, end_timestamp);

-- Camera AI detections / events
CREATE TABLE ai_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    segment_id INTEGER REFERENCES video_segments(id),
    camera_id TEXT NOT NULL,
    label TEXT NOT NULL, -- 'person', 'car', 'dog'
    confidence REAL NOT NULL,
    box_x INTEGER NOT NULL,
    box_y INTEGER NOT NULL,
    box_w INTEGER NOT NULL,
    box_h INTEGER NOT NULL,
    timestamp INTEGER NOT NULL,
    snapshot_path TEXT
);

CREATE INDEX idx_events_camera_time 
ON ai_events(camera_id, timestamp);
```
