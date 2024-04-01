//for client-side functioning

//summarize n keywords
document.getElementById('summarize-button').addEventListener('click', async function () {
  const fileInput = document.getElementById('document-upload');
  const file = fileInput.files[0];
  const wordLimit = document.getElementById('wordLimit').value; // Get selected word limit

  if (!file) {
    alert('Please choose a .txt file.');
    return;
  }

  const reader = new FileReader();

  reader.onload = async function (event) {
    const documentContent = event.target.result;

    // Call the API to get summary
    const summaryResponse = await fetch('/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `document=${encodeURIComponent(documentContent)}&wordLimit=${wordLimit}` // Pass word limit to the server
    });

    const summaryResult = await summaryResponse.json();

    // Store summary in local storage
    localStorage.setItem('summary', JSON.stringify(summaryResult.summary));

    // Display summary
    const summaryElement = document.getElementById('summaryResult');
    summaryElement.innerHTML = `<p><strong>Summary:</strong> ${summaryResult.summary}</p>`;

    // Call the API to get keywords
    const keywordsResponse = await fetch('/getKeywords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `document=${encodeURIComponent(documentContent)}`
    });

    const keywordsResult = await keywordsResponse.json();

    // Store keywords in local storage
    localStorage.setItem('keywords', JSON.stringify(keywordsResult.keywords));

    // Display keywords
    const keywordsElement = document.getElementById('keywords');
    keywordsElement.innerHTML = `<p><strong>Keywords:</strong> ${keywordsResult.keywords}</p>`;
  };

  reader.readAsText(file);
});


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
      
      // Store translation result in localStorage
      localStorage.setItem('translationResult', JSON.stringify(result.translation));

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

      // Store sentiment analysis result in localStorage
      const localsentiment = localStorage.setItem('sentimentResult', JSON.stringify(result.sentiment));
      console.log('localsentimentval:',localsentiment);
      document.getElementById('sentiment-result').innerHTML = `<p><strong>Sentiment:</strong> ${result.sentiment}</p>`;
    } catch (error) {
      console.error('Error analyzing sentiment:', error.message);
      alert('Error analyzing sentiment. Please try again.');
    }
  };

  reader.readAsText(file);
});

//sentiment chart
// const reader = new FileReader();
// reader.onload = async function (event) {
//   const documentContent = event.target.result;
  

//   try {
//     const response = await fetch('/sentiment', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: `document=${encodeURIComponent(documentContent)}`,
//     });

//     const result = await response.json();

//     document.getElementById('sentiment-result').innerHTML = `<p><strong>Sentiment:</strong> ${result.sentiment}</p>`;

//     // Ensure that sentimentData is included in the response
//     if (result.sentimentData) {
//       // Call drawSentimentChart function with sentiment data
//       drawSentimentChart(result.sentimentData);
//     } else {
//       console.error('Error: Sentiment data not found in response.');
//     }
//   } catch (error) {
//     console.error('Error analyzing sentiment:', error.message);
//     alert('Error analyzing sentiment. Please try again.');
//   }
// };


//funct call
// Define an async function to handle the click event
// document.getElementById('analyze-sentiment-button').addEventListener('click', async function () {
//   const fileInput = document.getElementById('document-upload');
//   const file = fileInput.files[0];

//   if (!file) {
//     alert('Please choose a file.');
//     return;
//   }

//   const reader = new FileReader();

//   reader.onload = async function (event) {
//     const documentContent = event.target.result;

//     try {
//       const response = await fetch('/sentiment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `document=${encodeURIComponent(documentContent)}`,
//       });

//       const result = await response.json();

//       document.getElementById('sentiment-result').innerHTML = `<p><strong>Sentiment:</strong> ${result.sentiment}</p>`;

//       // Call drawSentimentChart function with sentiment data
//       drawSentimentChart(result.sentimentData);
//     } catch (error) {
//       console.error('Error analyzing sentiment:', error.message);
//       alert('Error analyzing sentiment. Please try again.');
//     }
//   };

//   reader.readAsText(file);
// });


//--------------------------------------------------------------------------------
// Visual representation 1
// document.getElementById('visual-representation-button').addEventListener('click', async function () {
//   const fileInput = document.getElementById('document-upload');
//   const file = fileInput.files[0];

//   if (!file) {
//     alert('Please choose a file.');
//     return;
//   }

//   const reader = new FileReader();

//   reader.onload = async function (event) {
//     const documentContent = event.target.result;

//     try {
//       const chartCode = await generateChartCode(documentContent);
//       generateVisualization(chartCode);
//     } catch (error) {
//       console.error('Error generating visual representation:', error.message);
//       alert('Error generating visual representation. Please try again.');
//     }
//   };

//   reader.readAsText(file);
// });

// async function generateChartCode(documentContent) {
//   try {
//     const response = await fetch('/generate-chart', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ document: documentContent }),
//     });

//     const result = await response.json();
//     return result.chartCode;
//   } catch (error) {
//     throw new Error('Failed to fetch chart code from server');
//   }
// }

//2
const visualdatabtn = document.getElementById('visual-representation-button');
const chartCanvas = document.getElementById('chartCanvas');

const chartTypes = ['bar', 'line', 'pie']; // Predefined chart type options

visualdatabtn.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append('document', file);

  try {
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    const chartConfig = {
      type: null, // Initially set to null
      data: {
        labels: [], // Empty array for labels
        datasets: [] // Empty array for datasets
      }
    };

    const openAIResponse = await response.json();
    // Parse OpenAI response to extract suggested chart type and potentially labels/data formatting

    // Example: Assuming OpenAI suggests "bar" chart and provides labels & data
    chartConfig.type = openAIResponse.suggestedChartType; // Replace with parsed type
    chartConfig.data.labels = openAIResponse.labels; // Replace with parsed labels
    chartConfig.data.datasets.push({
      label: 'Data', // Adjust label if needed
      data: openAIResponse.data, // Replace with parsed data
      // ... other dataset options based on OpenAI suggestions
    });
      // Store chart data in local storage
  localStorage.setItem('chartData', JSON.stringify(chartData));
    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, chartConfig);
  } catch (error) {
    console.error(error);
    alert('Error generating chart');
  }
});


//--------------------------------------------------------------------------------
//check local storage
// Retrieve stored data from localStorage
const summary = localStorage.getItem('summary');
const keywords = localStorage.getItem('keywords');
const translationResult = localStorage.getItem('translationResult');
const sentimentResult = localStorage.getItem('sentimentResult');
const chartData = localStorage.getItem('chartData');

// Log the retrieved data to the console
console.log('localSummary:', summary);
console.log('localKeywords:', keywords);
console.log('localTranslation Result:', translationResult);
console.log('localSentiment Result:', sentimentResult);
console.log('localChart Data:', chartData);

























//  Commented code
//----------------------------------------------------------------------------------
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

//summarization 1 (fully working)
// document.getElementById('document-upload').addEventListener('change', async function (event) {
//   event.preventDefault(); // Prevent default form submission

//   const file = event.target.files[0];

//   if (!file) {
//     alert('Please choose a .txt file.');
//     return;
//   }

//   const reader = new FileReader();

//   reader.onload = async function (event) {
//     const documentContent = event.target.result;

//     const response = await fetch('/summarize', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded' // Updated content type
//       },
//       body: `document=${encodeURIComponent(documentContent)}` // Updated body format
//     });

//     const result = await response.json();

//     document.getElementById('summaryResult').innerHTML = `<p><strong>Summary:</strong> ${result.summary}</p>`;
//   };

//   reader.readAsText(file);
// });

//summarize 1 (fully working)
// document.getElementById('summarize-button').addEventListener('click', async function () {
//   const fileInput = document.getElementById('document-upload');
//   const file = fileInput.files[0];

//   if (!file) {
//     alert('Please choose a .txt file.');
//     return;
//   }

//   const reader = new FileReader();

//   reader.onload = async function (event) {
//     const documentContent = event.target.result;

//     const response = await fetch('/summarize', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: `document=${encodeURIComponent(documentContent)}`
//     });

//     const result = await response.json();

//     document.getElementById('summaryResult').innerHTML = `<p><strong>Summary:</strong> ${result.summary}</p>`;
//   };

//   reader.readAsText(file);
// });

//summary wordlimit
// document.getElementById('summarize-button').addEventListener('click', async function () {
//   const fileInput = document.getElementById('document-upload');
//   const file = fileInput.files[0];
//   const wordLimit = document.getElementById('wordLimit').value; // Get selected word limit

//   if (!file) {
//     alert('Please choose a .txt file.');
//     return;
//   }

//   const reader = new FileReader();

//   reader.onload = async function (event) {
//     const documentContent = event.target.result;

//     const response = await fetch('/summarize', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: `document=${encodeURIComponent(documentContent)}&wordLimit=${wordLimit}` // Pass word limit to the server
//     });

//     const result = await response.json();

//     document.getElementById('summaryResult').innerHTML = `<p><strong>Summary:</strong> ${result.summary}</p>`;
//   };

//   reader.readAsText(file);
// });


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