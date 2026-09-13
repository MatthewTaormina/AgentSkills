/**
 * Anthropic SDK (@anthropic-ai/sdk) Reference Implementation
 */
import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 1. Basic Messages API Call
export async function runBasicMessage() {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 1024,
    system: 'You are an experienced systems architect.',
    messages: [
      { role: 'user', content: 'What are the main performance benefits of using LanceDB for vector search?' },
    ],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  console.log('Response:\n', textBlock?.text);
}

// 2. Real-time Streaming
export async function runStreaming() {
  const stream = anthropic.messages.stream({
    model: 'claude-haiku-4-5',
    max_tokens: 512,
    messages: [{ role: 'user', content: 'Explain zero-copy deserialization in two paragraphs.' }],
  });

  stream.on('text', (textDelta) => {
    process.stdout.write(textDelta);
  });

  const finalMsg = await stream.finalMessage();
  console.log('\nTotal output tokens:', finalMsg.usage.output_tokens);
}

// 3. Extended Thinking (Claude 3.7 Sonnet)
export async function runExtendedThinking() {
  const response = await anthropic.messages.create({
    model: 'claude-3-7-sonnet-20250219',
    max_tokens: 12000,
    thinking: {
      type: 'enabled',
      budget_tokens: 6000,
    },
    messages: [
      {
        role: 'user',
        content: 'Solve this step by step: A farmer has 17 sheep, and all but 9 die. How many are left alive? Analyze linguistic ambiguity.',
      },
    ],
  });

  for (const block of response.content) {
    if (block.type === 'thinking') {
      console.log('--- REASONING PROCESS ---');
      console.log(block.thinking);
    } else if (block.type === 'text') {
      console.log('--- FINAL ANSWER ---');
      console.log(block.text);
    }
  }
}

// 4. Prompt Caching with Ephemeral Cache Control
export async function runPromptCaching() {
  const response = await anthropic.messages.create({
    model: 'claude-3-7-sonnet-20250219',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: 'You are an internal documentation assistant for Company X. Rule 1: Always check authorization... ' + 'A'.repeat(5000), // simulate large prompt
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [
      { role: 'user', content: 'What is Rule 1?' },
    ],
  });

  console.log('Cache Created Tokens:', response.usage.cache_creation_input_tokens);
  console.log('Cache Read Tokens:', response.usage.cache_read_input_tokens);
}

// 5. Tool Use Loop
export async function runToolUseLoop() {
  const tools: Anthropic.Tool[] = [
    {
      name: 'calculateShippingRate',
      description: 'Calculates courier shipping rate between two postal codes',
      input_schema: {
        type: 'object',
        properties: {
          originZip: { type: 'string' },
          destZip: { type: 'string' },
          weightLbs: { type: 'number' },
        },
        required: ['originZip', 'destZip', 'weightLbs'],
      },
    },
  ];

  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: 'How much to ship a 5lb box from 90210 to 10001?' },
  ];

  const initialResponse = await anthropic.messages.create({
    model: 'claude-sonnet-5',
    max_tokens: 1024,
    tools,
    messages,
  });

  if (initialResponse.stop_reason === 'tool_use') {
    messages.push({ role: 'assistant', content: initialResponse.content });

    for (const block of initialResponse.content) {
      if (block.type === 'tool_use') {
        console.log(`Executing tool: ${block.name}`);
        const toolResult = { origin: '90210', destination: '10001', rate: 18.75, currency: 'USD' };

        messages.push({
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: block.id,
              content: JSON.stringify(toolResult),
            },
          ],
        });
      }
    }

    const finalResponse = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 1024,
      tools,
      messages,
    });

    const textBlock = finalResponse.content.find((b) => b.type === 'text');
    console.log('Final Answer:', textBlock?.text);
  }
}
