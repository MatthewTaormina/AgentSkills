/**
 * OpenRouter & EuroRouter Reference Implementation (TypeScript)
 * Both services utilize the standard OpenAI client with custom baseURLs.
 */
import OpenAI from 'openai';

// 1. OpenRouter with Dynamic Auto-routing
export async function runOpenRouterAuto() {
  const openRouter = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    defaultHeaders: {
      'HTTP-Referer': 'https://agent-engine.local',
      'X-Title': 'Agent Engine Monorepo',
    },
  });

  const response = await openRouter.chat.completions.create({
    model: 'openrouter/auto',
    messages: [
      { role: 'user', content: 'Explain the difference between optimistic and pessimistic concurrency control.' },
    ],
  });

  console.log('OpenRouter Response:\n', response.choices[0].message.content);
}

// 2. EuroRouter with EU Data Residency
export async function runEuroRouter() {
  const euRouter = new OpenAI({
    apiKey: process.env.EUROUTER_API_KEY,
    baseURL: 'https://api.eurouter.ai/v1',
  });

  const response = await euRouter.chat.completions.create({
    model: 'mistralai/mistral-large-latest',
    messages: [
      { role: 'user', content: 'List 3 core principles of the EU AI Act risk framework.' },
    ],
  });

  console.log('EuroRouter Response:\n', response.choices[0].message.content);
}
