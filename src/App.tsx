import { useEffect } from "react";
import { initOrbScene } from "./orbScene";
import { initHandTracking } from "./handTracker";
import { initVoiceAssistant } from "./voice";

export default function App() {
  useEffect(() => {
    initOrbScene();
    initHandTracking();
    initVoiceAssistant();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(circle,#120600,#000000)",
      }}
    >
      <canvas
        id="jarvis-canvas"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#ff9d00",
          fontFamily: "monospace",
          fontSize: 22,
          letterSpacing: 2,
        }}
      >
        JARVIS AI OS
      </div>

      <div
        id="voice-status"
        style={{
          position: "absolute",
          bottom: 25,
          left: 25,
          color: "#ff9d00",
          fontFamily: "monospace",
          fontSize: 16,
        }}
      >
        Voice Assistant: Standby
      </div>
    </div>
  );
}
