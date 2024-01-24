chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('Message received in content script:', request);
  if (request.action === 'modifyContent') {
    var dataList = request.dataList;

    if (!Array.isArray(dataList)) {
      console.error('Invalid dataList format. Expected an array.');
      return;
    }

    dataList.forEach(element => {
      if (!element || typeof element !== 'object' || !('class' in element) || !('text' in element) || !('category' in element)) {
        console.error('Invalid element format. Expected an object with "class", "text", and "category" properties.');
        return;
      }

      // Split the class names by space
      var targetClasses = element['class'].split(' ');

      // Iterate through each class name
      targetClasses.forEach(targetClass => {
        // Find elements with the current class name
        var elements = document.getElementsByClassName(targetClass);
        if (!elements || elements.length === 0) {
          console.warn(`No elements found with class "${targetClass}".`);
          return;
        }

        for (var i = 0; i < elements.length; i++) {
          var currentElement = elements[i];
          if (!currentElement.textContent) {
            console.warn('Current element has no text content.');
            continue;
          }

          var currentText = currentElement.textContent.trim().toLowerCase();
          var targetText = element['text'].trim().toLowerCase();

          if (currentText === targetText) {
            // Create a new span element for the text
            var textSpan = document.createElement('span');
            textSpan.textContent = element['category']; // Replace with the category

            // Style the text span
            textSpan.style.display = 'block';
            textSpan.style.background = 'white'; // Replace with desired background color
            textSpan.style.border = '1px solid black'; // Replace with desired border style
            textSpan.style.padding = '5px'; // Replace with desired padding

            // Wrap the text span inside a div
            var textDiv = document.createElement('div');
            textDiv.style.position = 'relative';
            textDiv.appendChild(textSpan);

            // Insert the text div before the current element
            currentElement.insertAdjacentElement('beforebegin', textDiv);

            // Add border to the current element
            currentElement.style.border = '2px solid red';
          }
        }
      });
    });
  }
});
