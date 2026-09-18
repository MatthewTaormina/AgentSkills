---
name: ai-providers
description: >-
  Knowledgebase of current AI API providers and models (chat/agent, image, video, music/speech),
  documentation links, pricing, privacy/retention, and routers/gateways. Use when selecting models
  or vendors, comparing OpenAI, Anthropic, Google, Mistral, DeepSeek, xAI/SpaceXAI, Groq, Together,
  Fireworks, Vertex, Bedrock, Azure, OpenRouter, EUrouter, LiteLLM, Portkey, Sora, Veo, FLUX, Lyria,
  Kling, Runway, or when the user asks which model to use for chat, agents, image, video, or music.
---

# AI Providers Knowledgebase

Catalog of **first-party labs**, **cloud platforms**, **inference hosts**, **specialized APIs**, and **routers/gateways**. Snapshot dated **September 2026**.

This skill is for **selection and comparison**. For SDK code, use the vendor skill:

| Topic | Skill |
| :--- | :--- |
| OpenAI Responses / Chat Completions | [openai-sdk](../openai-sdk/SKILL.md) |
| Anthropic Messages / Claude | [anthropic-sdk](../anthropic-sdk/SKILL.md) |
| Gemini / Vertex via Gen AI SDK | [google-genai](../google-genai/SKILL.md) |
| Mistral / Codestral | [mistral-sdk](../mistral-sdk/SKILL.md) |
| Cohere Command / Embed / Rerank | [cohere-sdk](../cohere-sdk/SKILL.md) |
| DeepSeek OpenAI-compat | [deepseek-sdk](../deepseek-sdk/SKILL.md) |
| OpenRouter / EUrouter integration | [ai-routers](../ai-routers/SKILL.md) |

## Freshness rule

Prices, model IDs, and retention policies change without notice.

1. Treat numbers in this skill as a **dated snapshot** (Sep 2026).
2. Before quoting a production price or pinning a model ID, re-fetch the **official pricing/docs URL** in the provider entry.
3. Prefer the **vendor’s own docs** over OpenRouter for first-party APIs. Prefer OpenRouter’s live listing for *which hosts currently serve a model*.
4. Do not invent model IDs from training memory. If this catalog and a live page disagree, use the live page.

Live marketplace: [OpenRouter Providers](https://openrouter.ai/providers) · [OpenRouter Models](https://openrouter.ai/models)

## When to use which path

```
Need first-party features (Responses, Computer Use, native tools, enterprise DPA)
  → Call the lab or its cloud SKU (Azure / Vertex / Bedrock).

Need lowest latency on open weights
  → Groq (LPU) or Cerebras (wafer-scale); SambaNova for high TPS.

Need cheapest tokens on a popular open model
  → Compare DeepInfra, Novita, SiliconFlow, Parasail on OpenRouter for that model ID.

Need one key, many labs, automatic failover
  → Hosted router: OpenRouter (global), EUrouter (EU residency), Vercel AI Gateway (Vercel apps).

Need VPC, virtual keys, budgets, guardrails on *your* provider keys
  → Self-hosted / enterprise gateway: LiteLLM, Portkey, Kong, TrueFoundry.

Need a chat / coding / tool-calling agent
  → chat-agent-models.md (GPT-6, Claude 5, Gemini 3.x, Grok, DeepSeek, Kimi, GLM, …).

Need image generation or editing
  → image-models.md (GPT Image, FLUX.2, Nano Banana, Recraft, Seedream, Grok Imagine, Krea).

Need video generation
  → video-models.md (Sora 2 Pro, Veo 3.1, Runway, Kling, Hailuo, Wan, Seedance, HeyGen).

Need music or speech
  → audio-music-models.md (Lyria 3 music; Fish/MiniMax/Qwen/Deepgram TTS; gpt-audio; ASR).
```

## Privacy cheat sheet (OpenRouter-reported, Sep 2026)

OpenRouter’s provider table is the fastest policy filter. Confirm on the vendor’s own privacy page before a regulated workload.

| Policy | Typical meaning | Examples in this catalog |
| :--- | :--- | :--- |
| **Zero retention** | Provider states prompts are not kept after inference | Groq, Together, Fireworks, DeepInfra, Vertex (as listed), Azure, Bedrock, Cerebras, Phala |
| **30-day retention** | Logs kept ~30 days | Anthropic, Mistral, Meta, SpaceXAI/xAI, Cohere, Claude on AWS |
| **Retains prompts** | Longer or unspecified retention | OpenAI, DeepSeek, NVIDIA, Google AI Studio (55 days), MiniMax |
| **Trains = Yes** | May train on API data (OpenRouter flag) | NVIDIA, DeepSeek, Thinking Machines, Liquid |
| **BYOK** | Bring-your-own-key on OpenRouter | Most high-volume hosts; some small hosts are No |

EU/EEA HQ on the live table includes **Mistral (France)**, **Nebius (Netherlands)**, **NextBit (Spain)**, **Inceptron (Sweden)**. HQ ≠ data residency. For GDPR routing, use [EUrouter](https://www.eurouter.ai/docs) and still filter providers.

Full table: [providers-index.md](references/providers-index.md)

## Reference files

**By modality (start here for “which model?”):**

- [chat-agent-models.md](references/chat-agent-models.md) — agent/chat models with about-text, context, tools, pricing, OpenRouter + vendor links
- [image-models.md](references/image-models.md) — image generation/editing
- [video-models.md](references/video-models.md) — video generation
- [audio-music-models.md](references/audio-music-models.md) — music (Lyria), TTS, realtime audio, transcription

**By provider / host:**

- [providers-index.md](references/providers-index.md) — every OpenRouter-listed provider (slug, HQ, trains, retention, BYOK, volume, model count)
- [models-by-provider.md](references/models-by-provider.md) — complete OpenRouter model ID list per lab, cloud, and host
- [labs.md](references/labs.md) — first-party model creators
- [cloud-platforms.md](references/cloud-platforms.md) — Azure, Bedrock, Vertex, Alibaba, Tencent, Baidu, Cloudflare, GPU clouds
- [inference-hosts.md](references/inference-hosts.md) — Groq, Together, Fireworks, DeepInfra, Cerebras, and other hosts
- [specialized.md](references/specialized.md) — embeddings, apply/morph, confidential inference (image/video/speech details live in the modality files)
- [routers.md](references/routers.md) — OpenRouter, EUrouter, LiteLLM, Portkey, Vercel, Cloudflare, Kong, Helicone, Requesty, TrueFoundry, AISIX

When the user asks **which models a provider hosts** or **which model for chat/image/video/music**, read the matching file above. Do not guess IDs from memory.

## Entry template (used in grouped files)

Each researched provider records: OpenRouter slug, HQ/policy, official docs + pricing URLs, API base URL / env var, **OpenRouter model IDs**, a **dated** flagship price snapshot, and when to pick it.
