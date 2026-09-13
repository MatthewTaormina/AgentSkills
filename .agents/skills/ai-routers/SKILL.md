---
name: ai-routers
description: >-
  Official guide for developing with multi-model AI gateways and routers, specifically OpenRouter
  (global auto-routing and multi-provider failover) and EuroRouter / EUrouter (sovereign EU data
  residency and GDPR compliance). Use when implementing multi-model fallbacks, dynamic routing,
  or EU-sovereign LLM infrastructure using OpenAI-compatible SDKs.
---

# AI Model Routers Skill: OpenRouter & EuroRouter

This skill covers how to integrate and configure unified multi-model AI gateways—**OpenRouter** (for global model aggregation, intelligent routing, and fallback chains) and **EuroRouter / EUrouter** (for sovereign EU data residency and strict GDPR compliance).

---

## 1. Core Architecture & SDK Choice

Neither OpenRouter nor EuroRouter requires a proprietary SDK. Both implement standard **OpenAI API specification compatibility**. You can use the official `openai` package across Node.js/TypeScript and Python simply by altering the `baseURL` and API key.

```bash
# Node.js / TypeScript
npm install openai

# Python
pip install openai
```

---

## 2. OpenRouter Integration Guide

* **Base URL**: `https://openrouter.ai/api/v1`
* **API Key Env**: `OPENROUTER_API_KEY`

### 2.1 TypeScript Client Setup
```typescript
import OpenAI from 'openai';

const openRouter = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'https://agent-engine.local', // Optional: for analytics ranking
    'X-Title': 'Agent Engine',                   // Optional: title for leaderboards
  },
});
```

### 2.2 Intelligent Dynamic Auto-Routing (`openrouter/auto`)
Let OpenRouter inspect your prompt and route to the most cost-efficient, high-performance model:
```typescript
const response = await openRouter.chat.completions.create({
  model: 'openrouter/auto',
  messages: [{ role: 'user', content: 'Design a high-throughput cache invalidation strategy.' }],
});

console.log(response.choices[0].message.content);
```

### 2.3 Cascading Model Fallbacks
Specify a priority chain. If the primary model experiences downtime or rate limits, OpenRouter fails over seamlessly to the backup models:
```typescript
const response = await openRouter.chat.completions.create({
  model: 'anthropic/claude-sonnet-5',
  // @ts-ignore: OpenRouter extension parameter
  models: [
    'anthropic/claude-sonnet-5',
    'openai/gpt-5.6-terra',
    'google/gemini-3.8-flash',
  ],
  messages: [{ role: 'user', content: 'Generate unit tests for auth middleware.' }],
});
```

---

## 3. EuroRouter / EUrouter Integration Guide

* **Base URL**: `https://api.eurouter.ai/v1`
* **API Key Env**: `EUROUTER_API_KEY`
* **Target Audience**: Organizations requiring strict **EU Data Residency**, Zero Data Retention (ZDR), and EU AI Act compliance.

### 3.1 TypeScript Client Setup
```typescript
import OpenAI from 'openai';

const euRouter = new OpenAI({
  apiKey: process.env.EUROUTER_API_KEY,
  baseURL: 'https://api.eurouter.ai/v1',
});

// Drop-in completion guaranteed to process within EU data boundaries
const completion = await euRouter.chat.completions.create({
  model: 'mistralai/mistral-large-latest',
  messages: [
    { role: 'system', content: 'You are an EU-compliant enterprise data processor.' },
    { role: 'user', content: 'Analyze GDPR data minimization requirements.' },
  ],
});

console.log(completion.choices[0].message.content);
```

### 3.2 Python Implementation
```python
import os
from openai import OpenAI

# OpenRouter client
or_client = OpenAI(
    api_key=os.environ.get("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)

# EuroRouter client
eu_client = OpenAI(
    api_key=os.environ.get("EUROUTER_API_KEY"),
    base_url="https://api.eurouter.ai/v1",
)
```

---

## 4. Reference & Examples

* [**Routers Comparison Matrix**](./references/routers-comparison.md)
* [TypeScript Implementation Examples](./examples/typescript-examples.ts)
* [Python Implementation Examples](./examples/python-examples.py)
