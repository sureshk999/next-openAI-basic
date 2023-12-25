import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, //Add in to .env
});
 
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    console.log("Received messages: ", messages); // Log received messages
 
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages,
    });

    console.log("OpenAI response: ", response); // Log OpenAI response

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Error in POST /api/chat: ", error);

    let status = 500;
    let message = "Internal Server Error";

    // Check if the error is due to authentication (like an invalid API key)
    if (error.response && error.response.status === 401) {
      status = 401;
      message = "Invalid API Key";
    }

    return new Response(JSON.stringify({ message }), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}