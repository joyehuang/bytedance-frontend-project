import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// 发送消息并获取 AI 回复
const msg = await anthropic.messages.create({
  model: 'claude-3-5-haiku-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: '你好' }],
});
console.log(msg);

// 获取模型列表
// const models = await anthropic.models.list();
// console.log(models);
