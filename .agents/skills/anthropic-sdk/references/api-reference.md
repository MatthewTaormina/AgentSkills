# Anthropic Messages API Reference

## 1. Client Configuration

```typescript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey?: string,               // Defaults to process.env['ANTHROPIC_API_KEY']
  baseURL?: string,              // Custom base URL (default: 'https://api.anthropic.com')
  timeout?: number,              // Request timeout in milliseconds (default: 10 minutes)
  maxRetries?: number,           // Number of retries on 408, 429, or 5xx (default: 2)
  defaultHeaders?: Record<string, string>,
});
```

---

## 2. `client.messages.create(params)` Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `model` | `string` | Yes | Model ID (e.g. `'claude-3-7-sonnet-20250219'`, `'claude-3-5-sonnet-20241022'`) |
| `messages` | `Array<MessageParam>` | Yes | Alternating `user` and `assistant` messages |
| `max_tokens` | `number` | Yes | Max tokens to generate. Set to `0` to pre-warm prompt cache |
| `system` | `string \| Array<TextBlockParam>` | No | System prompt or cacheable system blocks |
| `thinking` | `{ type: 'enabled' \| 'adaptive', budget_tokens: number }` | No | Extended thinking configuration |
| `tools` | `Array<Tool>` | No | Tools available for model to invoke |
| `tool_choice` | `{ type: 'auto' \| 'any' \| 'tool', name?: string }` | No | Tool selection constraint |
| `stream` | `boolean` | No | Enable SSE streaming |
| `temperature` | `number` | No | Sampling temperature (0.0 to 1.0). Disabled when `thinking` is enabled |
| `stop_sequences` | `Array<string>` | No | Custom stop sequences |
| `cache_control` | `{ type: 'ephemeral' }` | No | Top-level cache control marker |

---

## 3. Content Block Types

Responses return `content: Array<ContentBlock>`:

* `type: 'text'`: `{ type: 'text', text: string }`
* `type: 'thinking'`: `{ type: 'thinking', thinking: string, signature: string }`
* `type: 'tool_use'`: `{ type: 'tool_use', id: string, name: string, input: Record<string, any> }`
* `type: 'image'`: Input block with `{ type: 'image', source: { type: 'base64', media_type, data } }`
* `type: 'tool_result'`: Input block with `{ type: 'tool_result', tool_use_id, content, is_error?: boolean }`

---

## 4. Prompt Caching Structure & Limits

- Cache breakpoint marker: `cache_control: { type: 'ephemeral' }`
- Maximum active cache breakpoints per request: 4
- Cache lifetime: 5 minutes TTL (refreshed on each cache hit)
- Minimum tokens per cached block:
  - Claude 3.7 / 3.5 Sonnet: 1,024 tokens
  - Claude 3.5 Haiku: 2,048 tokens
- Usage tracking fields:
  - `response.usage.cache_creation_input_tokens`
  - `response.usage.cache_read_input_tokens`
  - `response.usage.input_tokens`
  - `response.usage.output_tokens`
