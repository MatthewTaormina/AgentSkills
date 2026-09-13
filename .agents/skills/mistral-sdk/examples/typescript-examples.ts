/**
 * Mistral AI Reference Implementation (TypeScript)
 * Using the official @mistralai/mistralai SDK (or OpenAI compatibility)
 */
import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

// 1. Basic Generation with Mistral Large 3
export async function runMistralChat() {
  const response = await client.chat.complete({
    model: 'mistral-large-latest',
    messages: [
      { role: 'system', content: 'You are a staff engineer.' },
      { role: 'user', content: 'Explain zero-copy deserialization in Arrow.' },
    ],
    temperature: 0.2,
  });

  const content = response.choices?.[0]?.message?.content;
  console.log('Response:\n', content);
}

// 2. Code Fill-In-The-Middle (FIM) with Codestral
export async function runCodestralFIM() {
  const response = await client.fim.complete({
    model: 'codestral-latest',
    prompt: 'function binarySearch(arr: number[], target: number): number {\n',
    suffix: '\n  return -1;\n}',
  });

  console.log('FIM Completion:\n', response.choices[0].message.content);
}

// 3. Dense Vector Embeddings
export async function runEmbeddings() {
  const res = await client.embeddings.create({
    model: 'mistral-embed',
    inputs: ['Agent Engine LanceDB vector pipeline'],
  });

  console.log('Embedding dimensions:', res.data[0].embedding.length);
}
