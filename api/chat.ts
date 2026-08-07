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

    console.log("API KEY FOUND:", !!process.env.GEMINI_API_KEY);
    console.log("Prompt:", prompt);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini Response:", JSON.stringify(data));

    if (!response.ok) {
      return res.status(response.status).json({
        reply: data?.error?.message || "Gemini API Error",
      });
    }

    return res.status(200).json({
      reply:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.",
    });

  } catch (error: any) {
    console.error("FULL ERROR:", error);

    return res.status(500).json({
      reply: error?.message || "Internal Server Error",
    });
  }
}
