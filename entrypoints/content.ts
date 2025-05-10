import { generatePrompt } from "@/services";

// Function to show toast notification
function showToast(message: string) {
  // Create toast element
  const toast = document.createElement("div");
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 14px;
    z-index: 10000;
    transition: opacity 0.3s ease-in-out;
  `;
  toast.textContent = message;

  // Add to document
  document.body.appendChild(toast);

  // Remove after 2 seconds
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    // Listen for keyboard shortcut
    document.addEventListener("keydown", (event) => {
      if (event.altKey && event.shiftKey && event.code === "KeyS") {
        event.preventDefault();

        // Get all highlights
        const highlights = document.querySelectorAll("web-highlight,nrmark");
        
        // Generate the prompt
        const prompt = generatePrompt(highlights, window.location.href);

        console.log(
          "%c Anki Helper [ prompt ]-37",
          "font-size:13px; background:pink; color:#bf2c9f;"
        );
        console.log(prompt);

        // Copy to clipboard
        navigator.clipboard
          .writeText(prompt)
          .then(() => {
            console.log("Copied highlights to clipboard");
            showToast("已复制到剪贴板");
          })
          .catch((err) => {
            console.error("Failed to copy to clipboard:", err);
            showToast("复制失败");
          });
      }
    });
  },
});
