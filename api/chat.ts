import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Only POST requests are allowed.",
    });
  }

  if (!apiKey) {
    return res.status(500).json({
      reply: "Gemini API key is missing.",
    });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        reply: "Please provide a valid prompt.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt.slice(0, 8000),
    });

    const reply = response.text?.trim();

    if (!reply) {
      return res.status(200).json({
        reply: "Sorry Sir, I did not receive a response.",
      });
    }

    return res.status(200).json({
      reply,
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);

    const status = error?.status;

    if (status === 429) {
      return res.status(429).json({
        reply: "Sir, Gemini quota is temporarily exceeded. Please try again later.",
      });
    }

    if (status === 403) {
      return res.status(403).json({
        reply: "Sir, Gemini API access is not available for this project.",
      });
    }

    if (status === 404) {
      return res.status(404).json({
        reply: "Sir, the Gemini model is not available for this API project.",
      });
    }

    return res.status(500).json({
      reply: "Sorry Sir, I couldn't generate a response.",
    });
  }
}
