# Specialized APIs (September 2026)

Full OpenRouter ID lists: [models-by-provider.md](models-by-provider.md).

**Capability catalogs with descriptions and links:** [image-models.md](image-models.md) · [video-models.md](video-models.md) · [audio-music-models.md](audio-music-models.md) · [chat-agent-models.md](chat-agent-models.md).

Narrow-modality **providers** (who to contract). Do not pick these as general LLM backends.

---

## Embeddings and rerank

### Voyage AI by MongoDB

- **Slug:** `voyageai` · **Retention:** retains prompts · **BYOK:** Yes
- **Docs / pricing:** https://docs.voyageai.com/docs/pricing · https://docs.voyageai.com
- **Fit:** High-quality text embeddings and rerankers for RAG.
- **OpenRouter models (7 unique IDs, Sep 2026):**
  - `voyageai/voyage-code-4`
  - `voyageai/rerank-2.5-lite`
  - `voyageai/rerank-2.5`
  - `voyageai/voyage-multimodal-3.5`
  - `voyageai/voyage-4-lite`
  - `voyageai/voyage-4`
  - `voyageai/voyage-4-large`
- **Pricing snapshot:** First 200M tokens free on current voyage-4 family (per docs). Then per-million rates on the pricing table (e.g. older `voyage-3.5-lite` $0.02/M, `voyage-3-large` $0.18/M). Re-fetch the table for voyage-4 SKUs.

OpenAI, Cohere, Google, and Mistral also sell embeddings — see [labs.md](labs.md).

---

## Speech

### Deepgram

- **Slug:** `deepgram` · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://developers.deepgram.com · **Fit:** STT (Nova family). Call Deepgram directly for production audio.
- **OpenRouter models (3 unique IDs, Sep 2026):**
  - `deepgram/flux-tts:free`
  - `deepgram/aura-2`
  - `deepgram/nova-3`
- **Aggregator quote:** Nova-3 ~$0.0043/min — **verify Deepgram pricing page**.

### Fish Audio

- **Slug:** `fish-audio` · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.fish.audio · **Fit:** TTS / voice cloning.
- **OpenRouter models (5 unique IDs, Sep 2026):**
  - `fish-audio/transcribe-1`
  - `fish-audio/s1`
  - `fish-audio/s2-pro`
  - `fish-audio/s2.1-pro-free:free`
  - `fish-audio/s2.1-pro`

---

## Image

### Black Forest Labs (FLUX)

- **Slug:** `black-forest-labs` · **Retention:** 30 days · **BYOK:** No
- **Docs:** https://docs.bfl.ai · **Site:** https://blackforestlabs.ai
- **Fit:** FLUX image generation. LiteLLM has a BFL image provider page.
- **OpenRouter models (7 unique IDs, Sep 2026):**
  - `black-forest-labs/flux-video-edit`
  - `black-forest-labs/flux-video-upscale`
  - `black-forest-labs/flux-3-video`
  - `black-forest-labs/flux.2-klein-4b`
  - `black-forest-labs/flux.2-max`
  - `black-forest-labs/flux.2-flex`
  - `black-forest-labs/flux.2-pro`
- **Pricing:** Credit / megapixel — confirm docs.bfl.ai (not token-priced like LLMs).

### Recraft

- **Slug:** `recraft` · **Retention:** retains prompts · **BYOK:** No
- **Site:** https://www.recraft.ai · LiteLLM: Recraft image provider
- **Fit:** Design-oriented image models.
- **OpenRouter models (15 unique IDs, Sep 2026):**
  - `recraft/recraft-v4-styles-pro`
  - `recraft/recraft-v4-styles-vector`
  - `recraft/recraft-v4-styles-pro-vector`
  - `recraft/recraft-v4-styles`
  - `recraft/recraft-v4.1-pro-vector`
  - `recraft/recraft-v4.1-vector`
  - `recraft/recraft-v4.1-utility-pro`
  - `recraft/recraft-v4.1-utility`
  - `recraft/recraft-v4.1-pro`
  - `recraft/recraft-v4.1`
  - `recraft/recraft-v4-pro-vector`
  - `recraft/recraft-v4-vector`
  - `recraft/recraft-v4-pro`
  - `recraft/recraft-v4`
  - `recraft/recraft-v3`

### Krea

- **Slug:** `krea` · **HQ:** United States · **Retention:** Zero · **BYOK:** No
- **Site:** https://www.krea.ai · **Fit:** Realtime / aesthetic image.
- **OpenRouter models (3 unique IDs, Sep 2026):**
  - `krea/krea-2-large`
  - `krea/krea-2-medium`
  - `krea/krea-2-medium-turbo`

---

## Video

### Runway

- **Slug:** `runway` · **HQ:** United States · **Retention:** retains prompts · **BYOK:** No
- **Docs:** https://docs.dev.runwayml.com · **Fit:** Gen video. Credits (~$0.01/credit on some plans — verify).
- **OpenRouter models (2 unique IDs, Sep 2026):**
  - `runway/aleph-2`
  - `runway/gen-4.5`

### HeyGen

- **Slug:** `heygen` · **HQ:** United States · **Retention:** retains prompts · **BYOK:** No
- **Docs:** https://docs.heygen.com · **Fit:** Avatar video. Avatar III quoted ~$0.0167/s — verify HeyGen billing.
- **OpenRouter models (1 unique IDs, Sep 2026):**
  - `heygen/avatar-iv`

### Decart

- **Slug:** `decart` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Site:** https://decart.ai · **Fit:** Realtime/video-ish models.
- **OpenRouter models (4 unique IDs, Sep 2026):**
  - `z-ai/glm-5.3`
  - `z-ai/glm-5.2`
  - `z-ai/glm-5.2:free`
  - `moonshotai/kimi-k2.6`

---

## Coding apply / morphing

### Morph

- **Slug:** `morph` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.morphllm.com (confirm live) · **Fit:** Fast apply / merge models for coding agents. Distinct from general chat.
- **OpenRouter models (6 unique IDs, Sep 2026):**
  - `deepseek/deepseek-v4.1-flash`
  - `z-ai/glm-5.3`
  - `deepseek/deepseek-v4-flash-0731`
  - `moonshotai/kimi-k3`
  - `morph/morph-v3-large`
  - `morph/morph-v3-fast`

Relace (see [inference-hosts.md](inference-hosts.md)) is in the same “fast apply” neighborhood.

---

## Confidential / TEE inference

### Phala

- **Slug:** `phala` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.phala.com/phala-cloud/confidential-ai/confidential-model/confidential-ai-api
- **Base URL:** `https://inference.phala.com/v1`
- **Fit:** OpenAI-compat chat **inside TEE** with attestation + per-response receipts (`x-receipt-id`). Use `is_tee` on `GET /v1/models`.
- **OpenRouter models (21 unique IDs, Sep 2026):**
  - `deepseek/deepseek-v4.1-flash`
  - `z-ai/glm-5.3-flash`
  - `z-ai/glm-5.3`
  - `qwen/qwen3.8-27b`
  - `deepseek/deepseek-v4-pro-0813`
  - `nvidia/nemotron-3.5-lightning`
  - `meta/muse-glimmer-30b`
  - `deepseek/deepseek-v4-flash-0731`
  - `moonshotai/kimi-k3`
  - `tencent/hy3`
  - `z-ai/glm-5.2`
  - `qwen/qwen3.6-35b-a3b`
  - `qwen/qwen3.6-27b`
  - `deepseek/deepseek-v4-flash`
  - `moonshotai/kimi-k2.6`
  - `z-ai/glm-5.1`
  - `qwen/qwen3.5-27b`
  - `qwen/qwen3.5-397b-a17b`
  - `deepseek/deepseek-v3.2`
  - `openai/gpt-oss-120b`
  - `qwen/qwen-2.5-7b-instruct`
- **When:** Proof of confidential compute matters more than raw $/token.

---

## Other specialized / thin rows

| Provider | Slug | OpenRouter models |
| :--- | :--- | :--- |
| Sourceful | `sourceful` | `sourceful/riverflow-v2.5-pro`, `sourceful/riverflow-v2.5-fast`, `sourceful/riverflow-v2-pro`, `sourceful/riverflow-v2-fast` |
| TypeSafe | `typesafe` | `typesafe/jev-1.13` |
| Unbiased | `unbiased` | `unbiased/pareto` |
| AssemblyAI | `assemblyai` | *(none routed)* |

For **Sora, Veo, gpt-image, Muse Image**, use the lab SKUs in [labs.md](labs.md) rather than these specialists.
