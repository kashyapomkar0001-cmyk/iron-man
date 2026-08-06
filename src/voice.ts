export function initVoiceAssistant() {
  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Speech Recognition is not supported in this browser.");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  const status = document.getElementById("voice-status");

  recognition.onstart = () => {
    if (status) status.textContent = "Voice Assistant: Listening...";
  };

  recognition.onend = () => {
    if (status) status.textContent = "Voice Assistant: Standby";
    recognition.start();
  };

  recognition.onresult = (event: any) => {
    const transcript =
      event.results[event.results.length - 1][0].transcript;

    console.log("You said:", transcript);

    if (status) {
      status.textContent = `You: ${transcript}`;
    }

    if (transcript.toLowerCase().includes("jarvis")) {
      speak("Yes Sir, I am online.");
    }
  };

  recognition.onerror = (e: any) => {
    console.error(e);
  };

  recognition.start();
}

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

speechSynthesis.speak(utterance);
}
