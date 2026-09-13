---
name: google-genai
description: >-
  Official guide for developing with the Google Gen AI SDK (@google/genai in Node.js/TypeScript
  and google-genai in Python) and Gemini APIs. Use when implementing, upgrading, or debugging
  Gemini API calls, content generation, streaming, structured outputs, chat sessions,
  function calling/tools, multimodal processing (image, video, audio, PDF), thinkingConfig,
  context caching, or migrating from legacy @google/generative-ai.
---

# Google Gen AI SDK Skill

> [!CRITICAL]
> **MANDATORY DIRECTIVE: DEFER TO DOCUMENTED MODEL CATALOG**
> **DO NOT rely on internal training knowledge for model selection**, as previous generations (Gemini 2.0 / 2.5 series) are shut down or deprecated.
> **ALWAYS consult the active model catalog: [Google Gen AI Models Catalog](./references/models.md).**
> The current production standard is the **Gemini 3.x series** (`gemini-3.8-flash`, `gemini-3.7-flash`, `gemini-3.1-pro`, `gemini-3.1-flash-lite`).

---

This skill provides modern, battle-tested patterns for building applications with Google's generative models using the unified **Google Gen AI SDK** (`@google/genai` for TypeScript/Node.js and `google-genai` for Python).

> [!IMPORTANT]
> **SDK Migration Alert**: Google has deprecated legacy `@google/generative-ai` and `@google-cloud/vertexai` packages in favor of the unified `@google/genai` (Node.js) and `google-genai` (Python) SDKs. Always use the unified SDK for new code.

---

## 1. Quick Reference & Setup

### Package Installation

```bash
# Node.js / TypeScript (npm)
npm install @google/genai

# Python
pip install google-genai
```

### Client Initialization

The SDK unifies access to both **Gemini Developer API** (API key) and **Google Cloud Vertex AI** (project/location credentials):

#### TypeScript / JavaScript
```typescript
import { GoogleGenAI } from '@google/genai';

// 1. Gemini Developer API (API Key)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// 2. Vertex AI (Enterprise / GCP Service Account)
const vertexAi = new GoogleGenAI({
  vertexai: true,
  project: process.env.GCP_PROJECT_ID,
  location: process.env.GCP_LOCATION || 'us-central1',
});
```

#### Python
```python
from google import genai

# 1. Gemini Developer API
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))

# 2. Vertex AI
vertex_client = genai.Client(
    vertexai=True,
    project=os.environ.get("GCP_PROJECT_ID"),
    location=os.environ.get("GCP_LOCATION", "us-central1"),
)
```

---

## 2. Currently Available Models (Gemini 3.x)

*See [Full Models Catalog](./references/models.md) for context limits and deprecation schedules.*

| Model Name | Best For | Context Window | Max Output |
| :--- | :--- | :--- | :--- |
| `gemini-3.8-flash` | Flagship GA model; long-horizon software engineering & agent loops | 1,000,000 tokens | 65,536 tokens |
| `gemini-3.7-flash` | Advanced agentic video and multimodal perception | 1,000,000 tokens | 65,536 tokens |
| `gemini-3.1-pro` | Complex multi-step reasoning, mathematical logic, deep code analysis | 2,000,000 tokens | 65,536 tokens |
| `gemini-3.1-flash-lite` | Ultra-high throughput, lowest latency, classification | 1,000,000 tokens | 32,768 tokens |
| `text-embedding-004` | Semantic vector search, embeddings, RAG | 2,048 tokens | 768 dims |
| `imagen-3.0-generate-002` | High-fidelity image generation from text prompts | N/A | N/A |

---

## 3. Core Implementation Patterns

### 3.1 Content Generation & Streaming

```typescript
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI();

// Single-turn Generation
const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: 'Explain quantum entanglement in two sentences.',
  config: {
    temperature: 0.2,
    systemInstruction: 'You are a concise Nobel prize-winning physicist.',
  },
});
console.log(response.text);

// Streaming Generation
const stream = await ai.models.generateContentStream({
  model: 'gemini-3.8-flash',
  contents: 'Write a poem about distributed systems.',
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text || '');
}
```

### 3.2 Multi-Turn Conversations (Chats)

The `ai.chats.create` abstraction maintains message history across calls:

```typescript
const chat = ai.chats.create({
  model: 'gemini-3.8-flash',
  config: {
    systemInstruction: 'You are a friendly customer service assistant.',
  },
});

// Turn 1
const res1 = await chat.sendMessage({ message: 'Hi, I need help resetting my password.' });
console.log(res1.text);

// Turn 2 (context preserved automatically)
const res2 = await chat.sendMessage({ message: 'I did not receive the email.' });
console.log(res2.text);

// Access conversation history
const history = await chat.getHistory();
```

### 3.3 Structured Outputs (Guaranteed JSON Schemas)

Using the built-in `Type` enum enforces strict JSON output adhering to your schema:

```typescript
import { GoogleGenAI, Type } from '@google/genai';
const ai = new GoogleGenAI();

const response = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: 'Extract user profile: "Alice Smith, 32 years old, software engineer in Austin, TX with skills: TS, Go, Rust"',
  config: {
    responseMimeType: 'application/json',
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        age: { type: Type.INTEGER },
        title: { type: Type.STRING },
        location: { type: Type.STRING },
        skills: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
      required: ['name', 'age', 'title', 'skills'],
    },
  },
});

const profile = JSON.parse(response.text!);
console.log(profile);
```

### 3.4 Extended Thinking (`thinkingConfig`)

```typescript
const response = await ai.models.generateContent({
  model: 'gemini-3.1-pro',
  contents: 'Prove whether P != NP or explain why it remains open.',
  config: {
    thinkingConfig: {
      thinkingBudget: 4096, // 0 to disable, -1 for automatic dynamic reasoning, or token count
      includeThoughts: true, // Whether thoughts are exposed in candidate parts
    },
  },
});

console.log(response.text);
```

### 3.5 Tool Use & Function Calling

```typescript
import { GoogleGenAI, Type } from '@google/genai';
const ai = new GoogleGenAI();

// 1. Tool Declaration
const tools = [
  {
    functionDeclarations: [
      {
        name: 'getCurrentStockPrice',
        description: 'Retrieves current trading price for a stock ticker symbol',
        parameters: {
          type: Type.OBJECT,
          properties: {
            ticker: { type: Type.STRING, description: 'Stock ticker e.g. GOOG, AAPL' },
          },
          required: ['ticker'],
        },
      },
    ],
  },
];

const res = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: 'What is GOOG trading at today?',
  config: { tools },
});

// 2. Inspect Function Calls
if (res.functionCalls && res.functionCalls.length > 0) {
  const call = res.functionCalls[0];
  console.log('Model requested call:', call.name, call.args);

  const stockResult = { ticker: 'GOOG', price: 182.45, currency: 'USD' };

  // 3. Return Function Response back to Gemini
  const finalResponse = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: [
      { role: 'user', parts: [{ text: 'What is GOOG trading at today?' }] },
      { role: 'model', parts: [{ functionCall: call }] },
      {
        role: 'user',
        parts: [
          {
            functionResponse: {
              name: call.name,
              response: stockResult,
            },
          },
        ],
      },
    ],
  });

  console.log(finalResponse.text);
}
```

### 3.6 Multimodal Processing (Images, Audio, Video, PDF)

```typescript
import { GoogleGenAI } from '@google/genai';
import * as fs from 'fs';

const ai = new GoogleGenAI();

// Inline Base64
const imageBuffer = fs.readFileSync('screenshot.png');
const base64Data = imageBuffer.toString('base64');

const resInline = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: [
    {
      inlineData: {
        mimeType: 'image/png',
        data: base64Data,
      },
    },
    'Describe the user interface and report any errors visible.',
  ],
});
console.log(resInline.text);

// File API for large files / videos up to 2GB
const uploadResult = await ai.files.upload({
  file: 'recording.mp4',
  mimeType: 'video/mp4',
});

const resFile = await ai.models.generateContent({
  model: 'gemini-3.8-flash',
  contents: [
    uploadResult,
    'Summarize the key discussion points and action items.',
  ],
});
console.log(resFile.text);
```

### 3.7 Context Caching

```typescript
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI();

// Create cache (min 32,768 tokens)
const cache = await ai.caches.create({
  model: 'gemini-3.1-pro',
  config: {
    ttl: '3600s',
    contents: [
      {
        role: 'user',
        parts: [{ text: '...large codebase context or documentation...' }],
      },
    ],
    systemInstruction: 'You are an expert codebase QA assistant.',
  },
});

const response = await ai.models.generateContent({
  model: 'gemini-3.1-pro',
  contents: 'Where is the session token verified?',
  config: {
    cachedContent: cache.name,
  },
});
console.log(response.text);
```

### 3.8 Non-Chat Generations: Image (Nano Banana), Video (Veo), and Embeddings

#### A. Image Generation & Editing with Nano Banana
```typescript
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI();

// Generate high-fidelity image with Nano Banana / Imagen
const imageResponse = await ai.models.generateImages({
  model: 'nano-banana-2', // or 'imagen-3.0-generate-002'
  prompt: 'A futuristic clean software developer workstation with curved OLED display showing code, cinematic lighting',
  config: {
    numberOfImages: 1,
    aspectRatio: '16:9',
    outputMimeType: 'image/jpeg',
  },
});

const base64Image = imageResponse.generatedImages[0].image.imageBytes;
```

#### B. Dense Vector Embeddings
```typescript
const embeddingResult = await ai.models.embedContent({
  model: 'text-embedding-004',
  contents: 'Agent Engine unified LLM runtime architecture',
});

console.log('Vector dims:', embeddingResult.embedding.values.length);
```

#### C. On-Device Gemini Nano
For on-device edge execution without network egress, Gemini Nano (`gemini-nano-4`) is accessed via Android AICore, Google MediaPipe GenAI Tasks, or Chrome's Built-in AI Prompt API (`window.ai.languageModel`):
```javascript
// Chrome Built-in Prompt API (Gemini Nano local)
if (window.ai?.languageModel) {
  const session = await window.ai.languageModel.create();
  const result = await session.prompt('Summarize this paragraph locally.');
  console.log(result);
}
```

---

## 4. References and Examples

* [**Active Models Catalog**](./references/models.md)
* [Full API Reference Cheatsheet](./references/api-reference.md)
* [TypeScript Reference Implementation](./examples/typescript-examples.ts)
* [Python Reference Implementation](./examples/python-examples.py)
