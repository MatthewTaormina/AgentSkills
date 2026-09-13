/**
 * OpenAI SDK (npm: openai v7+) Reference Implementation
 */
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 1. Responses API (Agentic call with Web Search)
export async function runResponsesApi() {
  const response = await client.responses.create({
    model: 'gpt-5.6-terra',
    input: 'What are the main release notes for Node.js 24?',
    instructions: 'Summarize the top features concisely with bullet points.',
    tools: [{ type: 'web_search_preview' }],
  });

  console.log('Responses Output:\n', response.output_text);
}

// 2. Chat Completions
export async function runChatCompletion() {
  const completion = await client.chat.completions.create({
    model: 'gpt-5.6-terra',
    messages: [
      { role: 'system', content: 'You are an expert software engineer.' },
      { role: 'user', content: 'Explain dependency injection in 3 sentences.' },
    ],
    temperature: 0.2,
    max_tokens: 300,
  });

  console.log('Chat Output:\n', completion.choices[0].message.content);
}

// 3. Streaming Chat Completion
export async function runStreaming() {
  const stream = await client.chat.completions.create({
    model: 'gpt-5.6-luna',
    messages: [{ role: 'user', content: 'Write a haiku about compiling code.' }],
    stream: true,
  });

  for await (const chunk of stream) {
    const text = chunk.choices[0]?.delta?.content || '';
    process.stdout.write(text);
  }
  console.log();
}

// 4. Strict Structured Output (JSON Schema)
export async function runStructuredOutput() {
  const completion = await client.chat.completions.create({
    model: 'gpt-5.6-terra',
    messages: [
      {
        role: 'user',
        content: 'Extract task: Fix database connection leak in auth-service by Friday (priority: high).',
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'task_extraction',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            task: { type: 'string' },
            service: { type: 'string' },
            dueDate: { type: 'string' },
            priority: { type: 'string', enum: ['low', 'medium', 'high'] },
          },
          required: ['task', 'service', 'dueDate', 'priority'],
          additionalProperties: false,
        },
      },
    },
  });

  const content = completion.choices[0].message.content;
  console.log('Structured JSON:', JSON.parse(content!));
}

// 5. Reasoning Model (o3-mini / o1)
export async function runReasoning() {
  const response = await client.chat.completions.create({
    model: 'o4-mini',
    reasoning_effort: 'medium',
    messages: [
      { role: 'developer', content: 'You are a competitive programming coach.' },
      { role: 'user', content: 'What is the minimum number of cuts needed to divide a cube into 27 equal smaller cubes?' },
    ],
  });

  console.log('Answer:', response.choices[0].message.content);
  console.log('Reasoning tokens used:', response.usage?.completion_tokens_details?.reasoning_tokens);
}

// 6. Vector Embeddings
export async function runEmbeddings() {
  const res = await client.embeddings.create({
    model: 'text-embedding-3-small',
    input: ['Retrieval Augmented Generation with LanceDB', 'Full text SQLite search'],
    dimensions: 1536,
  });

  console.log('Embedding 0 dims:', res.data[0].embedding.length);
}
