
function extractText() {

  const fullText = document.body.innerText;

  // Send the extracted text to the background script
  chrome.runtime.sendMessage({ extractedText: fullText.trim() });

  console.log("ms" + fullText);
}

// Execute the extraction when the DOM is ready
document.addEventListener('DOMContentLoaded', extractText);
