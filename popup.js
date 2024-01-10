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
        urlDisplay.textContent = "Current Tab URL: " + url;
      } else {
        console.error("Element with ID 'urlDisplay' not found");
      }
    }
    function sendURLToServer(url) {
        // Replace 'http://localhost:8000' with the actual URL of your FastAPI server
        var serverURL = 'http://192.168.13.25:8000/upload'; 
       
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
            if(data["model_output"]==1)
            document.getElementById("response").textContent = "Dark Pattern Found";
            else
            document.getElementById("response").textContent = "Dark Pattern Not Found";
            // You can handle the server response as needed
          })
          .catch(error => {
            console.error('Error sending data to server:', error);
          });
      }
  });