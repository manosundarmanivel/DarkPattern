
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const extractedText = message.text;
  

    chrome.browserAction.setPopup({
      popup: 'popup.html'
    });
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { extractedText });
    });
  });
  