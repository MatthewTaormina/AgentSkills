# Inference hosts (September 2026)

GPU/LPU marketplaces that serve **someone else’s** (often open) weights via OpenAI-compatible APIs. Same model ID can differ 5–10× in price and 20× in tokens/sec across hosts.

**How to pick a host for a given model:** open the OpenRouter model page (example: https://openrouter.ai/openai/gpt-oss-120b) and sort by price vs latency vs uptime. Pin with OpenRouter `provider` routing or call the host directly.

Benchmark snapshot for **`openai/gpt-oss-120b`** (OpenRouter, ~Sep 2026): DeepInfra **$0.037 / $0.17** (~40 tps); Groq **$0.15 / $0.60** (~331 tps, 0.24s TTFT); Cerebras **$0.35 / $0.75** (~907 tps, 0.21s TTFT); SambaNova **$0.14 / $0.95** (~248 tps).

---

## Groq

- **Slug:** `groq` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://console.groq.com/docs · **Base URL:** `https://api.groq.com/openai/v1` · **Env:** `GROQ_API_KEY`
- **Fit:** Lowest practical TTFT on LPU-supported models. Small catalog (8 models on OpenRouter). Not a general “all Llama variants” host.
- **Pricing:** Model-specific; gpt-oss-120b ~$0.15 / $0.60 with cache read ~$0.075.

---

## Cerebras

- **Slug:** `cerebras` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://inference-docs.cerebras.ai · **Base URL:** `https://api.cerebras.ai/v1` · **Env:** `CEREBRAS_API_KEY`
- **Fit:** Highest sustained tokens/sec (wafer-scale). Tiny public catalog (1 model on the OpenRouter volume row at snapshot — often gpt-oss-120b). Dedicated endpoints for more families.
- **Pricing snapshot:** gpt-oss-120b **$0.35 / $0.75** (ComputePrices, 7 Sep 2026).

---

## Together AI

- **Slug:** `together` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.together.ai · **Base URL:** `https://api.together.xyz/v1` · **Env:** `TOGETHER_API_KEY`
- **Fit:** Broad open-model catalog, fine-tuning, batch. 31 models / high OpenRouter volume.
- **Pricing:** Per model; gpt-oss-120b ~$0.15 / $0.60 on OpenRouter.

---

## Fireworks

- **Slug:** `fireworks` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.fireworks.ai · **Base URL:** `https://api.fireworks.ai/inference/v1` · **Env:** `FIREWORKS_API_KEY`
- **Fit:** Production function calling and LoRA; slightly smaller catalog than Together/DeepInfra (19 models).
- **Pricing:** gpt-oss-120b often ~$0.10 / $0.10 on aggregator tables — **confirm Fireworks price page**.

---

## DeepInfra

- **Slug:** `deepinfra` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.deepinfra.com · **Base URL (OpenAI):** `https://api.deepinfra.com/v1/openai` · native: `https://api.deepinfra.com/v1/inference/{model}` · **Env:** `DEEPINFRA_TOKEN`
- **Fit:** Usually the **price leader** and largest OpenRouter catalog among US hosts (103 models). Turbo SKUs trade cost for speed.
- **Pricing snapshot:** gpt-oss-120b **$0.037 / $0.17**; Turbo ~$0.15 / $0.60.

---

## NovitaAI

- **Slug:** `novita` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://novita.ai/docs/api-reference · **OpenAI base:** `https://api.novita.ai/openai` · **Env:** Novita API key
- **Fit:** Large catalog (74 models), multimodal/image/video/GPU instances, aggressive pricing (gpt-oss-120b ~$0.05 / $0.25).

---

## SiliconFlow

- **Slug:** `siliconflow` · **HQ:** Singapore · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.siliconflow.com · **Base URL:** `https://api.siliconflow.com/v1`
- **Fit:** Asia-friendly host, 40 models, cheap input (gpt-oss-120b ~$0.05 / $0.45) but often lower TPS/uptime than Groq/DeepInfra on the same OpenRouter chart.

---

## Parasail

- **Slug:** `parasail` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.parasail.io · **Base URL:** `https://api.parasail.io/v1` · **Env:** `PARASAIL_API_KEY`
- **Fit:** Serverless + dedicated + batch, HuggingFace IDs, 39 models. gpt-oss-120b ~$0.10 / $0.75 with cache.

---

## SambaNova

- **Slug:** `sambanova` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.sambanova.ai · **Fit:** High TPS on SN40L; 7 models; gpt-oss-120b ~$0.14 / $0.95.

---

## Baseten

- **Slug:** `baseten` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.baseten.co · **Chat:** `https://inference.baseten.co/v1/chat/completions`
- **Fit:** Deploy custom models (per-second GPU) **and** a serverless model API (14 models on OpenRouter).

---

## Venice

- **Slug:** `venice` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.venice.ai · **Base URL:** `https://api.venice.ai/api/v1`
- **Fit:** Privacy-oriented uncensored/open catalog (36 models); API keys **or** x402 USDC wallet auth. Prepaid credits.

---

## Friendli

- **Slug:** `friendli` · **HQ:** United States · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://docs.friendli.ai · **Fit:** Optimized serving / dedicated endpoints (7 models).

---

## High-volume boutique hosts (OpenRouter table)

Use the OpenRouter provider page for current models/prices when a first-party doc is thin.

| Provider | Slug | Official / notes | OpenRouter |
| :--- | :--- | :--- | :--- |
| Relace | `relace` | Fast apply / coding-oriented serving; 6 models, 1.1T daily | https://openrouter.ai/provider/relace |
| StreamLake | `streamlake` | China host; retains prompts; 23 models | https://openrouter.ai/provider/streamlake |
| GMICloud | `gmicloud` | US; retains prompts; 23 models | https://openrouter.ai/provider/gmicloud |
| Wafer | `wafer` | US ZDR; 6 models, high volume | https://openrouter.ai/provider/wafer |
| OpenInference | `open-inference` | US ZDR; 2 models, high volume | https://openrouter.ai/provider/open-inference |
| AtlasCloud | `atlas-cloud` | US; retains prompts; 35 models | https://openrouter.ai/provider/atlas-cloud |
| Sail Research | `sail-research` | US ZDR; 5 models | https://openrouter.ai/provider/sail-research |
| inference.net | `inference-net` | US ZDR; 5 models | https://openrouter.ai/docs + https://inference.net |
| NextBit | `nextbit` | **Spain HQ**, ZDR — EU-friendly host; 10 models | https://openrouter.ai/provider/nextbit |
| Inceptron | `incepton` | **Sweden HQ**, ZDR | https://openrouter.ai/provider/incepton |
| Makora | `makora` | No BYOK; 5 models | https://openrouter.ai/provider/makora |
| DekaLLM | `dekallm` | Indonesia; no BYOK | https://openrouter.ai/provider/dekallm |
| AkashML | `akashml` | Decentralized GPU (Akash) | https://openrouter.ai/provider/akashml |
| Darkbloom | `darkbloom` | Retains prompts; no BYOK | https://openrouter.ai/provider/darkbloom |
| Ionstream | `ionstream` | US ZDR; no BYOK; 2 models | https://openrouter.ai/provider/ionstream |
| ModelRun (Modular) | `modelrun` | Modular MAX serving; no BYOK | https://www.modular.com |
| Chutes | `chutes` | Bittensor-style decentralized; retains prompts | https://chutes.ai |
| Mancer | `mancer` | Community/GPU marketplace; 9 models | https://mancer.tech |
| io.net | `io-net` | Decentralized GPU network | https://io.net |
| NEAR AI | `near-ai` | No BYOK; 1 model | https://near.ai |
| AionLabs | `aion-labs` | **Israel HQ**, 30-day retention | https://openrouter.ai/provider/aion-labs |
| Ambient | `ambient` | Retains prompts; no BYOK; 1 model | https://openrouter.ai/provider/ambient |
| MARA | `mara` | US ZDR; no BYOK; 5 models | https://openrouter.ai/provider/mara |

**Featherless** (`featherless`) is in the OpenRouter slug enum (serverless HuggingFace models) but was not on the Sep 2026 volume table.
