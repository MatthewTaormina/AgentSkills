# First-party model labs (September 2026)

Prices are **USD per 1M tokens** unless noted. Re-verify official pricing URLs before production quotes.

Implementation skills (do not duplicate code here): [openai-sdk](../../openai-sdk/SKILL.md), [anthropic-sdk](../../anthropic-sdk/SKILL.md), [google-genai](../../google-genai/SKILL.md), [mistral-sdk](../../mistral-sdk/SKILL.md), [cohere-sdk](../../cohere-sdk/SKILL.md), [deepseek-sdk](../../deepseek-sdk/SKILL.md).

---

## OpenAI

- **Slug:** `openai` · **HQ:** United States · **Trains:** No (OpenRouter) · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://platform.openai.com/docs · **Pricing:** https://developers.openai.com/api/docs/pricing · https://openai.com/api/pricing/
- **Base URL:** `https://api.openai.com/v1` · **Env:** `OPENAI_API_KEY`
- **Fit:** First-party Responses API, computer use, web search, code interpreter, realtime audio, enterprise data residency (10% uplift on eligible models).
- **Models (see openai-sdk catalog):** `gpt-6-astra`, `gpt-5.6-sol`, `gpt-5.6-terra`, `gpt-5.6-luna`, `o3` / `o3-pro`, `o4-mini`, `gpt-image-2`, `sora`, embeddings `text-embedding-3-*`.
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
- **Models:** `claude-fable-5-1`, `claude-mythos-5-1` (limited), `claude-opus-5`, `claude-sonnet-5`, `claude-haiku-4-5`, plus 4.x still documented.
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
- **Models (google-genai skill):** `gemini-3.8-flash`, `gemini-3.7-flash`, `gemini-3.1-pro`, `gemini-3.1-flash-lite`, plus 3.1 image / Omni / embedding SKUs on the pricing page.
- **Pricing snapshot:** Gemini 3.8 Flash paid tier **$0.75 / $3.75** per 1M in/out through **31 Dec 2026**, then **$1.50 / $7.50** from 1 Jan 2027. Free tier exists with limits.

### Google Vertex / Gemini Enterprise Agent Platform

- **Slug:** `google-vertex` · **Retention:** Zero (OpenRouter) · **BYOK:** Yes
- **Docs:** https://cloud.google.com/vertex-ai/docs · OpenAI-compat: https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/start/openai
- **Pricing:** https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing
- **Fit:** GCP IAM, VPC-SC, regional endpoints, Batch. Same Gemini 3.8 Flash intro pricing globally; non-global endpoints ~10% higher.

---

## xAI / SpaceXAI (Grok)

OpenRouter lists **SpaceXAI**; first-party API is **xAI** (`api.x.ai`). Slug: `xai`.

- **HQ:** United States · **Retention:** 30 days · **BYOK:** Yes
- **Docs:** https://docs.x.ai · **Pricing:** https://docs.x.ai/developers/pricing
- **Base URL:** `https://api.x.ai/v1` · **Env:** `XAI_API_KEY`
- **Fit:** Grok reasoning, 500k–1M context, web/X search, code execution. Prefer **Responses API**.
- **Models:** `grok-4.6` (500k, default high reasoning), `grok-4.5`, `grok-4.3` (1M), `grok-4.20-*`, `grok-build-0.1`.
- **Pricing snapshot (Sep 2026, prompts &lt; 200k):** `grok-4.6` $2.00 in / $0.50 cached / $6.00 out. Prompts ≥ 200k double. Batch discounts exist.

---

## Mistral

- **Slug:** `mistral` · **HQ:** France · **Retention:** 30 days · **BYOK:** Yes
- **Docs:** https://docs.mistral.ai · **Pricing:** https://docs.mistral.ai/inference/pricing
- **Base URL:** `https://api.mistral.ai/v1` · **Env:** `MISTRAL_API_KEY`
- **Fit:** EU-headquartered lab, OCR, audio (Voxtral), Codestral, hosted third-party GLM.
- **Models:** `mistral-large-latest` (Large 3), `mistral-medium-latest` (3.5), `mistral-small-latest` (Small 4), Ministral 3 (14B/8B/3B), `codestral-latest`, OCR 4.
- **Pricing snapshot (EUR, standard, Sep 2026):** Large 3 €0.44 / €1.3; Medium 3.5 €1.25 / €6.4; Small 4 €0.12 / €0.5. Regional inference toggle on the pricing page.

---

## DeepSeek

- **Slug:** `deepseek` · **HQ:** China · **Trains:** Yes · **Retention:** retains prompts · **BYOK:** Yes
- **Docs / pricing:** https://api-docs.deepseek.com/quick_start/pricing
- **Base URL:** `https://api.deepseek.com` (OpenAI) · Anthropic-compat: `https://api.deepseek.com/anthropic` · **Env:** `DEEPSEEK_API_KEY`
- **Fit:** High intelligence per dollar; 1M context; thinking mode. Do **not** use retired `deepseek-chat` / `deepseek-reasoner`.
- **Models:** `deepseek-flash` (V4.1-Flash), `deepseek-v4-pro` (V4-Pro-0813).
- **Pricing snapshot:** Flash cache-miss off-peak **$0.15 / $0.60**, peak **$0.30 / $1.20**. V4-Pro cache-miss off-peak **$0.66 / $1.98**. Cache hits are much cheaper. Context 1M, max output 384K.

---

## Cohere

- **Slug:** `cohere` · **HQ:** United States · **Retention:** 30 days · **BYOK:** Yes
- **Docs:** https://docs.cohere.com · **Pricing:** https://cohere.com/pricing
- **Base URL:** `https://api.cohere.ai` · OpenAI-compat: `https://api.cohere.ai/compatibility/v1` · **Env:** `COHERE_API_KEY`
- **Fit:** RAG, Embed v4, Rerank v4, enterprise Model Vault (hourly instances).
- **Models:** Command A+ (`command-a-plus-05-2026`), Command A (`command-a-03-2025`), Command R7B, Embed/Rerank v4. Legacy Command R+ 08-2024 $2.50 / $10 (FAQ). Current Command A rates: confirm dashboard / docs — marketing site emphasizes Model Vault.

---

## Meta (Llama / Muse)

- **Slug:** `meta` · **HQ:** United States · **Retention:** 30 days · **BYOK:** Yes
- **Docs / pricing:** https://ai.developer.meta.com/docs/pricing-rate-limits/
- **Fit:** Official Meta Model API for Llama-line and Muse (image $0.01/image, Voice Transcribe $0.18/hour). Open weights also run on inference hosts (often cheaper).
- **Pricing snapshot (Standard text, Sep 2026):** input $1.25, cached $0.15, output $4.25 per 1M. Contributor tier much cheaper ($0.10 / $0.20).

---

## Z.ai (GLM)

- **Slug:** `z-ai` · **HQ:** Singapore · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.z.ai · **Pricing:** https://docs.z.ai/guides/overview/pricing
- **Base URL:** `https://api.z.ai/api/paas/v4/` · **Env:** Z.ai API key
- **Models:** `glm-5.3`, `glm-5.3-flash`, `glm-5.2`, `glm-5-turbo`, GLM-4.7 family, vision `GLM-4.6V`, ASR.
- **Pricing snapshot:** GLM-5.3 $1.4 / $4.4; GLM-5.3-Flash $0.15 / $0.50 (promo halves listed); GLM-4.7-FlashX $0.07 / $0.40; several Flash SKUs free.

---

## Moonshot AI (Kimi)

- **Slug:** `moonshotai` · **HQ:** Singapore · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://platform.moonshot.ai/docs · **Base URL:** `https://api.moonshot.ai/v1` · **Env:** `MOONSHOT_API_KEY`
- **Fit:** Long-horizon coding / agentic Kimi models (K2.x / K2.6 on routers). Confirm live IDs on the platform. Aggregators quote Kimi K2.6 around $0.66 / $3.50 (EUrouter) and K3 at higher rates — **re-fetch Moonshot’s own price list**.

---

## MiniMax

- **Slug:** `minimax` · **HQ:** Singapore · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://platform.minimax.io/docs · **Base URL:** `https://api.minimax.io/v1` · **Env:** MiniMax API key
- **Models:** `MiniMax-M3` (adaptive thinking), M2.x (thinking always on), speech/video SKUs on the same platform.
- **Fit:** Agentic coding with interleaved thinking; also via Tencent TokenHub as `minimax-m3`.

---

## NVIDIA (NIM)

- **Slug:** `nvidia` · **HQ:** United States · **Trains:** Yes · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://docs.nvidia.com/nim · **API:** `https://integrate.api.nvidia.com/v1` · **Env:** `NVIDIA_API_KEY`
- **Fit:** Nemotron open models + hosted NIM. OpenRouter flags **trains = Yes** — do not use for data that cannot be used for training unless a contract says otherwise.
- **Typical models:** Nemotron 3 Nano / Super / Ultra (aggregator prices e.g. Nano ~$0.05 / $0.20 — verify NVIDIA listing).

---

## Perplexity

- **Slug:** `perplexity` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.perplexity.ai · **Base URL:** `https://api.perplexity.ai` · **Env:** `PERPLEXITY_API_KEY`
- **Fit:** Grounded search (`sonar`, `sonar-pro`, `sonar-reasoning`, `sonar-deep-research`) plus Agent/Responses wrapping third-party labs. Not a generic chat substitute without search.

---

## Other labs on the OpenRouter table

| Provider | Slug | Docs / notes | Fit |
| :--- | :--- | :--- | :--- |
| Xiaomi | `xiaomi` | MiMo / Xiaomi LLM APIs; 2 models, 30-day retention, China HQ | Regional China models |
| Upstage | `upstage` | https://developers.upstage.ai — Solar LLMs, document AI | Korean NLP / OCR |
| Poolside | `poolside` | https://poolside.ai — enterprise coding models | Private coding models |
| Thinking Machines | `thinkingmachines` | Tinker / research API; **trains = Yes**, no BYOK | Research; not ZDR |
| Nex AGI | `nex-agi` | China; no BYOK, 30-day retention | Regional |
| Reka AI | `reka` | https://docs.reka.ai — multimodal Reka models | Vision-language |
| Inception | `inception` | Diffusion / Mercury-style fast models | Low-latency experimental |
| Liquid | `liquid` | Liquid Foundation Models; **trains = Yes** | On-device / LFM APIs |
| Seed | `seed` | ByteDance Seed / Doubao family via international SKU; Singapore HQ | Qwen/Doubao-adjacent |
| StepFun | `stepfun` | Step-series Chinese multimodal; 1 model but 1.3T monthly tokens | High-volume China model |
| Sakana | `sakana` | https://sakana.ai — evolutionary / Japanese research models | Research |
| Arcee AI | `arcee-ai` | https://www.arcee.ai — SLMs / domain models | Small specialized LLMs |
| Perceptron | `perceptron` | Vision-language; 1 model | VLM |

AI21 (`ai21`) is in the OpenRouter slug enum but not the Sep 2026 volume table. Inflection (`inflection`) same.
