# First-party model labs (September 2026)

Full OpenRouter ID lists: [models-by-provider.md](models-by-provider.md). Prices are **USD per 1M tokens** unless noted. Re-verify official pricing URLs before production quotes.

Implementation skills (do not duplicate code here): [openai-sdk](../../openai-sdk/SKILL.md), [anthropic-sdk](../../anthropic-sdk/SKILL.md), [google-genai](../../google-genai/SKILL.md), [mistral-sdk](../../mistral-sdk/SKILL.md), [cohere-sdk](../../cohere-sdk/SKILL.md), [deepseek-sdk](../../deepseek-sdk/SKILL.md).

---

## OpenAI

- **Slug:** `openai` · **HQ:** United States · **Trains:** No (OpenRouter) · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://platform.openai.com/docs · **Pricing:** https://developers.openai.com/api/docs/pricing · https://openai.com/api/pricing/
- **Base URL:** `https://api.openai.com/v1` · **Env:** `OPENAI_API_KEY`
- **Fit:** First-party Responses API, computer use, web search, code interpreter, realtime audio, enterprise data residency (10% uplift on eligible models).
- **First-party IDs (openai-sdk catalog):** `gpt-6-astra`, `gpt-5.6-sol`/`terra`/`luna` (+ `-pro`), `o3`/`o3-pro`, `o4-mini`, `gpt-image-2`, `sora-2-pro`, `text-embedding-3-*`. OpenRouter also still lists GPT-5.x / GPT-4o / 3.5 SKUs.
- **OpenRouter models (63 unique IDs, Sep 2026):**
  - `openai/gpt-image-2.5-sunburst`
  - `openai/gpt-image-2.5-flare`
  - `openai/gpt-6-astra`
  - `openai/gpt-6-astra-pro`
  - `openai/gpt-transcribe`
  - `openai/gpt-5.6-luna-pro`
  - `openai/gpt-5.6-luna`
  - `openai/gpt-5.6-terra-pro`
  - `openai/gpt-5.6-terra`
  - `openai/gpt-5.6-sol-pro`
  - `openai/gpt-5.6-sol`
  - `openai/gpt-image-2`
  - `openai/gpt-image-1`
  - `openai/gpt-image-1-mini`
  - `openai/gpt-chat-latest`
  - `openai/gpt-4o-mini-transcribe`
  - `openai/whisper-1`
  - `openai/gpt-4o-transcribe`
  - `openai/gpt-5.5-pro`
  - `openai/gpt-5.5`
  - `openai/gpt-5.4-image-2`
  - `openai/sora-2-pro`
  - `openai/gpt-5.4-nano`
  - `openai/gpt-5.4-mini`
  - `openai/gpt-5.4-pro`
  - `openai/gpt-5.4`
  - `openai/gpt-5.3-codex`
  - `openai/gpt-audio`
  - `openai/gpt-audio-mini`
  - `openai/gpt-5.2-pro`
  - `openai/gpt-5.2`
  - `openai/gpt-5.1`
  - `openai/text-embedding-ada-002`
  - `openai/text-embedding-3-large`
  - `openai/text-embedding-3-small`
  - `openai/gpt-5-image-mini`
  - `openai/gpt-5-image`
  - `openai/gpt-5-pro`
  - `openai/gpt-5`
  - `openai/gpt-5-mini`
  - `openai/gpt-5-nano`
  - `openai/o3-pro`
  - `openai/o4-mini-high`
  - `openai/o3`
  - `openai/o4-mini`
  - `openai/gpt-4.1`
  - `openai/gpt-4.1-mini`
  - `openai/gpt-4.1-nano`
  - `openai/o1-pro`
  - `openai/o3-mini-high`
  - `openai/o3-mini`
  - `openai/o1`
  - `openai/gpt-4o-2024-11-20`
  - `openai/gpt-4o-2024-08-06`
  - `openai/gpt-4o-mini`
  - `openai/gpt-4o-mini-2024-07-18`
  - `openai/gpt-4o`
  - `openai/gpt-4o-2024-05-13`
  - `openai/gpt-4-turbo`
  - `openai/gpt-3.5-turbo-instruct`
  - `openai/gpt-3.5-turbo-16k`
  - `openai/gpt-3.5-turbo`
  - `openai/gpt-4`
- **Pricing snapshot (Sep 2026, short context, developers.openai.com):**

| Model | Input | Cached input | Output |
| :--- | ---: | ---: | ---: |
| `gpt-6-astra` | $10.00 | $1.00 | $50.00 |
| `gpt-5.6-sol` | $4.00 | $0.40 | $20.00 |
| `gpt-5.6-terra` | $2.00 | $0.20 | $12.00 |
| `gpt-5.6-luna` | $0.20 | $0.02 | $1.20 |

Marketing page (openai.com/api/pricing) may still list GPT-5.5 / 5.4 names; prefer the **developers.openai.com** table and `GET /v1/models`.

---

## Anthropic

- **Slug:** `anthropic` · **HQ:** United States · **Retention:** 30 days · **BYOK:** Yes
- **Docs:** https://docs.anthropic.com · **Pricing:** https://docs.anthropic.com/en/docs/about-claude/pricing · https://claude.com/pricing
- **Base URL:** `https://api.anthropic.com` · **Env:** `ANTHROPIC_API_KEY` · header `x-api-key` + `anthropic-version`
- **Fit:** Claude Messages API, prompt caching, extended thinking, long-horizon coding agents.
- **First-party IDs (anthropic-sdk catalog):** `claude-fable-5-1`, `claude-mythos-5-1` (limited), `claude-opus-5`, `claude-sonnet-5`, `claude-haiku-4-5`, plus 4.x. Mythos is documented by Anthropic but not on this OpenRouter snapshot.
- **OpenRouter models (11 unique IDs, Sep 2026):**
  - `anthropic/claude-fable-5.1`
  - `anthropic/claude-opus-5`
  - `anthropic/claude-sonnet-5`
  - `anthropic/claude-fable-5`
  - `anthropic/claude-opus-4.8`
  - `anthropic/claude-opus-4.7`
  - `anthropic/claude-sonnet-4.6`
  - `anthropic/claude-opus-4.6`
  - `anthropic/claude-opus-4.5`
  - `anthropic/claude-haiku-4.5`
  - `anthropic/claude-sonnet-4.5`
- **Pricing snapshot (Sep 2026, docs.anthropic.com, input / output per MTok):** Fable 5.1 $10 / $50; Opus 5 $5 / $25; Sonnet 5 $2 / $10 (standard, not a sunset promo); Haiku 4.5 $1 / $5. Cache hits 0.025× input on Fable/Mythos 5.1, else 0.1×.

Also billed via **Claude Platform on AWS** (CCUs through AWS Marketplace) and Bedrock / Vertex partner SKUs. See [cloud-platforms.md](cloud-platforms.md).

---

## Google (AI Studio + Vertex)

Two OpenRouter rows, one model family.

### Google AI Studio (Gemini Developer API)

- **Slug:** `google-ai-studio` · **Retention:** 55 days (OpenRouter) · **BYOK:** Yes
- **Docs:** https://ai.google.dev/gemini-api/docs · **Pricing:** https://ai.google.dev/gemini-api/docs/pricing
- **Env:** `GEMINI_API_KEY` / `GOOGLE_API_KEY` · SDK: `@google/genai` / `google-genai`
- **Fit:** Fastest path to Gemini, Veo, Nano Banana image, Live/voice. Interactions API is the default as of June 2026; `generateContent` is legacy.
- **First-party IDs (google-genai skill):** `gemini-3.8-flash`, `gemini-3.7-flash`, `gemini-3.1-pro`, `gemini-3.1-flash-lite`, plus image/Omni/embedding SKUs.
- **OpenRouter models (26 unique IDs, Sep 2026):**
  - `google/gemini-3.8-flash`
  - `google/gemini-3.7-flash`
  - `google/gemini-3.6-flash`
  - `google/gemini-3.5-flash-lite`
  - `google/gemini-3.1-flash-lite-image`
  - `google/gemini-3.1-flash-image`
  - `google/gemini-3-pro-image`
  - `google/gemini-embedding-2`
  - `google/gemini-3.5-flash`
  - `google/gemini-3.1-flash-lite`
  - `google/gemini-embedding-2-preview`
  - `google/gemma-4-26b-a4b-it:free`
  - `google/gemma-4-31b-it:free`
  - `google/lyria-3-pro-preview`
  - `google/lyria-3-clip-preview`
  - `google/gemini-3.1-flash-lite-preview`
  - `google/gemini-3.1-flash-image-preview`
  - `google/gemini-3.1-pro-preview-customtools`
  - `google/gemini-3.1-pro-preview`
  - `google/gemini-3-flash-preview`
  - `google/gemini-3-pro-image-preview`
  - `google/gemini-embedding-001`
  - `google/gemini-2.5-flash-image`
  - `google/gemini-2.5-flash-lite`
  - `google/gemini-2.5-flash`
  - `google/gemini-2.5-pro`
- **Pricing snapshot:** Gemini 3.8 Flash paid tier **$0.75 / $3.75** per 1M in/out through **31 Dec 2026**, then **$1.50 / $7.50** from 1 Jan 2027. Free tier exists with limits.

### Google Vertex / Gemini Enterprise Agent Platform

- **Slug:** `google-vertex` · **Retention:** Zero (OpenRouter) · **BYOK:** Yes
- **Docs:** https://cloud.google.com/vertex-ai/docs · OpenAI-compat: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/openai
- **Pricing:** https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing
- **Fit:** GCP IAM, VPC-SC, regional endpoints, Batch. Same Gemini 3.8 Flash intro pricing globally; non-global endpoints ~10% higher.
- Vertex OpenRouter catalog mixes **Gemini**, **Claude**, **Gemma**, **Llama**, **DeepSeek**, **Qwen**, **GLM**, **Kimi**, **MiniMax**, **gpt-oss**.
- **OpenRouter models (52 unique IDs, Sep 2026):**
  - `google/gemini-3.8-flash`
  - `anthropic/claude-fable-5.1`
  - `google/gemini-3.7-flash`
  - `anthropic/claude-opus-5`
  - `google/gemini-3.6-flash`
  - `google/gemini-3.5-flash-lite`
  - `anthropic/claude-sonnet-5`
  - `google/gemini-3.1-flash-lite-image`
  - `google/gemini-3.1-flash-image`
  - `google/gemini-3-pro-image`
  - `anthropic/claude-fable-5`
  - `anthropic/claude-opus-4.8`
  - `google/gemini-embedding-2`
  - `google/gemini-3.5-flash`
  - `google/gemini-3.1-flash-lite`
  - `google/chirp-3`
  - `google/gemini-3.1-flash-tts-preview`
  - `google/veo-3.1-fast`
  - `google/veo-3.1-lite`
  - `anthropic/claude-opus-4.7`
  - `google/gemma-4-26b-a4b-it`
  - `google/veo-3.1`
  - `google/gemini-3.1-pro-preview`
  - `anthropic/claude-sonnet-4.6`
  - `anthropic/claude-opus-4.6`
  - `z-ai/glm-4.7`
  - `google/gemini-3-flash-preview`
  - `deepseek/deepseek-v3.2`
  - `anthropic/claude-opus-4.5`
  - `moonshotai/kimi-k2-thinking`
  - `google/gemini-embedding-001`
  - `minimax/minimax-m2`
  - `anthropic/claude-haiku-4.5`
  - `google/gemini-2.5-flash-image`
  - `anthropic/claude-sonnet-4.5`
  - `qwen/qwen3-next-80b-a3b-thinking`
  - `qwen/qwen3-next-80b-a3b-instruct`
  - `deepseek/deepseek-chat-v3.1`
  - `openai/gpt-oss-120b`
  - `openai/gpt-oss-20b`
  - `anthropic/claude-opus-4.1`
  - `qwen/qwen3-coder`
  - `google/gemini-2.5-flash-lite`
  - `qwen/qwen3-235b-a22b-2507`
  - `google/gemini-2.5-flash`
  - `google/gemini-2.5-pro`
  - `google/gemini-2.5-pro-preview`
  - `anthropic/claude-opus-4`
  - `anthropic/claude-sonnet-4`
  - `meta-llama/llama-4-maverick`
  - `meta-llama/llama-4-scout`
  - `meta-llama/llama-3.3-70b-instruct`

---

## xAI / SpaceXAI (Grok)

OpenRouter lists **SpaceXAI**; first-party API is **xAI** (`api.x.ai`). Slug: `xai`.

- **HQ:** United States · **Retention:** 30 days · **BYOK:** Yes
- **Docs:** https://docs.x.ai · **Pricing:** https://docs.x.ai/developers/pricing
- **Base URL:** `https://api.x.ai/v1` · **Env:** `XAI_API_KEY`
- **Fit:** Grok reasoning, 500k–1M context, web/X search, code execution. Prefer **Responses API**.
- **First-party IDs:** `grok-4.6` (500k), `grok-4.5`, `grok-4.3` (1M), `grok-4.20`, `grok-4.20-multi-agent`, `grok-build-0.1`, plus Imagine image/video and STT/TTS.
- **OpenRouter models (12 unique IDs, Sep 2026):**
  - `x-ai/grok-4.6`
  - `x-ai/grok-imagine-image-2.0`
  - `x-ai/grok-stt-1.0`
  - `x-ai/grok-imagine-video-1.5`
  - `x-ai/grok-4.5`
  - `x-ai/grok-build-0.1`
  - `x-ai/grok-imagine-video`
  - `x-ai/grok-imagine-image-quality`
  - `x-ai/grok-voice-tts-1.0`
  - `x-ai/grok-4.3`
  - `x-ai/grok-4.20-multi-agent`
  - `x-ai/grok-4.20`
- **Pricing snapshot (Sep 2026, prompts &lt; 200k):** `grok-4.6` $2.00 in / $0.50 cached / $6.00 out. Prompts ≥ 200k double. Batch discounts exist.

---

## Mistral

- **Slug:** `mistral` · **HQ:** France · **Retention:** 30 days · **BYOK:** Yes
- **Docs:** https://docs.mistral.ai · **Pricing:** https://docs.mistral.ai/inference/pricing
- **Base URL:** `https://api.mistral.ai/v1` · **Env:** `MISTRAL_API_KEY`
- **Fit:** EU-headquartered lab, OCR, audio (Voxtral), Codestral, hosted third-party GLM.
- **First-party IDs (mistral-sdk):** `mistral-large-latest` (Large 3), `mistral-medium-latest` (3.5), `mistral-small-latest` (Small 4), Ministral 3, `codestral-latest`. OpenRouter also lists hosted `z-ai/glm-5.3` on Mistral.
- **OpenRouter models (19 unique IDs, Sep 2026):**
  - `z-ai/glm-5.3`
  - `mistralai/voxtral-mini-transcribe`
  - `mistralai/mistral-medium-3-5`
  - `mistralai/voxtral-mini-tts-2603`
  - `mistralai/mistral-small-2603`
  - `mistralai/devstral-2512`
  - `mistralai/ministral-14b-2512`
  - `mistralai/ministral-8b-2512`
  - `mistralai/ministral-3b-2512`
  - `mistralai/mistral-embed-2312`
  - `mistralai/codestral-embed-2505`
  - `mistralai/voxtral-small-24b-2507`
  - `mistralai/mistral-medium-3.1`
  - `mistralai/codestral-2508`
  - `mistralai/mistral-medium-3`
  - `mistralai/mistral-saba`
  - `mistralai/mistral-large-2407`
  - `mistralai/mixtral-8x22b-instruct`
  - `mistralai/mistral-large`
- **Pricing snapshot (EUR, standard, Sep 2026):** Large 3 €0.44 / €1.3; Medium 3.5 €1.25 / €6.4; Small 4 €0.12 / €0.5. Regional inference toggle on the pricing page.

---

## DeepSeek

- **Slug:** `deepseek` · **HQ:** China · **Trains:** Yes · **Retention:** retains prompts · **BYOK:** Yes
- **Docs / pricing:** https://api-docs.deepseek.com/quick_start/pricing
- **Base URL:** `https://api.deepseek.com` (OpenAI) · Anthropic-compat: `https://api.deepseek.com/anthropic` · **Env:** `DEEPSEEK_API_KEY`
- **Fit:** High intelligence per dollar; 1M context; thinking mode. Do **not** use retired `deepseek-chat` / `deepseek-reasoner`.
- **First-party IDs (deepseek-sdk):** `deepseek-flash` (maps to V4.1-Flash), `deepseek-v4-pro`. OpenRouter IDs below.
- **OpenRouter models (2 unique IDs, Sep 2026):**
  - `deepseek/deepseek-v4.1-flash`
  - `deepseek/deepseek-v4-pro-0813`
- **Pricing snapshot:** Flash cache-miss off-peak **$0.15 / $0.60**, peak **$0.30 / $1.20**. V4-Pro cache-miss off-peak **$0.66 / $1.98**. Cache hits are much cheaper. Context 1M, max output 384K.

---

## Cohere

- **Slug:** `cohere` · **HQ:** United States · **Retention:** 30 days · **BYOK:** Yes
- **Docs:** https://docs.cohere.com · **Pricing:** https://cohere.com/pricing
- **Base URL:** `https://api.cohere.ai` · OpenAI-compat: `https://api.cohere.ai/compatibility/v1` · **Env:** `COHERE_API_KEY`
- **Fit:** RAG, Embed v4, Rerank v4, enterprise Model Vault (hourly instances).
- **First-party IDs (cohere-sdk):** Command A+ / Command A / Command R7B, Embed v4, Rerank v4. OpenRouter snapshot below (includes North Mini Code free and Rerank 4). Legacy Command R+ 08-2024 $2.50 / $10 (FAQ).
- **OpenRouter models (8 unique IDs, Sep 2026):**
  - `cohere/north-mini-code:free`
  - `cohere/rerank-4-pro`
  - `cohere/rerank-4-fast`
  - `cohere/rerank-v3.5`
  - `cohere/command-a`
  - `cohere/command-r7b-12-2024`
  - `cohere/command-r-08-2024`
  - `cohere/command-r-plus-08-2024`

---

## Meta (Llama / Muse)

- **Slug:** `meta` · **HQ:** United States · **Retention:** 30 days · **BYOK:** Yes
- **Docs / pricing:** https://ai.developer.meta.com/docs/pricing-rate-limits/
- **Fit:** Official Meta Model API for Llama-line and Muse (image $0.01/image, Voice Transcribe $0.18/hour). Open weights also run on inference hosts (often cheaper).
- OpenRouter’s **Meta** row is Muse APIs, not Llama 4 (Llama is on Groq/Together/DeepInfra/Vertex).
- **OpenRouter models (7 unique IDs, Sep 2026):**
  - `meta/muse-voice-transcribe-1.0`
  - `meta/muse-spark-1.3-contributor`
  - `meta/muse-spark-1.3`
  - `meta/muse-image`
  - `meta/muse-spark-1.2-contributor`
  - `meta/muse-spark-1.2`
  - `meta/muse-spark-1.1`
- **Pricing snapshot (Standard text, Sep 2026):** input $1.25, cached $0.15, output $4.25 per 1M. Contributor tier much cheaper ($0.10 / $0.20).

---

## Z.ai (GLM)

- **Slug:** `z-ai` · **HQ:** Singapore · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.z.ai · **Pricing:** https://docs.z.ai/guides/overview/pricing
- **Base URL:** `https://api.z.ai/api/paas/v4/` · **Env:** Z.ai API key
- **OpenRouter models (13 unique IDs, Sep 2026):**
  - `z-ai/glm-5.3-flash`
  - `z-ai/glm-5.3`
  - `z-ai/glm-5.2`
  - `z-ai/glm-5.1`
  - `z-ai/glm-5v-turbo`
  - `z-ai/glm-5-turbo`
  - `z-ai/glm-5`
  - `z-ai/glm-4.7`
  - `z-ai/glm-4.6v`
  - `z-ai/glm-4.6`
  - `z-ai/glm-4.5v`
  - `z-ai/glm-4.5`
  - `z-ai/glm-4.5-air`
- **Pricing snapshot:** GLM-5.3 $1.4 / $4.4; GLM-5.3-Flash $0.15 / $0.50 (promo halves listed); GLM-4.7-FlashX $0.07 / $0.40; several Flash SKUs free.

---

## Moonshot AI (Kimi)

- **Slug:** `moonshotai` · **HQ:** Singapore · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://platform.moonshot.ai/docs · **Base URL:** `https://api.moonshot.ai/v1` · **Env:** `MOONSHOT_API_KEY`
- **Fit:** Long-horizon coding / agentic Kimi models. Aggregators quote Kimi K2.6 around $0.66 / $3.50 (EUrouter) — **re-fetch Moonshot’s own price list**.
- **OpenRouter models (3 unique IDs, Sep 2026):**
  - `moonshotai/kimi-k3`
  - `moonshotai/kimi-k2.7-code`
  - `moonshotai/kimi-k2.6`

---

## MiniMax

- **Slug:** `minimax` · **HQ:** Singapore · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://platform.minimax.io/docs · **Base URL:** `https://api.minimax.io/v1` · **Env:** MiniMax API key
- **First-party IDs:** `MiniMax-M3` (adaptive thinking), M2.x (thinking always on), Hailuo video, Speech 2.8.
- **OpenRouter models (13 unique IDs, Sep 2026):**
  - `minimax/hailuo-3-max`
  - `minimax/hailuo-3`
  - `minimax/speech-2.8-hd`
  - `minimax/speech-2.8-turbo`
  - `minimax/minimax-m3`
  - `minimax/hailuo-2.3`
  - `minimax/minimax-m2.7`
  - `minimax/minimax-m2.5`
  - `minimax/minimax-m2-her`
  - `minimax/minimax-m2.1`
  - `minimax/minimax-m2`
  - `minimax/minimax-m1`
  - `minimax/minimax-01`
- **Fit:** Agentic coding with interleaved thinking; also via Tencent TokenHub as `minimax-m3`.

---

## NVIDIA (NIM)

- **Slug:** `nvidia` · **HQ:** United States · **Trains:** Yes · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://docs.nvidia.com/nim · **API:** `https://integrate.api.nvidia.com/v1` · **Env:** `NVIDIA_API_KEY`
- **Fit:** Nemotron open models + hosted NIM. OpenRouter flags **trains = Yes** — do not use for data that cannot be used for training unless a contract says otherwise.
- NIM also serves these as first-party. OpenRouter flags several as `:free`.
- **OpenRouter models (8 unique IDs, Sep 2026):**
  - `nvidia/nemotron-3.5-lightning:free`
  - `nvidia/nemotron-3-embed-1b:free`
  - `nvidia/llama-nemotron-rerank-vl-1b-v2:free`
  - `nvidia/nemotron-3.5-content-safety:free`
  - `nvidia/nemotron-3-ultra-550b-a55b:free`
  - `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free`
  - `nvidia/nemotron-3-super-120b-a12b:free`
  - `nvidia/llama-nemotron-embed-vl-1b-v2:free`

---

## Perplexity

- **Slug:** `perplexity` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.perplexity.ai · **Base URL:** `https://api.perplexity.ai` · **Env:** `PERPLEXITY_API_KEY`
- **Fit:** Grounded search plus Agent/Responses wrapping third-party labs. Not a generic chat substitute without search.
- **OpenRouter models (7 unique IDs, Sep 2026):**
  - `perplexity/pplx-embed-v1-4b`
  - `perplexity/pplx-embed-v1-0.6b`
  - `perplexity/sonar-pro-search`
  - `perplexity/sonar-reasoning-pro`
  - `perplexity/sonar-pro`
  - `perplexity/sonar-deep-research`
  - `perplexity/sonar`

---

## Other labs on the OpenRouter table

Complete IDs: [models-by-provider.md](models-by-provider.md).

| Provider | Slug | OpenRouter models | Fit |
| :--- | :--- | :--- | :--- |
| Xiaomi | `xiaomi` | `xiaomi/mimo-v2.5-pro`, `xiaomi/mimo-v2.5` | Regional China MiMo |
| Upstage | `upstage` | `upstage/solar-pro4`, `upstage/solar-pro-3` | Korean NLP / OCR (Solar) |
| Poolside | `poolside` | `poolside/laguna-s-2.1`, `poolside/laguna-s-2.1:free`, `poolside/laguna-xs-2.1`, `poolside/laguna-xs-2.1:free` | Private coding models |
| Thinking Machines | `thinkingmachines` | `thinkingmachines/inkling-small:free`, `thinkingmachines/inkling:free` | Research; trains=Yes, not ZDR |
| Nex AGI | `nex-agi` | `nex-agi/nex-n2.5-mini:free`, `nex-agi/nex-n2.5-pro:free` | Regional China |
| Reka AI | `reka` | `z-ai/glm-5.3-flash`, `z-ai/glm-5.3`, `qwen/qwen3.8-27b`, `deepseek/deepseek-v4-flash-0731`, `rekaai/reka-edge`, `rekaai/reka-flash-3` | Vision-language; OpenRouter also routes GLM/Qwen/DeepSeek on this slug |
| Inception | `inception` | `inception/mercury-2.5`, `inception/mercury-2` | Low-latency Mercury |
| Liquid | `liquid` | `liquid/lfm-2.5-embedding-350m:free`, `liquid/lfm-2.5-2.6b:free` | LFM; trains=Yes |
| Seed | `seed` | `bytedance-seed/seedream-5-0-lite`, `bytedance-seed/seedream-5-0-pro`, `bytedance/seedance-2.0-mini`, `bytedance-seed/seed-2-1-turbo`, `bytedance-seed/seed-2.0-code`, `bytedance/seedance-2.5`, `bytedance/seedance-2.0`, `bytedance/seedance-2.0-fast`, `bytedance/seedance-1-5-pro`, `bytedance-seed/seed-2.0-lite`, `bytedance-seed/seed-2.0-mini`, `bytedance-seed/seedream-4.5`, `bytedance-seed/seed-1.6-flash`, `bytedance-seed/seed-1.6` | ByteDance Seed/Seedance/Seedream |
| StepFun | `stepfun` | `stepfun/step-3.7-flash` | High-volume China model |
| Sakana | `sakana` | `sakana/fugu-ultra-v2`, `sakana/fugu-max`, `sakana/sakana-namazu`, `sakana/fugu-ultra` | Japanese research models |
| Arcee AI | `arcee-ai` | `arcee-ai/trinity-large-thinking` | Small specialized LLMs |
| Perceptron | `perceptron` | `perceptron/perceptron-mk1` | VLM |

AI21 (`ai21`) and Inflection (`inflection`) are in the OpenRouter slug enum but had **no** routed models on this snapshot.
