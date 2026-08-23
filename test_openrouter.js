import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: { 'HTTP-Referer': 'https://cv.investogram.org', 'X-Title': 'Prakhar Chatbot' },
});
async function main() {
  const req = await client.buildRequest({ path: '/messages', method: 'post' });
  console.log(req.url);
}
main();
