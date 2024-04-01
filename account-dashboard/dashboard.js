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

  const downloadButton = document.createElement('button');
  downloadButton.classList.add('btn', 'download-button', 'btn-sm');
  downloadButton.textContent = 'Download';
  downloadButton.addEventListener('click', () => {
    // Implement download functionality using your server-side logic
    alert('Download functionality not yet implemented!');
  });
  buttonContainer.appendChild(downloadButton);

  const shareButton = document.createElement('button');
  shareButton.classList.add('btn', 'share-button', 'btn-sm');
  shareButton.textContent = 'Share';
  shareButton.addEventListener('click', () => {
    // Implement share functionality using your server-side logic
    alert('Share functionality not yet implemented!');
  });
  buttonContainer.appendChild(shareButton);

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

// Open modal when any card is clicked
analysisHistoryElement.addEventListener('click', event => {
  const card = event.target.closest('.analysis-card');
  if (card) {
    const modalContent = `
      <h2>${card.type} - ${card.date}</h2>
      <p>Source: ${card.sourceDocument || 'N/A'}</p>
      <!-- Add more content here as needed -->
    `;
    openModal(modalContent);
  }
});

// Close modal when close button is clicked
document.getElementsByClassName('close')[0].addEventListener('click', closeModal);

// Close modal when user clicks outside of it
window.onclick = function(event) {
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
