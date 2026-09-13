# Generic Models API Reference: Dynamic Model Discovery Across Providers

Most major LLM providers implement a **Models Discovery API** (typically exposed as `GET /v1/models` over REST and `client.models.list()` in official SDKs). This endpoint allows applications to programmatically fetch available models for an authenticated account, verify capabilities, inspect context limits, and detect deprecation dates.

---

## 1. Provider Endpoint & Method Matrix

| Provider / Router | REST Endpoint | SDK Method | Key Metadata Returned |
| :--- | :--- | :--- | :--- |
| **OpenAI** | `GET https://api.openai.com/v1/models` | `client.models.list()` | `id`, `created`, `owned_by`, `shutdown_date` |
| **Google Gen AI** | `GET https://generativelanguage.googleapis.com/v1beta/models` | `ai.models.list()` | `name`, `displayName`, `inputTokenLimit`, `outputTokenLimit`, `supportedGenerationMethods` |
| **Anthropic** | `GET https://api.anthropic.com/v1/models` | `client.models.list()` | `id`, `display_name`, `max_input_tokens`, `max_tokens`, `capabilities` |
| **xAI (Grok)** | `GET https://api.x.ai/v1/models` | `client.models.list()` | `id`, `created`, `owned_by` |
| **Mistral AI** | `GET https://api.mistral.ai/v1/models` | `client.models.list()` | `id`, `capabilities` (`completion_chat`, `completion_fim`, `function_calling`, `vision`) |
| **OpenRouter** | `GET https://openrouter.ai/api/v1/models` | `client.models.list()` or REST | `id`, `name`, `context_length`, `pricing: { prompt, completion }`, `top_provider` |
| **EuroRouter** | `GET https://api.eurouter.ai/v1/models` | `client.models.list()` | `id`, `owned_by`, EU-residency verified model list |

---

## 2. Response Structure Comparison

### A. OpenAI & Compatible Gateways (xAI, EuroRouter)
```json
{
  "object": "list",
  "data": [
    {
      "id": "gpt-6-astra",
      "object": "model",
      "created": 1729000000,
      "owned_by": "system",
      "shutdown_date": null
    }
  ]
}
```

### B. Google Gen AI (`@google/genai`)
```json
{
  "models": [
    {
      "name": "models/gemini-3.8-flash",
      "displayName": "Gemini 3.8 Flash",
      "description": "State-of-the-art model for autonomous agentic workflows and coding",
      "inputTokenLimit": 1000000,
      "outputTokenLimit": 65536,
      "supportedGenerationMethods": ["generateContent", "countTokens"]
    }
  ]
}
```

### C. Anthropic (`@anthropic-ai/sdk`)
```json
{
  "data": [
    {
      "id": "claude-sonnet-5",
      "type": "model",
      "display_name": "Claude Sonnet 5",
      "created_at": "2026-06-20T00:00:00Z",
      "max_input_tokens": 1000000,
      "max_tokens": 128000,
      "capabilities": {
        "thinking": true
      }
    }
  ],
  "has_more": false
}
```

### D. OpenRouter (`/api/v1/models`)
```json
{
  "data": [
    {
      "id": "anthropic/claude-sonnet-5",
      "name": "Anthropic: Claude Sonnet 5",
      "context_length": 1000000,
      "pricing": {
        "prompt": "0.000002",
        "completion": "0.000010"
      },
      "architecture": {
        "modality": "text+image->text",
        "tokenizer": "Claude"
      },
      "top_provider": {
        "max_completion_tokens": 128000,
        "is_moderated": true
      }
    }
  ]
}
```

---

## 3. Unified Cross-Provider Model Fetcher (TypeScript)

Use this pattern to dynamically populate UI dropdowns or pre-validate models regardless of provider:

```typescript
export interface UnifiedModelInfo {
  id: string;
  name: string;
  provider: 'openai' | 'google' | 'anthropic' | 'xai' | 'mistral' | 'openrouter' | 'eurouter';
  contextWindow?: number;
  maxOutputTokens?: number;
}

export async function fetchAvailableModels(
  provider: UnifiedModelInfo['provider'],
  apiKey: string,
  baseURL?: string
): Promise<UnifiedModelInfo[]> {
  switch (provider) {
    case 'openai':
    case 'xai':
    case 'eurouter': {
      const OpenAI = (await import('openai')).default;
      const client = new OpenAI({ apiKey, baseURL });
      const list = await client.models.list();
      const models: UnifiedModelInfo[] = [];
      for await (const m of list) {
        models.push({ id: m.id, name: m.id, provider });
      }
      return models;
    }

    case 'google': {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey });
      const pager = await ai.models.list();
      const models: UnifiedModelInfo[] = [];
      for await (const m of pager) {
        const id = m.name?.replace(/^models\//, '') || '';
        models.push({
          id,
          name: m.displayName || id,
          provider: 'google',
          contextWindow: m.inputTokenLimit,
          maxOutputTokens: m.outputTokenLimit,
        });
      }
      return models;
    }

    case 'anthropic': {
      const Anthropic = (await import('@anthropic-ai/sdk')).default;
      const client = new Anthropic({ apiKey });
      const list = await client.models.list();
      const models: UnifiedModelInfo[] = [];
      for await (const m of list) {
        models.push({
          id: m.id,
          name: m.display_name,
          provider: 'anthropic',
          contextWindow: m.max_input_tokens ?? undefined,
          maxOutputTokens: m.max_tokens ?? undefined,
        });
      }
      return models;
    }

    case 'openrouter': {
      const res = await fetch('https://openrouter.ai/api/v1/models', {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const data = (await res.json()) as { data: Array<{ id: string; name: string; context_length: number }> };
      return data.data.map((m) => ({
        id: m.id,
        name: m.name,
        provider: 'openrouter',
        contextWindow: m.context_length,
      }));
    }

    case 'mistral': {
      const { Mistral } = await import('@mistralai/mistralai');
      const client = new Mistral({ apiKey });
      const res = await client.models.list();
      return (res.data || []).map((m) => ({
        id: m.id,
        name: m.id,
        provider: 'mistral',
      }));
    }
  }
}
```
