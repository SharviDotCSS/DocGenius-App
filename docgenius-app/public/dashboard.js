const analysisHistoryElement = document.getElementById('analysis-history');
const usernameElement = document.getElementById('username');

// Fetch analysis history data from your server-side code (replace with your implementation)
const analysisHistory = [
  {
    type: 'Summary',
    date: '2024-03-17',
    sourceDocument: 'Sample document.txt'
  },
  // Add more entries as needed
];

const username = 'username'; // Replace with actual username
usernameElement.textContent = username;

// function createAnalysisCard(entry) {
//   const card = document.createElement('div');
//   card.classList.add('analysis-card');

//   const icon = document.createElement('div');
//   icon.classList.add('analysis-icon');
//   const iconContent = document.createElement('i');
//   iconContent.classList.add('fas', 'fa-file-alt'); // Font Awesome document icon
//   icon.appendChild(iconContent);
//   card.appendChild(icon);

//   const details = document.createElement('div');
//   details.classList.add('analysis-details');

//   const title = document.createElement('h5');
//   title.classList.add('analysis-title');
//   title.textContent = `${entry.type} - ${entry.date}`;
//   details.appendChild(title);

//   const info = document.createElement('p');
//   info.classList.add('analysis-info');
//   info.textContent = `Source: ${entry.sourceDocument || 'N/A'}`;
//   details.appendChild(info);

//   const buttonContainer = document.createElement('div');
//   buttonContainer.classList.add('button-container');

//   const deleteButton = document.createElement('button');
//   deleteButton.classList.add('btn', 'delete-button', 'btn-sm');
//   deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Font Awesome trash icon
//   deleteButton.addEventListener('click', () => {
//     // Remove the card when delete button is clicked
//     card.remove();
//   });
//   buttonContainer.appendChild(deleteButton);

//   const downloadButton = document.createElement('button');
//   downloadButton.classList.add('btn', 'download-button', 'btn-sm');
//   downloadButton.textContent = 'Download';
//   downloadButton.addEventListener('click', () => {
//     // Implement download functionality using your server-side logic
//     alert('Download functionality not yet implemented!');
//   });
//   buttonContainer.appendChild(downloadButton);

//   const shareButton = document.createElement('button');
//   shareButton.classList.add('btn', 'share-button', 'btn-sm');
//   shareButton.textContent = 'Share';
//   shareButton.addEventListener('click', () => {
//     // Implement share functionality using your server-side logic
//     alert('Share functionality not yet implemented!');
//   });
//   buttonContainer.appendChild(shareButton);

//   details.appendChild(buttonContainer);

//   card.appendChild(details);

//   return card;
// }
//working create card----------------------------------------------------
// function createAnalysisCard(entry) {
//   const card = document.createElement('div');
//   card.classList.add('analysis-card');

//   // Set custom data attributes to store card data
//   card.setAttribute('data-type', entry.type);
//   card.setAttribute('data-date', entry.date);
//   card.setAttribute('data-source-document', entry.sourceDocument);

//   const icon = document.createElement('div');
//   icon.classList.add('analysis-icon');
//   const iconContent = document.createElement('i');
//   iconContent.classList.add('fas', 'fa-file-alt'); // Font Awesome document icon
//   icon.appendChild(iconContent);
//   card.appendChild(icon);

//   const details = document.createElement('div');
//   details.classList.add('analysis-details');

//   const title = document.createElement('h5');
//   title.classList.add('analysis-title');
//   title.textContent = `${entry.type} - ${entry.date}`;
//   details.appendChild(title);

//   const info = document.createElement('p');
//   info.classList.add('analysis-info');
//   info.textContent = `Source: ${entry.sourceDocument || 'N/A'}`;
//   details.appendChild(info);

//   const buttonContainer = document.createElement('div');
//   buttonContainer.classList.add('button-container');

//   const deleteButton = document.createElement('button');
//   deleteButton.classList.add('btn', 'delete-button', 'btn-sm');
//   deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Font Awesome trash icon
//   deleteButton.addEventListener('click', () => {
//     // Remove the card when delete button is clicked
//     card.remove();
//   });
//   buttonContainer.appendChild(deleteButton);
//----------------------------------------------------------------

function createAnalysisCard(entry) {
  const card = document.createElement('div');
  card.classList.add('analysis-card');

  // Set custom data attributes to store card data
  card.setAttribute('data-type', entry.type);
  card.setAttribute('data-date', entry.date);
  card.setAttribute('data-source-document', entry.sourceDocument);

  const icon = document.createElement('div');
  icon.classList.add('analysis-icon');
  const iconContent = document.createElement('i');
  iconContent.classList.add('fas', 'fa-file-alt'); // Font Awesome document icon
  icon.appendChild(iconContent);
  card.appendChild(icon);

  const details = document.createElement('div');
  details.classList.add('analysis-details');

  const title = document.createElement('h5');
  title.classList.add('analysis-title');
  title.textContent = `${entry.type} - ${entry.date}`;
  details.appendChild(title);

  const info = document.createElement('p');
  info.classList.add('analysis-info');
  info.textContent = `Source: ${entry.sourceDocument || 'N/A'}`;
  details.appendChild(info);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'delete-button', 'btn-sm');
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Font Awesome trash icon
  deleteButton.addEventListener('click', () => {
    // Remove the card when delete button is clicked
    card.remove();
  });
  buttonContainer.appendChild(deleteButton);
 
  // Share button
const shareButton = document.createElement('button');
shareButton.classList.add('btn', 'share-button', 'btn-sm');
shareButton.innerHTML = '<i class="fas fa-share"></i>'; // Font Awesome share icon
shareButton.id = 'share-button';
shareButton.addEventListener('click', () => {
  // Placeholder function for share functionality
  shareFunctionality(entry);
});
buttonContainer.appendChild(shareButton);

//working without file data
// function shareFunctionality(entry) {
//   // Check if the Web Share API is supported
//   if (navigator.share) {
//     // Call the Web Share API with the share data
//     navigator.share({
//       title: entry.type,
//       text: `Source: ${entry.sourceDocument || 'N/A'}`,
//       url: window.location.href
//     })
//     .then(() => console.log('Successfully shared'))
//     .catch((error) => console.error('Error sharing:', error));
//   } else {
//     // Fallback behavior if Web Share API is not supported
//     alert('Sharing is not supported on this browser.');
//   }
// }

function shareFunctionality(entry) {
  // Retrieve stored data from localStorage
  const summary = localStorage.getItem('summary') || 'N/A';
  const keywords = localStorage.getItem('keywords') || 'N/A';
  const translationResult = localStorage.getItem('translationResult') || 'N/A';
  const sentimentResult = localStorage.getItem('sentimentResult') || 'N/A';

  // Construct the share message
  const shareMessage = `
Summary:
- ${summary.replace(/\\n/g, '\n- ')}

Keywords:
- ${keywords.replace(/\\n/g, '\n- ')}

Translation Result:
- ${translationResult.replace(/\\n/g, '\n- ')}

Sentiment Result:
- ${sentimentResult.replace(/\\n/g, '\n- ')}
`;

  console.log('Share message:', shareMessage); // Log the share message

  // Check if the Web Share API is supported
  if (navigator.share) {
    // Call the Web Share API with the constructed message
    navigator.share({
      title: entry.type,
      text: shareMessage.trim(), // Trim any leading/trailing whitespace
      url: window.location.href
    })
    .then(() => console.log('Successfully shared'))
    .catch((error) => console.error('Error sharing:', error));
  } else {
    // Fallback behavior if Web Share API is not supported
    alert('Sharing is not supported on this browser.');
  }
}







  // const downloadButton = document.createElement('button');
  // downloadButton.classList.add('btn', 'download-button', 'btn-sm');
  // downloadButton.textContent = 'Download';
  // downloadButton.addEventListener('click', () => {
  //   // Implement download functionality using your server-side logic
  //   alert('Download functionality not yet implemented!');
  // });
  // buttonContainer.appendChild(downloadButton);

  const openButton = document.createElement('button');
  openButton.classList.add('btn', 'open-button', 'btn-sm'); // Add the necessary classes
  openButton.textContent = 'Open'; // Change the button text to "Open"
  openButton.id = 'open-button'; // Change the button ID if needed
  // openButton.addEventListener('click', () => {
  //   // Implement the functionality to open the document using your server-side logic
  //   alert('Open functionality not yet implemented!');
  // });
  buttonContainer.appendChild(openButton);


  // const shareButton = document.createElement('button');
  // shareButton.classList.add('btn', 'share-button', 'btn-sm');
  // shareButton.textContent = 'Share';
  // shareButton.addEventListener('click', () => {
  //   // Implement share functionality using your server-side logic
  //   alert('Share functionality not yet implemented!');
  // });
  // buttonContainer.appendChild(shareButton);

  const downloadButton = document.createElement('button');
  downloadButton.classList.add('btn', 'download-button', 'btn-sm');
  downloadButton.textContent = 'Download';
  downloadButton.id = 'download-button'; // Set the ID
  downloadButton.setAttribute('name', 'download-button'); // Set the name attribute
  downloadButton.addEventListener('click', () => {
    // Implement download functionality using your server-side logic
    // alert('Download functionality not yet implemented!');
    downloadButton.addEventListener('click', () => {
      // Retrieve data from localStorage
  const summary = (localStorage.getItem('summary') || 'N/A').replace(/\\n/g, '\n');
  const keywords = (localStorage.getItem('keywords') || 'N/A').replace(/\\n/g, '\n');
  const translationResult = (localStorage.getItem('translationResult') || 'N/A').replace(/\\n/g, '\n');
  const sentimentResult = (localStorage.getItem('sentimentResult') || 'N/A').replace(/\\n/g, '\n');

  // Construct the content for the text file with labels, new lines, and spacing
  const fileContent = `Summary: ${summary}\n\nKeywords: ${keywords}\n\nTranslation Result: ${translationResult}\n\nSentiment Result: ${sentimentResult}`;

  // Create a Blob object with the file content
  const blob = new Blob([fileContent], { type: 'text/plain' });

  // Create a download link
  const downloadLink = document.createElement('a');
  downloadLink.download = 'analysis_data.txt'; // Set the filename
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.click();
});
    
  });

  buttonContainer.appendChild(downloadButton);


  details.appendChild(buttonContainer);

  card.appendChild(details);

  return card;
}


// analysisHistory.forEach(entry => {
//   const card = createAnalysisCard(entry);
//   analysisHistoryElement.appendChild(card);
// });

//----------------------------------------------------------------------------------------
// Function to open the modal
// function openModal(content) {
//   const modal = document.getElementById('myModal');
//   const modalContent = document.getElementById('modal-content');
//   modal.style.display = 'block';
//   modalContent.innerHTML = content;
// }

// // Function to close the modal
// function closeModal() {
//   const modal = document.getElementById('myModal');
//   modal.style.display = 'none';
// }

// // Attach event listener to each card
// analysisHistory.forEach(entry => {
//   const card = createAnalysisCard(entry);
//   card.addEventListener('click', () => {
//     const modalContent = `
//       <h2>${entry.type} - ${entry.date}</h2>
//       <p>Source: ${entry.sourceDocument || 'N/A'}</p>
//       <!-- Add more content here as needed -->
//     `;
//     openModal(modalContent);
//   });
//   analysisHistoryElement.appendChild(card);
// });

// // Close modal when close button is clicked
// document.getElementsByClassName('close')[0].addEventListener('click', closeModal);

// // Close modal when user clicks outside of it
// window.onclick = function(event) {
//   const modal = document.getElementById('myModal');
//   if (event.target === modal) {
//     closeModal();
//   }
// };

// Function to open the modal with provided content
function openModal(content) {
  const modal = document.getElementById('myModal');
  const modalContent = document.getElementById('modal-content');
  modal.style.display = 'block';
  modalContent.innerHTML = content;


}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('myModal');
  modal.style.display = 'none';
}

// Attach event listener to each card
analysisHistory.forEach(entry => {
  const card = createAnalysisCard(entry);
  analysisHistoryElement.appendChild(card);
});

// Open modal when the "Open" button inside a card is clicked
analysisHistoryElement.addEventListener('click', event => {
  const openButton = event.target.closest('.open-button');
  if (openButton) {
    const card = openButton.closest('.analysis-card');
    if (card) {
      // Retrieve stored data from localStorage
      const summary = localStorage.getItem('summary');
      const keywords = localStorage.getItem('keywords');
      const translationResult = localStorage.getItem('translationResult');
      const sentimentResult = localStorage.getItem('sentimentResult');
      const chartImageData = localStorage.getItem('chartImagetData');

      // Construct modal content using the retrieved data
      const modalContent = `
        <h2>${'Document Analysis Report'}</h2>
        <p>Source: ${card.sourceDocument || 'Annual-Sales-Report-Year-2023'}</p>
        <p>Summary: ${summary || 'N/A'}</p>
        <p>Keywords: ${keywords || 'N/A'}</p>
        <p>Translation Result: ${translationResult || 'N/A'}</p>
        <p>Sentiment Result: ${sentimentResult || 'N/A'}</p>
        <img src="${chartImageData || ''}" alt="Chart Image">
        <!-- Add more content here as needed -->
      `;
      openModal(modalContent);
    }
  }
});

// Close modal when close button is clicked
document.getElementsByClassName('close')[0].addEventListener('click', closeModal);

// Close modal when user clicks outside of it
window.onclick = function (event) {
  const modal = document.getElementById('myModal');
  if (event.target === modal) {
    closeModal();
  }
};






//----------------------------------------------------------------------------------------
// // Function to create Draft.js Editor
// import { Editor, EditorState, convertFromRaw } from 'draft-js';

// function createDraftEditor(content) {
//   const editorContainer = document.createElement('div');
//   editorContainer.className = 'draft-editor';

//   const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
//   const editor = document.createElement('div');
//   editor.className = 'editor';
//   editor.setAttribute('contenteditable', false); // Set readOnly to true
//   editor.appendChild(editorState.getCurrentContent().getPlainText()); // Set content here

//   editorContainer.appendChild(editor);
//   return editorContainer;
// }

// // Event listener for card click
// analysisHistoryElement.addEventListener('click', event => {
//   const card = event.target.closest('.analysis-card');
//   if (!card) return; // Exit if the clicked element is not a card

//   // Retrieve stored data from localStorage
//   const summary = localStorage.getItem('summary');
//   const keywords = localStorage.getItem('keywords');
//   const translationResult = localStorage.getItem('translationResult');
//   const sentimentResult = localStorage.getItem('sentimentResult');
//   const chartData = localStorage.getItem('chartData');

//   // Display the content in a Draft.js Editor
//   const editorContainer = document.getElementById('editor-container');
//   editorContainer.innerHTML = ''; // Clear existing content
//   switch (card.dataset.type) {
//     case 'summary':
//       editorContainer.appendChild(createDraftEditor(summary));
//       break;
//     case 'keywords':
//       editorContainer.appendChild(createDraftEditor(keywords));
//       break;
//     case 'translation':
//       editorContainer.appendChild(createDraftEditor(translationResult));
//       break;
//     case 'sentiment':
//       editorContainer.appendChild(createDraftEditor(sentimentResult));
//       break;
//     case 'chart':
//       editorContainer.appendChild(createDraftEditor(chartData));
//       break;
//     default:
//       break;
//   }
// });
