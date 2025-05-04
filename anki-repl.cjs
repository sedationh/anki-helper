const readline = require('readline');

async function invokeAnkiConnect(action, params = {}) {
  const response = await fetch("http://localhost:8765", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action,
      version: 6,
      params,
    }),
  });
  return response.json();
}

async function addNote(highlight, context, explanation, examples, link) {
  const boldContext = context.replace(
    new RegExp(highlight, 'gi'),
    `<b>$&</b>`
  );

  const note = {
    deckName: "Default",
    modelName: "问题模板",
    fields: {
      问题: boldContext,
      答案: `${explanation}<br>${examples
        .map((example) => `- ${example}`)
        .join("<br>")}`,
      相关知识: `<a href="${link}">${link}</a>`,
    },
    options: {
      allowDuplicate: false,
      duplicateScope: "deck",
    },
  };

  try {
    const result = await invokeAnkiConnect("addNote", { note });
    console.log(`Added note for: ${highlight}`);
    return result;
  } catch (error) {
    console.error(`Error adding note for ${highlight}:`, error);
    return null;
  }
}

async function processCommand(input) {
  try {
    const data = JSON.parse(input);
    if (!Array.isArray(data)) {
      console.log('Input must be an array of card data');
      return;
    }

    for (const item of data) {
      const { highlight, context, explanation, examples, link } = item;
      if (!highlight || !context || !explanation || !examples || !link) {
        console.log('Invalid card data format');
        continue;
      }
      await addNote(highlight, context, explanation, examples, link);
    }
  } catch (error) {
    console.error('Error processing input:', error.message);
  }
}

async function readMultilineInput() {
  return new Promise((resolve) => {
    let input = '';
    console.log('Enter or paste your JSON data (press Ctrl+D or Ctrl+Z when done):');
    
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    function handleData(chunk) {
      // Check for Ctrl+D (Unix) or Ctrl+Z (Windows)
      if (chunk.includes('\u0004') || chunk.includes('\u001a')) {
        process.stdin.removeListener('data', handleData);
        process.stdin.setRawMode(false);
        process.stdin.pause();
        console.log('\n'); // Add a newline after input
        resolve(input.replace(/\u0004|\u001a/g, ''));
        return;
      }

      // Handle backspace/delete
      if (chunk === '\b' || chunk === '\x7f') {
        if (input.length > 0) {
          input = input.slice(0, -1);
          process.stdout.write('\b \b');
        }
        return;
      }

      process.stdout.write(chunk);
      input += chunk;
    }

    process.stdin.on('data', handleData);
  });
}

async function startREPL() {
  console.log('Welcome to Anki Helper');
  console.log('Paste your JSON data and press Ctrl+D (Unix) or Ctrl+Z (Windows) when done\n');

  while (true) {
    const input = await readMultilineInput();
    if (input.trim()) {
      await processCommand(input.trim());
    }
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const answer = await new Promise((resolve) => {
      rl.question('\nContinue? (y/n): ', (answer) => {
        rl.close();
        resolve(answer.toLowerCase());
      });
    });
    
    if (answer !== 'y') {
      break;
    }
  }

  process.exit(0);
}

// Start the REPL
startREPL().catch(console.error); 