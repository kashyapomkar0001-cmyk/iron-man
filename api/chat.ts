import { GoogleGenAI } from "@google/genai";

console.log("API KEY FOUND:", !!process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method Not Allowed",
    });
  }

  try {
    console.log("Prompt:", req.body);

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        reply: "Prompt is required.",
      });
    }

    const response = await ai.models.generateContent({
  model: "gemini-2.5-flash-lite",
  contents: prompt,
});
   
    return res.status(200).json({
      reply: response.text ?? "No response received.",
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      reply: error?.stack || error?.message || JSON.stringify(error),
    });
  }
}
