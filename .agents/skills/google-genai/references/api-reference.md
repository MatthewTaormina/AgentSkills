# Google Gen AI SDK API Reference

## 1. Client Configuration

```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey?: string,               // API key for Gemini Developer API
  vertexai?: boolean,            // Set true for Google Cloud Vertex AI
  project?: string,              // GCP Project ID (required for Vertex AI)
  location?: string,             // GCP Region (e.g. 'us-central1')
  apiVersion?: string,           // Optional API version override
  httpOptions?: {
    baseUrl?: string,
    timeout?: number,
    headers?: Record<string, string>,
  }
});
```

---

## 2. `ai.models.generateContent(params)` Parameters

| Field | Type | Description |
| :--- | :--- | :--- |
| `model` | `string` | Model ID (e.g. `'gemini-2.5-flash'`, `'gemini-2.5-pro'`) |
| `contents` | `string \| Part \| Content \| Array<...>` | The prompt input(s), text, images, or conversation turns |
| `config.systemInstruction` | `string \| Content` | Developer/system prompt to steer behavior |
| `config.temperature` | `number` | Sampling temperature (0.0 to 2.0) |
| `config.topP` | `number` | Nucleus sampling probability cutoff |
| `config.topK` | `number` | Top-k sampling candidate count |
| `config.maxOutputTokens` | `number` | Maximum tokens in generated completion |
| `config.stopSequences` | `string[]` | Up to 5 custom stop sequences |
| `config.responseMimeType` | `string` | `'text/plain'` (default) or `'application/json'` |
| `config.responseSchema` | `Schema` | OpenAPI-compatible schema (use `Type` enum) |
| `config.thinkingConfig` | `ThinkingConfig` | `{ thinkingBudget: number, includeThoughts: boolean }` |
| `config.tools` | `Tool[]` | Function declarations, `googleSearch: {}`, `codeExecution: {}`. Put built-in tools and `functionDeclarations` on the **same** `Tool` when combining them. |
| `config.toolConfig` | `ToolConfig` | Function calling mode (`AUTO`, `ANY`, `NONE`). When combining Google Search (or other built-in tools) with function calling, set `includeServerSideToolInvocations: true`. |
| `config.cachedContent` | `string` | Resource name of cached context |
| `config.safetySettings` | `SafetySetting[]` | Threshold overrides for hate speech, harassment, etc. |

---

## 3. Supported `Type` Enum Values for Schemas

Exported from `@google/genai`:
- `Type.STRING`: Text string
- `Type.NUMBER`: Double / float number
- `Type.INTEGER`: Integer number
- `Type.BOOLEAN`: Boolean true/false
- `Type.ARRAY`: Array of items (define `items: { type: ... }`)
- `Type.OBJECT`: Object with `properties` and `required` list
- `Type.NULL`: Null value

---

## 4. Response Shape (`GenerateContentResponse`)

```typescript
const response = await ai.models.generateContent({ ... });

// 1. Extracted text from first candidate
console.log(response.text);

// 2. Extracted function calls (if tools were invoked)
if (response.functionCalls) {
  for (const call of response.functionCalls) {
    console.log(call.name, call.args);
  }
}

// 3. Raw candidates inspection
const candidate = response.candidates?.[0];
console.log(candidate?.finishReason); // 'STOP', 'MAX_TOKENS', 'SAFETY', etc.

// 4. Token usage metadata
console.log(response.usageMetadata?.promptTokenCount);
console.log(response.usageMetadata?.candidatesTokenCount);
console.log(response.usageMetadata?.totalTokenCount);
```
