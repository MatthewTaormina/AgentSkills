# Inference hosts (September 2026)

GPU/LPU marketplaces that serve **someone else’s** (often open) weights via OpenAI-compatible APIs. Same model ID can differ 5–10× in price and 20× in tokens/sec across hosts.

**How to pick a host for a given model:** open the OpenRouter model page (example: https://openrouter.ai/openai/gpt-oss-120b) and sort by price vs latency vs uptime. Pin with OpenRouter `provider` routing or call the host directly.

Benchmark snapshot for **`openai/gpt-oss-120b`** (OpenRouter, ~Sep 2026): DeepInfra **$0.037 / $0.17** (~40 tps); Groq **$0.15 / $0.60** (~331 tps, 0.24s TTFT); Cerebras **$0.35 / $0.75** (~907 tps, 0.21s TTFT); SambaNova **$0.14 / $0.95** (~248 tps).

---

Full OpenRouter ID lists (including hosts below) are also in [models-by-provider.md](models-by-provider.md).

## Groq

- **Slug:** `groq` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://console.groq.com/docs · **Base URL:** `https://api.groq.com/openai/v1` · **Env:** `GROQ_API_KEY`
- **Fit:** Lowest practical TTFT on LPU-supported models. Small catalog.
OpenRouter models:
- `openai/whisper-large-v3`
- `openai/whisper-large-v3-turbo`
- `minimax/minimax-m2.7`
- `openai/gpt-oss-safeguard-20b`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `meta-llama/llama-3.3-70b-instruct`
- `meta-llama/llama-3.1-8b-instruct`

## Cerebras

- **Slug:** `cerebras` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://inference-docs.cerebras.ai · **Base URL:** `https://api.cerebras.ai/v1` · **Env:** `CEREBRAS_API_KEY`
- **Fit:** Highest sustained tokens/sec (wafer-scale). Tiny public catalog; dedicated endpoints for more families.
OpenRouter models:
- `openai/gpt-oss-120b`

## Together AI

- **Slug:** `together` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.together.ai · **Base URL:** `https://api.together.xyz/v1` · **Env:** `TOGETHER_API_KEY`
- **Fit:** Broad open-model catalog, fine-tuning, batch.
OpenRouter models (+10 `:batch`):
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `qwen/qwen3.8-2.4t-a95b`
- `deepseek/deepseek-v4-pro-0813`
- `meta/muse-glimmer-30b`
- `deepseek/deepseek-v4-flash-0731`
- `thinkingmachines/inkling-small`
- `thinkingmachines/inkling`
- `moonshotai/kimi-k3`
- `z-ai/glm-5.2`
- `minimax/minimax-m3`
- `nvidia/parakeet-tdt-0.6b-v3`
- `openai/whisper-large-v3`
- `canopylabs/orpheus-3b-0.1-ft`
- `hexgrad/kokoro-82m`
- `google/gemma-4-31b-it`
- `qwen/qwen3.5-9b`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `meta-llama/llama-3.3-70b-instruct`

## Fireworks

- **Slug:** `fireworks` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.fireworks.ai · **Base URL:** `https://api.fireworks.ai/inference/v1` · **Env:** `FIREWORKS_API_KEY`
- **Fit:** Production function calling and LoRA.
OpenRouter models (+7 `:batch`):
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `deepseek/deepseek-v4-flash-vision-exp`
- `z-ai/glm-5.3`
- `qwen/qwen3-reranker-8b`
- `deepseek/deepseek-v4-pro-0813`
- `meta/muse-glimmer-30b`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`
- `z-ai/glm-5.2`
- `moonshotai/kimi-k2.7-code`
- `moonshotai/kimi-k2.6`

## DeepInfra

- **Slug:** `deepinfra` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.deepinfra.com · **Base URL:** `https://api.deepinfra.com/v1/openai` · **Env:** `DEEPINFRA_TOKEN`
- **Fit:** Usually the price leader and largest OpenRouter catalog among US hosts. Native path: `/v1/inference/{model}`.
OpenRouter models:
- `inclusionai/ling-3.0-flash-vl`
- `deepseek/deepseek-v4.1-flash`
- `ibm-granite/granite-4.2-8b`
- `inclusionai/ling-3.0-flash-fin`
- `z-ai/glm-5.3-flash`
- `deepseek/deepseek-v4-flash-vision-exp`
- `z-ai/glm-5.3`
- `qwen/qwen3.8-27b`
- `nvidia/nemotron-3.5-asr-streaming-multilingual-0.6b`
- `mistralai/voxtral-small-24b-2507-stt`
- `mistralai/voxtral-mini-3b-2507`
- `qwen/qwen3-asr-1.7b`
- `qwen/qwen3-asr-0.6b`
- `qwen/qwen3.8-2.4t-a95b`
- `deepseek/deepseek-v4-pro-0813`
- `nvidia/nemotron-3.5-lightning`
- `meta/muse-glimmer-30b`
- `deepseek/deepseek-v4-flash-0731`
- `thinkingmachines/inkling-small`
- `inclusionai/ling-3.0-flash`
- `thinkingmachines/inkling`
- `moonshotai/kimi-k3`
- `tencent/hy3`
- `z-ai/glm-5.2`
- `moonshotai/kimi-k2.7-code`
- `nvidia/nemotron-3.5-content-safety`
- `nvidia/nemotron-3-ultra-550b-a55b`
- `minimax/minimax-m3`
- `stepfun/step-3.7-flash`
- `openai/whisper-large-v3`
- `openai/whisper-large-v3-turbo`
- `qwen/qwen3.6-35b-a3b`
- `qwen/qwen3.6-27b`
- `deepseek/deepseek-v4-pro`
- `deepseek/deepseek-v4-flash`
- `canopylabs/orpheus-3b-0.1-ft`
- `sesame/csm-1b`
- `hexgrad/kokoro-82m`
- `xiaomi/mimo-v2.5-pro`
- `xiaomi/mimo-v2.5`
- `moonshotai/kimi-k2.6`
- `z-ai/glm-5.1`
- `google/gemma-4-26b-a4b-it`
- `google/gemma-4-31b-it`
- `minimax/minimax-m2.7`
- `nvidia/nemotron-3-super-120b-a12b`
- `qwen/qwen3.5-9b`
- `qwen/qwen3.5-35b-a3b`
- `qwen/qwen3.5-27b`
- `qwen/qwen3.5-122b-a10b`
- `qwen/qwen3.5-397b-a17b`
- `z-ai/glm-4.7`
- `nvidia/nemotron-3-nano-30b-a3b`
- `deepseek/deepseek-v3.2`
- `thenlper/gte-base`
- `thenlper/gte-large`
- `intfloat/e5-large-v2`
- `intfloat/e5-base-v2`
- `intfloat/multilingual-e5-large`
- `sentence-transformers/paraphrase-minilm-l6-v2`
- `sentence-transformers/all-minilm-l12-v2`
- `baai/bge-base-en-v1.5`
- `sentence-transformers/multi-qa-mpnet-base-dot-v1`
- `baai/bge-large-en-v1.5`
- `baai/bge-m3`
- `sentence-transformers/all-mpnet-base-v2`
- `sentence-transformers/all-minilm-l6-v2`
- `qwen/qwen3-embedding-8b`
- `qwen/qwen3-embedding-4b`
- `qwen/qwen3-vl-30b-a3b-instruct`
- `z-ai/glm-4.6`
- `qwen/qwen3-vl-235b-a22b-instruct`
- `qwen/qwen3-next-80b-a3b-instruct`
- `deepseek/deepseek-chat-v3.1`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `qwen/qwen3-coder`
- `qwen/qwen3-235b-a22b-2507`
- `mistralai/mistral-small-3.2-24b-instruct`
- `deepseek/deepseek-r1-0528`
- `meta-llama/llama-guard-4-12b`
- `qwen/qwen3-30b-a3b`
- `qwen/qwen3-14b`
- `qwen/qwen3-32b`
- `meta-llama/llama-4-maverick`
- `meta-llama/llama-4-scout`
- `deepseek/deepseek-chat-v3-0324`
- `google/gemma-3-4b-it`
- `google/gemma-3-12b-it`
- `google/gemma-3-27b-it`
- `mistralai/mistral-small-24b-instruct-2501`
- `microsoft/phi-4`
- `deepseek/deepseek-chat`
- `meta-llama/llama-3.3-70b-instruct`
- `qwen/qwen-2.5-72b-instruct`
- `sao10k/l3.1-euryale-70b`
- `nousresearch/hermes-3-llama-3.1-70b`
- `nousresearch/hermes-3-llama-3.1-405b`
- `sao10k/l3-lunaris-8b`
- `meta-llama/llama-3.1-70b-instruct`
- `meta-llama/llama-3.1-8b-instruct`
- `mistralai/mistral-nemo`
- `gryphe/mythomax-l2-13b`

## NovitaAI

- **Slug:** `novita` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://novita.ai/docs/api-reference · **Base URL:** `https://api.novita.ai/openai` · **Env:** `Novita API key`
- **Fit:** Large catalog, multimodal/image/video/GPU instances, aggressive pricing.
OpenRouter models:
- `inclusionai/ling-3.0-flash-vl:free`
- `deepseek/deepseek-v4.1-flash`
- `inclusionai/ling-3.0-flash-sante:free`
- `inclusionai/ling-3.0-flash-fin:free`
- `z-ai/glm-5.3-flash`
- `deepseek/deepseek-v4-flash-vision-exp`
- `z-ai/glm-5.3`
- `qwen/qwen3.8-27b`
- `qwen/qwen3.8-2.4t-a95b`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `inclusionai/ling-3.0-flash`
- `tencent/hy3`
- `z-ai/glm-5.2`
- `moonshotai/kimi-k2.7-code`
- `minimax/minimax-m3`
- `stepfun/step-3.7-flash`
- `deepseek/deepseek-v4-pro`
- `deepseek/deepseek-v4-flash`
- `xiaomi/mimo-v2.5-pro`
- `xiaomi/mimo-v2.5`
- `moonshotai/kimi-k2.6`
- `z-ai/glm-5.1`
- `google/gemma-4-26b-a4b-it`
- `google/gemma-4-31b-it`
- `minimax/minimax-m2.7`
- `qwen/qwen3.5-27b`
- `qwen/qwen3.5-122b-a10b`
- `qwen/qwen3.5-397b-a17b`
- `minimax/minimax-m2.5`
- `z-ai/glm-5`
- `qwen/qwen3-coder-next`
- `moonshotai/kimi-k2.5`
- `z-ai/glm-4.7-flash`
- `minimax/minimax-m2.1`
- `z-ai/glm-4.7`
- `nvidia/nemotron-3-nano-30b-a3b`
- `z-ai/glm-4.6v`
- `deepseek/deepseek-v3.2`
- `moonshotai/kimi-k2-thinking`
- `minimax/minimax-m2`
- `qwen/qwen3-vl-30b-a3b-instruct`
- `z-ai/glm-4.6`
- `deepseek/deepseek-v3.2-exp`
- `qwen/qwen3-vl-235b-a22b-thinking`
- `qwen/qwen3-vl-235b-a22b-instruct`
- `deepseek/deepseek-v3.1-terminus`
- `qwen/qwen3-next-80b-a3b-instruct`
- `moonshotai/kimi-k2-0905`
- `deepseek/deepseek-chat-v3.1`
- `z-ai/glm-4.5v`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `qwen/qwen3-coder-30b-a3b-instruct`
- `z-ai/glm-4.5-air`
- `qwen/qwen3-235b-a22b-thinking-2507`
- `qwen/qwen3-coder`
- `qwen/qwen3-235b-a22b-2507`
- `moonshotai/kimi-k2`
- `baidu/ernie-4.5-vl-424b-a47b`
- `minimax/minimax-m1`
- `deepseek/deepseek-r1-0528`
- `meta-llama/llama-4-maverick`
- `meta-llama/llama-4-scout`
- `google/gemma-3-27b-it`
- `deepseek/deepseek-r1-distill-llama-70b`
- `deepseek/deepseek-r1`
- `meta-llama/llama-3.3-70b-instruct`
- `qwen/qwen-2.5-72b-instruct`
- `sao10k/l3.1-euryale-70b`
- `sao10k/l3-lunaris-8b`
- `meta-llama/llama-3.1-8b-instruct`
- `mistralai/mistral-nemo`
- `microsoft/wizardlm-2-8x22b`

## SiliconFlow

- **Slug:** `siliconflow` · **HQ:** Singapore · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.siliconflow.com · **Base URL:** `https://api.siliconflow.com/v1` · **Env:** `SiliconFlow API key`
- **Fit:** Asia-friendly host; cheap input, often lower TPS than Groq/DeepInfra.
OpenRouter models:
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `deepseek/deepseek-v4-flash-vision-exp`
- `z-ai/glm-5.3`
- `qwen/qwen3.8-2.4t-a95b`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `z-ai/glm-5.2`
- `moonshotai/kimi-k2.7-code`
- `qwen/qwen3.6-35b-a3b`
- `qwen/qwen3.6-27b`
- `deepseek/deepseek-v4-pro`
- `deepseek/deepseek-v4-flash`
- `moonshotai/kimi-k2.6`
- `z-ai/glm-5.1`
- `google/gemma-4-26b-a4b-it`
- `google/gemma-4-31b-it`
- `qwen/qwen3.5-9b`
- `qwen/qwen3.5-35b-a3b`
- `qwen/qwen3.5-27b`
- `qwen/qwen3.5-122b-a10b`
- `z-ai/glm-5`
- `stepfun/step-3.5-flash`
- `moonshotai/kimi-k2.5`
- `deepseek/deepseek-v3.2`
- `qwen/qwen3-embedding-8b`
- `qwen/qwen3-vl-30b-a3b-thinking`
- `qwen/qwen3-vl-30b-a3b-instruct`
- `deepseek/deepseek-v3.2-exp`
- `deepseek/deepseek-v3.1-terminus`
- `deepseek/deepseek-chat-v3.1`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `qwen/qwen3-coder-30b-a3b-instruct`
- `qwen/qwen3-30b-a3b-instruct-2507`
- `z-ai/glm-4.5-air`
- `tencent/hunyuan-a13b-instruct`
- `deepseek/deepseek-r1-0528`
- `qwen/qwen3-32b`
- `deepseek/deepseek-chat-v3-0324`

## Parasail

- **Slug:** `parasail` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.parasail.io · **Base URL:** `https://api.parasail.io/v1` · **Env:** `PARASAIL_API_KEY`
- **Fit:** Serverless + dedicated + batch; HuggingFace IDs.
OpenRouter models:
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `qwen/qwen3.8-27b`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`
- `z-ai/glm-5.2`
- `minimax/minimax-m3`
- `qwen/qwen3.6-35b-a3b`
- `deepseek/deepseek-v4-pro`
- `deepseek/deepseek-v4-flash`
- `moonshotai/kimi-k2.6`
- `google/gemma-4-26b-a4b-it`
- `google/gemma-4-31b-it`
- `qwen/qwen3.5-9b`
- `qwen/qwen3.5-35b-a3b`
- `qwen/qwen3.5-397b-a17b`
- `qwen/qwen3-coder-next`
- `baai/bge-m3`
- `qwen/qwen3-vl-8b-instruct`
- `thedrummer/cydonia-24b-v4.1`
- `qwen/qwen3-vl-235b-a22b-instruct`
- `qwen/qwen3-next-80b-a3b-instruct`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `bytedance/ui-tars-1.5-7b`
- `qwen/qwen3-235b-a22b-2507`
- `mistralai/mistral-small-3.2-24b-instruct`
- `meta-llama/llama-4-maverick`
- `google/gemma-3-27b-it`
- `thedrummer/skyfall-36b-v2`
- `qwen/qwen2.5-vl-72b-instruct`
- `meta-llama/llama-3.3-70b-instruct`
- `thedrummer/unslopnemo-12b`
- `meta-llama/llama-3.2-3b-instruct`
- `sao10k/l3-lunaris-8b`
- `mistralai/mistral-nemo`
- `gryphe/mythomax-l2-13b`

## SambaNova

- **Slug:** `sambanova` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.sambanova.ai · **Base URL:** `SambaNova Cloud API` · **Env:** `SambaNova API key`
- **Fit:** High TPS on SN40L.
OpenRouter models:
- `minimax/minimax-m3`
- `google/gemma-4-31b-it`
- `minimax/minimax-m2.7`
- `deepseek/deepseek-v3.2`
- `deepseek/deepseek-chat-v3.1`
- `openai/gpt-oss-120b`
- `meta-llama/llama-3.3-70b-instruct`

## Baseten

- **Slug:** `baseten` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.baseten.co · **Base URL:** `https://inference.baseten.co/v1` · **Env:** `Baseten API key`
- **Fit:** Deploy custom models and a serverless model API.
OpenRouter models:
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `thinkingmachines/inkling-small`
- `thinkingmachines/inkling`
- `moonshotai/kimi-k3`
- `z-ai/glm-5.2`
- `moonshotai/kimi-k2.7-code`
- `nvidia/nemotron-3-ultra-550b-a55b`
- `deepseek/deepseek-v4-pro`
- `moonshotai/kimi-k2.6`
- `openai/gpt-oss-120b`

## Venice

- **Slug:** `venice` · **HQ:** United States · **Retention:** Zero · **BYOK:** Yes
- **Docs:** https://docs.venice.ai · **Base URL:** `https://api.venice.ai/api/v1` · **Env:** `Venice API key`
- **Fit:** Privacy-oriented catalog; API keys or x402 USDC wallet auth.
OpenRouter models:
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `qwen/qwen3.8-27b`
- `qwen/qwen3.8-2.4t-a95b`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `z-ai/glm-5.2`
- `moonshotai/kimi-k2.7-code`
- `nvidia/nemotron-3-ultra-550b-a55b`
- `minimax/minimax-m3`
- `qwen/qwen3.6-35b-a3b`
- `qwen/qwen3.6-27b`
- `deepseek/deepseek-v4-pro`
- `deepseek/deepseek-v4-flash`
- `xiaomi/mimo-v2.5`
- `moonshotai/kimi-k2.6`
- `z-ai/glm-5.1`
- `google/gemma-4-26b-a4b-it`
- `google/gemma-4-31b-it`
- `qwen/qwen3.5-9b`
- `qwen/qwen3.5-35b-a3b`
- `qwen/qwen3.5-397b-a17b`
- `minimax/minimax-m2.5`
- `z-ai/glm-5`
- `moonshotai/kimi-k2.5`
- `z-ai/glm-4.7-flash`
- `z-ai/glm-4.7`
- `deepseek/deepseek-v3.2`
- `z-ai/glm-4.6`
- `qwen/qwen3-vl-235b-a22b-instruct`
- `qwen/qwen3-235b-a22b-thinking-2507`
- `qwen/qwen3-coder`
- `qwen/qwen3-235b-a22b-2507`
- `cognitivecomputations/dolphin-mistral-24b-venice-edition`
- `mistralai/mistral-small-3.2-24b-instruct`

## Friendli

- **Slug:** `friendli` · **HQ:** United States · **Retention:** retains prompts · **BYOK:** Yes
- **Docs:** https://docs.friendli.ai · **Base URL:** `Friendli suite API` · **Env:** `Friendli API key`
- **Fit:** Optimized serving / dedicated endpoints.
OpenRouter models:
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `z-ai/glm-5.2`
- `z-ai/glm-5.1`
- `google/gemma-4-31b-it`
- `minimax/minimax-m2.5`
- `deepseek/deepseek-v3.2`

## Other inference hosts

OpenRouter provider page: `https://openrouter.ai/provider/{slug}`.

### Relace (`relace`)

Fast apply / coding-oriented serving

OpenRouter models:
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`
- `relace/relace-search`
- `relace/relace-apply-3`

### StreamLake (`streamlake`)

China host; retains prompts

OpenRouter models:
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `z-ai/glm-5.2`
- `moonshotai/kimi-k2.7-code`
- `minimax/minimax-m3`
- `deepseek/deepseek-v4-pro`
- `deepseek/deepseek-v4-flash`
- `xiaomi/mimo-v2.5-pro`
- `xiaomi/mimo-v2.5`
- `moonshotai/kimi-k2.6`
- `z-ai/glm-5.1`
- `qwen/qwen3.5-397b-a17b`
- `minimax/minimax-m2.5`
- `z-ai/glm-5`
- `qwen/qwen3-coder-next`
- `deepseek/deepseek-v3.2`
- `deepseek/deepseek-v3.1-terminus`
- `qwen/qwen3-30b-a3b-instruct-2507`
- `qwen/qwen3-235b-a22b-2507`
- `deepseek/deepseek-r1-0528`
- `deepseek/deepseek-chat`

### GMICloud (`gmicloud`)

US; retains prompts

OpenRouter models:
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `deepseek/deepseek-v4-flash-vision-exp`
- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `tencent/hy3`
- `z-ai/glm-5.2`
- `moonshotai/kimi-k2.7-code`
- `minimax/minimax-m3`
- `deepseek/deepseek-v4-pro`
- `deepseek/deepseek-v4-flash`
- `tencent/hy3-preview`
- `xiaomi/mimo-v2.5-pro`
- `xiaomi/mimo-v2.5`
- `moonshotai/kimi-k2.6`
- `z-ai/glm-5.1`
- `minimax/minimax-m2.7`
- `qwen/qwen3.5-397b-a17b`
- `z-ai/glm-5`
- `deepseek/deepseek-v3.2`
- `qwen/qwen3-235b-a22b-2507`
- `deepseek/deepseek-chat-v3-0324`

### Wafer (`wafer`)

US ZDR; high volume

OpenRouter models:
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`
- `z-ai/glm-5.2`

### OpenInference (`open-inference`)

US ZDR

OpenRouter models:
- `deepseek/deepseek-v4-flash-0731:free`
- `deepseek/deepseek-v4-flash`

### AtlasCloud (`atlas-cloud`)

US; retains prompts

OpenRouter models:
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `dots-studio/dots-3-note-preview:free`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `meituan/longcat-2.0`
- `kwaipilot/kat-coder-pro-v2.5`
- `tencent/hy3`
- `z-ai/glm-5.2`
- `minimax/minimax-m3`
- `kwaivgi/kling-v3.0-pro`
- `kwaivgi/kling-v3.0-std`
- `qwen/qwen3.6-35b-a3b`
- `deepseek/deepseek-v4-pro`
- `deepseek/deepseek-v4-flash`
- `xiaomi/mimo-v2.5-pro`
- `kwaivgi/kling-video-o1`
- `moonshotai/kimi-k2.6`
- `alibaba/wan-2.7`
- `z-ai/glm-5.1`
- `alibaba/wan-2.6`
- `kwaipilot/kat-coder-pro-v2`
- `minimax/minimax-m2.7`
- `qwen/qwen3.5-35b-a3b`
- `qwen/qwen3.5-27b`
- `qwen/qwen3.5-122b-a10b`
- `qwen/qwen3.5-397b-a17b`
- `minimax/minimax-m2.5`
- `moonshotai/kimi-k2.5`
- `z-ai/glm-4.7`
- `deepseek/deepseek-v3.2`
- `deepseek/deepseek-v3.2-exp`
- `deepseek/deepseek-v3.1-terminus`
- `deepseek/deepseek-chat-v3.1`

### Sail Research (`sail-research`)

US ZDR

OpenRouter models:
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`

### inference.net (`inference-net`)

US ZDR

OpenRouter models:
- `inference-net/schematron-v2-turbo`
- `inference-net/schematron-v2-small`
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `moonshotai/kimi-k3`

### NextBit (`nextbit`)

Spain HQ, ZDR — EU-friendly host

OpenRouter models:
- `z-ai/glm-5.3-flash`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `deepseek/deepseek-v4-pro`
- `deepseek/deepseek-v4-flash`
- `google/gemma-4-26b-a4b-it`
- `qwen/qwen3-14b`
- `sao10k/l3.3-euryale-70b`
- `google/gemma-2-27b-it`
- `undi95/remm-slerp-l2-13b`

### Inceptron (`inceptron`)

Sweden HQ, ZDR (OpenRouter slug `inceptron`)

OpenRouter models:
- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-flash-0731`
- `z-ai/glm-5.2`
- `moonshotai/kimi-k2.7-code`
- `moonshotai/kimi-k2.6`

### Makora (`makora`)

No BYOK

OpenRouter models:
- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`
- `google/gemma-4-26b-a4b-it`

### DekaLLM (`dekallm`)

Indonesia; no BYOK

OpenRouter models:
- `qwen/qwen3.8-27b`
- `google/gemma-4-26b-a4b-it`
- `nvidia/nemotron-3-super-120b-a12b`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `qwen/qwen3-30b-a3b-instruct-2507`
- `mistralai/mistral-nemo`

### AkashML (`akashml`)

Decentralized GPU (Akash)

OpenRouter models:
- `z-ai/glm-5.3`
- `qwen/qwen3.8-27b`
- `qwen/qwen3.6-35b-a3b`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `meta-llama/llama-3.3-70b-instruct`

### Darkbloom (`darkbloom`)

Retains prompts; no BYOK

OpenRouter models:
- `prism-ml/ternary-bonsai-2-27b`
- `qwen/qwen3.8-27b`
- `nvidia/nemotron-3.5-lightning`
- `qwen/qwen3.6-35b-a3b`
- `google/gemma-4-26b-a4b-it`
- `qwen/qwen3.5-9b`
- `qwen/qwen3.5-35b-a3b`
- `openai/gpt-oss-20b`

### Ionstream (`ionstream`)

US ZDR; no BYOK

OpenRouter models:
- `qwen/qwen3.8-27b`
- `deepseek/deepseek-v4-pro-0813`

### ModelRun (Modular) (`modelrun`)

Modular MAX serving; no BYOK

OpenRouter models:
- `qwen/qwen3.8-27b:free`
- `moonshotai/kimi-k2.7-code`
- `minimax/minimax-m3`
- `google/gemma-4-31b-it`

### Chutes (`chutes`)

Bittensor-style decentralized; retains prompts

OpenRouter models:
- `qwen/qwen3.8-27b`
- `moonshotai/kimi-k3`
- `qwen/qwen3.6-27b`
- `moonshotai/kimi-k2.6`
- `z-ai/glm-5.1`
- `google/gemma-4-31b-it`

### Mancer (`mancer`)

Community/GPU marketplace

No models currently routed on OpenRouter (count=0).

### io.net (`io-net`)

Decentralized GPU network

OpenRouter models:
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `qwen/qwen3.8-27b`
- `qwen/qwen3.6-35b-a3b`
- `mistralai/mistral-nemo`

### NEAR AI (`near-ai`)

No BYOK

OpenRouter models:
- `z-ai/glm-5.3-flash`

### AionLabs (`aion-labs`)

Israel HQ, 30-day retention

OpenRouter models:
- `aion-labs/aion-3.0-mini`
- `aion-labs/aion-3.0`
- `aion-labs/aion-2.0`
- `aion-labs/aion-rp-llama-3.1-8b`

### Ambient (`ambient`)

Retains prompts; no BYOK

OpenRouter models:
- `z-ai/glm-5.2`

### MARA (`mara`)

US ZDR; no BYOK

OpenRouter models:
- `minimax/minimax-m3`
- `minimax/minimax-m2.7`
- `deepseek/deepseek-v3.2`
- `deepseek/deepseek-chat-v3.1`
- `openai/gpt-oss-120b`

### Featherless (`featherless`)

Serverless HuggingFace models; slug in enum, empty OpenRouter routing at snapshot

No models currently routed on OpenRouter (count=0).

