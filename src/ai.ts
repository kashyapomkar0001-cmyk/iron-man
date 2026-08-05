export async function askJarvis(prompt: string): Promise<string> {
  const text = prompt.toLowerCase();

  if (text.includes("hello")) {
    return "Hello Sir. All systems are online.";
  }

  if (text.includes("time")) {
    return `Current time is ${new Date().toLocaleTimeString()}`;
  }

  if (text.includes("date")) {
    return `Today is ${new Date().toDateString()}`;
  }

  if (text.includes("your name")) {
    return "I am JARVIS, your AI assistant.";
  }

  if (text.includes("who made you")) {
    return "I am currently running in development mode.";
  }

  return "Sorry Sir, I cannot answer that yet.";
}
