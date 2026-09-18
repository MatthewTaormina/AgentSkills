# Cloud platforms (September 2026)

Full OpenRouter ID lists: [models-by-provider.md](models-by-provider.md).

Enterprise-hosted inference: you typically pay the **cloud bill**, not the lab’s console. OpenRouter can still BYOK these SKUs.

---

## Azure (Microsoft Foundry / Azure OpenAI)

- **Slug:** `azure` · **HQ:** United States · **Retention:** Zero (OpenRouter) · **BYOK:** Yes
- **Docs:** https://learn.microsoft.com/azure/foundry/openai/latest
- **Pricing:** https://azure.microsoft.com/pricing/details/cognitive-services/openai-service
- **Base URL:** `https://{resource}.openai.azure.com/openai/v1` · **Env:** `AZURE_OPENAI_API_KEY` (+ endpoint)
- **Fit:** Microsoft ecosystem, PTU reserved throughput, Batch (~50% off Global Standard), regional data residency.
- Foundry mixes OpenAI GPT-6/5.x, Anthropic Claude, DeepSeek V4, and Microsoft MAI image/voice/transcribe.
- **OpenRouter models (57 unique IDs, Sep 2026):**
  - `openai/gpt-6-astra`
  - `openai/gpt-6-astra-pro`
  - `microsoft/mai-image-2.6`
  - `microsoft/mai-image-2.6-flash`
  - `microsoft/mai-transcribe-2`
  - `anthropic/claude-fable-5.1`
  - `anthropic/claude-opus-5`
  - `microsoft/mai-image-2.5-pro`
  - `microsoft/mai-voice-2-flash`
  - `openai/gpt-5.6-luna-pro`
  - `openai/gpt-5.6-luna`
  - `openai/gpt-5.6-terra-pro`
  - `openai/gpt-5.6-terra`
  - `openai/gpt-5.6-sol-pro`
  - `openai/gpt-5.6-sol`
  - `anthropic/claude-sonnet-5`
  - `anthropic/claude-fable-5`
  - `microsoft/mai-voice-2`
  - `microsoft/mai-transcribe-1.5`
  - `microsoft/mai-image-2.5`
  - `anthropic/claude-opus-4.8`
  - `openai/gpt-5.5`
  - `deepseek/deepseek-v4-pro`
  - `deepseek/deepseek-v4-flash`
  - `anthropic/claude-opus-4.7`
  - `openai/gpt-5.4-nano`
  - `openai/gpt-5.4-mini`
  - `openai/gpt-5.4-pro`
  - `openai/gpt-5.4`
  - `openai/gpt-5.3-codex`
  - `anthropic/claude-sonnet-4.6`
  - `anthropic/claude-opus-4.6`
  - `openai/gpt-5.2-codex`
  - `openai/gpt-5.2-chat`
  - `openai/gpt-5.2`
  - `openai/gpt-5.1-codex-max`
  - `anthropic/claude-opus-4.5`
  - `openai/gpt-5.1`
  - `openai/gpt-5.1-codex`
  - `openai/gpt-5.1-codex-mini`
  - `openai/text-embedding-3-large`
  - `openai/text-embedding-3-small`
  - `anthropic/claude-haiku-4.5`
  - `anthropic/claude-sonnet-4.5`
  - `openai/gpt-5`
  - `openai/gpt-5-mini`
  - `openai/gpt-5-nano`
  - `openai/gpt-4.1`
  - `openai/gpt-4.1-mini`
  - `openai/gpt-4.1-nano`
  - `openai/gpt-4o-2024-08-06`
  - `openai/gpt-4o-mini`
  - `openai/gpt-4o`
  - `openai/gpt-4o-2024-05-13`
  - `openai/gpt-3.5-turbo-0613`
  - `openai/gpt-3.5-turbo-16k`
  - `openai/gpt-4`
- **Pricing:** Token PAYG mirrors OpenAI for many SKUs; always use the Azure price sheet and the deployment’s region. PTU for steady load.

---

## Amazon Bedrock

- **Slug:** `amazon-bedrock` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.aws.amazon.com/bedrock/ · **Pricing:** https://aws.amazon.com/bedrock/pricing/
- **Auth:** AWS SigV4 or `AWS_BEARER_TOKEN_BEDROCK`
- **Fit:** Multi-lab in one AWS account, Guardrails, Knowledge Bases, Batch 50% off listed FMs, Provisioned/Reserved/Priority/Flex tiers.
- **OpenRouter models (32 unique IDs, Sep 2026):**
  - `anthropic/claude-fable-5.1`
  - `x-ai/grok-4.6`
  - `anthropic/claude-opus-5`
  - `openai/gpt-5.6-luna`
  - `openai/gpt-5.6-terra`
  - `openai/gpt-5.6-sol`
  - `anthropic/claude-sonnet-5`
  - `anthropic/claude-fable-5`
  - `anthropic/claude-opus-4.8`
  - `openai/gpt-5.5`
  - `anthropic/claude-opus-4.7`
  - `openai/gpt-5.4`
  - `anthropic/claude-sonnet-4.6`
  - `z-ai/glm-5`
  - `anthropic/claude-opus-4.6`
  - `moonshotai/kimi-k2.5`
  - `writer/palmyra-x5`
  - `amazon/nova-2-lite-v1`
  - `anthropic/claude-opus-4.5`
  - `amazon/nova-premier-v1`
  - `anthropic/claude-haiku-4.5`
  - `anthropic/claude-sonnet-4.5`
  - `openai/gpt-oss-120b`
  - `openai/gpt-oss-20b`
  - `anthropic/claude-opus-4.1`
  - `qwen/qwen3-coder-30b-a3b-instruct`
  - `anthropic/claude-sonnet-4`
  - `amazon/nova-lite-v1`
  - `amazon/nova-micro-v1`
  - `amazon/nova-pro-v1`
  - `meta-llama/llama-3.1-70b-instruct`
  - `anthropic/claude-3-haiku`
- **Pricing snapshot (Bedrock on-demand examples):** Gemma 4 31B $0.14 / $0.40; OpenAI gpt-oss-120b ~$0.15 / $0.60 (region-dependent). Anthropic Claude is billed per Bedrock’s Anthropic table — **not** identical to api.anthropic.com in every region.

### Claude Platform on AWS

- **Slug:** `amazon-bedrock/claude-on-aws` (also `claude-on-aws`)
- **Retention:** 30 days (matches Anthropic)
- **Pricing:** Claude Consumption Units (CCUs) via AWS Marketplace; Anthropic converts USD token rates to CCU at $0.01/CCU. See https://docs.anthropic.com/en/docs/about-claude/pricing (Claude Platform on AWS section).
- **Fit:** Anthropic-operated Claude on AWS Marketplace vs Bedrock partner SKU. Pick based on contracting, not model quality.
- **OpenRouter models (9 unique IDs, Sep 2026):**
  - `anthropic/claude-opus-5`
  - `anthropic/claude-sonnet-5`
  - `anthropic/claude-fable-5`
  - `anthropic/claude-opus-4.8`
  - `anthropic/claude-opus-4.7`
  - `anthropic/claude-sonnet-4.6`
  - `anthropic/claude-opus-4.6`
  - `anthropic/claude-opus-4.5`
  - `anthropic/claude-sonnet-4.5`

---

## Google Vertex AI

Covered with Gemini in [labs.md](labs.md). Use Vertex when you need GCP IAM, CMEK, and regional processing. OpenAI-compat base:

`https://aiplatform.googleapis.com/v1/projects/{project}/locations/{location}/endpoints/openapi`

Auth: Google Cloud access token, not a Gemini AI Studio key.

- Same catalog as in labs.md Vertex section.
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

## Alibaba Cloud International (Qwen / DashScope / QwenCloud)

- **Slug:** `alibaba` · **HQ:** Singapore · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** DashScope compatible-mode · QwenCloud (intl) vs Qwen AI Platform (mainland)
- **Base URL (intl):** `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`
- **Base URL (Beijing):** `https://dashscope.aliyuncs.com/compatible-mode/v1`
- **Env:** `DASHSCOPE_API_KEY`
- First-party DashScope aliases: `qwen-turbo`, `qwen-plus`, `qwen-max`. OpenRouter uses versioned `qwen/qwen3.*` IDs plus WAN video and hosted DeepSeek/GLM/Kimi.
- **OpenRouter models (64 unique IDs, Sep 2026):**
  - `deepseek/deepseek-v4.1-flash`
  - `qwen/qwen3.8-max-0902`
  - `alibaba/wan-3.0-prime`
  - `qwen/qwen3.8-flash`
  - `alibaba/wan-3.0`
  - `z-ai/glm-5.3`
  - `qwen/qwen3.8-27b`
  - `qwen/qwen3.8-2.4t-a95b`
  - `deepseek/deepseek-v4-pro-0813`
  - `qwen/qwen-image-3`
  - `qwen/qwen-image-3-pro`
  - `deepseek/deepseek-v4-flash-0731`
  - `qwen/qwen3.7-flash`
  - `qwen/qwen-audio-3.0-tts-flash`
  - `qwen/qwen-audio-3.0-tts-plus`
  - `moonshotai/kimi-k3`
  - `alibaba/happyhorse-1.1`
  - `alibaba/happyhorse-1.0`
  - `z-ai/glm-5.2`
  - `moonshotai/kimi-k2.7-code`
  - `qwen/qwen3.7-plus`
  - `qwen/qwen3.7-max`
  - `qwen/qwen3-asr-flash-2026-02-10`
  - `qwen/qwen3.5-plus-20260420`
  - `qwen/qwen3.6-flash`
  - `qwen/qwen3.6-max-preview`
  - `qwen/qwen3.6-27b`
  - `deepseek/deepseek-v4-pro`
  - `deepseek/deepseek-v4-flash`
  - `z-ai/glm-5.1`
  - `qwen/qwen3.6-plus`
  - `qwen/qwen3.5-35b-a3b`
  - `qwen/qwen3.5-27b`
  - `qwen/qwen3.5-122b-a10b`
  - `qwen/qwen3.5-flash-02-23`
  - `qwen/qwen3.5-plus-02-15`
  - `qwen/qwen3.5-397b-a17b`
  - `qwen/qwen3-max-thinking`
  - `qwen/qwen3-coder-next`
  - `deepseek/deepseek-v3.2`
  - `qwen/qwen3-vl-32b-instruct`
  - `qwen/qwen3-vl-8b-thinking`
  - `qwen/qwen3-vl-8b-instruct`
  - `qwen/qwen3-vl-30b-a3b-thinking`
  - `qwen/qwen3-vl-30b-a3b-instruct`
  - `qwen/qwen3-vl-235b-a22b-thinking`
  - `qwen/qwen3-vl-235b-a22b-instruct`
  - `qwen/qwen3-max`
  - `qwen/qwen3-coder-plus`
  - `qwen/qwen3-coder-flash`
  - `qwen/qwen3-next-80b-a3b-thinking`
  - `qwen/qwen3-next-80b-a3b-instruct`
  - `qwen/qwen-plus-2025-07-28`
  - `qwen/qwen3-30b-a3b-thinking-2507`
  - `qwen/qwen3-coder-30b-a3b-instruct`
  - `qwen/qwen3-30b-a3b-instruct-2507`
  - `qwen/qwen3-235b-a22b-thinking-2507`
  - `qwen/qwen3-coder`
  - `qwen/qwen3-235b-a22b-2507`
  - `qwen/qwen3-30b-a3b`
  - `qwen/qwen3-8b`
  - `qwen/qwen3-14b`
  - `qwen/qwen3-235b-a22b`
  - `qwen/qwen-plus`
- **Fit:** Qwen first-party quality; pick intl vs mainland for residency. LiteLLM prefix `dashscope/` or `qwencloud/`.

---

## Tencent Cloud (TokenHub / Hunyuan)

- **Slug:** `tencent` · **HQ:** China · **Retention:** Zero · **BYOK:** Yes
- **Highest OpenRouter daily volume in this snapshot** (2.7T) with only 5 listed models — typically a few very hot SKUs.
- **Product:** TokenHub — OpenAI-compat + Anthropic-compat gateway hosting DeepSeek, GLM, Kimi, MiniMax, Hunyuan.
- **Docs:** https://www.tencentcloud.com/products/tokenhub · LiteLLM: https://docs.litellm.ai/docs/providers/tencent
- **Default intl API (LiteLLM):** Singapore TokenHub; override `TENCENT_API_BASE`. Anthropic path: `https://tokenhub-intl.tencentcloudmaas.com` (confirm live docs).
- LiteLLM TokenHub examples still include DeepSeek/GLM/Kimi/MiniMax; **OpenRouter’s Tencent row** is Hunyuan-only at this snapshot:
- **OpenRouter models (5 unique IDs, Sep 2026):**
  - `tencent/hy4-preview`
  - `tencent/hy-mt2-1.8b`
  - `tencent/hy-mt2-30b-a3b`
  - `tencent/hy-mt2-7b`
  - `tencent/hy3`

---

## Baidu Qianfan

- **Slug:** `baidu` · **HQ:** China · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://cloud.baidu.com/product/wenxinworkshop (Qianfan / ERNIE)
- **Fit:** ERNIE and Qianfan-hosted models for China region. Confirm OpenAI-compat endpoint in current Qianfan console.
- **OpenRouter models (10 unique IDs, Sep 2026):**
  - `z-ai/glm-5.3`
  - `deepseek/deepseek-v4-pro-0813`
  - `deepseek/deepseek-v4-flash-0731`
  - `z-ai/glm-5.2`
  - `deepseek/deepseek-v4-pro`
  - `deepseek/deepseek-v4-flash`
  - `moonshotai/kimi-k2.6`
  - `z-ai/glm-5.1`
  - `z-ai/glm-5`
  - `deepseek/deepseek-v3.2`

---

## Cloudflare Workers AI (as a *provider*)

- **Slug:** `cloudflare` · **HQ:** United States · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://developers.cloudflare.com/workers-ai/
- **Fit:** Edge inference. Distinct from **Cloudflare AI Gateway** (router — see [routers.md](routers.md)).
- **OpenRouter models (18 unique IDs, Sep 2026):**
  - `z-ai/glm-5.3-flash`
  - `z-ai/glm-5.3`
  - `qwen/qwen3.8-27b`
  - `deepseek/deepseek-v4-pro-0813`
  - `deepseek/deepseek-v4-flash-0731`
  - `z-ai/glm-5.2`
  - `moonshotai/kimi-k2.7-code`
  - `deepseek/deepseek-v4-pro`
  - `moonshotai/kimi-k2.6`
  - `google/gemma-4-26b-a4b-it`
  - `z-ai/glm-4.7-flash`
  - `ibm-granite/granite-4.0-h-micro`
  - `mistralai/mistral-small-3.1-24b-instruct`
  - `meta-llama/llama-3.3-70b-instruct`
  - `qwen/qwen-2.5-coder-32b-instruct`
  - `meta-llama/llama-3.2-1b-instruct`
  - `meta-llama/llama-3.2-3b-instruct`
  - `meta-llama/llama-3.1-8b-instruct`

---

## GPU / neocloud serving (OpenRouter rows)

These clouds also appear as OpenAI-compat model providers. Full IDs: [models-by-provider.md](models-by-provider.md).

### CoreWeave (`coreweave`)

- **Docs:** https://docs.coreweave.com — GPU cloud; ZDR
- **OpenRouter models (17 unique IDs, Sep 2026):**
  - `ibm-granite/granite-4.2-8b`
  - `z-ai/glm-5.3-flash`
  - `qwen/qwen3.8-27b`
  - `deepseek/deepseek-v4-pro-0813`
  - `nvidia/nemotron-3.5-lightning`
  - `deepseek/deepseek-v4-flash-0731`
  - `z-ai/glm-5.2`
  - `moonshotai/kimi-k2.7-code`
  - `minimax/minimax-m3`
  - `qwen/qwen3.6-35b-a3b`
  - `moonshotai/kimi-k2.6`
  - `google/gemma-4-31b-it`
  - `deepseek/deepseek-chat-v3.1`
  - `openai/gpt-oss-120b`
  - `openai/gpt-oss-20b`
  - `meta-llama/llama-3.3-70b-instruct`
  - `meta-llama/llama-3.1-8b-instruct`

### Modal (`modal`)

- **Docs:** https://modal.com/docs — Serverless GPUs
- **OpenRouter models (5 unique IDs, Sep 2026):**
  - `deepseek/deepseek-v4.1-flash`
  - `z-ai/glm-5.3-flash`
  - `z-ai/glm-5.3`
  - `qwen/qwen3.8-2.4t-a95b`
  - `moonshotai/kimi-k3`

### DigitalOcean (`digitalocean`)

- **Docs:** https://docs.digitalocean.com/products/gradient-ai-platform/ — Gradient AI / GPU droplets
- **OpenRouter models (16 unique IDs, Sep 2026):**
  - `deepseek/deepseek-v4.1-flash`
  - `z-ai/glm-5.3-flash`
  - `z-ai/glm-5.3`
  - `deepseek/deepseek-v4-pro-0813`
  - `deepseek/deepseek-v4-flash-0731`
  - `moonshotai/kimi-k3`
  - `z-ai/glm-5.2`
  - `deepseek/deepseek-v4-pro`
  - `deepseek/deepseek-v4-flash`
  - `xiaomi/mimo-v2.5-pro`
  - `moonshotai/kimi-k2.6`
  - `qwen/qwen3.5-397b-a17b`
  - `minimax/minimax-m2.5`
  - `deepseek/deepseek-v3.2`
  - `openai/gpt-oss-120b`
  - `meta-llama/llama-4-maverick`

### Crusoe (`crusoe`)

- **Docs:** https://docs.crusoe.ai — Energy-aware GPU cloud
- **OpenRouter models (5 unique IDs, Sep 2026):**
  - `z-ai/glm-5.3-flash`
  - `moonshotai/kimi-k2.6`
  - `google/gemma-4-31b-it`
  - `nvidia/nemotron-3-nano-30b-a3b`
  - `openai/gpt-oss-120b`

### Nebius Token Factory (`nebius`)

- **Docs:** https://docs.nebius.com — Netherlands HQ, ZDR
- **OpenRouter models (8 unique IDs, Sep 2026):**
  - `z-ai/glm-5.1`
  - `nvidia/nemotron-3-nano-30b-a3b`
  - `qwen/qwen3-embedding-8b`
  - `nousresearch/hermes-4-405b`
  - `openai/gpt-oss-120b`
  - `qwen/qwen3-30b-a3b-instruct-2507`
  - `qwen/qwen3-235b-a22b-2507`
  - `google/gemma-3-27b-it`

**Pricing:** Compare the same model ID on OpenRouter (e.g. https://openrouter.ai/openai/gpt-oss-120b) rather than a cloud homepage.
