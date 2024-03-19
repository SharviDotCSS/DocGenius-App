//for client-side functioning

//1. Summarization
// document.getElementById('summarizeForm').addEventListener('submit', async function (event) {
//     event.preventDefault();

//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];

//     if (!file) {
//       alert('Please choose a .txt file.');
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = async function (event) {
//       const documentContent = event.target.result;

//       const response = await fetch('/summarize', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `document=${encodeURIComponent(documentContent)}`,
//       });

//       const result = await response.json();

//       document.getElementById('summaryResult').innerHTML = `<p><strong>Summary:</strong> ${result.summary}</p>`;
//     };

//     reader.readAsText(file);
//   });

// app.js

document.getElementById('document-upload').addEventListener('change', async function (event) {
  event.preventDefault(); // Prevent default form submission

  const file = event.target.files[0];

  if (!file) {
    alert('Please choose a .txt file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (event) {
    const documentContent = event.target.result;

    const response = await fetch('/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Updated content type
      },
      body: `document=${encodeURIComponent(documentContent)}` // Updated body format
    });

    const result = await response.json();

    document.getElementById('summaryResult').innerHTML = `<p><strong>Summary:</strong> ${result.summary}</p>`;
  };

  reader.readAsText(file);
});


// Add this code for translation--wrong filepath
//   document.getElementById('translate-button').addEventListener('click', async function () {
//   const targetLanguage = document.getElementById('target-language').value;
//   const documentContent = document.getElementById('document-upload').value; // Assuming you have an input field for document content

//   try {
//     const response = await fetch('/translate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: `document=${encodeURIComponent(documentContent)}&targetLanguage=${targetLanguage}`,
//     });

//     const result = await response.json();

//     document.getElementById('translation-result').innerHTML = `<p><strong>Translation:</strong> ${result.translation}</p>`;
//   } catch (error) {
//     console.error('Error translating document:', error.message);
//     alert('Error translating document. Please try again.');
//   }
// });

// ----------------------------------------------------------------------------------
//Translation
document.getElementById('translate-button').addEventListener('click', async function () {
  const targetLanguage = document.getElementById('target-language').value;
  const fileInput = document.getElementById('document-upload');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please choose a file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (event) {
    const documentContent = event.target.result;
    console.log('Target Language:', targetLanguage); // Add this line for debugging

    try {
      const response = await fetch('/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `document=${encodeURIComponent(documentContent)}&targetLanguage=${targetLanguage}`,
      });

      const result = await response.json();

      document.getElementById('translation-result').innerHTML = `<p><strong>Translation:</strong> ${result.translation}</p>`;
    } catch (error) {
      console.error('Error translating document:', error.message);
      alert('Error translating document. Please try again.');
    }
  };

  reader.readAsText(file);
});


//--------------------------------------------------------------------------------
// Sentimental analysis
document.getElementById('analyze-sentiment-button').addEventListener('click', async function () {
  const fileInput = document.getElementById('document-upload');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please choose a file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (event) {
    const documentContent = event.target.result;

    try {
      const response = await fetch('/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `document=${encodeURIComponent(documentContent)}`,
      });

      const result = await response.json();

      document.getElementById('sentiment-result').innerHTML = `<p><strong>Sentiment:</strong> ${result.sentiment}</p>`;
    } catch (error) {
      console.error('Error analyzing sentiment:', error.message);
      alert('Error analyzing sentiment. Please try again.');
    }
  };

  reader.readAsText(file);
});

//--------------------------------------------------------------------------------
// Visual representation
document.getElementById('visual-representation-button').addEventListener('click', async function () {
  const fileInput = document.getElementById('document-upload');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please choose a file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (event) {
    const documentContent = event.target.result;

    try {
      // Perform any processing needed for visual representation
      const visualData = processDataForVisualization(documentContent);

      // Generate visual representation using chart.js or other method
      generateVisualization(visualData);
    } catch (error) {
      console.error('Error generating visual representation:', error.message);
      alert('Error generating visual representation. Please try again.');
    }
  };

  reader.readAsText(file);
});

// Function to process document content for visualization (replace with your logic)
function processDataForVisualization(documentContent) {
  // Here you can process the document content to extract data for visualization
  // For example, parse text data into structured format, perform calculations, etc.
  // Return the processed data that will be used for generating the visual representation
}

// Function to generate visual representation using chart.js or other method (replace with your logic)
function generateVisualization(visualData) {
  // Here you can use chart.js or other libraries/methods to generate visual representations
  // For example, create charts, graphs, diagrams, etc. based on the processed data
  // Update the DOM with the generated visual representation
  //trial
  // Get the container element where you want to display the visual representation
  const visualRepresentationResult = document.getElementById('visual-representation-result');

  // Check if visualData is undefined or empty
  if (typeof visualData === 'undefined' || !visualData.trim()) {
    // Display an error message if the data is undefined or empty
    visualRepresentationResult.innerHTML = "<p>No data received for visualization.</p>";
  } else {
    // Update the container with the received code
    visualRepresentationResult.innerHTML = `<pre><code>${visualData}</code></pre>`;
  }
}

