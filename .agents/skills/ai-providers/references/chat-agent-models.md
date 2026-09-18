# Agent and chat models (OpenRouter, September 2026)

Token prices are OpenRouter USD **per 1M tokens**. Image/video/music often bill **per image, second, or song** — if prompt/completion show $0, open the OpenRouter page. `:batch` SKUs omitted.

OpenRouter: `https://openrouter.ai/{id}`.

**Agent / chat** = text (or multimodal-in → text-out) models for conversation, tool calling, coding agents, and computer use. Image/video/music generators are in the sibling files.

- Prefer **Tools: yes**; for long-horizon agents also **Reasoning**.
- Implementation: [openai-sdk](../../openai-sdk/SKILL.md), [anthropic-sdk](../../anthropic-sdk/SKILL.md), [google-genai](../../google-genai/SKILL.md), [mistral-sdk](../../mistral-sdk/SKILL.md), [deepseek-sdk](../../deepseek-sdk/SKILL.md), [cohere-sdk](../../cohere-sdk/SKILL.md).
- Open weights on hosts: [inference-hosts.md](inference-hosts.md).

Vendor indexes: [OpenAI](https://developers.openai.com/api/docs/models) · [Anthropic](https://docs.anthropic.com/en/docs/about-claude/models) · [Gemini](https://ai.google.dev/gemini-api/docs/models) · [xAI](https://docs.x.ai/docs/models) · [Mistral](https://docs.mistral.ai/getting-started/models) · [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing)

## Flagship agent / chat models (76)

### `deepseek/deepseek-v4.1-flash` — DeepSeek: DeepSeek V4.1 Flash

- **OpenRouter:** https://openrouter.ai/deepseek/deepseek-v4.1-flash
- **Vendor docs:** https://api-docs.deepseek.com/quick_start/pricing
- **Hugging Face:** https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash
- **Modalities:** in `text,image` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, high, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.15 / $0.6 per 1M tok
- **About:** DeepSeek V4.1 Flash is a sparse mixture-of-experts model from DeepSeek, and the first built on the company's Causal Encoder-Decoder (CED) architecture. It activates 8B parameters on input and 16B on...

### `openai/gpt-6-astra` — OpenAI: GPT-6 Astra

- **OpenRouter:** https://openrouter.ai/openai/gpt-6-astra
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `file,image,text` → out `text`
- **Context:** 1.1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $10 / $50 per 1M tok · web_search $0.01/call
- **About:** GPT-6 Astra is OpenAI's flagship model for demanding end-to-end work. It is suited for advanced analysis, software engineering, deep research, scientific work, and document creation, with particular strengths in long-horizon...

### `openai/gpt-6-astra-pro` — OpenAI: GPT-6 Astra Pro

- **OpenRouter:** https://openrouter.ai/openai/gpt-6-astra-pro
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `file,image,text` → out `text`
- **Context:** 1.1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $10 / $50 per 1M tok · web_search $0.01/call
- **About:** GPT-6 Astra Pro is the same underlying model as [GPT-6 Astra](https://openrouter.ai/openai/gpt-6-astra), served with `reasoning.mode` set to `pro` for higher-quality responses on complex tasks. Learn more in OpenAI's docs: https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode

### `qwen/qwen3.8-max-0902` — Qwen: Qwen3.8 Max (0902)

- **OpenRouter:** https://openrouter.ai/qwen/qwen3.8-max-0902
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Modalities:** in `text,image,video` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (xhigh, high, medium, low, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $6 per 1M tok
- **About:** Qwen3.8 Max 0902 is an updated snapshot of Qwen3.8 Max from Alibaba's Qwen team. It is a 2.4-trillion-parameter mixture-of-experts model that accepts text, image, and video input and returns text,...

### `meta/muse-spark-1.3-contributor` — Meta: Muse Spark 1.3 Contributor

- **OpenRouter:** https://openrouter.ai/meta/muse-spark-1.3-contributor
- **Vendor docs:** https://ai.developer.meta.com/docs/models/
- **Modalities:** in `text,image,video,file,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.1 / $0.2 per 1M tok · web_search $0.00/call
- **About:** Muse Spark 1.3 Contributor is the cost-efficient contributor tier of Meta’s multimodal reasoning model for experimentation, learning, and early-stage agentic, multi-agent, and coding workflows. It is designed to track information...

### `meta/muse-spark-1.3` — Meta: Muse Spark 1.3

- **OpenRouter:** https://openrouter.ai/meta/muse-spark-1.3
- **Vendor docs:** https://ai.developer.meta.com/docs/models/
- **Modalities:** in `text,image,video,file,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.25 / $4.25 per 1M tok · web_search $0.00/call
- **About:** Muse Spark 1.3 is a multimodal reasoning model from Meta for long-running agentic, multi-agent, and coding workflows. It is designed to keep track of information across extended tasks, work through...

### `google/gemini-3.8-flash` — Google: Gemini 3.8 Flash

- **OpenRouter:** https://openrouter.ai/google/gemini-3.8-flash
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,image,video,file,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.75 / $3.75 per 1M tok · web_search $0.01/call; image $0.75 per 1M; audio $0.75 per 1M
- **About:** Gemini 3.8 Flash is Google's most intelligent Flash model with significant gains from 3.7 Flash across software engineering, agentic tasks, and multi-step reasoning.

### `anthropic/claude-fable-5.1` — Anthropic: Claude Fable 5.1

- **OpenRouter:** https://openrouter.ai/anthropic/claude-fable-5.1
- **Vendor docs:** https://docs.anthropic.com/en/docs/about-claude/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $10 / $50 per 1M tok · web_search $0.01/call
- **About:** Claude Fable 5.1 improves on Claude Fable 5 across the board, with the biggest gains in agentic coding, long-running agentic workflows, and knowledge work: long code refactors, front-end and visual...

### `qwen/qwen3.8-flash` — Qwen: Qwen3.8 Flash

- **OpenRouter:** https://openrouter.ai/qwen/qwen3.8-flash
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Hugging Face:** https://huggingface.co/Qwen/Qwen3.8-Flash-Next
- **Modalities:** in `text,image,video` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.15 / $0.47 per 1M tok
- **About:** Qwen3.8 Flash is a multimodal reasoning model from Alibaba. It is suited for coding assistance, agentic workflows, visual understanding, document and codebase analysis, desktop interaction, chart analysis, and long-video analysis.

### `z-ai/glm-5.3-flash` — Z.ai: GLM 5.3 Flash

- **OpenRouter:** https://openrouter.ai/z-ai/glm-5.3-flash
- **Vendor docs:** https://docs.z.ai/guides/overview/pricing
- **Hugging Face:** https://huggingface.co/zai-org/GLM-5.3-Flash
- **Modalities:** in `text,image,video` → out `text`
- **Context:** 1.3M · **Tools:** yes · **Reasoning:** yes (max, high, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.09 / $0.3 per 1M tok
- **About:** GLM-5.3-Flash is a native multimodal model from Z.ai. It is suited for efficient coding and long-horizon agent tasks. Its hybrid sparse and linear attention architecture maintains accurate long-context behavior while...

### `meta/muse-spark-1.2-contributor` — Meta: Muse Spark 1.2 Contributor

- **OpenRouter:** https://openrouter.ai/meta/muse-spark-1.2-contributor
- **Vendor docs:** https://ai.developer.meta.com/docs/models/
- **Modalities:** in `text,image,video,file,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (xhigh, high, medium, low, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.1 / $0.2 per 1M tok · web_search $0.00/call
- **About:** Muse Spark 1.2 contributor tier is a reasoning model from Meta designed for developers who want to start building at an even lower cost. It’s meaningfully cheaper than Muse Spark...

### `z-ai/glm-5.3` — Z.ai: GLM 5.3

- **OpenRouter:** https://openrouter.ai/z-ai/glm-5.3
- **Vendor docs:** https://docs.z.ai/guides/overview/pricing
- **Hugging Face:** https://huggingface.co/zai-org/GLM-5.3
- **Modalities:** in `text` → out `text`
- **Context:** 1.3M · **Tools:** yes · **Reasoning:** yes (max, high, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.91 / $2.86 per 1M tok
- **About:** GLM-5.3 is a large-scale reasoning model from Z.ai, built for complex software engineering and long-horizon agent tasks. It supports text input and output with a 1M-token context window, and improves...

### `qwen/qwen3.8-27b` — Qwen: Qwen3.8 27B

- **OpenRouter:** https://openrouter.ai/qwen/qwen3.8-27b
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Hugging Face:** https://huggingface.co/Qwen/Qwen3.8-27B
- **Modalities:** in `text,image,video` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (xhigh, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.214 / $2.55 per 1M tok
- **About:** Qwen3.8 27B is an open-weight dense vision-language model from Qwen. It is suited for coding, professional workflows, research, multimodal interaction, and long-running agent tasks, with flexible thinking that can be...

### `qwen/qwen3.8-27b:free` — Qwen: Qwen3.8 27B (free)

- **OpenRouter:** https://openrouter.ai/qwen/qwen3.8-27b:free
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Hugging Face:** https://huggingface.co/Qwen/Qwen3.8-27B
- **Modalities:** in `text,image,video` → out `text`
- **Context:** 262K · **Tools:** yes · **Reasoning:** yes (xhigh, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Qwen3.8 27B is an open-weight dense vision-language model from Qwen. It is suited for coding, professional workflows, research, multimodal interaction, and long-running agent tasks, with flexible thinking that can be...

### `google/gemini-3.7-flash` — Google: Gemini 3.7 Flash

- **OpenRouter:** https://openrouter.ai/google/gemini-3.7-flash
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,image,video,file,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.75 / $3.75 per 1M tok · web_search $0.01/call; image $0.75 per 1M; audio $0.75 per 1M
- **About:** Gemini 3.7 Flash is a multimodal model from Google for fast agentic workflows, coding, and complex multi-step reasoning. It is designed for tasks that require responsive performance and reliable multi-step...

### `qwen/qwen3.8-2.4t-a95b` — Qwen: Qwen3.8 2.4T A95B

- **OpenRouter:** https://openrouter.ai/qwen/qwen3.8-2.4t-a95b
- **Vendor docs:** https://www.alibabacloud.com/help/en/model-studio/
- **Hugging Face:** https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B
- **Modalities:** in `text` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (xhigh, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $6 per 1M tok
- **About:** Qwen3.8 2.4T A95B is an open-weight sparse mixture-of-experts model from Qwen and the open-weight variant of [Qwen3.8 Max](/qwen/qwen3.8-max), with 95 billion active parameters out of 2.4 trillion total. It is...

### `deepseek/deepseek-v4-pro-0813` — DeepSeek: DeepSeek V4 Pro 0813

- **OpenRouter:** https://openrouter.ai/deepseek/deepseek-v4-pro-0813
- **Vendor docs:** https://api-docs.deepseek.com/quick_start/pricing
- **Hugging Face:** https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro-0813
- **Modalities:** in `text` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, high, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.5782 / $1.73 per 1M tok
- **About:** DeepSeek V4 Pro 0813 is a large-scale mixture-of-experts model from DeepSeek. This is the GA release of DeepSeek V4 Pro.

### `x-ai/grok-4.6` — SpaceXAI: Grok 4.6

- **OpenRouter:** https://openrouter.ai/x-ai/grok-4.6
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 500K · **Tools:** yes · **Reasoning:** yes (xhigh, high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $6 per 1M tok · web_search $0.01/call
- **About:** Grok 4.6 is SpaceXAI's smartest model with frontier performance on coding, knowledge work, and STEM.

### `meta/muse-spark-1.2` — Meta: Muse Spark 1.2

- **OpenRouter:** https://openrouter.ai/meta/muse-spark-1.2
- **Vendor docs:** https://ai.developer.meta.com/docs/models/
- **Modalities:** in `text,image,video,file,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (xhigh, high, medium, low, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.25 / $4.25 per 1M tok · web_search $0.00/call
- **About:** Muse Spark 1.2 is a reasoning model from Meta, designed for complex agentic tasks. It accepts text, images, video, audio, and PDF documents, returns text, and offers a 1M-token context...

### `thinkingmachines/inkling-small` — Thinking Machines: Inkling Small

- **OpenRouter:** https://openrouter.ai/thinkingmachines/inkling-small
- **Hugging Face:** https://huggingface.co/thinkingmachines/Inkling-Small
- **Modalities:** in `text,image,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, high, medium, low, minimal, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.45 / $1.2 per 1M tok
- **About:** Inkling Small is an open-weight multimodal mixture-of-experts model from Thinking Machines Lab, with 12B active parameters out of 276B total. It is positioned as the smaller, more efficient member of...

### `thinkingmachines/inkling-small:free` — Thinking Machines: Inkling Small (free)

- **OpenRouter:** https://openrouter.ai/thinkingmachines/inkling-small:free
- **Hugging Face:** https://huggingface.co/thinkingmachines/Inkling-Small
- **Modalities:** in `text,image,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, high, medium, low, minimal, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Inkling Small is an open-weight multimodal mixture-of-experts model from Thinking Machines Lab, with 12B active parameters out of 276B total. It is positioned as the smaller, more efficient member of...

### `anthropic/claude-opus-5` — Anthropic: Claude Opus 5

- **OpenRouter:** https://openrouter.ai/anthropic/claude-opus-5
- **Vendor docs:** https://docs.anthropic.com/en/docs/about-claude/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $5 / $25 per 1M tok · web_search $0.01/call
- **About:** Claude Opus 5 is Anthropic’s flagship model for demanding reasoning, coding, and long-horizon agentic work. It is particularly strong at end-to-end software tasks, code review and bug finding, visual analysis...

### `poolside/laguna-s-2.1` — Poolside: Laguna S 2.1

- **OpenRouter:** https://openrouter.ai/poolside/laguna-s-2.1
- **Hugging Face:** https://huggingface.co/poolside/Laguna-S-2.1
- **Modalities:** in `text` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.09 / $0.18 per 1M tok
- **About:** Laguna S 2.1 is the latest coding agent model from [Poolside](<https://poolside.ai/>). Laguna S 2.1 is a 118B total parameter model with 8B active parameters, scoring 70.2% on Terminal-Bench 2.1 and...

### `poolside/laguna-s-2.1:free` — Poolside: Laguna S 2.1 (free)

- **OpenRouter:** https://openrouter.ai/poolside/laguna-s-2.1:free
- **Hugging Face:** https://huggingface.co/poolside/Laguna-S-2.1
- **Modalities:** in `text` → out `text`
- **Context:** 262K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Laguna S 2.1 is the latest coding agent model from [Poolside](<https://poolside.ai/>). Laguna S 2.1 is a 118B total parameter model with 8B active parameters, scoring 70.2% on Terminal-Bench 2.1 and...

### `google/gemini-3.6-flash` — Google: Gemini 3.6 Flash

- **OpenRouter:** https://openrouter.ai/google/gemini-3.6-flash
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,image,video,file,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (high, medium, low, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.75 / $3.75 per 1M tok · web_search $0.01/call; image $0.75 per 1M; audio $0.75 per 1M
- **About:** Gemini 3.6 Flash is a high-efficiency model from Google for coding, agentic workflows, and web and app development. It is designed to produce polished outputs with fewer unnecessary edits and...

### `google/gemini-3.5-flash-lite` — Google: Gemini 3.5 Flash Lite

- **OpenRouter:** https://openrouter.ai/google/gemini-3.5-flash-lite
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,image,video,file,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (high, medium, low, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.3 / $2.5 per 1M tok · web_search $0.01/call; image $0.3 per 1M; audio $0.3 per 1M
- **About:** Gemini 3.5 Flash Lite is a high-efficiency model from Google with upgraded agentic capabilities. It is suited for subagents that execute focused tasks within complex, multi-agent workflows.

### `thinkingmachines/inkling` — Thinking Machines: Inkling

- **OpenRouter:** https://openrouter.ai/thinkingmachines/inkling
- **Hugging Face:** https://huggingface.co/thinkingmachines/Inkling
- **Modalities:** in `text,image,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, high, medium, low, minimal, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1 / $4.05 per 1M tok
- **About:** Inkling is an open-weight multimodal mixture-of-experts model from Thinking Machines Lab, with 41B active parameters out of 975B total. It is designed for general-purpose reasoning, coding, agentic and tool-use systems,...

### `thinkingmachines/inkling:free` — Thinking Machines: Inkling (free)

- **OpenRouter:** https://openrouter.ai/thinkingmachines/inkling:free
- **Hugging Face:** https://huggingface.co/thinkingmachines/Inkling
- **Modalities:** in `text,image,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, high, medium, low, minimal, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Inkling is an open-weight multimodal mixture-of-experts model from Thinking Machines Lab, with 41B active parameters out of 975B total. It is designed for general-purpose reasoning, coding, agentic and tool-use systems,...

### `moonshotai/kimi-k3` — MoonshotAI: Kimi K3

- **OpenRouter:** https://openrouter.ai/moonshotai/kimi-k3
- **Vendor docs:** https://platform.moonshot.ai/docs
- **Hugging Face:** https://huggingface.co/moonshotai/Kimi-K3
- **Modalities:** in `text,image,video` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, high, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.95 / $10.92 per 1M tok
- **About:** Kimi K3 is a 2.8T parameter open-weight multimodal reasoning model from Moonshot AI. It is suited for complex coding, knowledge work, and long-horizon agentic workflows, and is particularly strong at...

### `meta/muse-spark-1.1` — Meta: Muse Spark 1.1

- **OpenRouter:** https://openrouter.ai/meta/muse-spark-1.1
- **Vendor docs:** https://ai.developer.meta.com/docs/models/
- **Modalities:** in `text,image,video,file,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (xhigh, high, medium, low, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.25 / $4.25 per 1M tok · web_search $0.00/call
- **About:** Muse Spark 1.1 is a multimodal reasoning model from Meta, built for agentic tasks. It accepts text, images, video, audio, and PDF documents and returns text, with a 1M-token context...

### `openai/gpt-5.6-luna-pro` — OpenAI: GPT-5.6 Luna Pro

- **OpenRouter:** https://openrouter.ai/openai/gpt-5.6-luna-pro
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `file,image,text` → out `text`
- **Context:** 1.1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.2 / $1.2 per 1M tok · web_search $0.01/call
- **About:** GPT-5.6 Luna Pro is the same underlying model as [GPT-5.6 Luna](https://openrouter.ai/openai/gpt-5.6-luna), served with `reasoning.mode` set to `pro` for higher-quality responses on complex tasks. Learn more in OpenAI's docs: https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode

### `openai/gpt-5.6-luna` — OpenAI: GPT-5.6 Luna

- **OpenRouter:** https://openrouter.ai/openai/gpt-5.6-luna
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `file,image,text` → out `text`
- **Context:** 1.1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.2 / $1.2 per 1M tok · web_search $0.01/call
- **About:** GPT-5.6 Luna is a fast, cost-efficient model in OpenAI's GPT-5.6 series. It is suited for high-volume, latency-sensitive tasks such as chat, classification, and lightweight agentic workflows, providing capable reasoning for...

### `openai/gpt-5.6-terra-pro` — OpenAI: GPT-5.6 Terra Pro

- **OpenRouter:** https://openrouter.ai/openai/gpt-5.6-terra-pro
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `file,image,text` → out `text`
- **Context:** 1.1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $12 per 1M tok · web_search $0.01/call
- **About:** GPT-5.6 Terra Pro is the same underlying model as [GPT-5.6 Terra](https://openrouter.ai/openai/gpt-5.6-terra), served with `reasoning.mode` set to `pro` for higher-quality responses on complex tasks. Learn more in OpenAI's docs: https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode

### `openai/gpt-5.6-terra` — OpenAI: GPT-5.6 Terra

- **OpenRouter:** https://openrouter.ai/openai/gpt-5.6-terra
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `file,image,text` → out `text`
- **Context:** 1.1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $12 per 1M tok · web_search $0.01/call
- **About:** GPT-5.6 Terra is a balanced model in OpenAI's GPT-5.6 series, positioned between the flagship Sol tier and the cost-efficient Luna tier. It is suited for everyday coding, reasoning, and agentic...

### `openai/gpt-5.6-sol-pro` — OpenAI: GPT-5.6 Sol Pro

- **OpenRouter:** https://openrouter.ai/openai/gpt-5.6-sol-pro
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `file,image,text` → out `text`
- **Context:** 1.1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $10 per 1M tok · web_search $0.01/call
- **About:** GPT-5.6 Sol Pro is the same underlying model as [GPT-5.6 Sol](https://openrouter.ai/openai/gpt-5.6-sol), served with `reasoning.mode` set to `pro` for higher-quality responses on complex tasks. Learn more in OpenAI's docs: https://developers.openai.com/api/docs/guides/reasoning#reasoning-mode

### `openai/gpt-5.6-sol` — OpenAI: GPT-5.6 Sol

- **OpenRouter:** https://openrouter.ai/openai/gpt-5.6-sol
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `file,image,text` → out `text`
- **Context:** 1.1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $10 per 1M tok · web_search $0.01/call
- **About:** GPT-5.6 Sol is the flagship model in OpenAI's GPT-5.6 series. It is suited for complex reasoning, coding, and agentic workflows, and is particularly strong at command-line and multi-step coding tasks...

### `x-ai/grok-4.5` — SpaceXAI: Grok 4.5

- **OpenRouter:** https://openrouter.ai/x-ai/grok-4.5
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 500K · **Tools:** yes · **Reasoning:** yes (high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $6 per 1M tok · web_search $0.01/call
- **About:** Grok 4.5 is a model from SpaceXAI with frontier performance on coding, knowledge work, and STEM.

### `poolside/laguna-xs-2.1` — Poolside: Laguna XS 2.1

- **OpenRouter:** https://openrouter.ai/poolside/laguna-xs-2.1
- **Hugging Face:** https://huggingface.co/poolside/Laguna-XS-2.1
- **Modalities:** in `text` → out `text`
- **Context:** 262K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.06 / $0.12 per 1M tok
- **About:** Laguna XS 2.1 is the latest coding agent model in the 33B-A3B category from [Poolside](https://poolside.ai/) and a step forward from their Laguna XS.2 model (released in April 2026). It combines...

### `poolside/laguna-xs-2.1:free` — Poolside: Laguna XS 2.1 (free)

- **OpenRouter:** https://openrouter.ai/poolside/laguna-xs-2.1:free
- **Hugging Face:** https://huggingface.co/poolside/Laguna-XS-2.1
- **Modalities:** in `text` → out `text`
- **Context:** 262K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** Laguna XS 2.1 is the latest coding agent model in the 33B-A3B category from [Poolside](https://poolside.ai/) and a step forward from their Laguna XS.2 model (released in April 2026). It combines...

### `anthropic/claude-sonnet-5` — Anthropic: Claude Sonnet 5

- **OpenRouter:** https://openrouter.ai/anthropic/claude-sonnet-5
- **Vendor docs:** https://docs.anthropic.com/en/docs/about-claude/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $10 per 1M tok · web_search $0.01/call
- **About:** Sonnet 5 is Anthropic's most capable Sonnet-class model, with frontier performance across coding, agents, and professional work. It supports adaptive thinking with selectable reasoning effort levels (low, medium, high, max,...

### `z-ai/glm-5.2` — Z.ai: GLM 5.2

- **OpenRouter:** https://openrouter.ai/z-ai/glm-5.2
- **Vendor docs:** https://docs.z.ai/guides/overview/pricing
- **Hugging Face:** https://huggingface.co/zai-org/GLM-5.2
- **Modalities:** in `text` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (xhigh, high)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.5544 / $1.74 per 1M tok
- **About:** GLM 5.2 is a large-scale reasoning model from Z.ai. It supports text input and output with a 1M-token context window, and is suited for long-horizon agent workflows, project-level software engineering,...

### `z-ai/glm-5.2:free` — Z.ai: GLM 5.2 (free)

- **OpenRouter:** https://openrouter.ai/z-ai/glm-5.2:free
- **Vendor docs:** https://docs.z.ai/guides/overview/pricing
- **Hugging Face:** https://huggingface.co/zai-org/GLM-5.2
- **Modalities:** in `text` → out `text`
- **Context:** 32K · **Tools:** no · **Reasoning:** yes (xhigh, high)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** GLM 5.2 is a large-scale reasoning model from Z.ai. It supports text input and output with a 1M-token context window, and is suited for long-horizon agent workflows, project-level software engineering,...

### `moonshotai/kimi-k2.7-code` — MoonshotAI: Kimi K2.7 Code

- **OpenRouter:** https://openrouter.ai/moonshotai/kimi-k2.7-code
- **Vendor docs:** https://platform.moonshot.ai/docs
- **Hugging Face:** https://huggingface.co/moonshotai/Kimi-K2.7-Code
- **Modalities:** in `text,image` → out `text`
- **Context:** 262K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.7062 / $3.21 per 1M tok
- **About:** MoonshotAI: Kimi K2.7 Code is a coding-focused model in Moonshot AI's Kimi K2 family, built to complete end-to-end programming tasks reliably over long contexts. It uses a native multimodal mixture-of-experts...

### `anthropic/claude-fable-5` — Anthropic: Claude Fable 5

- **OpenRouter:** https://openrouter.ai/anthropic/claude-fable-5
- **Vendor docs:** https://docs.anthropic.com/en/docs/about-claude/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (max, xhigh, high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $10 / $50 per 1M tok · web_search $0.01/call
- **About:** Claude Fable 5 is a Mythos-class model from Anthropic, built for autonomous knowledge work and coding. It supports text, image, and file inputs with text output, with reasoning support and...

### `nvidia/nemotron-3-ultra-550b-a55b` — NVIDIA: Nemotron 3 Ultra

- **OpenRouter:** https://openrouter.ai/nvidia/nemotron-3-ultra-550b-a55b
- **Vendor docs:** https://docs.nvidia.com/nim/
- **Hugging Face:** https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16
- **Modalities:** in `text` → out `text`
- **Context:** 262K · **Tools:** yes · **Reasoning:** yes (high, medium)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.625 / $3.12 per 1M tok
- **About:** NVIDIA Nemotron 3 Ultra is an open frontier-reasoning and orchestration model from NVIDIA, with 55B active parameters out of 550B total (MoE). Built on a hybrid Transformer-Mamba mixture-of-experts architecture, it...

### `nvidia/nemotron-3-ultra-550b-a55b:free` — NVIDIA: Nemotron 3 Ultra (free)

- **OpenRouter:** https://openrouter.ai/nvidia/nemotron-3-ultra-550b-a55b:free
- **Vendor docs:** https://docs.nvidia.com/nim/
- **Hugging Face:** https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16
- **Modalities:** in `text` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (high, medium)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0 / $0 per 1M tok
- **About:** NVIDIA Nemotron 3 Ultra is an open frontier-reasoning and orchestration model from NVIDIA, with 55B active parameters out of 550B total (MoE). Built on a hybrid Transformer-Mamba mixture-of-experts architecture, it...

### `minimax/minimax-m3` — MiniMax: MiniMax M3

- **OpenRouter:** https://openrouter.ai/minimax/minimax-m3
- **Vendor docs:** https://platform.minimax.io/docs
- **Hugging Face:** https://huggingface.co/MiniMaxAI/Minimax-M3
- **Modalities:** in `text,image,video` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.3 / $1.2 per 1M tok
- **About:** MiniMax-M3 is a multimodal foundation model from MiniMax. It supports text, image, and video inputs with text output, a 1M-token context window, and is suited for long-horizon agentic work, coding,...

### `x-ai/grok-build-0.1` — SpaceXAI: Grok Build 0.1

- **OpenRouter:** https://openrouter.ai/x-ai/grok-build-0.1
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 256K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $1 / $2 per 1M tok · web_search $0.01/call
- **About:** Grok Build 0.1 is SpaceXAI’s fast coding model trained specifically for agentic software engineering workflows. It supports text and image inputs with text output, and is optimized for interactive coding...

### `google/gemini-3.5-flash` — Google: Gemini 3.5 Flash

- **OpenRouter:** https://openrouter.ai/google/gemini-3.5-flash
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,image,video,file,audio` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (high, medium, low, minimal)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.5 / $9 per 1M tok · web_search $0.01/call; image $1.5 per 1M; audio $3 per 1M
- **About:** Gemini 3.5 Flash is Google's high-efficiency multimodal model, bringing near-Pro level coding and reasoning at Flash-tier cost and speed. It is highly optimized for coding proficiency and parallel agentic execution...

### `x-ai/grok-4.3` — SpaceXAI: Grok 4.3

- **OpenRouter:** https://openrouter.ai/x-ai/grok-4.3
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (high, medium, low, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.25 / $2.5 per 1M tok · web_search $0.01/call
- **About:** Grok 4.3 is a reasoning model from SpaceXAI. It accepts text and image inputs with text output, and is suited for agentic workflows, instruction-following tasks, and applications requiring high factual...

### `mistralai/mistral-medium-3-5` — Mistral: Mistral Medium 3.5

- **OpenRouter:** https://openrouter.ai/mistralai/mistral-medium-3-5
- **Vendor docs:** https://docs.mistral.ai/getting-started/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 262K · **Tools:** yes · **Reasoning:** yes (high, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.5 / $7.5 per 1M tok
- **About:** Mistral Medium 3.5 is a dense 128B instruction-following model from Mistral AI. It supports text and image inputs with text output, and is designed for agentic workflows, coding, and complex...

### `deepseek/deepseek-v4-pro` — DeepSeek: DeepSeek V4 Pro 0423

- **OpenRouter:** https://openrouter.ai/deepseek/deepseek-v4-pro
- **Vendor docs:** https://api-docs.deepseek.com/quick_start/pricing
- **Hugging Face:** https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro
- **Modalities:** in `text` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (xhigh, high)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.6 / $3.2 per 1M tok
- **About:** DeepSeek V4 Pro is a large-scale Mixture-of-Experts model from DeepSeek with 1.6T total parameters and 49B activated parameters, supporting a 1M-token context window. It is designed for advanced reasoning, coding,...

### `moonshotai/kimi-k2.6` — MoonshotAI: Kimi K2.6

- **OpenRouter:** https://openrouter.ai/moonshotai/kimi-k2.6
- **Vendor docs:** https://platform.moonshot.ai/docs
- **Hugging Face:** https://huggingface.co/moonshotai/Kimi-K2.6
- **Modalities:** in `text,image` → out `text`
- **Context:** 262K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.95 / $4 per 1M tok
- **About:** Kimi K2.6 is Moonshot AI's next-generation multimodal model, designed for long-horizon coding, coding-driven UI/UX generation, and multi-agent orchestration. It handles complex end-to-end coding tasks across Python, Rust, and Go, and...

### `x-ai/grok-4.20-multi-agent` — SpaceXAI: Grok 4.20 Multi-Agent

- **OpenRouter:** https://openrouter.ai/x-ai/grok-4.20-multi-agent
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 2M · **Tools:** no · **Reasoning:** yes (xhigh, high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.25 / $2.5 per 1M tok · web_search $0.01/call
- **About:** Grok 4.20 Multi-Agent is a variant of SpaceXAI’s Grok 4.20 designed for collaborative, agent-based workflows. Multiple agents operate in parallel to conduct deep research, coordinate tool use, and synthesize information...

### `x-ai/grok-4.20` — SpaceXAI: Grok 4.20

- **OpenRouter:** https://openrouter.ai/x-ai/grok-4.20
- **Vendor docs:** https://docs.x.ai/docs/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 2M · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.25 / $2.5 per 1M tok · web_search $0.01/call
- **About:** Grok 4.20 is a reasoning model from SpaceXAI with industry-leading speed and agentic tool calling capabilities. It combines the lowest hallucination rate on the market with strict prompt adherance, delivering...

### `minimax/minimax-m2.7` — MiniMax: MiniMax M2.7

- **OpenRouter:** https://openrouter.ai/minimax/minimax-m2.7
- **Vendor docs:** https://platform.minimax.io/docs
- **Hugging Face:** https://huggingface.co/MiniMaxAI/MiniMax-M2.7
- **Modalities:** in `text` → out `text`
- **Context:** 204K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.3 / $1.2 per 1M tok
- **About:** MiniMax-M2.7 is a next-generation large language model designed for autonomous, real-world productivity and continuous improvement. Built to actively participate in its own evolution, M2.7 integrates advanced agentic capabilities through multi-agent...

### `mistralai/mistral-small-2603` — Mistral: Mistral Small 4

- **OpenRouter:** https://openrouter.ai/mistralai/mistral-small-2603
- **Vendor docs:** https://docs.mistral.ai/getting-started/models
- **Hugging Face:** https://huggingface.co/mistralai/Mistral-Small-4-119B-2603
- **Modalities:** in `text,image` → out `text`
- **Context:** 262K · **Tools:** yes · **Reasoning:** yes (high, none)
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.15 / $0.6 per 1M tok
- **About:** Mistral Small 4 is the next major release in the Mistral Small family, unifying the capabilities of several flagship Mistral models into a single system. It combines strong reasoning from...

### `google/gemini-3.1-pro-preview-customtools` — Google: Gemini 3.1 Pro Preview Custom Tools

- **OpenRouter:** https://openrouter.ai/google/gemini-3.1-pro-preview-customtools
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `text,audio,image,video,file` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $12 per 1M tok · web_search $0.01/call; image $2 per 1M; audio $2 per 1M
- **About:** Gemini 3.1 Pro Preview Custom Tools is a variant of Gemini 3.1 Pro that improves tool selection behavior by preventing overuse of a general bash tool when more efficient third-party...

### `google/gemini-3.1-pro-preview` — Google: Gemini 3.1 Pro Preview

- **OpenRouter:** https://openrouter.ai/google/gemini-3.1-pro-preview
- **Vendor docs:** https://ai.google.dev/gemini-api/docs/models
- **Modalities:** in `audio,file,image,text,video` → out `text`
- **Context:** 1M · **Tools:** yes · **Reasoning:** yes (high, medium, low)
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $12 per 1M tok · web_search $0.01/call; image $2 per 1M; audio $2 per 1M
- **About:** Gemini 3.1 Pro Preview is Google’s frontier reasoning model, delivering enhanced software engineering performance, improved agentic reliability, and more efficient token usage across complex workflows. Building on the multimodal foundation...

### `mistralai/devstral-2512` — Mistral: Devstral 2 2512

- **OpenRouter:** https://openrouter.ai/mistralai/devstral-2512
- **Vendor docs:** https://docs.mistral.ai/getting-started/models
- **Hugging Face:** https://huggingface.co/mistralai/Devstral-2-123B-Instruct-2512
- **Modalities:** in `text,file` → out `text`
- **Context:** 262K · **Tools:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.4 / $2 per 1M tok
- **About:** Devstral 2 is a state-of-the-art open-source model by Mistral AI specializing in agentic coding. It is a 123B-parameter dense transformer model supporting a 256K context window. Devstral 2 supports exploring...

### `perplexity/sonar-pro-search` — Perplexity: Sonar Pro Search

- **OpenRouter:** https://openrouter.ai/perplexity/sonar-pro-search
- **Vendor docs:** https://docs.perplexity.ai
- **Modalities:** in `text,image` → out `text`
- **Context:** 200K · **Tools:** no · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $3 / $15 per 1M tok · web_search $0.02/call
- **About:** Exclusively available on the OpenRouter API, Sonar Pro's new Pro Search mode is Perplexity's most advanced agentic search system. It is designed for deeper reasoning and analysis. Pricing is based...

### `anthropic/claude-haiku-4.5` — Anthropic: Claude Haiku 4.5

- **OpenRouter:** https://openrouter.ai/anthropic/claude-haiku-4.5
- **Vendor docs:** https://docs.anthropic.com/en/docs/about-claude/models
- **Modalities:** in `text,image,file` → out `text`
- **Context:** 200K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $1 / $5 per 1M tok · web_search $0.01/call
- **About:** Claude Haiku 4.5 is Anthropic’s fastest and most efficient model, delivering near-frontier intelligence at a fraction of the cost and latency of larger Claude models. Matching Claude Sonnet 4’s performance...

### `mistralai/codestral-2508` — Mistral: Codestral 2508

- **OpenRouter:** https://openrouter.ai/mistralai/codestral-2508
- **Vendor docs:** https://docs.mistral.ai/getting-started/models
- **Modalities:** in `text,file` → out `text`
- **Context:** 256K · **Tools:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $0.3 / $0.9 per 1M tok
- **About:** Mistral's cutting-edge language model for coding released end of July 2025. Codestral specializes in low-latency, high-frequency tasks such as fill-in-the-middle (FIM), code correction and test generation. [Blog Post](https://mistral.ai/news/codestral-25-08)

### `openai/o3-pro` — OpenAI: o3 Pro

- **OpenRouter:** https://openrouter.ai/openai/o3-pro
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,file,image` → out `text`
- **Context:** 200K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $20 / $80 per 1M tok · web_search $0.01/call
- **About:** The o-series of models are trained with reinforcement learning to think before they answer and perform complex reasoning. The o3-pro model uses more compute to think harder and provide consistently...

### `openai/o4-mini-high` — OpenAI: o4 Mini High

- **OpenRouter:** https://openrouter.ai/openai/o4-mini-high
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `image,text,file` → out `text`
- **Context:** 200K · **Tools:** yes · **Reasoning:** yes (high)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.1 / $4.4 per 1M tok · web_search $0.01/call
- **About:** OpenAI o4-mini-high is the same model as [o4-mini](/openai/o4-mini) with reasoning_effort set to high. OpenAI o4-mini is a compact reasoning model in the o-series, optimized for fast, cost-efficient performance while retaining...

### `openai/o3` — OpenAI: o3

- **OpenRouter:** https://openrouter.ai/openai/o3
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `image,text,file` → out `text`
- **Context:** 200K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $8 per 1M tok · web_search $0.01/call
- **About:** o3 is a well-rounded and powerful model across domains. It sets a new standard for math, science, coding, and visual reasoning tasks. It also excels at technical writing and instruction-following....

### `openai/o4-mini` — OpenAI: o4 Mini

- **OpenRouter:** https://openrouter.ai/openai/o4-mini
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `image,text,file` → out `text`
- **Context:** 200K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.1 / $4.4 per 1M tok · web_search $0.01/call
- **About:** OpenAI o4-mini is a compact reasoning model in the o-series, optimized for fast, cost-efficient performance while retaining strong multimodal and agentic capabilities. It supports tool use and demonstrates competitive reasoning...

### `cohere/command-a` — Cohere: Command A

- **OpenRouter:** https://openrouter.ai/cohere/command-a
- **Vendor docs:** https://docs.cohere.com/docs/models
- **Hugging Face:** https://huggingface.co/CohereForAI/c4ai-command-a-03-2025
- **Modalities:** in `text` → out `text`
- **Context:** 256K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $2.5 / $10 per 1M tok
- **About:** Command A is an open-weights 111B parameter model with a 256k context window focused on delivering great performance across agentic, multilingual, and coding use cases. Compared to other leading proprietary...

### `perplexity/sonar-reasoning-pro` — Perplexity: Sonar Reasoning Pro

- **OpenRouter:** https://openrouter.ai/perplexity/sonar-reasoning-pro
- **Vendor docs:** https://docs.perplexity.ai
- **Modalities:** in `text,image` → out `text`
- **Context:** 128K · **Tools:** no · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $8 per 1M tok · web_search $0.01/call
- **About:** Note: Sonar Pro pricing includes Perplexity search pricing. See [details here](https://docs.perplexity.ai/guides/pricing#detailed-pricing-breakdown-for-sonar-reasoning-pro-and-sonar-pro) Sonar Reasoning Pro is a premier reasoning model powered by DeepSeek R1 with Chain of Thought (CoT). Designed for...

### `perplexity/sonar-pro` — Perplexity: Sonar Pro

- **OpenRouter:** https://openrouter.ai/perplexity/sonar-pro
- **Vendor docs:** https://docs.perplexity.ai
- **Modalities:** in `text,image` → out `text`
- **Context:** 200K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $3 / $15 per 1M tok · web_search $0.01/call
- **About:** Note: Sonar Pro pricing includes Perplexity search pricing. See [details here](https://docs.perplexity.ai/guides/pricing#detailed-pricing-breakdown-for-sonar-reasoning-pro-and-sonar-pro) For enterprises seeking more advanced capabilities, the Sonar Pro API can handle in-depth, multi-step queries with added extensibility, like...

### `perplexity/sonar-deep-research` — Perplexity: Sonar Deep Research

- **OpenRouter:** https://openrouter.ai/perplexity/sonar-deep-research
- **Vendor docs:** https://docs.perplexity.ai
- **Modalities:** in `text` → out `text`
- **Context:** 128K · **Tools:** no · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $8 per 1M tok · web_search $0.01/call
- **About:** Sonar Deep Research is a research-focused model designed for multi-step retrieval, synthesis, and reasoning across complex topics. It autonomously searches, reads, and evaluates sources, refining its approach as it gathers...

### `openai/o3-mini-high` — OpenAI: o3 Mini High

- **OpenRouter:** https://openrouter.ai/openai/o3-mini-high
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,file` → out `text`
- **Context:** 200K · **Tools:** yes · **Reasoning:** yes (high)
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.1 / $4.4 per 1M tok · web_search $0.01/call
- **About:** OpenAI o3-mini-high is the same model as [o3-mini](/openai/o3-mini) with reasoning_effort set to high. o3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and...

### `openai/o3-mini` — OpenAI: o3 Mini

- **OpenRouter:** https://openrouter.ai/openai/o3-mini
- **Vendor docs:** https://developers.openai.com/api/docs/models
- **Modalities:** in `text,file` → out `text`
- **Context:** 200K · **Tools:** yes · **Reasoning:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $1.1 / $4.4 per 1M tok · web_search $0.01/call
- **About:** OpenAI o3-mini is a cost-efficient language model optimized for STEM reasoning tasks, particularly excelling in science, mathematics, and coding. This model supports the `reasoning_effort` parameter, which can be set to...

### `perplexity/sonar` — Perplexity: Sonar

- **OpenRouter:** https://openrouter.ai/perplexity/sonar
- **Vendor docs:** https://docs.perplexity.ai
- **Modalities:** in `text,image` → out `text`
- **Context:** 127K · **Tools:** no
- **Pricing snapshot (OpenRouter, Sep 2026):** $1 / $1 per 1M tok · web_search $0.01/call
- **About:** Sonar is lightweight, affordable, fast, and simple to use — now featuring citations and the ability to customize sources. It is designed for companies seeking to integrate lightweight question-and-answer features...

### `mistralai/mistral-large-2407` — Mistral Large 2407

- **OpenRouter:** https://openrouter.ai/mistralai/mistral-large-2407
- **Vendor docs:** https://docs.mistral.ai/getting-started/models
- **Modalities:** in `text,file` → out `text`
- **Context:** 131K · **Tools:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $6 per 1M tok
- **About:** This is Mistral AI's flagship model, Mistral Large 2 (version mistral-large-2407). It's a proprietary weights-available model and excels at reasoning, code, JSON, chat, and more. Read the launch announcement [here](https://mistral.ai/news/mistral-large-2407/)....

### `mistralai/mistral-large` — Mistral Large

- **OpenRouter:** https://openrouter.ai/mistralai/mistral-large
- **Vendor docs:** https://docs.mistral.ai/getting-started/models
- **Modalities:** in `text,file` → out `text`
- **Context:** 128K · **Tools:** yes
- **Pricing snapshot (OpenRouter, Sep 2026):** $2 / $6 per 1M tok
- **About:** This is Mistral AI's flagship model, Mistral Large 2 (version `mistral-large-2407`). It's a proprietary weights-available model and excels at reasoning, code, JSON, chat, and more. Read the launch announcement [here](https://mistral.ai/news/mistral-large-2407/)....

## Other text chat models on OpenRouter (277 unique IDs)

| ID | Name | Ctx | Out | Tools | Price | Links | About |
| :--- | :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| `prism-ml/ternary-bonsai-2-27b` | PrismML: Ternary Bonsai 2 27B | 262K | text | Y | $0.075 / $0.5 per 1M tok | [OR](https://openrouter.ai/prism-ml/ternary-bonsai-2-27b) | Bonsai 2 27B is a 27B-parameter reasoning model from PrismML derived from Qwen3.8-27B. It supports coding, mathematics, tool calling, and… |
| `unbiased/pareto` | Pareto | 262K | text | Y | $2.5 / $7.5 per 1M tok | [OR](https://openrouter.ai/unbiased/pareto) | Pareto is a multimodal composite model built for research, coding, and agentic workflows, while delivering frontier-level performance… |
| `~deepseek/deepseek-pro-latest` | DeepSeek: DeepSeek Pro Latest | 1M | text | Y | $0.5782 / $1.73 per 1M tok | [OR](https://openrouter.ai/~deepseek/deepseek-pro-latest) | This model always redirects to the latest model in the DeepSeek Pro family. |
| `~deepseek/deepseek-flash-latest` | DeepSeek: DeepSeek Flash Latest | 1M | text | Y | $0.14 / $0.42 per 1M tok | [OR](https://openrouter.ai/~deepseek/deepseek-flash-latest) | This model always redirects to the latest model in the DeepSeek Flash family. |
| `inference-net/schematron-v2-turbo` | Inference.net: Schematron V2 Turbo | 128K | text |  | $0.03 / $0.15 per 1M tok | [OR](https://openrouter.ai/inference-net/schematron-v2-turbo) | Schematron V2 Turbo is a 3B-parameter HTML-to-JSON extraction model from Inference.net. It prioritizes throughput for high-volume… |
| `inference-net/schematron-v2-small` | Inference.net: Schematron V2 Small | 128K | text |  | $0.05 / $0.23 per 1M tok | [OR](https://openrouter.ai/inference-net/schematron-v2-small) | Schematron V2 Small is a 3B-parameter HTML-to-JSON extraction model from Inference.net. It prioritizes extraction quality for complex… |
| `~openai/gpt-astra-latest` | OpenAI: GPT Astra Latest | 1.1M | text | Y | $10 / $50 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/~openai/gpt-astra-latest) | This model always redirects to the latest model in the GPT Astra family. |
| `~openai/gpt-sol-latest` | OpenAI: GPT Sol Latest | 1.1M | text | Y | $2 / $10 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/~openai/gpt-sol-latest) | This model always redirects to the latest model in the GPT Sol family. |
| `~openai/gpt-terra-latest` | OpenAI: GPT Terra Latest | 1.1M | text | Y | $2 / $12 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/~openai/gpt-terra-latest) | This model always redirects to the latest model in the GPT Terra family. |
| `~openai/gpt-luna-latest` | OpenAI: GPT Luna Latest | 1.1M | text | Y | $0.2 / $1.2 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/~openai/gpt-luna-latest) | This model always redirects to the latest model in the GPT Luna family. |
| `sakana/fugu-ultra-v2` | Sakana: Fugu Ultra v2 | 1M | text | Y | $5 / $30 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/sakana/fugu-ultra-v2) | Fugu Ultra v2 is the higher-performance model in Sakana AI's Fugu family. Rather than a single monolithic model, Fugu is a learned… |
| `sakana/fugu-max` | Sakana: Fugu Max | 1M | text | Y | $2 / $6 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/sakana/fugu-max) | Fugu Max is the cost-performance model in Sakana AI's Fugu family. Rather than a single monolithic model, Fugu is a learned multi-agent… |
| `inclusionai/ling-3.0-flash-vl` | inclusionAI: Ling 3.0 Flash VL | 131K | text | Y | $0.06 / $0.18 per 1M tok | [OR](https://openrouter.ai/inclusionai/ling-3.0-flash-vl) | Ling 3.0 Flash VL builds on Ling 3.0 Flash (124B total / 5.5B active MoE from InclusionAI), further strengthening its language capabilities… |
| `inclusionai/ling-3.0-flash-vl:free` | inclusionAI: Ling 3.0 Flash VL (free) | 262K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/inclusionai/ling-3.0-flash-vl:free) | Ling 3.0 Flash VL builds on Ling 3.0 Flash (124B total / 5.5B active MoE from InclusionAI), further strengthening its language capabilities… |
| `inception/mercury-2.5` | Inception: Mercury 2.5 | 260K | text | Y | $0.04 / $0.15 per 1M tok | [OR](https://openrouter.ai/inception/mercury-2.5) | Mercury 2.5 is the fastest reasoning LLM, and the latest diffusion LLM (dLLM) from Inception. Instead of generating tokens sequentially,… |
| `nex-agi/nex-n2.5-mini:free` | Nex AGI: Nex-N2.5-Mini (free) | 262K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/nex-agi/nex-n2.5-mini:free) | Nex-N2.5 is an agentic model built to turn goals into working, verified outcomes. Its core strength is agentic coding within a visual… |
| `nex-agi/nex-n2.5-pro:free` | Nex AGI: Nex-N2.5-Pro (free) | 262K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/nex-agi/nex-n2.5-pro:free) | Nex-N2.5 is an agentic model built to turn goals into working, verified outcomes. Its core strength is agentic coding within a visual… |
| `inclusionai/ling-3.0-flash-sante:free` | inclusionAI: Ling 3.0 Flash Sante (free) | 262K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/inclusionai/ling-3.0-flash-sante:free) | Ling 3.0 Flash Sante is a health and medicine-focused mixture-of-experts model from InclusionAI, built on Ling 3.0 Flash with 5.1B active… |
| `ibm-granite/granite-4.2-8b` | IBM: Granite 4.2 8B | 131K | text | Y | $0.06 / $0.25 per 1M tok | [OR](https://openrouter.ai/ibm-granite/granite-4.2-8b) | Granite 4.2 8B is a dense reasoning model from IBM. It is suited for mathematics, code generation, multilingual dialogue, and agentic… |
| `tencent/hy4-preview` | Tencent: Hy4 preview | 1M | text | Y | $0.834 / $2.5 per 1M tok | [OR](https://openrouter.ai/tencent/hy4-preview) | Tencent: Hy4 preview is a mixture-of-experts model from Tencent, with 49B active parameters out of 770B total. It is designed for coding… |
| `inclusionai/ling-3.0-flash-fin` | inclusionAI: Ling 3.0 Flash Fin | 262K | text | Y | $0.06 / $0.18 per 1M tok | [OR](https://openrouter.ai/inclusionai/ling-3.0-flash-fin) | Ling 3.0 Flash Fin is a finance-focused mixture-of-experts model from InclusionAI, built on Ling 3.0 Flash with 5.1B active parameters out… |
| `inclusionai/ling-3.0-flash-fin:free` | inclusionAI: Ling 3.0 Flash Fin (free) | 262K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/inclusionai/ling-3.0-flash-fin:free) | Ling 3.0 Flash Fin is a finance-focused mixture-of-experts model from InclusionAI, built on Ling 3.0 Flash with 5.1B active parameters out… |
| `~z-ai/glm-flash-latest` | Z.ai: GLM Flash Latest | 1.3M | text | Y | $0.075 / $0.25 per 1M tok | [OR](https://openrouter.ai/~z-ai/glm-flash-latest) | This model always redirects to the latest model in the GLM Flash family. |
| `deepseek/deepseek-v4-flash-vision-exp` | DeepSeek: DeepSeek V4 Flash Vision Exp | 1M | text | Y | $0.2156 / $0.6468 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-v4-flash-vision-exp) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek V4 Flash Vision Exp is an experimental vision-enabled version of [DeepSeek V4 Flash… |
| `tencent/hy-mt2-1.8b` | Tencent: Hy-MT2-1.8B | 8K | text |  | $0.044 / $0.177 per 1M tok | [OR](https://openrouter.ai/tencent/hy-mt2-1.8b) | Hy-MT2-1.8B is a compact 1.8B-parameter translation model from Tencent. It supports 33 language pairs and five Chinese dialect and… |
| `tencent/hy-mt2-30b-a3b` | Tencent: Hy-MT2-30B-A3B | 8K | text |  | $0.074 / $0.295 per 1M tok | [OR](https://openrouter.ai/tencent/hy-mt2-30b-a3b) | Hy-MT2-30B-A3B is Tencent's flagship translation model in the Hy-MT2 family. It supports 33 language pairs and five Chinese dialect and… |
| `~z-ai/glm-latest` | Z.ai: GLM Latest | 1.3M | text | Y | $0.8925 / $2.8 per 1M tok | [OR](https://openrouter.ai/~z-ai/glm-latest) | This model always redirects to the latest GLM model from Z.ai. |
| `tencent/hy-mt2-7b` | Tencent: Hy-MT2-7B | 8K | text |  | $0.074 / $0.295 per 1M tok | [OR](https://openrouter.ai/tencent/hy-mt2-7b) | Hy-MT2-7B is a 7B-parameter translation model from Tencent. It supports 33 language pairs and five Chinese dialect and minority-language… |
| `dots-studio/dots-3-note-preview:free` | Dots Studio: Dots3-Note Preview (free) | 512K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/dots-studio/dots-3-note-preview:free) | Dots3-Note Preview is an open-weight mixture-of-experts model from Dots Studio, with 16B active parameters out of 280B total. It is the… |
| `bytedance-seed/seed-2-1-turbo` | ByteDance Seed: Seed 2.1 Turbo | 262K | text | Y | $0.5 / $2.5 per 1M tok | [OR](https://openrouter.ai/bytedance-seed/seed-2-1-turbo) · [docs](https://seed.bytedance.com) | Seed 2.1 Turbo is a multimodal model from ByteDance Seed for coding and long-horizon agent workflows. It is suited for end-to-end software… |
| `bytedance-seed/seed-2.0-code` | ByteDance Seed: Seed-2.0-Code | 262K | text | Y | $0.5 / $3 per 1M tok | [OR](https://openrouter.ai/bytedance-seed/seed-2.0-code) · [docs](https://seed.bytedance.com) | Seed 2.0 Code is a model from ByteDance Seed optimized for agentic coding. It is suited for frontend development, multilingual programming… |
| `liquid/lfm-2.5-2.6b:free` | LiquidAI: LFM2.5-2.6B (free) | 65K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/liquid/lfm-2.5-2.6b:free) | LFM2.5-2.6B is a compact reasoning model from Liquid AI. It is suited for agent workflows, data extraction, RAG, and long-context… |
| `nvidia/nemotron-3.5-lightning` | NVIDIA: Nemotron 3.5 Lightning | 262K | text | Y | $0.08 / $0.2 per 1M tok | [OR](https://openrouter.ai/nvidia/nemotron-3.5-lightning) · [docs](https://docs.nvidia.com/nim/) | NVIDIA Nemotron 3.5 Lightning is an open mixture-of-experts model from NVIDIA, with 3B active parameters out of 30B total. It is suited for… |
| `nvidia/nemotron-3.5-lightning:free` | NVIDIA: Nemotron 3.5 Lightning (free) | 1M | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/nvidia/nemotron-3.5-lightning:free) · [docs](https://docs.nvidia.com/nim/) | NVIDIA Nemotron 3.5 Lightning is an open mixture-of-experts model from NVIDIA, with 3B active parameters out of 30B total. It is suited for… |
| `sakana/sakana-namazu` | Sakana: Sakana Namazu | 262K | text | Y | $0.95 / $4 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/sakana/sakana-namazu) | Sakana Namazu is a Japanese-specialized reasoning model from Sakana AI, based on Kimi K2.6 with additional training for Japanese language… |
| `upstage/solar-pro4` | Upstage: Solar Pro 4 | 524K | text | Y | $0.09 / $0.36 per 1M tok | [OR](https://openrouter.ai/upstage/solar-pro4) | Solar Pro 4 is Upstage's cost-efficient large language model, featuring a 524K context window. It is built for long-horizon tasks and… |
| `meta/muse-glimmer-30b` | Meta: Muse Glimmer 30B | 131K | text | Y | $0.35 / $1.5 per 1M tok | [OR](https://openrouter.ai/meta/muse-glimmer-30b) · [docs](https://ai.developer.meta.com/docs/models/) | Muse Glimmer 30B is a dense, open-weight multimodal model from Meta Superintelligence Labs, distilled from Muse Spark and optimized for… |
| `~deepseek/deepseek-v4-flash-latest` | DeepSeek: DeepSeek V4 Flash Latest | 1.3M | text | Y | $0.055 / $0.165 per 1M tok | [OR](https://openrouter.ai/~deepseek/deepseek-v4-flash-latest) | This model always redirects to the latest model in the DeepSeek V4 Flash family. |
| `deepseek/deepseek-v4-flash-0731` | DeepSeek: DeepSeek V4 Flash 0731 | 1.3M | text | Y | $0.06 / $0.12 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-v4-flash-0731) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek V4 Flash 0731 is a sparse mixture-of-experts model from DeepSeek, with 13B active parameters out of 284B total. This… |
| `deepseek/deepseek-v4-flash-0731:free` | DeepSeek: DeepSeek V4 Flash 0731 (free) | 1M | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-v4-flash-0731:free) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek V4 Flash 0731 is a sparse mixture-of-experts model from DeepSeek, with 13B active parameters out of 284B total. This… |
| `qwen/qwen3.7-flash` | Qwen: Qwen3.7 Flash | 1M | text | Y | $0.03 / $0.13 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.7-flash) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3.7 Flash is a vision-language reasoning model from Alibaba. It is suited for multimodal agents, visual coding, search, and computer… |
| `inclusionai/ling-3.0-flash` | inclusionAI: Ling 3.0 Flash | 262K | text | Y | $0.021 / $0.063 per 1M tok | [OR](https://openrouter.ai/inclusionai/ling-3.0-flash) | *Ling-3.0-flash* is a *124B-parameter Mixture-of-Experts (MoE) model*, with approximately *5.1B parameters activated per token*. The model… |
| `meituan/longcat-2.0` | Meituan: LongCat 2.0 | 1M | text | Y | $0.3 / $1.2 per 1M tok | [OR](https://openrouter.ai/meituan/longcat-2.0) | LongCat 2.0 is a sparse mixture-of-experts language model from Meituan, with 48B active parameters out of 1.6T total. It is suited for… |
| `kwaipilot/kat-coder-pro-v2.5` | Kwaipilot: KAT-Coder-Pro V2.5 | 262K | text | Y | $0.74 / $2.96 per 1M tok | [OR](https://openrouter.ai/kwaipilot/kat-coder-pro-v2.5) | KAT-Coder-Pro V2.5 is a flagship-level Agentic Coding model that can directly hand over an entire issue or an entire business workflow to… |
| `~x-ai/grok-latest` | xAI: Grok Latest | 500K | text | Y | $2 / $6 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/~x-ai/grok-latest) | This model always redirects to the latest Grok model from xAI. |
| `aion-labs/aion-3.0-mini` | AionLabs: Aion-3.0-Mini | 131K | text | Y | $0.7 / $1.4 per 1M tok | [OR](https://openrouter.ai/aion-labs/aion-3.0-mini) | Aion-3.0 Mini is a multi-model roleplaying and storytelling system from AionLabs, built on the DeepSeek family of models. It uses a… |
| `aion-labs/aion-3.0` | AionLabs: Aion-3.0 | 131K | text | Y | $3 / $6 per 1M tok | [OR](https://openrouter.ai/aion-labs/aion-3.0) | Aion-3.0 is a multi-model roleplaying and storytelling system from AionLabs, built on the GLM family of models. It uses a collaborative… |
| `tencent/hy3` | Tencent: Hy3 | 262K | text | Y | $0.0825 / $0.33 per 1M tok | [OR](https://openrouter.ai/tencent/hy3) | Hy3 is a 295B-parameter Mixture-of-Experts model from Tencent (21B active, 192 experts with top-8 routing) built for reasoning, agentic… |
| `sakana/fugu-ultra` | Sakana: Fugu Ultra | 1M | text | Y | $5 / $30 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/sakana/fugu-ultra) | Fugu Ultra is the higher-performance model in Sakana AI's Fugu family. Rather than a single monolithic model, Fugu is a learned multi-agent… |
| `cohere/north-mini-code:free` | Cohere: North Mini Code (free) | 256K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/cohere/north-mini-code:free) · [docs](https://docs.cohere.com/docs/models) | North Mini Code is Cohere's first agentic coding model and the debut of its North family. A sparse mixture-of-experts model with 30B total… |
| `~anthropic/claude-fable-latest` | Anthropic: Claude Fable Latest | 1M | text | Y | $10 / $50 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/~anthropic/claude-fable-latest) | This model always redirects to the latest model in the Claude Fable family. |
| `nvidia/nemotron-3.5-content-safety` | NVIDIA: Nemotron 3.5 Content Safety | 131K | text |  | $0.2 / $0.2 per 1M tok | [OR](https://openrouter.ai/nvidia/nemotron-3.5-content-safety) · [docs](https://docs.nvidia.com/nim/) | NVIDIA Nemotron 3.5 Content Safety is a compact 4B-parameter multimodal guardrail model from NVIDIA, fine-tuned from Google Gemma-3-4B. It… |
| `nvidia/nemotron-3.5-content-safety:free` | NVIDIA: Nemotron 3.5 Content Safety (free) | 128K | text |  | $0 / $0 per 1M tok | [OR](https://openrouter.ai/nvidia/nemotron-3.5-content-safety:free) · [docs](https://docs.nvidia.com/nim/) | NVIDIA Nemotron 3.5 Content Safety is a compact 4B-parameter multimodal guardrail model from NVIDIA, fine-tuned from Google Gemma-3-4B. It… |
| `qwen/qwen3.7-plus` | Qwen: Qwen3.7 Plus | 1M | text | Y | $0.32 / $1.28 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.7-plus) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3.7-Plus is a cost-effective model in Alibaba's Qwen3.7 series. It supports text and image input with text output, building on the… |
| `stepfun/step-3.7-flash` | StepFun: Step 3.7 Flash | 262K | text | Y | $0.2 / $1.15 per 1M tok | [OR](https://openrouter.ai/stepfun/step-3.7-flash) | Step 3.7 Flash is StepFun's latest high-efficiency multimodal Mixture-of-Experts model. It pairs a 196B-parameter language backbone with a… |
| `anthropic/claude-opus-4.8` | Anthropic: Claude Opus 4.8 | 1M | text | Y | $5 / $25 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/anthropic/claude-opus-4.8) · [docs](https://docs.anthropic.com/en/docs/about-claude/models) | Claude Opus 4.8 is Anthropic's most capable generally available model in the Opus family. It supports text, image, and file inputs with… |
| `qwen/qwen3.7-max` | Qwen: Qwen3.7 Max | 1M | text | Y | $1.48 / $4.42 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.7-max) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3.7-Max is the flagship model in Alibaba's Qwen3.7 series. It supports text input and output and is designed for agent-centric… |
| `perceptron/perceptron-mk1` | Perceptron: Perceptron Mk1 | 32K | text |  | $0.15 / $1.5 per 1M tok | [OR](https://openrouter.ai/perceptron/perceptron-mk1) | Perceptron Mk1 (Mark One) is Perceptron's highest-quality vision-language model for video and embodied reasoning.** It accepts image and… |
| `google/gemini-3.1-flash-lite` | Google: Gemini 3.1 Flash Lite | 1M | text | Y | $0.25 / $1.5 per 1M tok · web_search $0.01/call; image $0.25 per 1M; audio $0.5 per 1M | [OR](https://openrouter.ai/google/gemini-3.1-flash-lite) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemini 3.1 Flash Lite is Google’s GA high-efficiency multimodal model optimized for low-latency, high-volume workloads. It supports text,… |
| `openai/gpt-chat-latest` | OpenAI: GPT Chat Latest | 400K | text | Y | $5 / $30 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-chat-latest) · [docs](https://developers.openai.com/api/docs/models) | GPT Chat Latest points to OpenAI's stable API alias `chat-latest` that always resolves to the latest Instant chat model used in ChatGPT. As… |
| `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` | NVIDIA: Nemotron 3 Nano Omni (free) | 256K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free) · [docs](https://docs.nvidia.com/nim/) | NVIDIA Nemotron™ 3 Nano Omni is a 30B-A3B open multimodal model designed to function as a perception and context sub-agent in enterprise… |
| `~anthropic/claude-haiku-latest` | Anthropic: Claude Haiku Latest | 200K | text | Y | $1 / $5 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/~anthropic/claude-haiku-latest) | This model always redirects to the latest model in the Claude Haiku family. |
| `~openai/gpt-mini-latest` | OpenAI: GPT Mini Latest | 400K | text | Y | $0.75 / $4.5 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/~openai/gpt-mini-latest) | This model always redirects to the latest model in the GPT Mini family. |
| `~google/gemini-pro-latest` | Google: Gemini Pro Latest | 1M | text | Y | $2 / $12 per 1M tok · web_search $0.01/call; image $2 per 1M; audio $2 per 1M | [OR](https://openrouter.ai/~google/gemini-pro-latest) | This model always redirects to the latest model in the Gemini Pro family. |
| `~moonshotai/kimi-latest` | MoonshotAI: Kimi Latest | 1M | text | Y | $1.95 / $10.92 per 1M tok | [OR](https://openrouter.ai/~moonshotai/kimi-latest) | This model always redirects to the latest model in the Kimi family. |
| `~google/gemini-flash-latest` | Google: Gemini Flash Latest | 1M | text | Y | $0.75 / $3.75 per 1M tok · web_search $0.01/call; image $0.75 per 1M; audio $0.75 per 1M | [OR](https://openrouter.ai/~google/gemini-flash-latest) | This model always redirects to the latest model in the Gemini Flash family. |
| `~anthropic/claude-sonnet-latest` | Anthropic: Claude Sonnet Latest | 1M | text | Y | $2 / $10 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/~anthropic/claude-sonnet-latest) | This model always redirects to the latest model in the Claude Sonnet family. |
| `qwen/qwen3.5-plus-20260420` | Qwen: Qwen3.5 Plus 2026-04-20 | 1M | text | Y | $0.3 / $1.8 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.5-plus-20260420) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3.5 Plus (April 2026) is a large-scale multimodal language model from Alibaba. It accepts text, image, and video input and produces… |
| `qwen/qwen3.6-flash` | Qwen: Qwen3.6 Flash | 1M | text | Y | $0.1875 / $1.12 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.6-flash) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3.6 Flash is a fast, efficient language model from Alibaba's Qwen 3.6 series. It supports text, image, and video input with a 1M token… |
| `qwen/qwen3.6-35b-a3b` | Qwen: Qwen3.6 35B A3B | 262K | text | Y | $0.1 / $0.9 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.6-35b-a3b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3.6-35B-A3B is an open-weight multimodal model from Alibaba Cloud with 35 billion total parameters and 3 billion active parameters per… |
| `qwen/qwen3.6-max-preview` | Qwen: Qwen3.6 Max Preview | 262K | text | Y | $1.03 / $6.16 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.6-max-preview) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3.6-Max-Preview is a proprietary frontier model from Alibaba Cloud built on a sparse mixture-of-experts architecture with approximately… |
| `qwen/qwen3.6-27b` | Qwen: Qwen3.6 27B | 262K | text | Y | $0.3 / $2 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.6-27b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3.6 27B is a dense 27-billion-parameter language model from the Qwen Team at Alibaba, released in April 2026. It features hybrid… |
| `openai/gpt-5.5-pro` | OpenAI: GPT-5.5 Pro | 1.1M | text | Y | $30 / $180 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.5-pro) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.5 Pro is OpenAI’s high-capability model optimized for deep reasoning and accuracy on complex, high-stakes workloads. It features a… |
| `openai/gpt-5.5` | OpenAI: GPT-5.5 | 1.1M | text | Y | $5 / $30 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.5) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.5 is OpenAI’s frontier model designed for complex professional workloads, building on GPT-5.4 with stronger reasoning, higher… |
| `deepseek/deepseek-v4-flash` | DeepSeek: DeepSeek V4 Flash 0423 | 1M | text | Y | $0.049 / $0.098 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-v4-flash) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek V4 Flash is an efficiency-optimized Mixture-of-Experts model from DeepSeek with 284B total parameters and 13B activated… |
| `tencent/hy3-preview` | Tencent: Hy3 preview | 262K | text | Y | $0.18 / $0.6 per 1M tok | [OR](https://openrouter.ai/tencent/hy3-preview) | Hy3 preview is a high-efficiency Mixture-of-Experts model from Tencent designed for agentic workflows and production use. It supports… |
| `xiaomi/mimo-v2.5-pro` | Xiaomi: MiMo-V2.5-Pro | 1.1M | text | Y | $0.435 / $0.87 per 1M tok | [OR](https://openrouter.ai/xiaomi/mimo-v2.5-pro) | MiMo-V2.5-Pro is Xiaomi’s flagship model, delivering strong performance in general agentic capabilities, complex software engineering, and… |
| `xiaomi/mimo-v2.5` | Xiaomi: MiMo-V2.5 | 1.1M | text | Y | $0.14 / $0.28 per 1M tok | [OR](https://openrouter.ai/xiaomi/mimo-v2.5) | MiMo-V2.5 is a native omnimodal model by Xiaomi. It delivers Pro-level agentic performance at roughly half the inference cost, while… |
| `~anthropic/claude-opus-latest` | Anthropic: Claude Opus Latest | 1M | text | Y | $5 / $25 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/~anthropic/claude-opus-latest) | This model always redirects to the latest model in the Claude Opus family. |
| `anthropic/claude-opus-4.7` | Anthropic: Claude Opus 4.7 | 1M | text | Y | $5 / $25 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/anthropic/claude-opus-4.7) · [docs](https://docs.anthropic.com/en/docs/about-claude/models) | Opus 4.7 is the next generation of Anthropic's Opus family, built for long-running, asynchronous agents. Building on the coding and agentic… |
| `z-ai/glm-5.1` | Z.ai: GLM 5.1 | 204K | text | Y | $0.966 / $3.04 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-5.1) · [docs](https://docs.z.ai/guides/overview/pricing) | GLM-5.1 delivers a major leap in coding capability, with particularly significant gains in handling long-horizon tasks. Unlike previous… |
| `google/gemma-4-26b-a4b-it` | Google: Gemma 4 26B A4B  | 262K | text | Y | $0.09 / $0.3 per 1M tok | [OR](https://openrouter.ai/google/gemma-4-26b-a4b-it) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemma 4 26B A4B IT is an instruction-tuned Mixture-of-Experts (MoE) model from Google DeepMind. Despite 25.2B total parameters, only 3.8B… |
| `google/gemma-4-26b-a4b-it:free` | Google: Gemma 4 26B A4B  (free) | 262K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/google/gemma-4-26b-a4b-it:free) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemma 4 26B A4B IT is an instruction-tuned Mixture-of-Experts (MoE) model from Google DeepMind. Despite 25.2B total parameters, only 3.8B… |
| `google/gemma-4-31b-it` | Google: Gemma 4 31B | 262K | text | Y | $0.09 / $0.34 per 1M tok | [OR](https://openrouter.ai/google/gemma-4-31b-it) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemma 4 31B Instruct is Google DeepMind's 30.7B dense multimodal model supporting text and image input with text output. Features a 256K… |
| `google/gemma-4-31b-it:free` | Google: Gemma 4 31B (free) | 262K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/google/gemma-4-31b-it:free) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemma 4 31B Instruct is Google DeepMind's 30.7B dense multimodal model supporting text and image input with text output. Features a 256K… |
| `qwen/qwen3.6-plus` | Qwen: Qwen3.6 Plus | 1M | text | Y | $0.325 / $1.95 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.6-plus) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen 3.6 Plus builds on a hybrid architecture that combines efficient linear attention with sparse mixture-of-experts routing, enabling… |
| `z-ai/glm-5v-turbo` | Z.ai: GLM 5V Turbo | 202K | text | Y | $1.2 / $4 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-5v-turbo) · [docs](https://docs.z.ai/guides/overview/pricing) | GLM-5V-Turbo is Z.ai’s first native multimodal agent foundation model, built for vision-based coding and agent-driven tasks. It natively… |
| `arcee-ai/trinity-large-thinking` | Arcee AI: Trinity Large Thinking | 262K | text | Y | $0.25 / $0.8 per 1M tok | [OR](https://openrouter.ai/arcee-ai/trinity-large-thinking) | Trinity Large Thinking is a powerful open source reasoning model from the team at Arcee AI. It shows strong performance in PinchBench,… |
| `kwaipilot/kat-coder-pro-v2` | Kwaipilot: KAT-Coder-Pro V2 | 262K | text | Y | $0.3 / $1.2 per 1M tok | [OR](https://openrouter.ai/kwaipilot/kat-coder-pro-v2) | KAT-Coder-Pro V2 is the latest high-performance model in KwaiKAT’s KAT-Coder series, designed for complex enterprise-grade software… |
| `rekaai/reka-edge` | Reka Edge | 16K | text | Y | $0.1 / $0.1 per 1M tok | [OR](https://openrouter.ai/rekaai/reka-edge) | Reka Edge is an extremely efficient 7B multimodal vision-language model that accepts image/video+text inputs and generates text outputs.… |
| `openai/gpt-5.4-nano` | OpenAI: GPT-5.4 Nano | 400K | text | Y | $0.2 / $1.25 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.4-nano) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.4 nano is the most lightweight and cost-efficient variant of the GPT-5.4 family, optimized for speed-critical and high-volume tasks.… |
| `openai/gpt-5.4-mini` | OpenAI: GPT-5.4 Mini | 400K | text | Y | $0.75 / $4.5 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.4-mini) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.4 mini brings the core capabilities of GPT-5.4 to a faster, more efficient model optimized for high-throughput workloads. It supports… |
| `z-ai/glm-5-turbo` | Z.ai: GLM 5 Turbo | 202K | text | Y | $1.2 / $4 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-5-turbo) · [docs](https://docs.z.ai/guides/overview/pricing) | GLM-5 Turbo is a new model from Z.ai designed for fast inference and strong performance in agent-driven environments such as OpenClaw… |
| `nvidia/nemotron-3-super-120b-a12b` | NVIDIA: Nemotron 3 Super | 262K | text | Y | $0.08 / $0.45 per 1M tok | [OR](https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b) · [docs](https://docs.nvidia.com/nim/) | NVIDIA Nemotron 3 Super is a 120B-parameter open hybrid MoE model, activating just 12B parameters for maximum compute efficiency and… |
| `nvidia/nemotron-3-super-120b-a12b:free` | NVIDIA: Nemotron 3 Super (free) | 262K | text | Y | $0 / $0 per 1M tok | [OR](https://openrouter.ai/nvidia/nemotron-3-super-120b-a12b:free) · [docs](https://docs.nvidia.com/nim/) | NVIDIA Nemotron 3 Super is a 120B-parameter open hybrid MoE model, activating just 12B parameters for maximum compute efficiency and… |
| `bytedance-seed/seed-2.0-lite` | ByteDance Seed: Seed-2.0-Lite | 262K | text | Y | $0.25 / $2 per 1M tok | [OR](https://openrouter.ai/bytedance-seed/seed-2.0-lite) · [docs](https://seed.bytedance.com) | Seed-2.0-Lite is a versatile, cost‑efficient enterprise workhorse that delivers strong multimodal and agent capabilities while offering… |
| `qwen/qwen3.5-9b` | Qwen: Qwen3.5-9B | 262K | text | Y | $0.1 / $0.15 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.5-9b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3.5-9B is a multimodal foundation model from the Qwen3.5 family, designed to deliver strong reasoning, coding, and visual understanding… |
| `openai/gpt-5.4-pro` | OpenAI: GPT-5.4 Pro | 1.1M | text | Y | $30 / $180 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.4-pro) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.4 Pro is OpenAI's most advanced model, building on GPT-5.4's unified architecture with enhanced reasoning capabilities for complex,… |
| `openai/gpt-5.4` | OpenAI: GPT-5.4 | 1.1M | text | Y | $2.5 / $15 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.4) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.4 is OpenAI’s latest frontier model, unifying the Codex and GPT lines into a single system. It features a 1M+ token context window… |
| `inception/mercury-2` | Inception: Mercury 2 | 128K | text | Y | $0.25 / $0.75 per 1M tok | [OR](https://openrouter.ai/inception/mercury-2) | Mercury 2 is an extremely fast reasoning LLM, and the first reasoning diffusion LLM (dLLM). Instead of generating tokens sequentially,… |
| `google/gemini-3.1-flash-lite-preview` | Google: Gemini 3.1 Flash Lite Preview | 1M | text | Y | $0.25 / $1.5 per 1M tok · web_search $0.01/call; image $0.25 per 1M; audio $0.5 per 1M | [OR](https://openrouter.ai/google/gemini-3.1-flash-lite-preview) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemini 3.1 Flash Lite Preview is Google's high-efficiency model optimized for high-volume use cases. It outperforms Gemini 2.5 Flash Lite… |
| `bytedance-seed/seed-2.0-mini` | ByteDance Seed: Seed-2.0-Mini | 262K | text | Y | $0.1 / $0.4 per 1M tok | [OR](https://openrouter.ai/bytedance-seed/seed-2.0-mini) · [docs](https://seed.bytedance.com) | Seed-2.0-mini targets latency-sensitive, high-concurrency, and cost-sensitive scenarios, emphasizing fast response and flexible inference… |
| `qwen/qwen3.5-35b-a3b` | Qwen: Qwen3.5-35B-A3B | 262K | text | Y | $0.1625 / $1.3 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.5-35b-a3b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | The Qwen3.5 Series 35B-A3B is a native vision-language model designed with a hybrid architecture that integrates linear attention… |
| `qwen/qwen3.5-27b` | Qwen: Qwen3.5-27B | 262K | text | Y | $0.195 / $1.56 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.5-27b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | The Qwen3.5 27B native vision-language Dense model incorporates a linear attention mechanism, delivering fast response times while… |
| `qwen/qwen3.5-122b-a10b` | Qwen: Qwen3.5-122B-A10B | 262K | text | Y | $0.26 / $2.08 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.5-122b-a10b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | The Qwen3.5 122B-A10B native vision-language model is built on a hybrid architecture that integrates a linear attention mechanism with a… |
| `qwen/qwen3.5-flash-02-23` | Qwen: Qwen3.5-Flash | 1M | text | Y | $0.065 / $0.26 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.5-flash-02-23) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | The Qwen3.5 native vision-language Flash models are built on a hybrid architecture that integrates a linear attention mechanism with a… |
| `openai/gpt-5.3-codex` | OpenAI: GPT-5.3-Codex | 400K | text | Y | $1.75 / $14 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.3-codex) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.3-Codex is OpenAI’s most advanced agentic coding model, combining the frontier software engineering performance of GPT-5.2-Codex with… |
| `aion-labs/aion-2.0` | AionLabs: Aion-2.0 | 131K | text | Y | $0.8 / $1.6 per 1M tok | [OR](https://openrouter.ai/aion-labs/aion-2.0) | Aion-2.0 is a variant of DeepSeek V3.2 optimized for immersive roleplaying and storytelling. It is particularly strong at introducing… |
| `anthropic/claude-sonnet-4.6` | Anthropic: Claude Sonnet 4.6 | 1M | text | Y | $3 / $15 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/anthropic/claude-sonnet-4.6) · [docs](https://docs.anthropic.com/en/docs/about-claude/models) | Sonnet 4.6 is Anthropic's most capable Sonnet-class model yet, with frontier performance across coding, agents, and professional work. It… |
| `qwen/qwen3.5-plus-02-15` | Qwen: Qwen3.5 Plus 2026-02-15 | 1M | text | Y | $0.26 / $1.56 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.5-plus-02-15) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | The Qwen3.5 native vision-language series Plus models are built on a hybrid architecture that integrates linear attention mechanisms with… |
| `qwen/qwen3.5-397b-a17b` | Qwen: Qwen3.5 397B A17B | 262K | text | Y | $0.55 / $3.5 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3.5-397b-a17b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | The Qwen3.5 series 397B-A17B native vision-language model is built on a hybrid architecture that integrates a linear attention mechanism… |
| `minimax/minimax-m2.5` | MiniMax: MiniMax M2.5 | 204K | text | Y | $0.27 / $1.08 per 1M tok | [OR](https://openrouter.ai/minimax/minimax-m2.5) · [docs](https://platform.minimax.io/docs) | MiniMax-M2.5 is a SOTA large language model designed for real-world productivity. Trained in a diverse range of complex real-world digital… |
| `z-ai/glm-5` | Z.ai: GLM 5 | 204K | text | Y | $0.6 / $1.92 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-5) · [docs](https://docs.z.ai/guides/overview/pricing) | GLM-5 is Z.ai’s flagship open-source foundation model engineered for complex systems design and long-horizon agent workflows. Built for… |
| `qwen/qwen3-max-thinking` | Qwen: Qwen3 Max Thinking | 262K | text | Y | $0.78 / $3.9 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-max-thinking) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-Max-Thinking is the flagship reasoning model in the Qwen3 series, designed for high-stakes cognitive tasks that require deep,… |
| `anthropic/claude-opus-4.6` | Anthropic: Claude Opus 4.6 | 1M | text | Y | $5 / $25 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/anthropic/claude-opus-4.6) · [docs](https://docs.anthropic.com/en/docs/about-claude/models) | Opus 4.6 is Anthropic’s strongest model for coding and long-running professional tasks. It is built for agents that operate across entire… |
| `qwen/qwen3-coder-next` | Qwen: Qwen3 Coder Next | 262K | text | Y | $0.12 / $0.8 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-coder-next) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-Coder-Next is an open-weight causal language model optimized for coding agents and local development workflows. It uses a sparse MoE… |
| `stepfun/step-3.5-flash` | StepFun: Step 3.5 Flash | 262K | text | Y | $0.1 / $0.3 per 1M tok | [OR](https://openrouter.ai/stepfun/step-3.5-flash) | Step 3.5 Flash is StepFun's most capable open-source foundation model. Built on a sparse Mixture of Experts (MoE) architecture, it… |
| `moonshotai/kimi-k2.5` | MoonshotAI: Kimi K2.5 | 262K | text | Y | $0.45 / $2.25 per 1M tok | [OR](https://openrouter.ai/moonshotai/kimi-k2.5) · [docs](https://platform.moonshot.ai/docs) | Kimi K2.5 is Moonshot AI's native multimodal model, delivering state-of-the-art visual coding capability and a self-directed agent swarm… |
| `upstage/solar-pro-3` | Upstage: Solar Pro 3 | 131K | text | Y | $0.15 / $0.6 per 1M tok | [OR](https://openrouter.ai/upstage/solar-pro-3) | Solar Pro 3 is Upstage's powerful Mixture-of-Experts (MoE) language model. With 102B total parameters and 12B active parameters per forward… |
| `minimax/minimax-m2-her` | MiniMax: MiniMax M2-her | 65K | text |  | $0.3 / $1.2 per 1M tok | [OR](https://openrouter.ai/minimax/minimax-m2-her) · [docs](https://platform.minimax.io/docs) | MiniMax M2-her is a dialogue-first large language model built for immersive roleplay, character-driven chat, and expressive multi-turn… |
| `writer/palmyra-x5` | Writer: Palmyra X5 | 1M | text |  | $0.6 / $6 per 1M tok | [OR](https://openrouter.ai/writer/palmyra-x5) | Palmyra X5 is Writer's most advanced model, purpose-built for building and scaling AI agents across the enterprise. It delivers… |
| `z-ai/glm-4.7-flash` | Z.ai: GLM 4.7 Flash | 200K | text | Y | $0.0605 / $0.4 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-4.7-flash) · [docs](https://docs.z.ai/guides/overview/pricing) | As a 30B-class SOTA model, GLM-4.7-Flash offers a new option that balances performance and efficiency. It is further optimized for agentic… |
| `openai/gpt-5.2-codex` | OpenAI: GPT-5.2-Codex | 400K | text | Y | $1.75 / $14 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.2-codex) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.2-Codex is an upgraded version of GPT-5.1-Codex optimized for software engineering and coding workflows. It is designed for both… |
| `bytedance-seed/seed-1.6-flash` | ByteDance Seed: Seed 1.6 Flash | 262K | text | Y | $0.075 / $0.3 per 1M tok | [OR](https://openrouter.ai/bytedance-seed/seed-1.6-flash) · [docs](https://seed.bytedance.com) | Seed 1.6 Flash is an ultra-fast multimodal deep thinking model by ByteDance Seed, supporting both text and visual understanding. It… |
| `bytedance-seed/seed-1.6` | ByteDance Seed: Seed 1.6 | 262K | text | Y | $0.25 / $2 per 1M tok | [OR](https://openrouter.ai/bytedance-seed/seed-1.6) · [docs](https://seed.bytedance.com) | Seed 1.6 is a general-purpose model released by the ByteDance Seed team. It incorporates multimodal capabilities and adaptive deep thinking… |
| `minimax/minimax-m2.1` | MiniMax: MiniMax M2.1 | 204K | text | Y | $0.3 / $1.2 per 1M tok | [OR](https://openrouter.ai/minimax/minimax-m2.1) · [docs](https://platform.minimax.io/docs) | MiniMax-M2.1 is a lightweight, state-of-the-art large language model optimized for coding, agentic workflows, and modern application… |
| `z-ai/glm-4.7` | Z.ai: GLM 4.7 | 204K | text | Y | $0.4 / $1.75 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-4.7) · [docs](https://docs.z.ai/guides/overview/pricing) | GLM-4.7 is Z.ai’s latest flagship model, featuring upgrades in two key areas: enhanced programming capabilities and more stable multi-step… |
| `google/gemini-3-flash-preview` | Google: Gemini 3 Flash Preview | 1M | text | Y | $0.5 / $3 per 1M tok · web_search $0.01/call; image $0.5 per 1M; audio $1 per 1M | [OR](https://openrouter.ai/google/gemini-3-flash-preview) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemini 3 Flash Preview is a high speed, high value thinking model designed for agentic workflows, multi turn chat, and coding assistance.… |
| `nvidia/nemotron-3-nano-30b-a3b` | NVIDIA: Nemotron 3 Nano 30B A3B | 262K | text | Y | $0.06 / $0.24 per 1M tok | [OR](https://openrouter.ai/nvidia/nemotron-3-nano-30b-a3b) · [docs](https://docs.nvidia.com/nim/) | NVIDIA Nemotron 3 Nano 30B A3B is a small language MoE model with highest compute efficiency and accuracy for developers to build… |
| `openai/gpt-5.2-chat` | OpenAI: GPT-5.2 Chat | 128K | text | Y | $1.75 / $14 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.2-chat) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.2 Chat (AKA Instant) is the fast, lightweight member of the 5.2 family, optimized for low-latency chat while retaining strong general… |
| `openai/gpt-5.2-pro` | OpenAI: GPT-5.2 Pro | 400K | text | Y | $21 / $168 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.2-pro) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.2 Pro is OpenAI’s most advanced model, offering major improvements in agentic coding and long context performance over GPT-5 Pro. It… |
| `openai/gpt-5.2` | OpenAI: GPT-5.2 | 400K | text | Y | $1.75 / $14 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.2) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.2 is the latest frontier-grade model in the GPT-5 series, offering stronger agentic and long context perfomance compared to GPT-5.1.… |
| `relace/relace-search` | Relace: Relace Search | 256K | text | Y | $1 / $3 per 1M tok | [OR](https://openrouter.ai/relace/relace-search) | The relace-search model uses 4-12 `view_file` and `grep` tools in parallel to explore a codebase and return relevant files to the user… |
| `z-ai/glm-4.6v` | Z.ai: GLM 4.6V | 131K | text | Y | $0.3 / $0.9 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-4.6v) · [docs](https://docs.z.ai/guides/overview/pricing) | GLM-4.6V is a large multimodal model designed for high-fidelity visual understanding and long-context reasoning across images, documents,… |
| `openai/gpt-5.1-codex-max` | OpenAI: GPT-5.1-Codex-Max | 400K | text | Y | $1.25 / $10 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.1-codex-max) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.1-Codex-Max is OpenAI’s latest agentic coding model, designed for long-running, high-context software development tasks. It is based… |
| `amazon/nova-2-lite-v1` | Amazon: Nova 2 Lite | 1M | text | Y | $0.3 / $2.5 per 1M tok | [OR](https://openrouter.ai/amazon/nova-2-lite-v1) | Nova 2 Lite is a fast, cost-effective reasoning model for everyday workloads that can process text, images, and videos to generate text.… |
| `mistralai/ministral-14b-2512` | Mistral: Ministral 3 14B 2512 | 262K | text | Y | $0.2 / $0.2 per 1M tok | [OR](https://openrouter.ai/mistralai/ministral-14b-2512) · [docs](https://docs.mistral.ai/getting-started/models) | The largest model in the Ministral 3 family, Ministral 3 14B offers frontier capabilities and performance comparable to its larger Mistral… |
| `mistralai/ministral-8b-2512` | Mistral: Ministral 3 8B 2512 | 262K | text | Y | $0.15 / $0.15 per 1M tok | [OR](https://openrouter.ai/mistralai/ministral-8b-2512) · [docs](https://docs.mistral.ai/getting-started/models) | A balanced model in the Ministral 3 family, Ministral 3 8B is a powerful, efficient tiny language model with vision capabilities. |
| `mistralai/ministral-3b-2512` | Mistral: Ministral 3 3B 2512 | 131K | text | Y | $0.1 / $0.1 per 1M tok | [OR](https://openrouter.ai/mistralai/ministral-3b-2512) · [docs](https://docs.mistral.ai/getting-started/models) | The smallest model in the Ministral 3 family, Ministral 3 3B is a powerful, efficient tiny language model with vision capabilities. |
| `deepseek/deepseek-v3.2` | DeepSeek: DeepSeek V3.2 | 163K | text | Y | $0.269 / $0.4 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-v3.2) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek-V3.2 is a large language model designed to harmonize high computational efficiency with strong reasoning and agentic tool-use… |
| `anthropic/claude-opus-4.5` | Anthropic: Claude Opus 4.5 | 200K | text | Y | $5 / $25 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/anthropic/claude-opus-4.5) · [docs](https://docs.anthropic.com/en/docs/about-claude/models) | Claude Opus 4.5 is Anthropic’s frontier reasoning model optimized for complex software engineering, agentic workflows, and long-horizon… |
| `openai/gpt-5.1` | OpenAI: GPT-5.1 | 400K | text | Y | $1.25 / $10 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.1) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.1 is the latest frontier-grade model in the GPT-5 series, offering stronger general-purpose reasoning, improved instruction… |
| `openai/gpt-5.1-codex` | OpenAI: GPT-5.1-Codex | 400K | text | Y | $1.25 / $10 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.1-codex) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.1-Codex is a specialized version of GPT-5.1 optimized for software engineering and coding workflows. It is designed for both… |
| `openai/gpt-5.1-codex-mini` | OpenAI: GPT-5.1-Codex-Mini | 400K | text | Y | $0.25 / $2 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5.1-codex-mini) · [docs](https://developers.openai.com/api/docs/models) | GPT-5.1-Codex-Mini is a smaller and faster version of GPT-5.1-Codex |
| `moonshotai/kimi-k2-thinking` | MoonshotAI: Kimi K2 Thinking | 262K | text | Y | $0.6 / $2.5 per 1M tok | [OR](https://openrouter.ai/moonshotai/kimi-k2-thinking) · [docs](https://platform.moonshot.ai/docs) | Kimi K2 Thinking is Moonshot AI’s most advanced open reasoning model to date, extending the K2 series into agentic, long-horizon reasoning.… |
| `amazon/nova-premier-v1` | Amazon: Nova Premier 1.0 | 1M | text | Y | $2.5 / $12.5 per 1M tok | [OR](https://openrouter.ai/amazon/nova-premier-v1) | Amazon Nova Premier is the most capable of Amazon’s multimodal models for complex reasoning tasks and for use as the best teacher for… |
| `mistralai/voxtral-small-24b-2507` | Mistral: Voxtral Small 24B 2507 | 32K | text | Y | $0.1 / $0.3 per 1M tok · audio $100 per 1M | [OR](https://openrouter.ai/mistralai/voxtral-small-24b-2507) · [docs](https://docs.mistral.ai/getting-started/models) | Voxtral Small is an enhancement of Mistral Small 3, incorporating state-of-the-art audio input capabilities while retaining best-in-class… |
| `openai/gpt-oss-safeguard-20b` | OpenAI: gpt-oss-safeguard-20b | 131K | text | Y | $0.075 / $0.3 per 1M tok | [OR](https://openrouter.ai/openai/gpt-oss-safeguard-20b) · [docs](https://developers.openai.com/api/docs/models) | gpt-oss-safeguard-20b is a safety reasoning model from OpenAI built upon gpt-oss-20b. This open-weight, 21B-parameter Mixture-of-Experts… |
| `minimax/minimax-m2` | MiniMax: MiniMax M2 | 204K | text | Y | $0.255 / $1.02 per 1M tok | [OR](https://openrouter.ai/minimax/minimax-m2) · [docs](https://platform.minimax.io/docs) | MiniMax-M2 is a compact, high-efficiency large language model optimized for end-to-end coding and agentic workflows. With 10 billion… |
| `qwen/qwen3-vl-32b-instruct` | Qwen: Qwen3 VL 32B Instruct | 131K | text | Y | $0.104 / $0.416 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-vl-32b-instruct) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-VL-32B-Instruct is a large-scale multimodal vision-language model designed for high-precision understanding and reasoning across… |
| `ibm-granite/granite-4.0-h-micro` | IBM: Granite 4.0 Micro | 131K | text |  | $0.017 / $0.112 per 1M tok | [OR](https://openrouter.ai/ibm-granite/granite-4.0-h-micro) | Granite-4.0-H-Micro is a 3B parameter from the Granite 4 family of models. These models are the latest in a series of models released by… |
| `qwen/qwen3-vl-8b-thinking` | Qwen: Qwen3 VL 8B Thinking | 131K | text | Y | $0.18 / $2.1 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-vl-8b-thinking) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-VL-8B-Thinking is the reasoning-optimized variant of the Qwen3-VL-8B multimodal model, designed for advanced visual and textual… |
| `qwen/qwen3-vl-8b-instruct` | Qwen: Qwen3 VL 8B Instruct | 262K | text | Y | $0.117 / $0.455 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-vl-8b-instruct) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-VL-8B-Instruct is a multimodal vision-language model from the Qwen3-VL series, built for high-fidelity understanding and reasoning… |
| `qwen/qwen3-vl-30b-a3b-thinking` | Qwen: Qwen3 VL 30B A3B Thinking | 262K | text | Y | $0.2 / $2.4 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-vl-30b-a3b-thinking) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-VL-30B-A3B-Thinking is a multimodal model that unifies strong text generation with visual understanding for images and videos. Its… |
| `qwen/qwen3-vl-30b-a3b-instruct` | Qwen: Qwen3 VL 30B A3B Instruct | 262K | text | Y | $0.13 / $0.52 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-vl-30b-a3b-instruct) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-VL-30B-A3B-Instruct is a multimodal model that unifies strong text generation with visual understanding for images and videos. Its… |
| `openai/gpt-5-pro` | OpenAI: GPT-5 Pro | 400K | text | Y | $15 / $120 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5-pro) · [docs](https://developers.openai.com/api/docs/models) | GPT-5 Pro is OpenAI’s most advanced model, offering major improvements in reasoning, code quality, and user experience. It is optimized for… |
| `z-ai/glm-4.6` | Z.ai: GLM 4.6 | 204K | text | Y | $0.43 / $1.75 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-4.6) · [docs](https://docs.z.ai/guides/overview/pricing) | Compared with GLM-4.5, this generation brings several key improvements: Longer context window: The context window has been expanded from… |
| `anthropic/claude-sonnet-4.5` | Anthropic: Claude Sonnet 4.5 | 1M | text | Y | $3 / $15 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/anthropic/claude-sonnet-4.5) · [docs](https://docs.anthropic.com/en/docs/about-claude/models) | Claude Sonnet 4.5 is Anthropic’s most advanced Sonnet model to date, optimized for real-world agents and coding workflows. It delivers… |
| `deepseek/deepseek-v3.2-exp` | DeepSeek: DeepSeek V3.2 Exp | 163K | text | Y | $0.27 / $0.41 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-v3.2-exp) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek-V3.2-Exp is an experimental large language model released by DeepSeek as an intermediate step between V3.1 and future… |
| `thedrummer/cydonia-24b-v4.1` | TheDrummer: Cydonia 24B V4.1 | 131K | text |  | $0.3 / $0.5 per 1M tok | [OR](https://openrouter.ai/thedrummer/cydonia-24b-v4.1) | Uncensored and creative writing model based on Mistral Small 3.2 24B with good recall, prompt adherence, and intelligence. |
| `relace/relace-apply-3` | Relace: Relace Apply 3 | 256K | text |  | $0.85 / $1.25 per 1M tok | [OR](https://openrouter.ai/relace/relace-apply-3) | Relace Apply 3 is a specialized code-patching LLM that merges AI-suggested edits straight into your source files. It can apply updates from… |
| `qwen/qwen3-vl-235b-a22b-thinking` | Qwen: Qwen3 VL 235B A22B Thinking | 131K | text | Y | $0.4 / $4 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-vl-235b-a22b-thinking) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-VL-235B-A22B Thinking is a multimodal model that unifies strong text generation with visual understanding across images and video.… |
| `qwen/qwen3-vl-235b-a22b-instruct` | Qwen: Qwen3 VL 235B A22B Instruct | 262K | text | Y | $0.21 / $1.9 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-vl-235b-a22b-instruct) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-VL-235B-A22B Instruct is an open-weight multimodal model that unifies strong text generation with visual understanding across images… |
| `qwen/qwen3-max` | Qwen: Qwen3 Max | 262K | text | Y | $0.78 / $3.9 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-max) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-Max is an updated release built on the Qwen3 series, offering major improvements in reasoning, instruction following, multilingual… |
| `qwen/qwen3-coder-plus` | Qwen: Qwen3 Coder Plus | 1M | text | Y | $0.65 / $3.25 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-coder-plus) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3 Coder Plus is Alibaba's proprietary version of the Open Source Qwen3 Coder 480B A35B. It is a powerful coding agent model… |
| `deepseek/deepseek-v3.1-terminus` | DeepSeek: DeepSeek V3.1 Terminus | 163K | text | Y | $0.27 / $1 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-v3.1-terminus) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek-V3.1 Terminus is an update to [DeepSeek V3.1](/deepseek/deepseek-chat-v3.1) that maintains the model's original capabilities while… |
| `qwen/qwen3-coder-flash` | Qwen: Qwen3 Coder Flash | 1M | text | Y | $0.195 / $0.975 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-coder-flash) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3 Coder Flash is Alibaba's fast and cost efficient version of their proprietary Qwen3 Coder Plus. It is a powerful coding agent model… |
| `qwen/qwen3-next-80b-a3b-thinking` | Qwen: Qwen3 Next 80B A3B Thinking | 262K | text | Y | $0.15 / $1.2 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-next-80b-a3b-thinking) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-Next-80B-A3B-Thinking is a reasoning-first chat model in the Qwen3-Next line that outputs structured “thinking” traces by default.… |
| `qwen/qwen3-next-80b-a3b-instruct` | Qwen: Qwen3 Next 80B A3B Instruct | 262K | text | Y | $0.09 / $1.1 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-next-80b-a3b-instruct) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-Next-80B-A3B-Instruct is an instruction-tuned chat model in the Qwen3-Next series optimized for fast, stable responses without… |
| `qwen/qwen-plus-2025-07-28` | Qwen: Qwen Plus 0728 | 1M | text | Y | $0.26 / $0.78 per 1M tok | [OR](https://openrouter.ai/qwen/qwen-plus-2025-07-28) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen Plus 0728, based on the Qwen3 foundation model, is a 1 million context hybrid reasoning model with a balanced performance, speed, and… |
| `moonshotai/kimi-k2-0905` | MoonshotAI: Kimi K2 0905 | 262K | text | Y | $0.6 / $2.5 per 1M tok | [OR](https://openrouter.ai/moonshotai/kimi-k2-0905) · [docs](https://platform.moonshot.ai/docs) | Kimi K2 0905 is the September update of [Kimi K2 0711](moonshotai/kimi-k2). It is a large-scale Mixture-of-Experts (MoE) language model… |
| `qwen/qwen3-30b-a3b-thinking-2507` | Qwen: Qwen3 30B A3B Thinking 2507 | 81K | text | Y | $0.2 / $2.4 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-30b-a3b-thinking-2507) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-30B-A3B-Thinking-2507 is a 30B parameter Mixture-of-Experts reasoning model optimized for complex tasks requiring extended multi-step… |
| `nousresearch/hermes-4-405b` | Nous: Hermes 4 405B | 131K | text |  | $1 / $3 per 1M tok | [OR](https://openrouter.ai/nousresearch/hermes-4-405b) | Hermes 4 is a large-scale reasoning model built on Meta-Llama-3.1-405B and released by Nous Research. It introduces a hybrid reasoning… |
| `deepseek/deepseek-chat-v3.1` | DeepSeek: DeepSeek V3.1 | 163K | text | Y | $0.25 / $0.95 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-chat-v3.1) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek-V3.1 is a large hybrid reasoning model (671B parameters, 37B active) that supports both thinking and non-thinking modes via prompt… |
| `mistralai/mistral-medium-3.1` | Mistral: Mistral Medium 3.1 | 131K | text | Y | $0.4 / $2 per 1M tok | [OR](https://openrouter.ai/mistralai/mistral-medium-3.1) · [docs](https://docs.mistral.ai/getting-started/models) | Mistral Medium 3.1 is an updated version of Mistral Medium 3, which is a high-performance enterprise-grade language model designed to… |
| `z-ai/glm-4.5v` | Z.ai: GLM 4.5V | 65K | text | Y | $0.6 / $1.8 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-4.5v) · [docs](https://docs.z.ai/guides/overview/pricing) | GLM-4.5V is a vision-language foundation model for multimodal agent applications. Built on a Mixture-of-Experts (MoE) architecture with… |
| `openai/gpt-5` | OpenAI: GPT-5 | 400K | text | Y | $1.25 / $10 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5) · [docs](https://developers.openai.com/api/docs/models) | GPT-5 is OpenAI’s most advanced model, offering major improvements in reasoning, code quality, and user experience. It is optimized for… |
| `openai/gpt-5-mini` | OpenAI: GPT-5 Mini | 400K | text | Y | $0.25 / $2 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5-mini) · [docs](https://developers.openai.com/api/docs/models) | GPT-5 Mini is a compact version of GPT-5, designed to handle lighter-weight reasoning tasks. It provides the same instruction-following and… |
| `openai/gpt-5-nano` | OpenAI: GPT-5 Nano | 400K | text | Y | $0.05 / $0.4 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-5-nano) · [docs](https://developers.openai.com/api/docs/models) | GPT-5-Nano is the smallest and fastest variant in the GPT-5 system, optimized for developer tools, rapid interactions, and ultra-low… |
| `openai/gpt-oss-120b` | OpenAI: gpt-oss-120b | 131K | text | Y | $0.15 / $0.6 per 1M tok | [OR](https://openrouter.ai/openai/gpt-oss-120b) · [docs](https://developers.openai.com/api/docs/models) | gpt-oss-120b is an open-weight, 117B-parameter Mixture-of-Experts (MoE) language model from OpenAI designed for high-reasoning, agentic,… |
| `openai/gpt-oss-20b` | OpenAI: gpt-oss-20b | 131K | text | Y | $0.03 / $0.13 per 1M tok | [OR](https://openrouter.ai/openai/gpt-oss-20b) · [docs](https://developers.openai.com/api/docs/models) | gpt-oss-20b is an open-weight 21B parameter model released by OpenAI under the Apache 2.0 license. It uses a Mixture-of-Experts (MoE)… |
| `anthropic/claude-opus-4.1` | Anthropic: Claude Opus 4.1 | 200K | text | Y | $15 / $75 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/anthropic/claude-opus-4.1) · [docs](https://docs.anthropic.com/en/docs/about-claude/models) | Claude Opus 4.1 is an updated version of Anthropic’s flagship model, offering improved performance in coding, reasoning, and agentic tasks.… |
| `qwen/qwen3-coder-30b-a3b-instruct` | Qwen: Qwen3 Coder 30B A3B Instruct | 262K | text | Y | $0.07 / $0.28 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-coder-30b-a3b-instruct) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-Coder-30B-A3B-Instruct is a 30.5B parameter Mixture-of-Experts (MoE) model with 128 experts (8 active per forward pass), designed for… |
| `qwen/qwen3-30b-a3b-instruct-2507` | Qwen: Qwen3 30B A3B Instruct 2507 | 262K | text | Y | $0.0481 / $0.193 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-30b-a3b-instruct-2507) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-30B-A3B-Instruct-2507 is a 30.5B-parameter mixture-of-experts language model from Qwen, with 3.3B active parameters per inference. It… |
| `z-ai/glm-4.5` | Z.ai: GLM 4.5 | 131K | text | Y | $0.6 / $2.2 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-4.5) · [docs](https://docs.z.ai/guides/overview/pricing) | GLM-4.5 is our latest flagship foundation model, purpose-built for agent-based applications. It leverages a Mixture-of-Experts (MoE)… |
| `z-ai/glm-4.5-air` | Z.ai: GLM 4.5 Air | 131K | text | Y | $0.13 / $0.85 per 1M tok | [OR](https://openrouter.ai/z-ai/glm-4.5-air) · [docs](https://docs.z.ai/guides/overview/pricing) | GLM-4.5-Air is the lightweight variant of our latest flagship model family, also purpose-built for agent-centric applications. Like… |
| `qwen/qwen3-235b-a22b-thinking-2507` | Qwen: Qwen3 235B A22B Thinking 2507 | 131K | text | Y | $0.23 / $2.3 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-235b-a22b-thinking-2507) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-235B-A22B-Thinking-2507 is a high-performance, open-weight Mixture-of-Experts (MoE) language model optimized for complex reasoning… |
| `qwen/qwen3-coder` | Qwen: Qwen3 Coder 480B A35B | 262K | text | Y | $0.3 / $1 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-coder) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-Coder-480B-A35B-Instruct is a Mixture-of-Experts (MoE) code generation model developed by the Qwen team. It is optimized for agentic… |
| `bytedance/ui-tars-1.5-7b` | ByteDance: UI-TARS 7B  | 128K | text |  | $0.1 / $0.2 per 1M tok | [OR](https://openrouter.ai/bytedance/ui-tars-1.5-7b) · [docs](https://seed.bytedance.com) | UI-TARS-1.5 is a multimodal vision-language agent optimized for GUI-based environments, including desktop interfaces, web browsers, mobile… |
| `google/gemini-2.5-flash-lite` | Google: Gemini 2.5 Flash Lite | 1M | text | Y | $0.1 / $0.4 per 1M tok · web_search $0.01/call; image $0.1 per 1M; audio $0.3 per 1M | [OR](https://openrouter.ai/google/gemini-2.5-flash-lite) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemini 2.5 Flash-Lite is a lightweight reasoning model in the Gemini 2.5 family, optimized for ultra-low latency and cost efficiency. It… |
| `qwen/qwen3-235b-a22b-2507` | Qwen: Qwen3 235B A22B Instruct 2507 | 262K | text | Y | $0.0875 / $0.35 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-235b-a22b-2507) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-235B-A22B-Instruct-2507 is a multilingual, instruction-tuned mixture-of-experts language model based on the Qwen3-235B architecture,… |
| `moonshotai/kimi-k2` | MoonshotAI: Kimi K2 0711 | 131K | text | Y | $0.57 / $2.3 per 1M tok | [OR](https://openrouter.ai/moonshotai/kimi-k2) · [docs](https://platform.moonshot.ai/docs) | Kimi K2 Instruct is a large-scale Mixture-of-Experts (MoE) language model developed by Moonshot AI, featuring 1 trillion total parameters… |
| `cognitivecomputations/dolphin-mistral-24b-venice-edition` | Venice: Uncensored | 128K | text |  | $0.2 / $0.9 per 1M tok | [OR](https://openrouter.ai/cognitivecomputations/dolphin-mistral-24b-venice-edition) | Venice Uncensored Dolphin Mistral 24B Venice Edition is a fine-tuned variant of Mistral-Small-24B-Instruct-2501, developed by dphn.ai in… |
| `tencent/hunyuan-a13b-instruct` | Tencent: Hunyuan A13B Instruct | 131K | text |  | $0.14 / $0.57 per 1M tok | [OR](https://openrouter.ai/tencent/hunyuan-a13b-instruct) | Hunyuan-A13B is a 13B active parameter Mixture-of-Experts (MoE) language model developed by Tencent, with a total parameter count of 80B… |
| `morph/morph-v3-large` | Morph: Morph V3 Large | 262K | text |  | $0.9 / $1.9 per 1M tok | [OR](https://openrouter.ai/morph/morph-v3-large) | Morph's high-accuracy apply model for complex code edits. ~4,500 tokens/sec with 98% accuracy for precise code transformations. The model… |
| `morph/morph-v3-fast` | Morph: Morph V3 Fast | 81K | text |  | $0.8 / $1.2 per 1M tok | [OR](https://openrouter.ai/morph/morph-v3-fast) | Morph's fastest apply model for code edits. ~10,500 tokens/sec with 96% accuracy for rapid code transformations. The model requires the… |
| `baidu/ernie-4.5-vl-424b-a47b` | Baidu: ERNIE 4.5 VL 424B A47B  | 123K | text |  | $0.42 / $1.25 per 1M tok | [OR](https://openrouter.ai/baidu/ernie-4.5-vl-424b-a47b) | ERNIE-4.5-VL-424B-A47B is a multimodal Mixture-of-Experts (MoE) model from Baidu’s ERNIE 4.5 series, featuring 424B total parameters with… |
| `mistralai/mistral-small-3.2-24b-instruct` | Mistral: Mistral Small 3.2 24B | 256K | text | Y | $0.0938 / $0.25 per 1M tok | [OR](https://openrouter.ai/mistralai/mistral-small-3.2-24b-instruct) · [docs](https://docs.mistral.ai/getting-started/models) | Mistral-Small-3.2-24B-Instruct-2506 is an updated 24B parameter model from Mistral optimized for instruction following, repetition… |
| `minimax/minimax-m1` | MiniMax: MiniMax M1 | 1M | text | Y | $0.4 / $2.2 per 1M tok | [OR](https://openrouter.ai/minimax/minimax-m1) · [docs](https://platform.minimax.io/docs) | MiniMax-M1 is a large-scale, open-weight reasoning model designed for extended context and high-efficiency inference. It leverages a hybrid… |
| `google/gemini-2.5-flash` | Google: Gemini 2.5 Flash | 1M | text | Y | $0.3 / $2.5 per 1M tok · web_search $0.01/call; image $0.3 per 1M; audio $1 per 1M | [OR](https://openrouter.ai/google/gemini-2.5-flash) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemini 2.5 Flash is Google's state-of-the-art workhorse model, specifically designed for advanced reasoning, coding, mathematics, and… |
| `google/gemini-2.5-pro` | Google: Gemini 2.5 Pro | 1M | text | Y | $1.25 / $10 per 1M tok · web_search $0.01/call; image $1.25 per 1M; audio $1.25 per 1M | [OR](https://openrouter.ai/google/gemini-2.5-pro) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs… |
| `google/gemini-2.5-pro-preview` | Google: Gemini 2.5 Pro Preview 06-05 | 1M | text | Y | $1.25 / $10 per 1M tok · web_search $0.01/call; image $1.25 per 1M; audio $1.25 per 1M | [OR](https://openrouter.ai/google/gemini-2.5-pro-preview) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemini 2.5 Pro is Google’s state-of-the-art AI model designed for advanced reasoning, coding, mathematics, and scientific tasks. It employs… |
| `deepseek/deepseek-r1-0528` | DeepSeek: R1 0528 | 163K | text | Y | $0.5 / $2.15 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-r1-0528) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | May 28th update to the [original DeepSeek R1](/deepseek/deepseek-r1) Performance on par with [OpenAI o1](/openai/o1), but open-sourced and… |
| `anthropic/claude-opus-4` | Anthropic: Claude Opus 4 | 200K | text | Y | $15 / $75 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/anthropic/claude-opus-4) · [docs](https://docs.anthropic.com/en/docs/about-claude/models) | Claude Opus 4 is benchmarked as the world’s best coding model, at time of release, bringing sustained performance on complex, long-running… |
| `anthropic/claude-sonnet-4` | Anthropic: Claude Sonnet 4 | 1M | text | Y | $3 / $15 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/anthropic/claude-sonnet-4) · [docs](https://docs.anthropic.com/en/docs/about-claude/models) | Claude Sonnet 4 significantly enhances the capabilities of its predecessor, Sonnet 3.7, excelling in both coding and reasoning tasks with… |
| `mistralai/mistral-medium-3` | Mistral: Mistral Medium 3 | 131K | text | Y | $0.4 / $2 per 1M tok | [OR](https://openrouter.ai/mistralai/mistral-medium-3) · [docs](https://docs.mistral.ai/getting-started/models) | Mistral Medium 3 is a high-performance enterprise-grade language model designed to deliver frontier-level capabilities at significantly… |
| `meta-llama/llama-guard-4-12b` | Meta: Llama Guard 4 12B | 163K | text |  | $0.18 / $0.18 per 1M tok | [OR](https://openrouter.ai/meta-llama/llama-guard-4-12b) · [docs](https://www.llama.com/docs/overview/) | Llama Guard 4 is a Llama 4 Scout-derived multimodal pretrained model, fine-tuned for content safety classification. Similar to previous… |
| `qwen/qwen3-30b-a3b` | Qwen: Qwen3 30B A3B | 131K | text | Y | $0.12 / $0.5 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-30b-a3b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3, the latest generation in the Qwen large language model series, features both dense and mixture-of-experts (MoE) architectures to… |
| `qwen/qwen3-8b` | Qwen: Qwen3 8B | 131K | text | Y | $0.117 / $0.455 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-8b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-8B is a dense 8.2B parameter causal language model from the Qwen3 series, designed for both reasoning-heavy tasks and efficient… |
| `qwen/qwen3-14b` | Qwen: Qwen3 14B | 131K | text | Y | $0.12 / $0.24 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-14b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-14B is a dense 14.8B parameter causal language model from the Qwen3 series, designed for both complex reasoning and efficient… |
| `qwen/qwen3-32b` | Qwen: Qwen3 32B | 131K | text | Y | $0.08 / $0.28 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-32b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-32B is a dense 32.8B parameter causal language model from the Qwen3 series, optimized for both complex reasoning and efficient… |
| `qwen/qwen3-235b-a22b` | Qwen: Qwen3 235B A22B | 131K | text | Y | $0.455 / $1.82 per 1M tok | [OR](https://openrouter.ai/qwen/qwen3-235b-a22b) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen3-235B-A22B is a 235B parameter mixture-of-experts (MoE) model developed by Qwen, activating 22B parameters per forward pass. It… |
| `openai/gpt-4.1` | OpenAI: GPT-4.1 | 1M | text | Y | $2 / $8 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-4.1) · [docs](https://developers.openai.com/api/docs/models) | GPT-4.1 is a flagship large language model optimized for advanced instruction following, real-world software engineering, and long-context… |
| `openai/gpt-4.1-mini` | OpenAI: GPT-4.1 Mini | 1M | text | Y | $0.4 / $1.6 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-4.1-mini) · [docs](https://developers.openai.com/api/docs/models) | GPT-4.1 Mini is a mid-sized model delivering performance competitive with GPT-4o at substantially lower latency and cost. It retains a 1… |
| `openai/gpt-4.1-nano` | OpenAI: GPT-4.1 Nano | 1M | text | Y | $0.1 / $0.4 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/gpt-4.1-nano) · [docs](https://developers.openai.com/api/docs/models) | For tasks that demand low latency, GPT‑4.1 nano is the fastest and cheapest model in the GPT-4.1 series. It delivers exceptional… |
| `meta-llama/llama-4-maverick` | Meta: Llama 4 Maverick | 1M | text | Y | $0.1875 / $0.6525 per 1M tok | [OR](https://openrouter.ai/meta-llama/llama-4-maverick) · [docs](https://www.llama.com/docs/overview/) | Llama 4 Maverick 17B Instruct (128E) is a high-capacity multimodal language model from Meta, built on a mixture-of-experts (MoE)… |
| `meta-llama/llama-4-scout` | Meta: Llama 4 Scout | 1.3M | text | Y | $0.1 / $0.3 per 1M tok | [OR](https://openrouter.ai/meta-llama/llama-4-scout) · [docs](https://www.llama.com/docs/overview/) | Llama 4 Scout 17B Instruct (16E) is a mixture-of-experts (MoE) language model developed by Meta, activating 17 billion parameters out of a… |
| `deepseek/deepseek-chat-v3-0324` | DeepSeek: DeepSeek V3 0324 | 163K | text | Y | $0.25 / $1 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-chat-v3-0324) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek V3, a 685B-parameter, mixture-of-experts model, is the latest iteration of the flagship chat model family from the DeepSeek team.… |
| `openai/o1-pro` | OpenAI: o1-pro | 200K | text |  | $150 / $600 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/o1-pro) · [docs](https://developers.openai.com/api/docs/models) | The o1 series of models are trained with reinforcement learning to think before they answer and perform complex reasoning. The o1-pro model… |
| `mistralai/mistral-small-3.1-24b-instruct` | Mistral: Mistral Small 3.1 24B | 128K | text |  | $0.351 / $0.555 per 1M tok | [OR](https://openrouter.ai/mistralai/mistral-small-3.1-24b-instruct) · [docs](https://docs.mistral.ai/getting-started/models) | Mistral Small 3.1 24B Instruct is an upgraded variant of Mistral Small 3 (2501), featuring 24 billion parameters with advanced multimodal… |
| `google/gemma-3-4b-it` | Google: Gemma 3 4B | 131K | text |  | $0.05 / $0.1 per 1M tok | [OR](https://openrouter.ai/google/gemma-3-4b-it) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens,… |
| `google/gemma-3-12b-it` | Google: Gemma 3 12B | 131K | text | Y | $0.05 / $0.15 per 1M tok | [OR](https://openrouter.ai/google/gemma-3-12b-it) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens,… |
| `rekaai/reka-flash-3` | Reka Flash 3 | 65K | text |  | $0.1 / $0.2 per 1M tok | [OR](https://openrouter.ai/rekaai/reka-flash-3) | Reka Flash 3 is a general-purpose, instruction-tuned large language model with 21 billion parameters, developed by Reka. It excels at… |
| `google/gemma-3-27b-it` | Google: Gemma 3 27B | 131K | text | Y | $0.08 / $0.45 per 1M tok | [OR](https://openrouter.ai/google/gemma-3-27b-it) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemma 3 introduces multimodality, supporting vision-language input and text outputs. It handles context windows up to 128k tokens,… |
| `thedrummer/skyfall-36b-v2` | TheDrummer: Skyfall 36B V2 | 32K | text |  | $0.55 / $0.8 per 1M tok | [OR](https://openrouter.ai/thedrummer/skyfall-36b-v2) | Skyfall 36B v2 is an enhanced iteration of Mistral Small 2501, specifically fine-tuned for improved creativity, nuanced writing,… |
| `mistralai/mistral-saba` | Mistral: Saba | 32K | text | Y | $0.2 / $0.6 per 1M tok | [OR](https://openrouter.ai/mistralai/mistral-saba) · [docs](https://docs.mistral.ai/getting-started/models) | Mistral Saba is a 24B-parameter language model specifically designed for the Middle East and South Asia, delivering accurate and… |
| `aion-labs/aion-rp-llama-3.1-8b` | AionLabs: Aion-RP 1.0 (8B) | 32K | text |  | $0.8 / $1.6 per 1M tok | [OR](https://openrouter.ai/aion-labs/aion-rp-llama-3.1-8b) | Aion-RP-Llama-3.1-8B ranks the highest in the character evaluation portion of the RPBench-Auto benchmark, a roleplaying-specific variant of… |
| `qwen/qwen2.5-vl-72b-instruct` | Qwen: Qwen2.5 VL 72B Instruct | 128K | text |  | $0.8 / $1 per 1M tok | [OR](https://openrouter.ai/qwen/qwen2.5-vl-72b-instruct) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen2.5-VL is proficient in recognizing common objects such as flowers, birds, fish, and insects. It is also highly capable of analyzing… |
| `qwen/qwen-plus` | Qwen: Qwen-Plus | 1M | text | Y | $0.26 / $0.78 per 1M tok | [OR](https://openrouter.ai/qwen/qwen-plus) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen-Plus, based on the Qwen2.5 foundation model, is a 131K context model with a balanced performance, speed, and cost combination. |
| `mistralai/mistral-small-24b-instruct-2501` | Mistral: Mistral Small 3 | 32K | text |  | $0.05 / $0.08 per 1M tok | [OR](https://openrouter.ai/mistralai/mistral-small-24b-instruct-2501) · [docs](https://docs.mistral.ai/getting-started/models) | Mistral Small 3 is a 24B-parameter language model optimized for low-latency performance across common AI tasks. Released under the Apache… |
| `deepseek/deepseek-r1-distill-llama-70b` | DeepSeek: R1 Distill Llama 70B | 8K | text |  | $0.8 / $0.8 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-r1-distill-llama-70b) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek R1 Distill Llama 70B is a distilled large language model based on [Llama-3.3-70B-Instruct](/meta-llama/llama-3.3-70b-instruct),… |
| `deepseek/deepseek-r1` | DeepSeek: R1 | 64K | text | Y | $0.7 / $2.5 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-r1) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek R1 is here: Performance on par with [OpenAI o1](/openai/o1), but open-sourced and with fully open reasoning tokens. It's 671B… |
| `minimax/minimax-01` | MiniMax: MiniMax-01 | 1M | text |  | $0.2 / $1.1 per 1M tok | [OR](https://openrouter.ai/minimax/minimax-01) · [docs](https://platform.minimax.io/docs) | MiniMax-01 is a combines MiniMax-Text-01 for text generation and MiniMax-VL-01 for image understanding. It has 456 billion parameters, with… |
| `microsoft/phi-4` | Microsoft: Phi 4 | 16K | text |  | $0.07 / $0.14 per 1M tok | [OR](https://openrouter.ai/microsoft/phi-4) · [docs](https://learn.microsoft.com/azure/ai-services/) | [Microsoft Research](/microsoft) Phi-4 is designed to perform well in complex reasoning tasks and can operate efficiently in situations… |
| `deepseek/deepseek-chat` | DeepSeek: DeepSeek V3 | 163K | text | Y | $0.32 / $0.89 per 1M tok | [OR](https://openrouter.ai/deepseek/deepseek-chat) · [docs](https://api-docs.deepseek.com/quick_start/pricing) | DeepSeek-V3 is the latest model from the DeepSeek team, building upon the instruction following and coding abilities of the previous… |
| `sao10k/l3.3-euryale-70b` | Sao10K: Llama 3.3 Euryale 70B | 131K | text |  | $0.65 / $0.75 per 1M tok | [OR](https://openrouter.ai/sao10k/l3.3-euryale-70b) | Euryale L3.3 70B is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). It is the successor of [Euryale L3 70B… |
| `openai/o1` | OpenAI: o1 | 200K | text | Y | $15 / $60 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/openai/o1) · [docs](https://developers.openai.com/api/docs/models) | The latest and strongest model family from OpenAI, o1 is designed to spend more time thinking before responding. The o1 model series is… |
| `cohere/command-r7b-12-2024` | Cohere: Command R7B (12-2024) | 128K | text |  | $0.0375 / $0.15 per 1M tok | [OR](https://openrouter.ai/cohere/command-r7b-12-2024) · [docs](https://docs.cohere.com/docs/models) | Command R7B (12-2024) is a small, fast update of the Command R+ model, delivered in December 2024. It excels at RAG, tool use, agents, and… |
| `meta-llama/llama-3.3-70b-instruct` | Meta: Llama 3.3 70B Instruct | 131K | text | Y | $0.1 / $0.32 per 1M tok | [OR](https://openrouter.ai/meta-llama/llama-3.3-70b-instruct) · [docs](https://www.llama.com/docs/overview/) | The Meta Llama 3.3 multilingual large language model (LLM) is a pretrained and instruction tuned generative model in 70B (text in/text… |
| `amazon/nova-lite-v1` | Amazon: Nova Lite 1.0 | 300K | text | Y | $0.06 / $0.24 per 1M tok | [OR](https://openrouter.ai/amazon/nova-lite-v1) | Amazon Nova Lite 1.0 is a very low-cost multimodal model from Amazon that focused on fast processing of image, video, and text inputs to… |
| `amazon/nova-micro-v1` | Amazon: Nova Micro 1.0 | 128K | text | Y | $0.035 / $0.14 per 1M tok | [OR](https://openrouter.ai/amazon/nova-micro-v1) | Amazon Nova Micro 1.0 is a text-only model that delivers the lowest latency responses in the Amazon Nova family of models at a very low… |
| `amazon/nova-pro-v1` | Amazon: Nova Pro 1.0 | 300K | text | Y | $0.8 / $3.2 per 1M tok | [OR](https://openrouter.ai/amazon/nova-pro-v1) | Amazon Nova Pro 1.0 is a capable multimodal model from Amazon focused on providing a combination of accuracy, speed, and cost for a wide… |
| `openai/gpt-4o-2024-11-20` | OpenAI: GPT-4o (2024-11-20) | 128K | text | Y | $2.5 / $10 per 1M tok | [OR](https://openrouter.ai/openai/gpt-4o-2024-11-20) · [docs](https://developers.openai.com/api/docs/models) | The 2024-11-20 version of GPT-4o offers a leveled-up creative writing ability with more natural, engaging, and tailored writing to improve… |
| `qwen/qwen-2.5-coder-32b-instruct` | Qwen2.5 Coder 32B Instruct | 32K | text |  | $0.66 / $1 per 1M tok | [OR](https://openrouter.ai/qwen/qwen-2.5-coder-32b-instruct) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen2.5-Coder is the latest series of Code-Specific Qwen large language models (formerly known as CodeQwen). Qwen2.5-Coder brings the… |
| `thedrummer/unslopnemo-12b` | TheDrummer: UnslopNemo 12B | 1M | text |  | $0.4 / $0.4 per 1M tok | [OR](https://openrouter.ai/thedrummer/unslopnemo-12b) | UnslopNemo v4.1 is the latest addition from the creator of Rocinante, designed for adventure writing and role-play scenarios. |
| `anthracite-org/magnum-v4-72b` | Magnum v4 72B | 32K | text |  | $2.5 / $5 per 1M tok | [OR](https://openrouter.ai/anthracite-org/magnum-v4-72b) | This is a series of models designed to replicate the prose quality of the Claude 3 models, specifically… |
| `qwen/qwen-2.5-7b-instruct` | Qwen: Qwen2.5 7B Instruct | 32K | text | Y | $0.1 / $0.2 per 1M tok | [OR](https://openrouter.ai/qwen/qwen-2.5-7b-instruct) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen2.5 7B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2: - Significantly more… |
| `meta-llama/llama-3.2-1b-instruct` | Meta: Llama 3.2 1B Instruct | 60K | text |  | $0.027 / $0.201 per 1M tok | [OR](https://openrouter.ai/meta-llama/llama-3.2-1b-instruct) · [docs](https://www.llama.com/docs/overview/) | Llama 3.2 1B is a 1-billion-parameter language model focused on efficiently performing natural language tasks, such as summarization,… |
| `meta-llama/llama-3.2-3b-instruct` | Meta: Llama 3.2 3B Instruct | 131K | text |  | $0.05 / $0.33 per 1M tok | [OR](https://openrouter.ai/meta-llama/llama-3.2-3b-instruct) · [docs](https://www.llama.com/docs/overview/) | Llama 3.2 3B is a 3-billion-parameter multilingual large language model, optimized for advanced natural language processing tasks like… |
| `qwen/qwen-2.5-72b-instruct` | Qwen2.5 72B Instruct | 32K | text | Y | $0.36 / $0.4 per 1M tok | [OR](https://openrouter.ai/qwen/qwen-2.5-72b-instruct) · [docs](https://www.alibabacloud.com/help/en/model-studio/) | Qwen2.5 72B is the latest series of Qwen large language models. Qwen2.5 brings the following improvements upon Qwen2: - Significantly more… |
| `cohere/command-r-08-2024` | Cohere: Command R (08-2024) | 128K | text | Y | $0.15 / $0.6 per 1M tok | [OR](https://openrouter.ai/cohere/command-r-08-2024) · [docs](https://docs.cohere.com/docs/models) | command-r-08-2024 is an update of the [Command R](/models/cohere/command-r) with improved performance for multilingual retrieval-augmented… |
| `cohere/command-r-plus-08-2024` | Cohere: Command R+ (08-2024) | 128K | text | Y | $2.5 / $10 per 1M tok | [OR](https://openrouter.ai/cohere/command-r-plus-08-2024) · [docs](https://docs.cohere.com/docs/models) | command-r-plus-08-2024 is an update of the [Command R+](/models/cohere/command-r-plus) with roughly 50% higher throughput and 25% lower… |
| `sao10k/l3.1-euryale-70b` | Sao10K: Llama 3.1 Euryale 70B v2.2 | 131K | text | Y | $0.85 / $0.85 per 1M tok | [OR](https://openrouter.ai/sao10k/l3.1-euryale-70b) | Euryale L3.1 70B v2.2 is a model focused on creative roleplay from [Sao10k](https://ko-fi.com/sao10k). It is the successor of [Euryale L3… |
| `nousresearch/hermes-3-llama-3.1-70b` | Nous: Hermes 3 70B Instruct | 131K | text |  | $0.7 / $0.7 per 1M tok | [OR](https://openrouter.ai/nousresearch/hermes-3-llama-3.1-70b) | Hermes 3 is a generalist language model with many improvements over [Hermes 2](/models/nousresearch/nous-hermes-2-mistral-7b-dpo),… |
| `nousresearch/hermes-3-llama-3.1-405b` | Nous: Hermes 3 405B Instruct | 131K | text |  | $1 / $1 per 1M tok | [OR](https://openrouter.ai/nousresearch/hermes-3-llama-3.1-405b) | Hermes 3 is a generalist language model with many improvements over Hermes 2, including advanced agentic capabilities, much better… |
| `sao10k/l3-lunaris-8b` | Sao10K: Llama 3 8B Lunaris | 8K | text |  | $0.04 / $0.05 per 1M tok | [OR](https://openrouter.ai/sao10k/l3-lunaris-8b) | Lunaris 8B is a versatile generalist and roleplaying model based on Llama 3. It's a strategic merge of multiple models, designed to balance… |
| `openai/gpt-4o-2024-08-06` | OpenAI: GPT-4o (2024-08-06) | 128K | text | Y | $2.5 / $10 per 1M tok | [OR](https://openrouter.ai/openai/gpt-4o-2024-08-06) · [docs](https://developers.openai.com/api/docs/models) | The 2024-08-06 version of GPT-4o offers improved performance in structured outputs, with the ability to supply a JSON schema in the… |
| `meta-llama/llama-3.1-70b-instruct` | Meta: Llama 3.1 70B Instruct | 131K | text | Y | $0.4 / $0.4 per 1M tok | [OR](https://openrouter.ai/meta-llama/llama-3.1-70b-instruct) · [docs](https://www.llama.com/docs/overview/) | Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 70B instruct-tuned version is optimized for high… |
| `meta-llama/llama-3.1-8b-instruct` | Meta: Llama 3.1 8B Instruct | 131K | text | Y | $0.05 / $0.08 per 1M tok | [OR](https://openrouter.ai/meta-llama/llama-3.1-8b-instruct) · [docs](https://www.llama.com/docs/overview/) | Meta's latest class of model (Llama 3.1) launched with a variety of sizes & flavors. This 8B instruct-tuned version is fast and efficient.… |
| `mistralai/mistral-nemo` | Mistral: Mistral Nemo | 131K | text | Y | $0.019 / $0.03 per 1M tok | [OR](https://openrouter.ai/mistralai/mistral-nemo) · [docs](https://docs.mistral.ai/getting-started/models) | A 12B parameter model with a 128k token context length built by Mistral in collaboration with NVIDIA. The model is multilingual, supporting… |
| `openai/gpt-4o-mini` | OpenAI: GPT-4o-mini | 128K | text | Y | $0.15 / $0.6 per 1M tok | [OR](https://openrouter.ai/openai/gpt-4o-mini) · [docs](https://developers.openai.com/api/docs/models) | GPT-4o mini is OpenAI's newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs. As… |
| `openai/gpt-4o-mini-2024-07-18` | OpenAI: GPT-4o-mini (2024-07-18) | 128K | text | Y | $0.15 / $0.6 per 1M tok | [OR](https://openrouter.ai/openai/gpt-4o-mini-2024-07-18) · [docs](https://developers.openai.com/api/docs/models) | GPT-4o mini is OpenAI's newest model after [GPT-4 Omni](/models/openai/gpt-4o), supporting both text and image inputs with text outputs. As… |
| `google/gemma-2-27b-it` | Google: Gemma 2 27B | 8K | text |  | $0.65 / $0.65 per 1M tok | [OR](https://openrouter.ai/google/gemma-2-27b-it) · [docs](https://ai.google.dev/gemini-api/docs/models) | Gemma 2 27B by Google is an open model built from the same research and technology used to create the [Gemini models](/models?q=gemini).… |
| `openai/gpt-4o` | OpenAI: GPT-4o | 128K | text | Y | $2.5 / $10 per 1M tok | [OR](https://openrouter.ai/openai/gpt-4o) · [docs](https://developers.openai.com/api/docs/models) | GPT-4o ("o" for "omni") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence… |
| `openai/gpt-4o-2024-05-13` | OpenAI: GPT-4o (2024-05-13) | 128K | text | Y | $5 / $15 per 1M tok | [OR](https://openrouter.ai/openai/gpt-4o-2024-05-13) · [docs](https://developers.openai.com/api/docs/models) | GPT-4o ("o" for "omni") is OpenAI's latest AI model, supporting both text and image inputs with text outputs. It maintains the intelligence… |
| `mistralai/mixtral-8x22b-instruct` | Mistral: Mixtral 8x22B Instruct | 65K | text | Y | $2 / $6 per 1M tok | [OR](https://openrouter.ai/mistralai/mixtral-8x22b-instruct) · [docs](https://docs.mistral.ai/getting-started/models) | Mistral's official instruct fine-tuned version of [Mixtral 8x22B](/models/mistralai/mixtral-8x22b). It uses 39B active parameters out of… |
| `microsoft/wizardlm-2-8x22b` | WizardLM-2 8x22B | 65K | text |  | $0.62 / $0.62 per 1M tok | [OR](https://openrouter.ai/microsoft/wizardlm-2-8x22b) · [docs](https://learn.microsoft.com/azure/ai-services/) | WizardLM-2 8x22B is Microsoft AI's most advanced Wizard model. It demonstrates highly competitive performance compared to leading… |
| `openai/gpt-4-turbo` | OpenAI: GPT-4 Turbo | 128K | text | Y | $10 / $30 per 1M tok | [OR](https://openrouter.ai/openai/gpt-4-turbo) · [docs](https://developers.openai.com/api/docs/models) | The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling. Training data: up to… |
| `anthropic/claude-3-haiku` | Anthropic: Claude 3 Haiku | 200K | text | Y | $0.25 / $1.25 per 1M tok · web_search $0.01/call | [OR](https://openrouter.ai/anthropic/claude-3-haiku) · [docs](https://docs.anthropic.com/en/docs/about-claude/models) | Claude 3 Haiku is Anthropic's fastest and most compact model for near-instant responsiveness. Quick and accurate targeted performance. See… |
| `openai/gpt-3.5-turbo-0613` | OpenAI: GPT-3.5 Turbo (older v0613) | 4K | text | Y | $1 / $2 per 1M tok | [OR](https://openrouter.ai/openai/gpt-3.5-turbo-0613) · [docs](https://developers.openai.com/api/docs/models) | GPT-3.5 Turbo is OpenAI's fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional… |
| `openai/gpt-3.5-turbo-instruct` | OpenAI: GPT-3.5 Turbo Instruct | 4K | text |  | $1.5 / $2 per 1M tok | [OR](https://openrouter.ai/openai/gpt-3.5-turbo-instruct) · [docs](https://developers.openai.com/api/docs/models) | This model is a variant of GPT-3.5 Turbo tuned for instructional prompts and omitting chat-related optimizations. Training data: up to Sep… |
| `openai/gpt-3.5-turbo-16k` | OpenAI: GPT-3.5 Turbo 16k | 16K | text | Y | $3 / $4 per 1M tok | [OR](https://openrouter.ai/openai/gpt-3.5-turbo-16k) · [docs](https://developers.openai.com/api/docs/models) | This model offers four times the context length of gpt-3.5-turbo, allowing it to support approximately 20 pages of text in a single request… |
| `mancer/weaver` | Mancer: Weaver (alpha) | 8K | text |  | $0.4 / $0.75 per 1M tok | [OR](https://openrouter.ai/mancer/weaver) | An attempt to recreate Claude-style verbosity, but don't expect the same level of coherence or memory. Meant for use in roleplay/narrative… |
| `undi95/remm-slerp-l2-13b` | ReMM SLERP 13B | 6K | text |  | $0.35 / $0.65 per 1M tok | [OR](https://openrouter.ai/undi95/remm-slerp-l2-13b) | A recreation trial of the original MythoMax-L2-B13 but with updated models. #merge |
| `gryphe/mythomax-l2-13b` | MythoMax 13B | 8K | text |  | $0.08 / $0.11 per 1M tok | [OR](https://openrouter.ai/gryphe/mythomax-l2-13b) | One of the highest performing and most popular fine-tunes of Llama 2 13B, with rich descriptions and roleplay. #merge |
| `openai/gpt-3.5-turbo` | OpenAI: GPT-3.5 Turbo | 16K | text | Y | $0.5 / $1.5 per 1M tok | [OR](https://openrouter.ai/openai/gpt-3.5-turbo) · [docs](https://developers.openai.com/api/docs/models) | GPT-3.5 Turbo is OpenAI's fastest model. It can understand and generate natural language or code, and is optimized for chat and traditional… |
| `openai/gpt-4` | OpenAI: GPT-4 | 8K | text | Y | $30 / $60 per 1M tok | [OR](https://openrouter.ai/openai/gpt-4) · [docs](https://developers.openai.com/api/docs/models) | OpenAI's flagship model, GPT-4 is a large-scale multimodal language model capable of solving difficult problems with greater accuracy than… |
