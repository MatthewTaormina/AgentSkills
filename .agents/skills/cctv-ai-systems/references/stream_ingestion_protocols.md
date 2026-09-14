# Stream Ingestion, Protocols & Media Demuxing

A robust SmartHub CCTV system must ingest streams from heterogeneous IP cameras reliably, with minimal CPU overhead and deterministic latency.

---

## 1. Supported Ingestion Protocols

| Protocol | Transport | Latency | Typical Use Case | Overhead / CPU Impact |
| :--- | :--- | :--- | :--- | :--- |
| **RTSP (over TCP)** | Interleaved TCP | 500ms – 1.5s | Primary IP camera feed (LAN/WAN) | Minimal; single TCP socket per stream |
| **RTSP (over UDP)** | UDP / RTP | 200ms – 800ms | High-packet-loss LAN | Higher kernel socket packet drop risk |
| **WebRTC (WHIP/WHEP)** | DTLS / SRTP / ICE | < 200ms | Ultra-low-latency browser live view | Higher crypto & ICE negotiation overhead |
| **RTMP** | TCP | 1.0s – 3.0s | Legacy ingestion / cloud broadcast | Deprecated for direct IP cameras |
| **ONVIF (Profile S/T/G)**| SOAP / XML over HTTP| N/A (Control) | Discovery, PTZ, capabilities probe | Low (out-of-band management) |

> [!IMPORTANT]
> **RTSP Over TCP (Interleaved) Rule:**
> Always configure RTSP clients to request `rtsp_transport=tcp`. RTSP over UDP drops packets under network congestion, causing corrupt macroblocks and H.264 P-frame decode artifacts that produce false motion triggers.

---

## 2. Demuxing vs. Transcoding (The Direct-to-Disk Law)

### The Anti-Pattern
Transcoding incoming video streams (`H.264 -> Decode -> Re-encode -> Disk`) wastes 80–90% of total host CPU cycles:
```
Camera (H.264) ──► [Software Decoder] ──► Raw YUV ──► [Software Encoder] ──► Disk (MP4)
                    (Consumes 20-30% CPU per camera!)
```

### The Zero-Overhead Pattern: Passthrough Demuxing
Extract incoming RTP packets, parse H.264/H.265 NAL units, and write them directly into an MP4/CMAF container without decoding:
```
Camera (H.264) ──► [RTP Demuxer] ──► H.264 NAL Units ──► [fMP4 Muxer] ──► Disk (Direct-to-Disk)
                    (Consumes < 0.2% CPU per camera)
```

### Key Demuxing Rules
1. **NAL Unit Parsing:** Identify SPS (Sequence Parameter Set) and PPS (Picture Parameter Set) packets to populate container headers (`moov` box).
2. **Keyframe Alignment:** Start new recording segments strictly on **IDR (Instantaneous Decoder Refresh)** keyframes. Splitting on non-IDR I-frames results in unplayable file chunks.
3. **Fragmented MP4 (fMP4):** Use `movflags=frag_keyframe+empty_moov+default_base_moof`. This ensures files remain readable even if power is abruptly cut or the host crashes.

---

## 3. ONVIF Camera Discovery & Control

SmartHubs should automate camera configuration via ONVIF:
* **WS-Discovery:** Multicast probe (`239.255.255.250:3702`) to auto-detect new cameras on the local subnet.
* **Profile S / Profile T:**
  * Query stream URIs for both **Main Stream** (High-Res 4K/1080p) and **Sub Stream** (Low-Res 640x360).
  * Read configured video encoder configurations (Resolution, FPS, Bitrate, GOP size / I-frame interval).
* **PTZ Control:** Relative and continuous pan/tilt/zoom via SOAP XML commands for active tracking.
