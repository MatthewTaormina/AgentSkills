---
name: mistral-sdk
description: >-
  Official guide for developing with Mistral AI using the official SDKs (@mistralai/mistralai on npm
  and mistralai on PyPI) or OpenAI-compatible clients. Use when implementing Mistral Large 3,
  Mistral Medium 3.5, Mistral Small 4, Ministral 3, Codestral, native multimodal vision, Mistral OCR, structured outputs, function calling, or embeddings.
---

# Mistral AI SDK Skill

> [!CRITICAL]
> **MANDATORY DIRECTIVE: DEFER TO DOCUMENTED MODEL CATALOG**
> **DO NOT rely on internal training knowledge for Mistral models.**
> **ALWAYS consult the active catalog: [Mistral Models Catalog](./references/models.md).**
> The current production standard includes **Mistral Large 3** (`mistral-large-latest`), **Mistral Medium 3.5** (`mistral-medium-latest`), **Mistral Small 4** (`mistral-small-latest`), **Ministral 3** (`ministral-14b-latest`), and **Codestral** (`codestral-latest`).
> *Note: Standalone Pixtral models are retired; native multimodal vision is built into the generalist fleet.*

---

## 1. SDK Availability & Setup

Mistral AI provides official SDKs for both TypeScript and Python.

### Package Installation

```bash
# Node.js / TypeScript (npm)
npm install @mistralai/mistralai

# Python
pip install mistralai
```

> [!NOTE]
> Alternatively, you can use the standard `openai` package by setting `baseURL: 'https://api.mistral.ai/v1'` and `apiKey: process.env.MISTRAL_API_KEY`.

### Client Initialization

#### TypeScript / JavaScript
```typescript
import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});
```

#### Python
```python
import os
from mistralai import Mistral

client = Mistral(api_key=os.environ.get("MISTRAL_API_KEY"))
```

---

## 2. Core Implementation Patterns

### 2.1 Chat & Text Generation (`client.chat.complete`)

```typescript
import { Mistral } from '@mistralai/mistralai';
const client = new Mistral();

const response = await client.chat.complete({
  model: 'mistral-large-latest',
  messages: [
    { role: 'system', content: 'You are an expert distributed systems engineer.' },
    { role: 'user', content: 'Explain Paxos consensus in 3 concise bullet points.' },
  ],
  temperature: 0.2,
});

console.log(response.choices?.[0]?.message?.content);
```

### 2.2 Streaming Generation (`client.chat.stream`)

```typescript
const stream = await client.chat.stream({
  model: 'mistral-small-latest',
  messages: [{ role: 'user', content: 'Write a haiku on compiler optimization.' }],
});

for await (const chunk of stream) {
  const delta = chunk.data.choices[0]?.delta?.content;
  if (typeof delta === 'string') {
    process.stdout.write(delta);
  }
}
console.log();
```

### 2.3 Code Generation with Codestral (Fill-in-the-Middle)

Codestral supports dedicated code completion and Fill-in-the-Middle (FIM):

```typescript
import { Mistral } from '@mistralai/mistralai';
const client = new Mistral();

const fimResponse = await client.fim.complete({
  model: 'codestral-latest',
  prompt: 'function calculateFibonacci(n: number): number {\n',
  suffix: '\n  return current;\n}',
  temperature: 0.1,
});

console.log('Completed Body:\n', fimResponse.choices[0].message.content);
```

### 2.4 Native Multimodal Vision (Mistral Large 3 / Medium 3.5)

```typescript
import { Mistral } from '@mistralai/mistralai';
import * as fs from 'fs';

const client = new Mistral();
const imageBase64 = fs.readFileSync('architecture.png').toString('base64');

const response = await client.chat.complete({
  model: 'mistral-large-latest',
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Describe the cloud architecture flow in this diagram.' },
        {
          type: 'image_url',
          imageUrl: `data:image/png;base64,${imageBase64}`,
        },
      ],
    },
  ],
});

console.log(response.choices?.[0]?.message?.content);
```

### 2.5 Structured Outputs (JSON Schema)

```typescript
const response = await client.chat.complete({
  model: 'mistral-large-latest',
  messages: [
    { role: 'user', content: 'Extract user: John Doe, 29 years old, software architect.' },
  ],
  responseFormat: {
    type: 'json_object',
  },
});

console.log(JSON.parse(response.choices?.[0]?.message?.content as string));
```

### 2.6 Embeddings Generation

```typescript
const embedResponse = await client.embeddings.create({
  model: 'mistral-embed',
  inputs: ['Document chunk for LanceDB vector search', 'Search query text'],
});

console.log('Embedding vector length:', embedResponse.data[0].embedding.length);
```

---

## 3. References & Catalogs

* [**Mistral Models Catalog**](./references/models.md)
* [TypeScript Reference Implementation](./examples/typescript-examples.ts)
* [Python Reference Implementation](./examples/python-examples.py)
