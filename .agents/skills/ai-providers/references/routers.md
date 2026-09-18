# AI routers and gateways (September 2026)

Routers sit **in front of** labs and inference hosts. Integration code for OpenRouter + EUrouter lives in [ai-routers](../../ai-routers/SKILL.md). This file is the landscape.

Almost all of these are **OpenAI-compatible**: change `baseURL` + API key.

## Decision matrix

| Need | Pick |
| :--- | :--- |
| Broadest hosted catalog, pin/exclude providers, `models:` fallback | **OpenRouter** |
| EU/EEA processing + GDPR knobs on the request | **EUrouter** |
| Already on Vercel / AI SDK, zero token markup | **Vercel AI Gateway** |
| Self-host proxy, virtual keys, 100+ providers, no per-call fee | **LiteLLM** |
| Managed gateway + guardrails + configs | **Portkey** (Prisma AIRS AI Gateway) |
| Observability-first, 0% markup, optional credits | **Helicone AI Gateway** |
| Already run Kong | **Kong AI Gateway** |
| Already on Cloudflare | **Cloudflare AI Gateway** (retries/cache at edge) |
| VPC / air-gap / self-hosted models + SaaS labs | **TrueFoundry** |
| Another hosted OpenRouter-class marketplace | **Requesty** |
| Open-source data plane (APISIX lineage / AISIX) | **AISIX** / Apache APISIX AI plugins |

---

## OpenRouter

- **Site / docs:** https://openrouter.ai/docs · API overview https://openrouter.ai/docs/api_reference/overview
- **OpenAPI:** https://openrouter.ai/openapi.json
- **Base URL:** `https://openrouter.ai/api/v1` · **Env:** `OPENROUTER_API_KEY`
- **Optional headers:** `HTTP-Referer`, `X-Title`
- **Catalog:** 400–500+ models, 70+ providers (88 volume rows in Sep 2026). Live list: https://openrouter.ai/models
- **Routing:** Default load-balance by price/uptime; `provider` object (order, ignore, quantizations, ZDR, latency percentiles); `models: [...]` fallback chain; `openrouter/auto` (and auto-beta) task routing.
- **BYOK:** Yes for most providers.
- **Pricing model:** Pass-through token prices. Revenue commonly described as **5.5% fee on credit purchases** (not a per-token markup on BYOK in recent comparisons). Helicone contrasts this as “5.5% markup” vs their 0% — treat as **credit-purchase fee**; re-read OpenRouter billing docs before a cost model.
- **Residency:** Global. Not an EU-sovereign router.
- **When:** Fastest way to reach many labs + hosts with failover. Stripe-era hosted marketplace.
- **Also:** `GET /api/v1/providers`, `GET /api/v1/models`. Provider compare UI: https://openrouter.ai/providers/compare

---

## EUrouter (EuroRouter)

- **Docs:** https://www.eurouter.ai/docs · Models: https://www.eurouter.ai/models · DPA: https://www.eurouter.live/dpa
- **Base URL:** `https://api.eurouter.ai/api/v1` (docs curl). Some clients use `https://api.eurouter.ai/v1` — **match the current docs**. **Env:** `EUROUTER_API_KEY`
- **Legal:** EUrouter B.V., Amsterdam (KVK 42054357).
- **Catalog:** ~147 models (Sep 2026 models page) through EU infrastructure.
- **Routing:** Smart routing + failover. Request filters: `data_residency`, `eu_owned`, `max_retention_days: 0`, `data_collection: "deny"`.
- **Retention:** Router default is **no storage** of prompts/outputs after completion. **Upstream provider policy still applies** — filter providers.
- **Observability:** Traces to Langfuse, Datadog, PostHog, LangWatch, OTLP; privacy mode strips content.
- **When:** GDPR / EU AI Act / “traffic must not leave the EEA” as a product requirement. Not a substitute for reviewing each selected lab.

Example model prices on the public models page (Sep 2026, per 1M): DeepSeek V3.2 $0.30 / $0.50; Kimi K2.6 $0.66 / $3.50; Gemma 4 $0.10 / $0.35. Re-fetch https://www.eurouter.ai/models.

---

## LiteLLM

- **Docs:** https://docs.litellm.ai · Providers: https://docs.litellm.ai/docs/providers
- **Form:** Python SDK **or** self-hosted **Proxy** (`http://localhost:4000` OpenAI-compat).
- **Fit:** Widest provider translation layer (chat, responses, embeddings, images, audio, batches). Virtual keys, budgets, fallbacks, spend logs. **You** hold upstream keys. Cost is infra, not a marketplace fee.
- **When:** Platform team wants one internal endpoint in VPC. Pair with Helicone/Langfuse for traces if needed.

---

## Portkey

- **Docs:** https://portkey.ai/docs/product/ai-gateway · **Base URL:** `https://api.portkey.ai/v1`
- **Auth:** `x-portkey-api-key` (and/or virtual keys). Gateway configs define retries, targets, guardrails, semantic cache.
- **Self-host:** `npx @portkey-ai/gateway` / open-source gateway + control plane.
- **When:** Enterprise routing + guardrails without building LiteLLM policies from scratch. Comparisons quote paid plans from ~$49/mo (verify current pricing). Rebrand notes: “PRISMA AIRS AI Gateway” may appear in docs.

---

## Vercel AI Gateway

- **Docs:** https://vercel.com/docs/ai-gateway · **Base URL:** `https://ai-gateway.vercel.sh/v1`
- **Env:** `VERCEL_AI_GATEWAY_API_KEY` (or OIDC on Vercel)
- **Fit:** Native to AI SDK / Next.js. Hundreds of models, automatic fallbacks, **zero token markup** (including BYOK on paid tier per 2026 comparisons). Not self-hosted.
- **When:** The app already lives on Vercel and the model shortlist is known.

---

## Cloudflare AI Gateway

- **Docs:** https://developers.cloudflare.com/ai-gateway/
- **Fit:** Edge cache, analytics, rate limits, logging. Since Apr 2026, automatic retries on transient errors; **cross-provider failover** needs Dynamic Routing configured.
- **When:** Traffic already on Cloudflare. This is a **proxy in front of your chosen providers**, not a 400-model marketplace by itself. (Cloudflare also sells **Workers AI** models — [cloud-platforms.md](cloud-platforms.md).)

---

## Helicone

- **Docs:** https://docs.helicone.ai/gateway/overview
- **AI Gateway:** `https://ai-gateway.helicone.ai` (SDK often `/v1`) · **Env:** `HELICONE_API_KEY`
- **Legacy proxy:** `https://gateway.helicone.ai` + `Helicone-Target-Url`
- **Fit:** Unified API to 100+ providers, **0% markup**, sessions, prompts, cache, rate limits, security. Credits (Helicone holds provider keys) or BYOK. Open source.
- **When:** Observability and cost attribution are the product requirement; routing is included.

---

## Kong AI Gateway

- **Docs:** https://developer.konghq.com/ai-gateway/
- **Fit:** AI Proxy / AI Proxy Advanced plugins (`route_type: llm/v1/chat`, per-provider configs including `xai`, OpenAI, Anthropic, Bedrock, …). Lives in existing Kong/Konnect estates.
- **When:** API platform team already operates Kong. Not a consumer marketplace.

---

## Requesty

- **Base URL:** `https://router.requesty.ai/v1` (migration guides vs OpenRouter)
- **Fit:** Hosted OpenAI-compat router with org policies and region selection. No self-host (TrueFoundry comparison, 2026).
- **When:** Alternative hosted marketplace if OpenRouter commercial terms do not fit.

---

## TrueFoundry AI Gateway

- **Docs:** https://www.truefoundry.com/docs/ai-gateway/making-llm-requests-via-gateway
- **SaaS base:** `https://gateway.truefoundry.ai` · self-host URL from Playground
- **Auth:** PAT (dev) or VAT (prod) — developers do not hold upstream keys.
- **Fit:** SaaS **and** VPC/air-gap; mix Bedrock/OpenAI with self-hosted Llama on your GPUs; MCP gateway; HIPAA positioning.
- **When:** Regulated enterprise control plane, not a hobby one-key catalog.

---

## AISIX / Apache APISIX

- **AISIX:** Rust AI gateway (APISIX lineage; self-host in VPC; semantic routing / ensemble called out in 2026 gateway roundups). Confirm current docs at the vendor site before pinning a base URL.
- **Apache APISIX:** AI proxy plugins; you deploy the gateway; `api_base` points at OpenRouter or a lab.
- **When:** You want an **open data plane** you run, not a hosted catalog.

---

## Anti-patterns

- Do not treat “EU HQ” (Mistral, Nebius, NextBit) as equivalent to **EUrouter request-path residency**.
- Do not assume OpenRouter ZDR flags apply when you call a lab **directly**.
- Do not stack three gateways “for safety” (LiteLLM → OpenRouter → Helicone is a valid **observability** stack; LiteLLM → Portkey → OpenRouter is usually accidental latency).
- For implementation samples of OpenRouter/EUrouter clients, use [ai-routers](../../ai-routers/SKILL.md).
