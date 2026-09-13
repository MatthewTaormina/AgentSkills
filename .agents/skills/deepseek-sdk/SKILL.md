---
name: deepseek-sdk
description: >-
  Official guide for developing with the DeepSeek API using the OpenAI-compatible SDK
  (openai npm / openai PyPI) at https://api.deepseek.com. Use when implementing deepseek-flash
  (V4.1-Flash), thinking mode, reasoning_effort, vision, tool calls, FIM, or migrating off
  retired deepseek-chat / deepseek-reasoner aliases.
---

# DeepSeek SDK Skill

> [!CRITICAL]
> **MANDATORY DIRECTIVE: DEFER TO DOCUMENTED MODEL CATALOG**
> **DO NOT rely on internal training knowledge for DeepSeek model selection.**
> **ALWAYS consult the active catalog: [DeepSeek Models Catalog](./references/models.md).**
> The current production model is **`deepseek-flash`** (DeepSeek-V4.1-Flash).
> Do **not** use retired aliases `deepseek-chat` or `deepseek-reasoner`.

---

DeepSeek does **not** ship a proprietary SDK. The documented integration is the official **OpenAI** client with a `baseURL` override (Anthropic-compatible base URL is also available).

## 1. Setup

```bash
# Node.js / TypeScript
npm install openai

# Python
pip install openai
```

### TypeScript / JavaScript

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
});
```

### Python

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("DEEPSEEK_API_KEY"),
    base_url="https://api.deepseek.com",
)
```

> [!NOTE]
> `https://api.deepseek.com` and `https://api.deepseek.com/v1` are both valid OpenAI-format bases. CCTV Studio's gateway uses `/v1`.

---

## 2. Core Implementation Patterns

### 2.1 Chat Completions (`deepseek-flash`)

```typescript
const response = await client.chat.completions.create({
  model: 'deepseek-flash',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain Paxos in three bullets.' },
  ],
  extra_body: { thinking: { type: 'disabled' } },
});

console.log(response.choices[0].message.content);
```

### 2.2 Thinking / reasoning

Thinking is a request-body flag, not a separate model ID.

```typescript
const response = await client.chat.completions.create({
  model: 'deepseek-flash',
  messages: [{ role: 'user', content: 'Plan a cache invalidation strategy.' }],
  extra_body: {
    thinking: { type: 'enabled' },
    reasoning_effort: 'high',
  },
});

console.log(response.choices[0].message.content);
```

### 2.3 Streaming

```typescript
const stream = await client.chat.completions.create({
  model: 'deepseek-flash',
  messages: [{ role: 'user', content: 'Write a haiku on compiler optimization.' }],
  stream: true,
  extra_body: { thinking: { type: 'disabled' } },
});

for await (const chunk of stream) {
  const delta = chunk.choices[0]?.delta?.content;
  if (typeof delta === 'string') {
    process.stdout.write(delta);
  }
}
console.log();
```

---

## 3. References & Catalogs

* [**DeepSeek Models Catalog**](./references/models.md)
* [TypeScript Reference Implementation](./examples/typescript-examples.ts)
* [Python Reference Implementation](./examples/python-examples.py)
