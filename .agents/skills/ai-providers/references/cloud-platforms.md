# Cloud platforms (September 2026)

Enterprise-hosted inference: you typically pay the **cloud bill**, not the lab’s console. OpenRouter can still BYOK these SKUs.

---

## Azure (Microsoft Foundry / Azure OpenAI)

- **Slug:** `azure` · **HQ:** United States · **Retention:** Zero (OpenRouter) · **BYOK:** Yes
- **Docs:** https://learn.microsoft.com/azure/foundry/openai/latest
- **Pricing:** https://azure.microsoft.com/pricing/details/cognitive-services/openai-service
- **Base URL:** `https://{resource}.openai.azure.com/openai/v1` · **Env:** `AZURE_OPENAI_API_KEY` (+ endpoint)
- **Fit:** Microsoft ecosystem, PTU reserved throughput, Batch (~50% off Global Standard), regional data residency.
- **Models:** Foundry catalog (OpenAI GPT / o-series, plus other Foundry models). 57 models on OpenRouter snapshot.
- **Pricing:** Token PAYG mirrors OpenAI for many SKUs; always use the Azure price sheet and the deployment’s region. PTU for steady load.

---

## Amazon Bedrock

- **Slug:** `amazon-bedrock` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.aws.amazon.com/bedrock/ · **Pricing:** https://aws.amazon.com/bedrock/pricing/
- **Auth:** AWS SigV4 or `AWS_BEARER_TOKEN_BEDROCK`
- **Fit:** Multi-lab in one AWS account (Anthropic, Meta, Mistral, Amazon Nova, Google Gemma, OpenAI gpt-oss, etc.), Guardrails, Knowledge Bases, Batch 50% off listed FMs, Provisioned/Reserved/Priority/Flex tiers.
- **Pricing snapshot (Bedrock on-demand examples):** Gemma 4 31B $0.14 / $0.40; OpenAI gpt-oss-120b ~$0.15 / $0.60 (region-dependent). Anthropic Claude is billed per Bedrock’s Anthropic table — **not** identical to api.anthropic.com in every region.

### Claude Platform on AWS

- **Slug:** `amazon-bedrock/claude-on-aws` (also `claude-on-aws`)
- **Retention:** 30 days (matches Anthropic)
- **Pricing:** Claude Consumption Units (CCUs) via AWS Marketplace; Anthropic converts USD token rates to CCU at $0.01/CCU. See https://docs.anthropic.com/en/docs/about-claude/pricing (Claude Platform on AWS section).
- **Fit:** Anthropic-operated Claude on AWS Marketplace vs Bedrock partner SKU. Pick based on contracting, not model quality.

---

## Google Vertex AI

Covered with Gemini in [labs.md](labs.md). Use Vertex when you need GCP IAM, CMEK, and regional processing. OpenAI-compat base:

`https://aiplatform.googleapis.com/v1/projects/{project}/locations/{location}/endpoints/openapi`

Auth: Google Cloud access token, not a Gemini AI Studio key.

---

## Alibaba Cloud International (Qwen / DashScope / QwenCloud)

- **Slug:** `alibaba` · **HQ:** Singapore · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** DashScope compatible-mode · QwenCloud (intl) vs Qwen AI Platform (mainland)
- **Base URL (intl):** `https://dashscope-intl.aliyuncs.com/compatible-mode/v1`
- **Base URL (Beijing):** `https://dashscope.aliyuncs.com/compatible-mode/v1`
- **Env:** `DASHSCOPE_API_KEY`
- **Models:** `qwen-turbo`, `qwen-plus`, `qwen-max` (+ `-latest`), `qwen-vl-*`, Qwen3 MoE IDs (`qwen3-235b-a22b`, …). 64 models on OpenRouter snapshot.
- **Fit:** Qwen first-party quality; pick intl vs mainland for residency. LiteLLM prefix `dashscope/` or `qwencloud/`.

---

## Tencent Cloud (TokenHub / Hunyuan)

- **Slug:** `tencent` · **HQ:** China · **Retention:** Zero · **BYOK:** Yes
- **Highest OpenRouter daily volume in this snapshot** (2.7T) with only 5 listed models — typically a few very hot SKUs.
- **Product:** TokenHub — OpenAI-compat + Anthropic-compat gateway hosting DeepSeek, GLM, Kimi, MiniMax, Hunyuan.
- **Docs:** https://www.tencentcloud.com/products/tokenhub · LiteLLM: https://docs.litellm.ai/docs/providers/tencent
- **Default intl API (LiteLLM):** Singapore TokenHub; override `TENCENT_API_BASE`. Anthropic path: `https://tokenhub-intl.tencentcloudmaas.com` (confirm live docs).
- **Example model IDs:** `deepseek-v4-pro`, `glm-5`, `kimi-k2.6`, `minimax-m3`, `hy-mt2-plus`.

---

## Baidu Qianfan

- **Slug:** `baidu` · **HQ:** China · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://cloud.baidu.com/product/wenxinworkshop (Qianfan / ERNIE)
- **Fit:** ERNIE and Qianfan-hosted third-party models for China region. 10 models on OpenRouter snapshot. Confirm OpenAI-compat endpoint in current Qianfan console (paths change between v1/v2).

---

## Cloudflare Workers AI (as a *provider*)

- **Slug:** `cloudflare` · **HQ:** United States · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://developers.cloudflare.com/workers-ai/
- **Fit:** Edge inference on Cloudflare’s model catalog (18 models on OpenRouter). Distinct from **Cloudflare AI Gateway** (router — see [routers.md](routers.md)).

---

## GPU / neocloud serving (OpenRouter rows)

These are clouds that also appear as model providers (OpenAI-compat inference on their GPUs).

| Provider | Slug | Docs | Notes |
| :--- | :--- | :--- | :--- |
| CoreWeave | `coreweave` | https://docs.coreweave.com | GPU cloud; ZDR; 17 models |
| Modal | `modal` | https://modal.com/docs | Serverless GPUs; 5 models |
| DigitalOcean | `digitalocean` | https://docs.digitalocean.com/products/gradient-ai-platform/ | Gradient AI / GPU droplets; 16 models |
| Crusoe | `crusoe` | https://docs.crusoe.ai | Energy-aware GPU cloud; 5 models |
| Nebius Token Factory | `nebius` | https://docs.nebius.com | **Netherlands HQ**, ZDR, EU-friendly alternative to US hosts; 8 models |

**Pricing:** Almost always per-token on the served model, competitive with Together/Fireworks. Compare the same model ID on OpenRouter’s model page (e.g. https://openrouter.ai/openai/gpt-oss-120b) rather than a cloud’s homepage.
