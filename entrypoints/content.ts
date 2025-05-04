import nlp from "compromise";

// Function to show toast notification
function showToast(message: string) {
  // Create toast element
  const toast = document.createElement('div');
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
    toast.style.opacity = '0';
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

        let combinedText = "";

        // Process each highlight separately
        document.querySelectorAll("web-highlight,nrmark").forEach((highlight) => {
          const highlightText = highlight.textContent?.trim() || "";

          // Find the container that includes the highlight
          const container = highlight.closest("p, div, h1, h2, h3, h4, h5, h6");
          if (!container) return;

          // Get the full context and split into sentences
          const fullContext = container.textContent?.trim() || "";
          const doc = nlp(fullContext);

          // Get all sentences that contain the highlight text
          const sentences = doc
            .sentences()
            .filter((s) => s.text().includes(highlightText))
            .out("array") as string[];

          const context = sentences.join(" ");

          combinedText += `highlight:\n${highlightText}\ncontext:\n${context}\n---\n`;
        });

        const prompt = `You are a helpful assistant that explains English vocabulary.
Please explain the highlighted words/phrases from the text below:
- Provide simple definitions in English at this context
- Give 2-3 example sentences for each highlighted word/phrase

${combinedText}
link: ${window.location.href}

Please return the key points in a JSON format.
The JSON format should be like this:
[
  {
    "highlight": "highlight text",
    "context": "context text",
    "explanation": "explanation text",
    "examples": ["example 1", "example 2"],
    "link": "link text"
  }
]
        `;

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
