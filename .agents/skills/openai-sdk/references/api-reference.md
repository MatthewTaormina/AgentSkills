# OpenAI SDK API Reference

## 1. Client Configuration

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey?: string,               // Defaults to process.env['OPENAI_API_KEY']
  organization?: string,         // Defaults to process.env['OPENAI_ORG_ID']
  project?: string,              // Defaults to process.env['OPENAI_PROJECT_ID']
  baseURL?: string,              // Custom base URL (e.g. for proxies, Azure, or local gateways)
  timeout?: number,              // Request timeout in milliseconds (default: 10 minutes)
  maxRetries?: number,           // Number of retries on 408, 429, or 5xx (default: 2)
});
```

---

## 2. Parameter Comparison: Responses API vs Chat Completions

| Feature | `client.responses.create` | `client.chat.completions.create` |
| :--- | :--- | :--- |
| **Model** | `model: string` | `model: string` |
| **Input** | `input: string \| Array<Item>` | `messages: Array<ChatCompletionMessageParam>` |
| **System Prompt** | `instructions: string` | `{ role: 'system' \| 'developer', content: string }` |
| **Built-in Tools** | `web_search_preview`, `code_interpreter` | Must declare manual function or use Assistants |
| **Statefulness** | `conversation: string`, `store: boolean` | Stateless; user passes full `messages` array |
| **Output Access** | `response.output_text` or `response.output` | `response.choices[0].message.content` |
| **Streaming** | `client.responses.stream({ ... })` | `client.chat.completions.create({ stream: true })` |

---

## 3. Strict Structured Outputs Rules

When using `strict: true` in `response_format` or tools:
1. `additionalProperties: false` is required on all object schemas.
2. Every declared property must be listed in `required`. For optional fields, include `null` in the type union (e.g. `type: ['string', 'null']`).
3. Root schema must be an `object`.
4. Recursive schemas are supported with `$ref`.

---

## 4. Error Handling Standard

```typescript
import OpenAI from 'openai';

try {
  await client.chat.completions.create({ ... });
} catch (error) {
  if (error instanceof OpenAI.APIError) {
    console.error('Status:', error.status);   // e.g. 401, 429, 500
    console.error('Message:', error.message);
    console.error('Code:', error.code);       // e.g. 'insufficient_quota'
    console.error('Type:', error.type);
  } else {
    throw error;
  }
}
```
