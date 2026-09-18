# Video generation models (OpenRouter, September 2026)

Token prices are OpenRouter USD **per 1M tokens**. Image/video/music often bill **per image, second, or song** — if prompt/completion show $0, open the OpenRouter page. `:batch` SKUs omitted.

OpenRouter: `https://openrouter.ai/{id}`.

29 models with **video** output (text-to-video, image-to-video, edit/upscale).

Vendor docs: [Sora](https://developers.openai.com/api/docs) · [Veo](https://ai.google.dev/gemini-api/docs) · [Runway](https://docs.dev.runwayml.com) · [Kling](https://klingai.com) · [MiniMax Hailuo](https://platform.minimax.io/docs) · [Wan](https://www.alibabacloud.com/help/en/model-studio/) · [HeyGen](https://docs.heygen.com) · [Grok Imagine Video](https://docs.x.ai) · [BFL FLUX Video](https://docs.bfl.ai) · [Seedance](https://seed.bytedance.com)

### `black-forest-labs/flux-video-edit` — Black Forest Labs: FLUX Video Edit

- **OpenRouter:** https://openrouter.ai/black-forest-labs/flux-video-edit
- **Vendor docs:** https://docs.bfl.ai
- **Modalities:** in `text,video` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** FLUX Video Edit [fast] takes a source video and an edit prompt and returns a precisely edited video. Add, remove, or replace objects and characters, rebuild the setting, edit on-screen...

### `minimax/hailuo-3-max` — MiniMax: H3 Max

- **OpenRouter:** https://openrouter.ai/minimax/hailuo-3-max
- **Vendor docs:** https://platform.minimax.io/docs
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** MiniMax H3 Max is a video-generation model from MiniMax, jointly released with fal.ai. Derived through additional training from MiniMax H3, it is designed for faster text-to-video and image-to-video generation with...

### `alibaba/wan-3.0-prime` — Alibaba: Wan 3.0 Prime

- **OpenRouter:** https://openrouter.ai/alibaba/wan-3.0-prime
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Wan 3.0 Prime is a fast-mode variant of [Wan 3.0](https://openrouter.ai/alibaba/wan-3.0) from Alibaba. It supports text-to-video and first-frame image-to-video generation.

### `alibaba/wan-3.0` — Alibaba: Wan 3.0

- **OpenRouter:** https://openrouter.ai/alibaba/wan-3.0
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Wan 3.0 is a video generation model from Alibaba for text-to-video, image-to-video, and reference-guided video generation. It produces 480p, 720p, or 1080p video with durations from 2 to 30 seconds.

### `heygen/avatar-iv` — HeyGen: Avatar IV

- **OpenRouter:** https://openrouter.ai/heygen/avatar-iv
- **Vendor docs:** https://docs.heygen.com
- **Modalities:** in `text,image,audio` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** HeyGen: Avatar IV is an image-to-video model that animates a single photo into an expressive, lip-synced talking-head video. Rather than only matching mouth shapes to words, it interprets the vocal...

### `black-forest-labs/flux-video-upscale` — Black Forest Labs: FLUX Video Upscale

- **OpenRouter:** https://openrouter.ai/black-forest-labs/flux-video-upscale
- **Vendor docs:** https://docs.bfl.ai
- **Modalities:** in `text,video` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** FLUX Video Upscale is a video upscaling model from Black Forest Labs. It enlarges a single source video by 1.5× to 3× while preserving its duration, with an optional prompt...

### `bytedance/seedance-2.0-mini` — ByteDance: Seedance 2.0 Mini

- **OpenRouter:** https://openrouter.ai/bytedance/seedance-2.0-mini
- **Vendor docs:** https://seed.bytedance.com
- **Modalities:** in `text,image,video,audio` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Seedance 2.0 Mini is a video generation model from ByteDance. It supports text-to-video, image-to-video with first and last frame control, and multimodal reference-to-video with image, video, and audio inputs. It...

### `bytedance/seedance-2.5` — ByteDance: Seedance 2.5

- **OpenRouter:** https://openrouter.ai/bytedance/seedance-2.5
- **Vendor docs:** https://seed.bytedance.com
- **Modalities:** in `text,image,video,audio` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Seedance 2.5 is a video generation model from ByteDance. It is suited for long-form storytelling, multimodal reference-based generation, video editing, and video extension. It supports first-frame and first-and-last-frame control, up...

### `black-forest-labs/flux-3-video` — Black Forest Labs: FLUX.3 Video

- **OpenRouter:** https://openrouter.ai/black-forest-labs/flux-3-video
- **Vendor docs:** https://docs.bfl.ai
- **Modalities:** in `text,image,video` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** FLUX.3 Video is a video generation model from Black Forest Labs. It supports text-to-video, image-guided generation with opening and closing keyframes, and video continuation workflows, making it suited for controlled...

### `minimax/hailuo-3` — MiniMax: H3

- **OpenRouter:** https://openrouter.ai/minimax/hailuo-3
- **Vendor docs:** https://platform.minimax.io/docs
- **Modalities:** in `text,image,video,audio` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** MiniMax H3 is a lightweight, open-weights video generation model from MiniMax. It is designed for precise multimodal editing and controlled content generation, including instruction-guided edits, text and brand rendering, and...

### `runway/aleph-2` — Runway: Aleph 2.0

- **OpenRouter:** https://openrouter.ai/runway/aleph-2
- **Vendor docs:** https://docs.dev.runwayml.com
- **Modalities:** in `text,image,video` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Runway Aleph 2.0 is an in-context video editing model from Runway. It applies text instructions and keyframe-guided edits across existing footage while preserving details that are not meant to change....

### `runway/gen-4.5` — Runway: Gen-4.5

- **OpenRouter:** https://openrouter.ai/runway/gen-4.5
- **Vendor docs:** https://docs.dev.runwayml.com
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Runway Gen-4.5 is a video generation model from Runway for text-to-video and image-to-video workflows. It is designed for cinematic scene creation with strong motion quality, visual fidelity, and prompt adherence....

### `x-ai/grok-imagine-video-1.5` — SpaceXAI: Grok Imagine Video 1.5

- **OpenRouter:** https://openrouter.ai/x-ai/grok-imagine-video-1.5
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Grok Imagine Video 1.5 is a video generation model from SpaceXAI. It creates videos from text prompts, with an optional starting image to guide the scene. It can direct subject...

### `alibaba/happyhorse-1.1` — Alibaba: HappyHorse 1.1

- **OpenRouter:** https://openrouter.ai/alibaba/happyhorse-1.1
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** HappyHorse 1.1 is a video generation model from Alibaba. It generates short videos from a text prompt, a single starting image, or a set of reference images, with output up...

### `alibaba/happyhorse-1.0` — Alibaba: HappyHorse 1.0

- **OpenRouter:** https://openrouter.ai/alibaba/happyhorse-1.0
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** HappyHorse 1.0 is a video generation model from Alibaba. It generates short videos from a text prompt, a single starting image, or a set of reference images, with output up...

### `x-ai/grok-imagine-video` — SpaceXAI: Grok Imagine Video

- **OpenRouter:** https://openrouter.ai/x-ai/grok-imagine-video
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Grok Imagine Video is SpaceXAI's fast, text-, image-, and reference-conditioned video generation model. It produces short videos (1–15 seconds, 24 fps) at 480p or 720p across seven aspect ratios -...

### `kwaivgi/kling-v3.0-pro` — Kling: Video v3.0 Pro

- **OpenRouter:** https://openrouter.ai/kwaivgi/kling-v3.0-pro
- **Vendor docs:** https://klingai.com
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Kling v3.0 Pro is Kuaishou's premium video generation model, offering higher visual quality than the Standard tier. It supports text-to-video and image-to-video workflows, with first-frame and last-frame control for precise...

### `kwaivgi/kling-v3.0-std` — Kling: Video v3.0 Standard

- **OpenRouter:** https://openrouter.ai/kwaivgi/kling-v3.0-std
- **Vendor docs:** https://klingai.com
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Kling v3.0 Standard is a video generation model from Kuaishou. It supports text-to-video and image-to-video workflows, with first-frame and last-frame control for guided scene composition. Clips range from 3 to...

### `google/veo-3.1-fast` — Google: Veo 3.1 Fast

- **OpenRouter:** https://openrouter.ai/google/veo-3.1-fast
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Google's mid-tier video generation model balancing speed and quality. Veo 3.1 Fast generates high-quality video from text or image prompts with native synchronized audio, offering faster turnaround than Veo 3.1...

### `google/veo-3.1-lite` — Google: Veo 3.1 Lite

- **OpenRouter:** https://openrouter.ai/google/veo-3.1-lite
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Google's most cost-effective video generation model, designed for high-volume applications and rapid iteration. Veo 3.1 Lite generates 720p and 1080p video from text or image prompts with native synchronized audio...

### `kwaivgi/kling-video-o1` — Kling: Video O1

- **OpenRouter:** https://openrouter.ai/kwaivgi/kling-video-o1
- **Vendor docs:** https://klingai.com
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Kling Video O1 is a video generation model from Kuaishou. It supports text and image inputs with video output, enabling text-to-video and image-to-video workflows. It is suited for cinematic content...

### `minimax/hailuo-2.3` — MiniMax: Hailuo 2.3

- **OpenRouter:** https://openrouter.ai/minimax/hailuo-2.3
- **Vendor docs:** https://platform.minimax.io/docs
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Hailuo 2.3 is a video generation model from MiniMax. It accepts text prompts and reference images as input and generates video output, supporting both text-to-video and image-to-video workflows. It is...

### `alibaba/wan-2.7` — Alibaba: Wan 2.7

- **OpenRouter:** https://openrouter.ai/alibaba/wan-2.7
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Wan 2.7 is a video generation model from Alibaba. It supports text-to-video, image-to-video with first and last frame control, and reference-to-video, where multiple reference images guide the style and content...

### `bytedance/seedance-2.0` — ByteDance: Seedance 2.0

- **OpenRouter:** https://openrouter.ai/bytedance/seedance-2.0
- **Vendor docs:** https://seed.bytedance.com
- **Modalities:** in `text,image,video,audio` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Seedance 2.0 is a video generation model from ByteDance. It supports text-to-video, image-to-video with first and last frame control, and multimodal reference-to-video. It is particularly strong at preserving character consistency,...

### `bytedance/seedance-2.0-fast` — ByteDance: Seedance 2.0 Fast

- **OpenRouter:** https://openrouter.ai/bytedance/seedance-2.0-fast
- **Vendor docs:** https://seed.bytedance.com
- **Modalities:** in `text,image,video,audio` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Seedance 2.0 Fast is a video generation model from ByteDance. It supports text-to-video, image-to-video with first and last frame control, and multimodal reference-to-video. It prioritizes generation speed and lower cost...

### `alibaba/wan-2.6` — Alibaba: Wan 2.6

- **OpenRouter:** https://openrouter.ai/alibaba/wan-2.6
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Alibaba's most advanced video generation model, supporting over 10 visual creation capabilities in a unified system. Wan 2.6 generates 1080p video at 24fps from text, images, reference videos, or audio,...

### `bytedance/seedance-1-5-pro` — ByteDance: Seedance 1.5 Pro

- **OpenRouter:** https://openrouter.ai/bytedance/seedance-1-5-pro
- **Vendor docs:** https://seed.bytedance.com
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** ByteDance's next-generation audio-visual generation model with a 4.5B parameter Dual-Branch Diffusion Transformer architecture. Seedance 1.5 Pro generates video and audio simultaneously in a single unified pass — eliminating the timing...

### `openai/sora-2-pro` — OpenAI: Sora 2 Pro

- **OpenRouter:** https://openrouter.ai/openai/sora-2-pro
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** OpenAI's flagship video generation model, delivering production-quality video with physics-accurate motion, synchronized audio, and world-state persistence across shots. Sora 2 Pro follows intricate multi-shot instructions while maintaining consistent spatial relationships...

### `google/veo-3.1` — Google: Veo 3.1

- **OpenRouter:** https://openrouter.ai/google/veo-3.1
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,image` → out `video`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Google's state-of-the-art video generation model, built for maximum visual fidelity in final production cuts. Veo 3.1 generates high-quality 1080p video from text or image prompts with native synchronized audio —...

