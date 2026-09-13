# DeepSeek Currently Available Models Catalog (September 2026)

> [!CRITICAL]
> **MODEL SELECTION DIRECTIVE**:
> **ALWAYS defer to this catalog for DeepSeek model names.**
> **DO NOT use** `deepseek-chat` or `deepseek-reasoner` (retired 24 Jul 2026). Prefer **`deepseek-flash`**.

Base URL (OpenAI format): `https://api.deepseek.com`  
Base URL (Anthropic format): `https://api.deepseek.com/anthropic`  
Env var: `DEEPSEEK_API_KEY`

---

## 1. Active models

| API Identifier | Underlying | Context | Max output | Vision | Thinking | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`deepseek-flash`** | DeepSeek-V4.1-Flash | 1,000,000 | 384,000 | Yes | Yes (toggle) | **Default for all new work.** JSON, tools, Responses API, Anthropic API, FIM (non-thinking only). |
| `deepseek-v4-pro` | Routed to V4.1-Flash | 1,000,000 | 384,000 | (via Flash) | Yes | From **14 Sep 2026 04:00 UTC**, requests route to Flash and are billed at Flash rates until V4.1-Pro ships. Prefer `deepseek-flash` instead of this id. |

Compatibility aliases still accepted but retired under the hood:

| Alias | Behavior |
| :--- | :--- |
| `deepseek-v4-flash` | Served by V4.1-Flash at Flash price. Prefer `deepseek-flash`. |
| `deepseek-v4-flash-vision-exp` | Served by V4.1-Flash at Flash price. Prefer `deepseek-flash` (vision is native). |

---

## 2. Retired — never use

| Identifier | Status |
| :--- | :--- |
| `deepseek-chat` | Retired 24 Jul 2026. Hard failure. |
| `deepseek-reasoner` | Retired 24 Jul 2026. Hard failure. |

Reasoning is now `model: "deepseek-flash"` plus `thinking: { "type": "enabled" }` (optional `reasoning_effort`).

---

## 3. Thinking mode

| Field | Values | Notes |
| :--- | :--- | :--- |
| `thinking.type` | `enabled` \| `disabled` | Controls chain-of-thought. Default on the API is thinking-enabled for Flash unless you disable it. |
| `reasoning_effort` | e.g. `high` | Optional extra control when thinking is enabled. |

In the OpenAI Node SDK, pass these via `extra_body` (they are DeepSeek extensions, not core OpenAI params).

---

## 4. Gateway defaults

When calling CCTV Studio `POST /chat` with `provider: "deepseek"`, use `model: "deepseek-flash"`. Optional body fields `thinking` and `reasoning_effort` are forwarded to the DeepSeek API. Streaming is not implemented on the gateway yet.
