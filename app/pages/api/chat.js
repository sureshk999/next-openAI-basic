import { OpenAIStream, StreamingTextResponse } from 'ai';

export const config = { runtime: 'experimental-edge' };

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await openai.create.chat.Completion({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: req.body.messages,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
