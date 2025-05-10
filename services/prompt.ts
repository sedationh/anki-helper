import nlp from "compromise";

/**
 * Generates a prompt for language learning assistance based on highlighted text
 * @param highlightElements Array of highlighted DOM elements
 * @param currentUrl Current page URL
 * @returns Generated prompt text
 */
export function generatePrompt(
  highlightElements: NodeListOf<Element> | Element[],
  currentUrl: string
): string {
  let combinedText = "";

  // Process each highlight separately
  highlightElements.forEach((highlight) => {
    const highlightText = highlight.textContent?.trim() || "";

    // Find the container that includes the highlight
    const container = highlight.closest("p, div, h1, h2, h3, h4, h5, h6, pre, body");
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

  return `You are a helpful assistant that explains English vocabulary.
Please explain the highlighted words/phrases from the text below:
- Provide simple definitions in English at this context
- Give 2-3 example sentences for each highlighted word/phrase
- If the context is not complete or wrong, fix it. if the context is to long, adjust it to a reasonable length

${combinedText}
link: ${currentUrl.length > 75 ? "" : currentUrl}

Please return the key points in a JSON format.
The JSON format should be like this:
[
  {
    "highlight": "highlight text",
    "context": "context text",
    "explanation": "explanation text",
    "examples": ["example 1", "example 2"],
    "pronunciation": "美 /ˌpɪktʃə'resk/",
    "link": "link text"
  }
]`;
}
