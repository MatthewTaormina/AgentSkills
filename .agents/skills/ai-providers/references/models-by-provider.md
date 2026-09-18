# Models by provider (OpenRouter, September 2026)

Live source: `GET https://openrouter.ai/api/v1/models?providers={slug_or_name}&output_modalities=all`.

IDs below are **OpenRouter model slugs** (`author/model`). First-party API IDs often omit the author prefix (e.g. OpenAI `gpt-6-astra` vs `openai/gpt-6-astra`). `:batch` variants are counted but not listed.

Re-fetch before pinning production models. Provider pages: `https://openrouter.ai/provider/{slug}`.


## First-party labs

### OpenAI (`openai`)

OpenRouter **63** unique model IDs; +34 `:batch` SKUs (query `openai`, total_count=97).

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

### Anthropic (`anthropic`)

OpenRouter **11** unique model IDs; +12 `:batch` SKUs (query `anthropic`, total_count=23).

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

### Google AI Studio (`google-ai-studio`)

OpenRouter **26** unique model IDs; +1 `:batch` SKUs (query `Google AI Studio`, total_count=27).

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

### xAI (`xai`)

OpenRouter **12** unique model IDs; +1 `:batch` SKUs (query `xai`, total_count=13).

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

### Mistral (`mistral`)

OpenRouter **19** unique model IDs; +6 `:batch` SKUs (query `mistral`, total_count=25).

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

### DeepSeek (`deepseek`)

OpenRouter **2** unique model IDs (query `deepseek`, total_count=2).

- `deepseek/deepseek-v4.1-flash`
- `deepseek/deepseek-v4-pro-0813`

### Cohere (`cohere`)

OpenRouter **8** unique model IDs (query `cohere`, total_count=8).

- `cohere/north-mini-code:free`
- `cohere/rerank-4-pro`
- `cohere/rerank-4-fast`
- `cohere/rerank-v3.5`
- `cohere/command-a`
- `cohere/command-r7b-12-2024`
- `cohere/command-r-08-2024`
- `cohere/command-r-plus-08-2024`

### Meta (`meta`)

OpenRouter **7** unique model IDs (query `meta`, total_count=7).

- `meta/muse-voice-transcribe-1.0`
- `meta/muse-spark-1.3-contributor`
- `meta/muse-spark-1.3`
- `meta/muse-image`
- `meta/muse-spark-1.2-contributor`
- `meta/muse-spark-1.2`
- `meta/muse-spark-1.1`

### Z.AI (`z-ai`)

OpenRouter **13** unique model IDs (query `Z.AI`, total_count=13).

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

### Moonshot AI (`moonshotai`)

OpenRouter **3** unique model IDs (query `Moonshot AI`, total_count=3).

- `moonshotai/kimi-k3`
- `moonshotai/kimi-k2.7-code`
- `moonshotai/kimi-k2.6`

### Minimax (`minimax`)

OpenRouter **13** unique model IDs (query `minimax`, total_count=13).

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

### Nvidia (`nvidia`)

OpenRouter **8** unique model IDs (query `nvidia`, total_count=8).

- `nvidia/nemotron-3.5-lightning:free`
- `nvidia/nemotron-3-embed-1b:free`
- `nvidia/llama-nemotron-rerank-vl-1b-v2:free`
- `nvidia/nemotron-3.5-content-safety:free`
- `nvidia/nemotron-3-ultra-550b-a55b:free`
- `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free`
- `nvidia/nemotron-3-super-120b-a12b:free`
- `nvidia/llama-nemotron-embed-vl-1b-v2:free`

### Perplexity (`perplexity`)

OpenRouter **7** unique model IDs (query `perplexity`, total_count=7).

- `perplexity/pplx-embed-v1-4b`
- `perplexity/pplx-embed-v1-0.6b`
- `perplexity/sonar-pro-search`
- `perplexity/sonar-reasoning-pro`
- `perplexity/sonar-pro`
- `perplexity/sonar-deep-research`
- `perplexity/sonar`

### Xiaomi (`xiaomi`)

OpenRouter **2** unique model IDs (query `xiaomi`, total_count=2).

- `xiaomi/mimo-v2.5-pro`
- `xiaomi/mimo-v2.5`

### Upstage (`upstage`)

OpenRouter **2** unique model IDs (query `upstage`, total_count=2).

- `upstage/solar-pro4`
- `upstage/solar-pro-3`

### Poolside (`poolside`)

OpenRouter **4** unique model IDs (query `poolside`, total_count=4).

- `poolside/laguna-s-2.1`
- `poolside/laguna-s-2.1:free`
- `poolside/laguna-xs-2.1`
- `poolside/laguna-xs-2.1:free`

### Thinking Machines (`thinkingmachines`)

OpenRouter **2** unique model IDs (query `Thinking Machines`, total_count=2).

- `thinkingmachines/inkling-small:free`
- `thinkingmachines/inkling:free`

### Nex AGI (`nex-agi`)

OpenRouter **2** unique model IDs (query `Nex AGI`, total_count=2).

- `nex-agi/nex-n2.5-mini:free`
- `nex-agi/nex-n2.5-pro:free`

### Reka (`reka`)

OpenRouter **6** unique model IDs (query `reka`, total_count=6).

- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `qwen/qwen3.8-27b`
- `deepseek/deepseek-v4-flash-0731`
- `rekaai/reka-edge`
- `rekaai/reka-flash-3`

### Inception (`inception`)

OpenRouter **2** unique model IDs (query `inception`, total_count=2).

- `inception/mercury-2.5`
- `inception/mercury-2`

### Liquid (`liquid`)

OpenRouter **2** unique model IDs (query `liquid`, total_count=2).

- `liquid/lfm-2.5-embedding-350m:free`
- `liquid/lfm-2.5-2.6b:free`

### Seed (`seed`)

OpenRouter **14** unique model IDs (query `seed`, total_count=14).

- `bytedance-seed/seedream-5-0-lite`
- `bytedance-seed/seedream-5-0-pro`
- `bytedance/seedance-2.0-mini`
- `bytedance-seed/seed-2-1-turbo`
- `bytedance-seed/seed-2.0-code`
- `bytedance/seedance-2.5`
- `bytedance/seedance-2.0`
- `bytedance/seedance-2.0-fast`
- `bytedance/seedance-1-5-pro`
- `bytedance-seed/seed-2.0-lite`
- `bytedance-seed/seed-2.0-mini`
- `bytedance-seed/seedream-4.5`
- `bytedance-seed/seed-1.6-flash`
- `bytedance-seed/seed-1.6`

### StepFun (`stepfun`)

OpenRouter **1** unique model IDs (query `stepfun`, total_count=1).

- `stepfun/step-3.7-flash`

### Sakana AI (`sakana`)

OpenRouter **4** unique model IDs (query `Sakana AI`, total_count=4).

- `sakana/fugu-ultra-v2`
- `sakana/fugu-max`
- `sakana/sakana-namazu`
- `sakana/fugu-ultra`

### Arcee AI (`arcee-ai`)

OpenRouter **1** unique model IDs (query `Arcee AI`, total_count=1).

- `arcee-ai/trinity-large-thinking`

### Perceptron (`perceptron`)

OpenRouter **1** unique model IDs (query `perceptron`, total_count=1).

- `perceptron/perceptron-mk1`

### AI21 (`ai21`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).


## Cloud platforms

### Azure (`azure`)

OpenRouter **57** unique model IDs (query `azure`, total_count=57).

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

### Amazon Bedrock (`amazon-bedrock`)

OpenRouter **32** unique model IDs (query `Amazon Bedrock`, total_count=32).

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

### Claude Platform on AWS (`claude-on-aws`)

OpenRouter **9** unique model IDs (query `Claude Platform on AWS`, total_count=9).

- `anthropic/claude-opus-5`
- `anthropic/claude-sonnet-5`
- `anthropic/claude-fable-5`
- `anthropic/claude-opus-4.8`
- `anthropic/claude-opus-4.7`
- `anthropic/claude-sonnet-4.6`
- `anthropic/claude-opus-4.6`
- `anthropic/claude-opus-4.5`
- `anthropic/claude-sonnet-4.5`

### Google (`google-vertex`)

OpenRouter **52** unique model IDs; +12 `:batch` SKUs (query `Google`, total_count=64).

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

### Alibaba (`alibaba`)

OpenRouter **64** unique model IDs (query `alibaba`, total_count=64).

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

### Tencent (`tencent`)

OpenRouter **5** unique model IDs (query `tencent`, total_count=5).

- `tencent/hy4-preview`
- `tencent/hy-mt2-1.8b`
- `tencent/hy-mt2-30b-a3b`
- `tencent/hy-mt2-7b`
- `tencent/hy3`

### Baidu (`baidu`)

OpenRouter **10** unique model IDs (query `baidu`, total_count=10).

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

### Cloudflare (`cloudflare`)

OpenRouter **18** unique model IDs (query `cloudflare`, total_count=18).

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

### CoreWeave (`coreweave`)

OpenRouter **17** unique model IDs (query `coreweave`, total_count=17).

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

OpenRouter **5** unique model IDs (query `modal`, total_count=5).

- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `qwen/qwen3.8-2.4t-a95b`
- `moonshotai/kimi-k3`

### DigitalOcean (`digitalocean`)

OpenRouter **16** unique model IDs (query `digitalocean`, total_count=16).

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

OpenRouter **5** unique model IDs (query `crusoe`, total_count=5).

- `z-ai/glm-5.3-flash`
- `moonshotai/kimi-k2.6`
- `google/gemma-4-31b-it`
- `nvidia/nemotron-3-nano-30b-a3b`
- `openai/gpt-oss-120b`

### Nebius (`nebius`)

OpenRouter **8** unique model IDs (query `nebius`, total_count=8).

- `z-ai/glm-5.1`
- `nvidia/nemotron-3-nano-30b-a3b`
- `qwen/qwen3-embedding-8b`
- `nousresearch/hermes-4-405b`
- `openai/gpt-oss-120b`
- `qwen/qwen3-30b-a3b-instruct-2507`
- `qwen/qwen3-235b-a22b-2507`
- `google/gemma-3-27b-it`


## Inference hosts

### Together (`together`)

OpenRouter **21** unique model IDs; +10 `:batch` SKUs (query `together`, total_count=31).

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

### Fireworks (`fireworks`)

OpenRouter **12** unique model IDs; +7 `:batch` SKUs (query `fireworks`, total_count=19).

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

### Groq (`groq`)

OpenRouter **8** unique model IDs (query `groq`, total_count=8).

- `openai/whisper-large-v3`
- `openai/whisper-large-v3-turbo`
- `minimax/minimax-m2.7`
- `openai/gpt-oss-safeguard-20b`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `meta-llama/llama-3.3-70b-instruct`
- `meta-llama/llama-3.1-8b-instruct`

### Cerebras (`cerebras`)

OpenRouter **1** unique model IDs (query `cerebras`, total_count=1).

- `openai/gpt-oss-120b`

### SambaNova (`sambanova`)

OpenRouter **7** unique model IDs (query `sambanova`, total_count=7).

- `minimax/minimax-m3`
- `google/gemma-4-31b-it`
- `minimax/minimax-m2.7`
- `deepseek/deepseek-v3.2`
- `deepseek/deepseek-chat-v3.1`
- `openai/gpt-oss-120b`
- `meta-llama/llama-3.3-70b-instruct`

### DeepInfra (`deepinfra`)

OpenRouter **103** unique model IDs (query `deepinfra`, total_count=103).

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

### Novita (`novita`)

OpenRouter **74** unique model IDs (query `novita`, total_count=74).

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

### SiliconFlow (`siliconflow`)

OpenRouter **40** unique model IDs (query `siliconflow`, total_count=40).

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

### Parasail (`parasail`)

OpenRouter **39** unique model IDs (query `parasail`, total_count=39).

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

### Friendli (`friendli`)

OpenRouter **7** unique model IDs (query `friendli`, total_count=7).

- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `z-ai/glm-5.2`
- `z-ai/glm-5.1`
- `google/gemma-4-31b-it`
- `minimax/minimax-m2.5`
- `deepseek/deepseek-v3.2`

### BaseTen (`baseten`)

OpenRouter **14** unique model IDs (query `baseten`, total_count=14).

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

### AtlasCloud (`atlas-cloud`)

OpenRouter **35** unique model IDs (query `AtlasCloud`, total_count=35).

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

### GMICloud (`gmicloud`)

OpenRouter **23** unique model IDs (query `gmicloud`, total_count=23).

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

### StreamLake (`streamlake`)

OpenRouter **23** unique model IDs (query `streamlake`, total_count=23).

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

### Relace (`relace`)

OpenRouter **6** unique model IDs (query `relace`, total_count=6).

- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`
- `relace/relace-search`
- `relace/relace-apply-3`

### Wafer (`wafer`)

OpenRouter **6** unique model IDs (query `wafer`, total_count=6).

- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`
- `z-ai/glm-5.2`

### OpenInference (`open-inference`)

OpenRouter **2** unique model IDs (query `OpenInference`, total_count=2).

- `deepseek/deepseek-v4-flash-0731:free`
- `deepseek/deepseek-v4-flash`

### Venice (`venice`)

OpenRouter **36** unique model IDs (query `venice`, total_count=36).

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

### Chutes (`chutes`)

OpenRouter **6** unique model IDs (query `chutes`, total_count=6).

- `qwen/qwen3.8-27b`
- `moonshotai/kimi-k3`
- `qwen/qwen3.6-27b`
- `moonshotai/kimi-k2.6`
- `z-ai/glm-5.1`
- `google/gemma-4-31b-it`

### Io Net (`io-net`)

OpenRouter **5** unique model IDs (query `Io Net`, total_count=5).

- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `qwen/qwen3.8-27b`
- `qwen/qwen3.6-35b-a3b`
- `mistralai/mistral-nemo`

### InferenceNet (`inference-net`)

OpenRouter **5** unique model IDs (query `InferenceNet`, total_count=5).

- `inference-net/schematron-v2-turbo`
- `inference-net/schematron-v2-small`
- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `moonshotai/kimi-k3`

### NextBit (`nextbit`)

OpenRouter **10** unique model IDs (query `nextbit`, total_count=10).

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

OpenRouter **5** unique model IDs (query `inceptron`, total_count=5).

- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-flash-0731`
- `z-ai/glm-5.2`
- `moonshotai/kimi-k2.7-code`
- `moonshotai/kimi-k2.6`

### DekaLLM (`dekallm`)

OpenRouter **7** unique model IDs (query `dekallm`, total_count=7).

- `qwen/qwen3.8-27b`
- `google/gemma-4-26b-a4b-it`
- `nvidia/nemotron-3-super-120b-a12b`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `qwen/qwen3-30b-a3b-instruct-2507`
- `mistralai/mistral-nemo`

### Mancer 2 (`mancer`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Makora (`makora`)

OpenRouter **5** unique model IDs (query `makora`, total_count=5).

- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`
- `google/gemma-4-26b-a4b-it`

### AkashML (`akashml`)

OpenRouter **6** unique model IDs (query `akashml`, total_count=6).

- `z-ai/glm-5.3`
- `qwen/qwen3.8-27b`
- `qwen/qwen3.6-35b-a3b`
- `openai/gpt-oss-120b`
- `openai/gpt-oss-20b`
- `meta-llama/llama-3.3-70b-instruct`

### Darkbloom (`darkbloom`)

OpenRouter **8** unique model IDs (query `darkbloom`, total_count=8).

- `prism-ml/ternary-bonsai-2-27b`
- `qwen/qwen3.8-27b`
- `nvidia/nemotron-3.5-lightning`
- `qwen/qwen3.6-35b-a3b`
- `google/gemma-4-26b-a4b-it`
- `qwen/qwen3.5-9b`
- `qwen/qwen3.5-35b-a3b`
- `openai/gpt-oss-20b`

### Ionstream (`ionstream`)

OpenRouter **2** unique model IDs (query `ionstream`, total_count=2).

- `qwen/qwen3.8-27b`
- `deepseek/deepseek-v4-pro-0813`

### ModelRun (`modelrun`)

OpenRouter **4** unique model IDs (query `modelrun`, total_count=4).

- `qwen/qwen3.8-27b:free`
- `moonshotai/kimi-k2.7-code`
- `minimax/minimax-m3`
- `google/gemma-4-31b-it`

### Near AI (`near-ai`)

OpenRouter **1** unique model IDs (query `Near AI`, total_count=1).

- `z-ai/glm-5.3-flash`

### AionLabs (`aion-labs`)

OpenRouter **4** unique model IDs (query `AionLabs`, total_count=4).

- `aion-labs/aion-3.0-mini`
- `aion-labs/aion-3.0`
- `aion-labs/aion-2.0`
- `aion-labs/aion-rp-llama-3.1-8b`

### Ambient (`ambient`)

OpenRouter **1** unique model IDs (query `ambient`, total_count=1).

- `z-ai/glm-5.2`

### Mara (`mara`)

OpenRouter **5** unique model IDs (query `mara`, total_count=5).

- `minimax/minimax-m3`
- `minimax/minimax-m2.7`
- `deepseek/deepseek-v3.2`
- `deepseek/deepseek-chat-v3.1`
- `openai/gpt-oss-120b`

### Sail Research (`sail-research`)

OpenRouter **5** unique model IDs (query `Sail Research`, total_count=5).

- `z-ai/glm-5.3-flash`
- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-pro-0813`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`

### Featherless (`featherless`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).


## Specialized APIs

### VoyageAI by MongoDB (`voyageai`)

OpenRouter **7** unique model IDs (query `VoyageAI by MongoDB`, total_count=7).

- `voyageai/voyage-code-4`
- `voyageai/rerank-2.5-lite`
- `voyageai/rerank-2.5`
- `voyageai/voyage-multimodal-3.5`
- `voyageai/voyage-4-lite`
- `voyageai/voyage-4`
- `voyageai/voyage-4-large`

### Deepgram (`deepgram`)

OpenRouter **3** unique model IDs (query `deepgram`, total_count=3).

- `deepgram/flux-tts:free`
- `deepgram/aura-2`
- `deepgram/nova-3`

### Fish Audio (`fish-audio`)

OpenRouter **5** unique model IDs (query `Fish Audio`, total_count=5).

- `fish-audio/transcribe-1`
- `fish-audio/s1`
- `fish-audio/s2-pro`
- `fish-audio/s2.1-pro-free:free`
- `fish-audio/s2.1-pro`

### Black Forest Labs (`black-forest-labs`)

OpenRouter **7** unique model IDs (query `Black Forest Labs`, total_count=7).

- `black-forest-labs/flux-video-edit`
- `black-forest-labs/flux-video-upscale`
- `black-forest-labs/flux-3-video`
- `black-forest-labs/flux.2-klein-4b`
- `black-forest-labs/flux.2-max`
- `black-forest-labs/flux.2-flex`
- `black-forest-labs/flux.2-pro`

### Recraft (`recraft`)

OpenRouter **15** unique model IDs (query `recraft`, total_count=15).

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

### Krea (`krea`)

OpenRouter **3** unique model IDs (query `krea`, total_count=3).

- `krea/krea-2-large`
- `krea/krea-2-medium`
- `krea/krea-2-medium-turbo`

### Runway (`runway`)

OpenRouter **2** unique model IDs (query `runway`, total_count=2).

- `runway/aleph-2`
- `runway/gen-4.5`

### HeyGen (`heygen`)

OpenRouter **1** unique model IDs (query `heygen`, total_count=1).

- `heygen/avatar-iv`

### Decart (`decart`)

OpenRouter **4** unique model IDs (query `decart`, total_count=4).

- `z-ai/glm-5.3`
- `z-ai/glm-5.2`
- `z-ai/glm-5.2:free`
- `moonshotai/kimi-k2.6`

### Morph (`morph`)

OpenRouter **6** unique model IDs (query `morph`, total_count=6).

- `deepseek/deepseek-v4.1-flash`
- `z-ai/glm-5.3`
- `deepseek/deepseek-v4-flash-0731`
- `moonshotai/kimi-k3`
- `morph/morph-v3-large`
- `morph/morph-v3-fast`

### Phala (`phala`)

OpenRouter **21** unique model IDs (query `phala`, total_count=21).

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

### Sourceful (`sourceful`)

OpenRouter **4** unique model IDs (query `sourceful`, total_count=4).

- `sourceful/riverflow-v2.5-pro`
- `sourceful/riverflow-v2.5-fast`
- `sourceful/riverflow-v2-pro`
- `sourceful/riverflow-v2-fast`

### TypeSafe (`typesafe`)

OpenRouter **1** unique model IDs (query `typesafe`, total_count=1).

- `typesafe/jev-1.13`

### Unbiased (`unbiased`)

OpenRouter **1** unique model IDs (query `unbiased`, total_count=1).

- `unbiased/pareto`

### AssemblyAI (`assemblyai`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).


## Other OpenRouter slugs (low/no volume or extra enum)

### Amazon Nova (`amazon-nova`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Avian (`avian`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Cirrascale (`cirrascale`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Clarifai (`clarifai`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Cosine (`cosine`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Crucible (`crucible`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Databricks (`databricks`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Inferact vLLM (`inferact-vllm`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Infermatic (`infermatic`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Inflection (`inflection`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Modular (`modular`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Ollama (`ollama`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### PrimeIntellect (`primeintellect`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Quiver (`quiver`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Switchpoint (`switchpoint`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

### Tenstorrent (`tenstorrent`)

OpenRouter listed **0** models at snapshot (empty or not currently routed).

