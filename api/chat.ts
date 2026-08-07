import { GoogleGenAI } from "@google/genai";

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
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        reply: "Prompt is required.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return res.status(200).json({
      reply: response.text ?? "No response received.",
    });
catch (error: any) {
  console.error(error);

  return res.status(500).json({
    reply: error?.stack || error?.message || JSON.stringify(error),
  });
}
