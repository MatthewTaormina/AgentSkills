/**
 * Google Gen AI SDK (@google/genai) Reference Implementation
 */
import { GoogleGenAI, Type } from '@google/genai';
import * as fs from 'fs';

// Initialize Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// 1. Basic Content Generation
export async function runGenerate() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: 'Explain why the sky appears blue to human eyes in 2 sentences.',
    config: {
      temperature: 0.1,
      systemInstruction: 'You are an award-winning science educator.',
    },
  });
  console.log('Result:', response.text);
}

// 2. Streaming Output
export async function runStream() {
  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-3.8-flash',
    contents: 'Count from 1 to 5 and describe each number in one whimsical word.',
  });

  for await (const chunk of responseStream) {
    process.stdout.write(chunk.text ?? '');
  }
}

// 3. Multi-turn Chat
export async function runChat() {
  const chat = ai.chats.create({
    model: 'gemini-3.8-flash',
    config: {
      systemInstruction: 'You are a helpful travel assistant.',
    },
  });

  const reply1 = await chat.sendMessage({ message: 'I want to visit Japan for 5 days.' });
  console.log('Turn 1:', reply1.text);

  const reply2 = await chat.sendMessage({ message: 'What should I pack for spring?' });
  console.log('Turn 2:', reply2.text);

  const history = await chat.getHistory();
  console.log('Total turns:', history.length);
}

// 4. Structured Output with Schema
export async function runStructuredOutput() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: 'Extract items: 2 apples at $1.50 each, 1 gallon of milk at $3.29.',
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                quantity: { type: Type.INTEGER },
                unitPrice: { type: Type.NUMBER },
              },
              required: ['name', 'quantity', 'unitPrice'],
            },
          },
          totalEstimatedCost: { type: Type.NUMBER },
        },
        required: ['items', 'totalEstimatedCost'],
      },
    },
  });

  const parsed = JSON.parse(response.text!);
  console.log('Parsed JSON:', parsed);
}

// 5. Extended Thinking
export async function runThinking() {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro',
    contents: 'How many "r"s are in the word "strawberry"? Explain step by step.',
    config: {
      thinkingConfig: {
        thinkingBudget: 2048,
        includeThoughts: true,
      },
    },
  });
  console.log('Final Answer:', response.text);
}
