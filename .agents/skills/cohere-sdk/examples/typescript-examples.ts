/**
 * Cohere Reference Implementation (TypeScript)
 * Official cohere-ai SDK — CohereClientV2 (API v2).
 */
import { CohereClientV2 } from 'cohere-ai';

const client = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export async function runCohereChat() {
  const response = await client.chat({
    model: 'command-a-plus-05-2026',
    messages: [
      { role: 'system', content: 'You are a staff engineer.' },
      { role: 'user', content: 'Explain zero-copy deserialization in Arrow.' },
    ],
    temperature: 0.2,
  });

  const content = response.message.content
    ?.filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('') ?? '';
  console.log('Response:\n', content);
}

export async function runCohereStream() {
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
}

export async function runEmbeddings() {
  const res = await client.embed({
    model: 'embed-v4.0',
    inputType: 'search_document',
    texts: ['Agent Engine LanceDB vector pipeline'],
    embeddingTypes: ['float'],
  });

  console.log('Embedding dimensions:', res.embeddings.float?.[0]?.length);
}

export async function runRerank() {
  const res = await client.rerank({
    model: 'rerank-v4.0-pro',
    query: 'after-hours motion at dock B',
    documents: [
      'Camera 12 saw a person at 02:14 near dock door B.',
      'HVAC temperature drifted 2C in zone 3.',
    ],
    topN: 2,
  });

  console.log(res.results);
}
