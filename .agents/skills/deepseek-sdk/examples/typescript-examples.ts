/**
 * DeepSeek Reference Implementation (TypeScript)
 * Official openai package with DeepSeek baseURL — there is no proprietary SDK.
 */
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
});

export async function runDeepSeekChat() {
  const response = await client.chat.completions.create({
    model: 'deepseek-flash',
    messages: [
      { role: 'system', content: 'You are a staff engineer.' },
      { role: 'user', content: 'Explain zero-copy deserialization in Arrow.' },
    ],
    extra_body: { thinking: { type: 'disabled' } },
  });

  console.log('Response:\n', response.choices[0].message.content);
}

export async function runDeepSeekThinking() {
  const response = await client.chat.completions.create({
    model: 'deepseek-flash',
    messages: [{ role: 'user', content: 'Design a high-throughput cache invalidation strategy.' }],
    extra_body: {
      thinking: { type: 'enabled' },
      reasoning_effort: 'high',
    },
  });

  console.log('Response:\n', response.choices[0].message.content);
}

export async function runDeepSeekStream() {
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
}
