# Image generation and editing models (OpenRouter, September 2026)

Token prices are OpenRouter USD **per 1M tokens**. Image/video/music often bill **per image, second, or song** — if prompt/completion show $0, open the OpenRouter page. `:batch` SKUs omitted.

OpenRouter: `https://openrouter.ai/{id}`.

52 models with **image** output (text-to-image and edit).

Vendor docs: [BFL FLUX](https://docs.bfl.ai) · [OpenAI Images](https://developers.openai.com/api/docs) · [Gemini Nano Banana](https://ai.google.dev/gemini-api/docs) · [Recraft](https://www.recraft.ai/docs) · [xAI Imagine](https://docs.x.ai) · [Qwen Image](https://www.alibabacloud.com/help/en/model-studio/) · [Seedream](https://seed.bytedance.com) · [Krea](https://www.krea.ai)

### `openai/gpt-image-2.5-sunburst` — OpenAI: GPT Image 2.5 Sunburst

- **OpenRouter:** https://openrouter.ai/openai/gpt-image-2.5-sunburst
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,image` → out `image`
- **Context:** 400K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $8 / $8 per 1M tok · web_search $0.01/call; image_out $30 per 1M image tok
- **About:** GPT Image 2.5 Sunburst is an image generation and editing model from OpenAI, positioned as the precision-oriented tier of the GPT Image 2.5 series. It is suited to detailed creative...

### `openai/gpt-image-2.5-flare` — OpenAI: GPT Image 2.5 Flare

- **OpenRouter:** https://openrouter.ai/openai/gpt-image-2.5-flare
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,image` → out `image`
- **Context:** 400K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $8 / $8 per 1M tok · web_search $0.01/call; image_out $30 per 1M image tok
- **About:** GPT Image 2.5 Flare is an image generation and editing model from OpenAI, positioned as the speed-oriented tier of the GPT Image 2.5 series. It is suited to high-volume everyday...

### `microsoft/mai-image-2.6` — Microsoft AI: MAI-Image-2.6

- **OpenRouter:** https://openrouter.ai/microsoft/mai-image-2.6
- **Vendor docs:** https://learn.microsoft.com/azure/ai-services/
- **Modalities:** in `text,image` → out `image`
- **Context:** 4K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $5 / $0 per 1M tok · image_out $38 per 1M image tok
- **About:** MAI-Image-2.6 is an image generation and editing model from Microsoft AI, the precision tier of the MAI-Image-2.6 family alongside the faster [MAI-Image-2.6 Flash](/microsoft/mai-image-2.6-flash). It is suited for design-ready visuals and...

### `microsoft/mai-image-2.6-flash` — Microsoft AI: MAI-Image-2.6 Flash

- **OpenRouter:** https://openrouter.ai/microsoft/mai-image-2.6-flash
- **Vendor docs:** https://learn.microsoft.com/azure/ai-services/
- **Modalities:** in `text,image` → out `image`
- **Context:** 4K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.75 / $0 per 1M tok · image_out $19 per 1M image tok
- **About:** MAI-Image-2.6 Flash is the lower-latency, lower-cost member of the [MAI-Image-2.6](/microsoft/mai-image-2.6) family from Microsoft AI, built for latency-sensitive, high-throughput production image generation and editing at comparable quality to the precision tier....

### `meta/muse-image` — Meta: Muse Image

- **OpenRouter:** https://openrouter.ai/meta/muse-image
- **Vendor docs:** https://ai.developer.meta.com/docs/models/
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $2.4 per 1M image tok
- **About:** Muse Image is an agentic image generation model from Meta that generates and edits images from text and reference images. Unlike single-pass image models, it reasons before it renders, breaking...

### `recraft/recraft-v4-styles-pro` — Recraft: Recraft V4 Styles Pro

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4-styles-pro
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $23.95 per 1M image tok
- **About:** Recraft V4 Styles Pro is a style-consistent image generation model from Recraft. Every request requires at least one style reference image and generates a new image that reproduces the reference's...

### `recraft/recraft-v4-styles-vector` — Recraft: Recraft V4 Styles Vector

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4-styles-vector
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $11.98 per 1M image tok
- **About:** Recraft V4 Styles Vector is a style-consistent image generation model from Recraft. Every request requires at least one style reference image and generates a new image that reproduces the reference's...

### `recraft/recraft-v4-styles-pro-vector` — Recraft: Recraft V4 Styles Pro Vector

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4-styles-pro-vector
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $28.74 per 1M image tok
- **About:** Recraft V4 Styles Pro Vector is a style-consistent image generation model from Recraft. Every request requires at least one style reference image and generates a new image that reproduces the...

### `recraft/recraft-v4-styles` — Recraft: Recraft V4 Styles

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4-styles
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $8.38 per 1M image tok
- **About:** Recraft V4 Styles is a style-consistent image generation model from Recraft. Every request requires at least one style reference image and generates a new image that reproduces the reference's rendering...

### `bytedance-seed/seedream-5-0-lite` — ByteDance Seed: Seedream 5.0 Lite

- **OpenRouter:** https://openrouter.ai/bytedance-seed/seedream-5-0-lite
- **Vendor docs:** https://seed.bytedance.com
- **Modalities:** in `text,image` → out `image`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $8.38 per 1M image tok
- **About:** Seedream 5.0 Lite is an image generation model from ByteDance Seed. It is suited for professional visual creation that benefits from web-connected retrieval, complex-prompt comprehension, visual references, and broad knowledge...

### `bytedance-seed/seedream-5-0-pro` — ByteDance Seed: Seedream 5.0 Pro

- **OpenRouter:** https://openrouter.ai/bytedance-seed/seedream-5-0-pro
- **Vendor docs:** https://seed.bytedance.com
- **Modalities:** in `text,image` → out `image`
- **Context:** — · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $10.78 per 1M image tok; image $3000 per 1M
- **About:** Seedream 5.0 Pro is an image generation and editing model from ByteDance Seed. It is suited for commercial visual-production workflows that require precise editing control, lifelike scenes, and natural rendering.

### `x-ai/grok-imagine-image-2.0` — xAI: Grok Imagine Image 2.0

- **OpenRouter:** https://openrouter.ai/x-ai/grok-imagine-image-2.0
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $9.58 per 1M image tok; image $10000 per 1M
- **About:** Grok Imagine Image 2.0 is an image generation and editing model from xAI. It is suited for creating images from text prompts and editing images from references, with low and...

### `qwen/qwen-image-3` — Qwen: Qwen Image 3

- **OpenRouter:** https://openrouter.ai/qwen/qwen-image-3
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $7.19 per 1M image tok; image $3000 per 1M
- **About:** Qwen Image 3 is a unified image generation and editing model from Qwen. It supports precise rendering of text and details as small as 10px, along with a richer world...

### `qwen/qwen-image-3-pro` — Qwen: Qwen Image 3 Pro

- **OpenRouter:** https://openrouter.ai/qwen/qwen-image-3-pro
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $9.58 per 1M image tok; image $3000 per 1M
- **About:** Qwen Image 3 Pro is an image generation and editing model from Qwen. It supports precise rendering of text and details as small as 10px, along with richer world knowledge...

### `microsoft/mai-image-2.5-pro` — Microsoft AI: MAI-Image-2.5 Pro

- **OpenRouter:** https://openrouter.ai/microsoft/mai-image-2.5-pro
- **Vendor docs:** https://learn.microsoft.com/azure/ai-services/
- **Modalities:** in `text,image` → out `image`
- **Context:** 4K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $5 / $0 per 1M tok · image_out $108 per 1M image tok
- **About:** Microsoft AI's MAI-Image-2.5 is a high-quality image generation model available via Azure AI Foundry. It produces photorealistic and artistic images from text prompts with support for various aspect ratios.

### `krea/krea-2-large` — Krea: Krea 2 Large

- **OpenRouter:** https://openrouter.ai/krea/krea-2-large
- **Vendor docs:** https://www.krea.ai
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $14.37 per 1M image tok
- **About:** Krea 2 Large is Krea's high-capability image generation model, more than twice the size of Krea 2 Medium. Its lighter post-training gives images a rawer, more textured, and flexible character,...

### `krea/krea-2-medium` — Krea: Krea 2 Medium

- **OpenRouter:** https://openrouter.ai/krea/krea-2-medium
- **Vendor docs:** https://www.krea.ai
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $7.19 per 1M image tok
- **About:** Krea 2 Medium is Krea's balanced, cost-efficient image generation model and a practical starting point for a broad range of use cases. Its extensive post-training supports stable, consistent generations, with...

### `krea/krea-2-medium-turbo` — Krea: Krea 2 Medium Turbo

- **OpenRouter:** https://openrouter.ai/krea/krea-2-medium-turbo
- **Vendor docs:** https://www.krea.ai
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $3.59 per 1M image tok
- **About:** Krea 2 Medium Turbo is a distilled, speed-focused variant of Krea 2 Medium from Krea. It is designed for rapid iteration and graphic design exploration where fast generation is the...

### `google/gemini-3.1-flash-lite-image` — Google: Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image)

- **OpenRouter:** https://openrouter.ai/google/gemini-3.1-flash-lite-image
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `image,text` → out `image,text`
- **Context:** 65K · **Tools:** no · **Reasoning:** yes (high, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.25 / $1.5 per 1M tok · web_search $0.01/call; image_out $30 per 1M image tok
- **About:** Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image) is Google's fastest, most cost-efficient Gemini image model, built for high-velocity developer pipelines and rapid-fire visual exploration. It delivers text-to-image generation...

### `openai/gpt-image-2` — OpenAI: GPT Image 2

- **OpenRouter:** https://openrouter.ai/openai/gpt-image-2
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,image` → out `image`
- **Context:** 400K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $8 / $8 per 1M tok · web_search $0.01/call; image_out $30 per 1M image tok
- **About:** OpenAI's latest image generation model. Supports high-fidelity image generation and editing via the dedicated Images API.

### `openai/gpt-image-1` — OpenAI: GPT Image 1

- **OpenRouter:** https://openrouter.ai/openai/gpt-image-1
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,image` → out `image`
- **Context:** 400K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $10 / $10 per 1M tok · web_search $0.01/call; image_out $40 per 1M image tok
- **About:** OpenAI's GPT Image 1 generates and edits images via the dedicated Images API. Features accurate text rendering, transparent backgrounds, and up to 16 reference images for edits.

### `openai/gpt-image-1-mini` — OpenAI: GPT Image 1 Mini

- **OpenRouter:** https://openrouter.ai/openai/gpt-image-1-mini
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,image` → out `image`
- **Context:** 400K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $2.5 / $2.5 per 1M tok · web_search $0.01/call; image_out $8 per 1M image tok
- **About:** A cost-efficient variant of GPT Image 1 for high-quality image generation at reduced latency and cost via OpenAI's dedicated Images API.

### `google/gemini-3.1-flash-image` — Google: Nano Banana 2 (Gemini 3.1 Flash Image)

- **OpenRouter:** https://openrouter.ai/google/gemini-3.1-flash-image
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `image,text` → out `image,text`
- **Context:** 131K · **Tools:** no · **Reasoning:** yes (high, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.5 / $3 per 1M tok · web_search $0.01/call; image_out $60 per 1M image tok
- **About:** Gemini 3.1 Flash Image, a.k.a. "Nano Banana 2," is Google’s latest state of the art image generation and editing model, delivering Pro-level visual quality at Flash speed. It combines advanced...

### `google/gemini-3-pro-image` — Google: Nano Banana Pro (Gemini 3 Pro Image)

- **OpenRouter:** https://openrouter.ai/google/gemini-3-pro-image
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `image,text` → out `image,text`
- **Context:** 131K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $12 per 1M tok · web_search $0.01/call; image_out $120 per 1M image tok; image $2 per 1M; audio $2 per 1M
- **About:** Nano Banana Pro is Google’s most advanced image-generation and editing model, built on Gemini 3 Pro. It extends the original Nano Banana with significantly improved multimodal reasoning, real-world grounding, and...

### `sourceful/riverflow-v2.5-pro` — Sourceful: Riverflow V2.5 Pro

- **OpenRouter:** https://openrouter.ai/sourceful/riverflow-v2.5-pro
- **Modalities:** in `text,image` → out `image`
- **Context:** 32K · **Tools:** no · **Reasoning:** yes (xhigh, high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $31.14 per 1M image tok
- **About:** Riverflow V2.5 Pro is the most powerful variant of Sourceful's Riverflow 2.5 lineup, best for top-tier control and quality-sensitive outputs. The Riverflow 2.5 series is a unified text-to-image and image-to-image...

### `sourceful/riverflow-v2.5-fast` — Sourceful: Riverflow V2.5 Fast

- **OpenRouter:** https://openrouter.ai/sourceful/riverflow-v2.5-fast
- **Modalities:** in `text,image` → out `image`
- **Context:** 32K · **Tools:** no · **Reasoning:** yes (high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $4.55 per 1M image tok
- **About:** Riverflow V2.5 Fast is the speed-optimized variant of Sourceful's Riverflow 2.5 lineup, best for production deployments and latency-critical workflows. The Riverflow 2.5 series is a unified text-to-image and image-to-image family...

### `microsoft/mai-image-2.5` — Microsoft AI: MAI-Image-2.5

- **OpenRouter:** https://openrouter.ai/microsoft/mai-image-2.5
- **Vendor docs:** https://learn.microsoft.com/azure/ai-services/
- **Modalities:** in `text,image` → out `image`
- **Context:** 4K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $5 / $0 per 1M tok · image_out $47 per 1M image tok
- **About:** Microsoft AI's MAI-Image-2.5 is a high-quality image generation model available via Azure AI Foundry. It produces photorealistic and artistic images from text prompts with support for various aspect ratios.

### `x-ai/grok-imagine-image-quality` — SpaceXAI: Grok Imagine Image Quality

- **OpenRouter:** https://openrouter.ai/x-ai/grok-imagine-image-quality
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $11.98 per 1M image tok; image $10000 per 1M
- **About:** Grok Imagine Image Quality is SpaceXAI's fast, high-fidelity image generation and editing model. It accepts text prompts and optional reference images, producing photorealistic outputs at 1K or 2K across a...

### `recraft/recraft-v4.1-pro-vector` — Recraft: Recraft V4.1 Pro Vector

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4.1-pro-vector
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $71.86 per 1M image tok
- **About:** Recraft V4.1 Pro Vector is the vector (SVG) variant of Recraft V4.1 Pro, tuned for high aesthetics. It supports text and image inputs and produces higher-resolution SVG image output across...

### `recraft/recraft-v4.1-vector` — Recraft: Recraft V4.1 Vector

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4.1-vector
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $19.16 per 1M image tok
- **About:** Recraft V4.1 Vector is the vector (SVG) variant of Recraft V4.1, tuned for high aesthetics. It supports text and image inputs and produces SVG image output across multiple aspect ratios,...

### `recraft/recraft-v4.1-utility-pro` — Recraft: Recraft V4.1 Utility Pro

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4.1-utility-pro
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $50.3 per 1M image tok
- **About:** Recraft V4.1 Utility Pro is a general-purpose image generation model from Recraft. It supports text and image inputs with image output at ~2K resolution across multiple aspect ratios — double...

### `recraft/recraft-v4.1-utility` — Recraft: Recraft V4.1 Utility

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4.1-utility
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $8.38 per 1M image tok
- **About:** Recraft V4.1 Utility is a general-purpose image generation model from Recraft. It supports text and image inputs with image output at ~1K resolution across multiple aspect ratios, with typical generation...

### `recraft/recraft-v4.1-pro` — Recraft: Recraft V4.1 Pro

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4.1-pro
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $50.3 per 1M image tok
- **About:** Recraft V4.1 Pro is an image generation model from Recraft tuned for high aesthetics. It supports text and image inputs with image output at ~2K resolution across multiple aspect ratios...

### `recraft/recraft-v4.1` — Recraft: Recraft V4.1

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4.1
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $8.38 per 1M image tok
- **About:** Recraft V4.1 is an image generation model from Recraft tuned for high aesthetics. It supports text and image inputs with image output at ~1K resolution across multiple aspect ratios, with...

### `recraft/recraft-v4-pro-vector` — Recraft: Recraft V4 Pro Vector

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4-pro-vector
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $71.86 per 1M image tok
- **About:** Recraft V4 Pro Vector is the vector (SVG) variant of Recraft V4 Pro. It supports text and image inputs and produces vector image output across multiple aspect ratios at the...

### `recraft/recraft-v4-vector` — Recraft: Recraft V4 Vector

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4-vector
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $19.16 per 1M image tok
- **About:** Recraft V4 Vector is the vector (SVG) variant of Recraft V4. It supports text and image inputs and produces vector image output across multiple aspect ratios. Compared to the raster...

### `recraft/recraft-v4-pro` — Recraft: Recraft V4 Pro

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4-pro
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $59.88 per 1M image tok
- **About:** Recraft V4 Pro is an image generation model from Recraft. It supports text and image inputs with image output at ~2K resolution across multiple aspect ratios, double the resolution of...

### `recraft/recraft-v4` — Recraft: Recraft V4

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v4
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $9.58 per 1M image tok
- **About:** Recraft V4 is an image generation model from Recraft. It supports text and image inputs with image output at ~1K resolution across multiple aspect ratios. It delivers stronger compositional judgment,...

### `recraft/recraft-v3` — Recraft: Recraft V3

- **OpenRouter:** https://openrouter.ai/recraft/recraft-v3
- **Vendor docs:** https://www.recraft.ai/docs
- **Modalities:** in `text,image` → out `image`
- **Context:** 65K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $9.58 per 1M image tok
- **About:** Recraft V3 is an image generation model from Recraft. It supports text and image inputs with image output at ~1K resolution across multiple aspect ratios. Supports the following `image_config` parameters:...

### `openai/gpt-5.4-image-2` — OpenAI: GPT-5.4 Image 2

- **OpenRouter:** https://openrouter.ai/openai/gpt-5.4-image-2
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `image,text,file` → out `image,text`
- **Context:** 272K · **Tools:** no · **Reasoning:** yes (xhigh, high, medium, low, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $8 / $15 per 1M tok · web_search $0.01/call; image_out $30 per 1M image tok
- **About:** [GPT-5.4](https://openrouter.ai/openai/gpt-5.4) Image 2 combines OpenAI's GPT-5.4 model with state-of-the-art image generation capabilities from GPT Image 2. It enables rich multimodal workflows, allowing users to seamlessly move between reasoning, coding, and...

### `google/gemini-3.1-flash-image-preview` — Google: Nano Banana 2 (Gemini 3.1 Flash Image Preview)

- **OpenRouter:** https://openrouter.ai/google/gemini-3.1-flash-image-preview
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `image,text` → out `image,text`
- **Context:** 65K · **Tools:** no · **Reasoning:** yes (high, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.5 / $3 per 1M tok · web_search $0.01/call; image_out $60 per 1M image tok
- **About:** Gemini 3.1 Flash Image Preview, a.k.a. "Nano Banana 2," is Google’s latest state of the art image generation and editing model, delivering Pro-level visual quality at Flash speed. It combines...

### `sourceful/riverflow-v2-pro` — Sourceful: Riverflow V2 Pro

- **OpenRouter:** https://openrouter.ai/sourceful/riverflow-v2-pro
- **Modalities:** in `text,image` → out `image`
- **Context:** 8K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $35.93 per 1M image tok
- **About:** Riverflow V2 Pro is the most powerful variant of Sourceful's Riverflow 2.0 lineup, best for top-tier control and perfect text rendering. The Riverflow 2.0 series represents SOTA performance on image...

### `sourceful/riverflow-v2-fast` — Sourceful: Riverflow V2 Fast

- **OpenRouter:** https://openrouter.ai/sourceful/riverflow-v2-fast
- **Modalities:** in `text,image` → out `image`
- **Context:** 8K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $4.79 per 1M image tok
- **About:** Riverflow V2 Fast is the fastest variant of Sourceful's Riverflow 2.0 lineup, best for production deployments and latency-critical workflows. The Riverflow 2.0 series represents SOTA performance on image generation and...

### `black-forest-labs/flux.2-klein-4b` — Black Forest Labs: FLUX.2 Klein 4B

- **OpenRouter:** https://openrouter.ai/black-forest-labs/flux.2-klein-4b
- **Vendor docs:** https://docs.bfl.ai
- **Hugging Face:** https://huggingface.co/black-forest-labs/FLUX.2-klein-4B
- **Modalities:** in `text,image` → out `image`
- **Context:** 40K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $3.42 per 1M image tok
- **About:** FLUX.2 [klein] 4B is the fastest and most cost-effective model in the FLUX.2 family, optimized for high-throughput use cases while maintaining excellent image quality. Pricing is based on the output...

### `bytedance-seed/seedream-4.5` — ByteDance Seed: Seedream 4.5

- **OpenRouter:** https://openrouter.ai/bytedance-seed/seedream-4.5
- **Vendor docs:** https://seed.bytedance.com
- **Modalities:** in `image,text` → out `image`
- **Context:** 4K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $9.58 per 1M image tok
- **About:** Seedream 4.5 is the latest in-house image generation model developed by ByteDance. Compared with Seedream 4.0, it delivers comprehensive improvements, especially in editing consistency, including better preservation of subject details,...

### `black-forest-labs/flux.2-max` — Black Forest Labs: FLUX.2 Max

- **OpenRouter:** https://openrouter.ai/black-forest-labs/flux.2-max
- **Vendor docs:** https://docs.bfl.ai
- **Modalities:** in `text,image` → out `image`
- **Context:** 46K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $17.09 per 1M image tok
- **About:** FLUX.2 [max] is the new top-tier image model from Black Forest Labs, pushing image quality, prompt understanding, and editing consistency to the highest level yet. Pricing is as follows, [per...

### `black-forest-labs/flux.2-flex` — Black Forest Labs: FLUX.2 Flex

- **OpenRouter:** https://openrouter.ai/black-forest-labs/flux.2-flex
- **Vendor docs:** https://docs.bfl.ai
- **Modalities:** in `text,image` → out `image`
- **Context:** 67K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $14.65 per 1M image tok
- **About:** FLUX.2 [flex] excels at rendering complex text, typography, and fine details, and supports multi-reference editing in the same unified architecture. Pricing is as follows, [per the docs](https://bfl.ai/pricing?category=flux.2): We charge $0.06...

### `black-forest-labs/flux.2-pro` — Black Forest Labs: FLUX.2 Pro

- **OpenRouter:** https://openrouter.ai/black-forest-labs/flux.2-pro
- **Vendor docs:** https://docs.bfl.ai
- **Modalities:** in `text,image` → out `image`
- **Context:** 46K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok · image_out $7.32 per 1M image tok
- **About:** A high-end image generation and editing model focused on frontier-level visual quality and reliability. It delivers strong prompt adherence, stable lighting, sharp textures, and consistent character/style reproduction across multi-reference inputs....

### `google/gemini-3-pro-image-preview` — Google: Nano Banana Pro (Gemini 3 Pro Image Preview)

- **OpenRouter:** https://openrouter.ai/google/gemini-3-pro-image-preview
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `image,text` → out `image,text`
- **Context:** 65K · **Tools:** no · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $12 per 1M tok · web_search $0.01/call; image_out $120 per 1M image tok; image $2 per 1M; audio $2 per 1M
- **About:** Nano Banana Pro is Google’s most advanced image-generation and editing model, built on Gemini 3 Pro. It extends the original Nano Banana with significantly improved multimodal reasoning, real-world grounding, and...

### `openai/gpt-5-image-mini` — OpenAI: GPT-5 Image Mini

- **OpenRouter:** https://openrouter.ai/openai/gpt-5-image-mini
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `file,image,text` → out `image,text`
- **Context:** 400K · **Tools:** no · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $2.5 / $2 per 1M tok · web_search $0.01/call; image_out $8 per 1M image tok
- **About:** GPT-5 Image Mini combines OpenAI's advanced language capabilities, powered by [GPT-5 Mini](https://openrouter.ai/openai/gpt-5-mini), with GPT Image 1 Mini for efficient image generation. This natively multimodal model features superior instruction following, text...

### `openai/gpt-5-image` — OpenAI: GPT-5 Image

- **OpenRouter:** https://openrouter.ai/openai/gpt-5-image
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `image,text,file` → out `image,text`
- **Context:** 400K · **Tools:** no · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $10 / $10 per 1M tok · web_search $0.01/call; image_out $40 per 1M image tok
- **About:** [GPT-5](https://openrouter.ai/openai/gpt-5) Image combines OpenAI's GPT-5 model with state-of-the-art image generation capabilities. It offers major improvements in reasoning, code quality, and user experience while incorporating GPT Image 1's superior instruction following,...

### `google/gemini-2.5-flash-image` — Google: Nano Banana (Gemini 2.5 Flash Image)

- **OpenRouter:** https://openrouter.ai/google/gemini-2.5-flash-image
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `image,text` → out `image,text`
- **Context:** 32K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.3 / $2.5 per 1M tok · web_search $0.01/call; image_out $30 per 1M image tok; image $0.3 per 1M; audio $1 per 1M
- **About:** Gemini 2.5 Flash Image, a.k.a. "Nano Banana," is now generally available. It is a state of the art image generation model with contextual understanding. It is capable of image generation,...

