import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

async function testAPI() {
  dotenv.config();

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  try {
    console.log('Sending message to Claude...');
    const msg = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      messages: [{ role: 'user', content: '你好' }],
    });
    console.log('Response:', msg);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
