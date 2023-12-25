// pages/api/completion.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Example: Call to OpenAI's API for a streaming completion
        // This is a placeholder. You need to replace it with actual OpenAI API call
        const response = await openai.createCompletion({
          model: "gpt-3.5-turbo-1106",
          prompt: req.body.prompt,
          stream: true,
          max_tokens: 150,
        });
  
        // Stream the response back to the client
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ message: "Error in API call" });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  