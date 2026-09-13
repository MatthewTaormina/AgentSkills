# AI Model Routers: OpenRouter vs EuroRouter (EUrouter)

| Dimension | **OpenRouter** (`openrouter.ai`) | **EuroRouter / EUrouter** (`eurouter.ai`) |
| :--- | :--- | :--- |
| **Primary Mission** | Global unified AI marketplace & intelligent auto-routing. (Acquired by Stripe). | Sovereign, European GDPR-compliant AI gateway ensuring EU data residency. |
| **Base URL** | `https://openrouter.ai/api/v1` | `https://api.eurouter.ai/v1` (or `https://api.eurouter.live/api/v1`) |
| **SDK Support** | OpenAI-compatible (`openai` package), `@openrouter/ai-sdk-provider`. | OpenAI-compatible (`openai` package, LangChain, LlamaIndex). |
| **Data Residency** | Global (routes across US, EU, and global regional cloud providers). | Strictly European Union member state infrastructure. |
| **Compliance** | Standard enterprise agreements, HIPAA, Zero-Retention opt-in. | Native GDPR, EU AI Act alignment, default Zero Data Retention (ZDR). |
| **Model Availability** | 300+ models (OpenAI, Anthropic, Google Gemini, Meta Llama, Mistral, xAI, DeepSeek, etc.). | Curated selection of 100+ EU-sovereign models & EU-hosted open weights. |
| **Dynamic Routing** | `openrouter/auto` (analyzes prompt complexity and cost tier). | Provider-level routing pinned to EU region hosts. |
| **Reliability & Failover** | Multi-model fallback arrays (`models: [...]`) and automatic 30s provider failover. | High availability across European data centers (Scaleway, OVH, Hetzner). |
| **Headers** | `HTTP-Referer`, `X-Title`, `X-OpenRouter-Metadata: enabled`. | Standard `Authorization: Bearer eur-...`. |
