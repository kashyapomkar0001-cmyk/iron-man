import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method Not Allowed" });
  }

  try {
    const { prompt } = req.body;

    console.log("API Key Exists:", !!process.env.GEMINI_API_KEY);

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log(result);

    return res.status(200).json({
      reply: result.text || "No response received.",
    });

  } catch (error: any) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      reply: String(error),
    });
  }
}
