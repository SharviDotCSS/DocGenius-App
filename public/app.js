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
  
  