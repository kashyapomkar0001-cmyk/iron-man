export async function askJarvis(prompt: string): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      return "Sorry Sir, server error.";
    }

    const data = await response.json();

    return data.reply || "Sorry Sir, I have no response.";
  } catch (error) {
    console.error(error);
    return "Sorry Sir, I cannot connect to my AI brain.";
  }
}
