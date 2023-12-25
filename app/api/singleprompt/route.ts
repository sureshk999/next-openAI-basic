import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
 
  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
        messages: [
            {
                role: "system",
                content: 'be a friendly and funny chat bot',
            },
            {
                role: "user",
                content: prompt // string that the user passes in
            }
        ],
        temperature: 0.2,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream:true,
  });
 
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
 
  // Respond with the stream
  return new StreamingTextResponse(stream);
}