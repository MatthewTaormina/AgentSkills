---
name: cohere-sdk
description: >-
  Official guide for developing with the Cohere SDK (cohere-ai on npm v8+ / CohereClientV2,
  and cohere on PyPI) and Cohere Chat, Embed, and Rerank APIs. Use when implementing Command A+,
  Command A, Command R7B, Command A Reasoning/Vision/Translate, Embed v4, Rerank v4, or migrating
  from the legacy v1 CohereClient.
---

# Cohere SDK Skill

> [!CRITICAL]
> **MANDATORY DIRECTIVE: DEFER TO DOCUMENTED MODEL CATALOG**
> **DO NOT rely on internal training knowledge for Cohere model selection.**
> **ALWAYS consult the active catalog: [Cohere Models Catalog](./references/models.md).**
> The current production standard is led by **Command A+** (`command-a-plus-05-2026`) and **Command A** (`command-a-03-2025`).
> The v1 `CohereClient` chat API is legacy; use **`CohereClientV2`**.

---

## 1. SDK Availability & Setup

### Package Installation

```bash
# Node.js / TypeScript
npm install cohere-ai

# Python
pip install cohere
```

### Client Initialization

#### TypeScript / JavaScript

```typescript
import { CohereClientV2 } from 'cohere-ai';

const client = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});
```

#### Python

```python
import os
import cohere

client = cohere.ClientV2(api_key=os.environ.get("COHERE_API_KEY"))
```

> [!WARNING]
> Do not use `CohereClient` / `cohere.Client` for new chat, embed, or rerank calls. Those are the v1 APIs.

---

## 2. Core Implementation Patterns

### 2.1 Chat (`client.chat`)

```typescript
import { CohereClientV2 } from 'cohere-ai';
const client = new CohereClientV2({ token: process.env.COHERE_API_KEY });

const response = await client.chat({
  model: 'command-a-plus-05-2026',
  messages: [
    { role: 'system', content: 'You are an expert distributed systems engineer.' },
    { role: 'user', content: 'Explain Paxos consensus in 3 concise bullet points.' },
  ],
  temperature: 0.2,
});

const text = response.message.content
  ?.filter((block) => block.type === 'text')
  .map((block) => block.text)
  .join('') ?? '';
console.log(text);
```

### 2.2 Streaming Chat (`client.chatStream`)

```typescript
const stream = await client.chatStream({
  model: 'command-a-03-2025',
  messages: [{ role: 'user', content: 'Write a haiku on compiler optimization.' }],
});

for await (const event of stream) {
  if (event.type === 'content-delta') {
    const delta = event.delta?.message?.content?.text;
    if (typeof delta === 'string') {
      process.stdout.write(delta);
    }
  }
}
console.log();
```

### 2.3 Embeddings (`embed-v4.0`)

```typescript
const embed = await client.embed({
  model: 'embed-v4.0',
  inputType: 'search_document',
  texts: ['Document chunk for vector search', 'Search query text'],
  embeddingTypes: ['float'],
});

console.log(embed.embeddings.float?.[0]?.length);
```

### 2.4 Rerank (`rerank-v4.0-pro`)

```typescript
const ranked = await client.rerank({
  model: 'rerank-v4.0-pro',
  query: 'motion event after hours at the loading dock',
  documents: [
    'Camera 12 saw a person at 02:14 near dock door B.',
    'HVAC temperature drifted 2C in zone 3.',
  ],
  topN: 2,
});

console.log(ranked.results);
```

---

## 3. References & Catalogs

* [**Cohere Models Catalog**](./references/models.md)
* [TypeScript Reference Implementation](./examples/typescript-examples.ts)
* [Python Reference Implementation](./examples/python-examples.py)
