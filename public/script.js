// UI functioning

const sidebar = document.getElementById('sidebar');
const translationSection = document.querySelector('.translation-section');
const targetLanguageSelect = document.getElementById('target-language');


// Add click event listener to toggle sidebar visibility (optional)
sidebar.addEventListener('click', function() {
  sidebar.classList.toggle('collapsed');
});

// Implement menu item selection and content switching functionality here (replace with your logic)
// Get references to relevant elements
const sidebarLinks = document.querySelectorAll('.nav-link');
const variableTitle = document.getElementById('variable-title');

// Add click event listener to each sidebar link
sidebarLinks.forEach(link => {
  link.addEventListener('click', handleLinkClick);
});

function handleLinkClick(event) {
  // Extract the menu item text
  const selectedItem = event.target.textContent.trim();

  // Update the variable title in the right section
  variableTitle.textContent = selectedItem;

  // Replace this with your logic to dynamically update the content
  // based on the selected item (e.g., fetch data or render specific templates)
  // For example:
  const contentPlaceholder = document.querySelector('.variable-content .container');
  contentPlaceholder.innerHTML = `<h2>Content for ${selectedItem}</h2>`;
}






