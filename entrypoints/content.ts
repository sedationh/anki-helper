import nlp from "compromise";

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    // Listen for keyboard shortcut
    document.addEventListener("keydown", (event) => {
      if (event.altKey && event.shiftKey && event.code === "KeyS") {
        event.preventDefault();

        let combinedText = "";

        // Process each highlight separately
        document.querySelectorAll("web-highlight").forEach((highlight) => {
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
          })
          .catch((err) => {
            console.error("Failed to copy to clipboard:", err);
          });
      }
    });
  },
});
