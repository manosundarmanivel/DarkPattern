chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const extractedText = message.extractedText;
    document.getElementById('extractedText').textContent = `Extracted Text: ${extractedText}`;
    console.log(extractedText);
});
console.log("mano");