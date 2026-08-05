export function initHandTracking() {
  console.log("Initializing Hand Tracking...");

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.warn("Camera is not supported.");
    return;
  }

  navigator.mediaDevices
    .getUserMedia({
      video: {
        facingMode: "user"
      }
    })
    .then((stream) => {
      console.log("Camera started.");

      const video = document.createElement("video");
      video.srcObject = stream;
      video.autoplay = true;
      video.playsInline = true;

      video.style.position = "fixed";
      video.style.bottom = "20px";
      video.style.right = "20px";
      video.style.width = "220px";
      video.style.border = "2px solid orange";
      video.style.borderRadius = "12px";
      video.style.opacity = "0.8";
      video.style.zIndex = "9999";

      document.body.appendChild(video);
    })
    .catch((err) => {
      console.error("Camera Error:", err);
    });
}
