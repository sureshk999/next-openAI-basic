import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
// IMPORTANT! Set the runtime to edge
// export const runtime = 'edge';
export const config = {
  runtime: 'experimental-edge',
}

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
    console.error("Error in POST /api/chat: ", error); // Detailed error logging
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
