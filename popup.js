document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM content loaded');
    
    var extractButton = document.getElementById('extractButton');
    
    if (extractButton) {
      console.log('Button element found');
      
      extractButton.addEventListener('click', function () {
        console.log('Button clicked');
        
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          var currentTab = tabs[0];
          var url = currentTab.url;
          displayURL(url);
          sendURLToServer(url);
        });
      });
    } else {
      console.error("Element with ID 'extractButton' not found");
    }

    
    function displayURL(url) {
      var urlDisplay = document.getElementById('urlDisplay');
      
      if (urlDisplay) {
        console.log('Displaying URL:', url);
        urlDisplay.textContent = "Finding Dark Pattern In: " + url;
      } else {
        console.error("Element with ID 'urlDisplay' not found");
      }
    }
    function sendURLToServer(url) {
        // Replace 'http://localhost:8000' with the actual URL of your FastAPI server
        var serverURL = 'http://192.168.77.24:8000/process_url/'; 
       
        fetch(serverURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: url }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Server response:', data);
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
              // Example list of data to send
              
              var currentTabId = tabs[0].id;
              console.log(currentTabId);
              // Send a message to the content script along with the list
              chrome.tabs.sendMessage(currentTabId, { action: 'modifyContent', dataList: data });
              console.log('Message sent to content script');

            });
          
            // You can handle the server response as needed
          })
          .catch(error => {
            console.error('Error sending data to server:', error);
          });
      }
  });
