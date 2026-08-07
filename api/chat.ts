import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Only POST requests are allowed.",
    });
  }

  try {
    if (!ai) {
      return res.status(500).json({
        reply: "Gemini API key is not configured on Vercel.",
      });
    }

    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        reply: "Please provide a valid prompt.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt.slice(0, 8000),
    });

    const reply = response.text?.trim();

    if (!reply) {
      return res.status(200).json({
        reply: "Sorry Sir, I didn't receive a response.",
      });
    }

    return res.status(200).json({ reply });

  } catch (error: any) {
    console.error("Gemini API Error:", error);

    const status = error?.status;

    if (status === 429) {
      return res.status(429).json({
        reply: "Sir, Gemini is temporarily busy. Please try again in a little while.",
      });
    }

    if (status === 403) {
      return res.status(403).json({
        reply: "Sir, Gemini API access is currently unavailable for this project.",
      });
    }

    if (status === 404) {
      return res.status(404).json({
        reply: "Sir, the selected Gemini model is unavailable.",
      });
    }

    return res.status(500).json({
      reply: "Sorry Sir, I couldn't generate a response right now.",
    });
  }
}
