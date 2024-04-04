// UI functioning

const sidebar = document.getElementById('sidebar');
const translationSection = document.querySelector('.translation-section');
const sentimentSection = document.querySelector('.sentiment-section'); // Add this line
const targetLanguageSelect = document.getElementById('target-language');
const visualRepresentationSection = document.querySelector('.visual-representation-section');

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

// Hide all content sections initially
translationSection.style.display = 'none';
sentimentSection.style.display = 'none'; 
visualRepresentationSection.style.display = 'none';

function handleLinkClick(event) {
  // Extract the menu item text
  const selectedItem = event.target.textContent.trim();

  // Update the variable title in the right section
  variableTitle.textContent = selectedItem;

  // Hide all content sections initially
  translationSection.style.display = 'none';
  sentimentSection.style.display = 'none';
  visualRepresentationSection.style.display = 'none'; // Hide the visual representation section

  // Show the relevant content section based on the selected item
  if (selectedItem === 'Translation') {
    translationSection.style.display = 'block';
    // You can add logic here to initialize elements or perform any actions specific to the Translation section
  } else if (selectedItem === 'Sentimental Analysis') {
    sentimentSection.style.display = 'block';
    // You can add logic here to initialize elements or perform any actions specific to the Sentimental Analysis section
  } else if (selectedItem === 'Visual Representation') {
    visualRepresentationSection.style.display = 'block';
  }
}


//Redirecting event listeners

document.addEventListener('DOMContentLoaded', () => {
  const signupButton = document.getElementById('signup-button');

  // Add event listener to the sign-up button
  signupButton.addEventListener('click', () => {
      // Redirect to the sign-up page
      window.location.href = 'Signup-module/signup.html';
  });
});


//ststic chrt func
// Function to draw a bar chart
function drawBarChart() {
  // Data for the chart
  const data = {
    labels: ['Total Revenue', 'Tech Gadgets', 'Home Appliances', 'Health & Wellness'],
    datasets: [{
      label: 'Achievements',
      backgroundColor: 'rgba(255, 215, 0, 0.5)', // Yellow color
          borderColor: 'rgba(255, 215, 0, 1)', // Yellow color
      borderWidth: 1,
      data: [20, 15, 10, 8] // Sample data for achievements
    }]
  };

  // Options for the chart
  const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  // Get the canvas element
  const canvas = document.getElementById('chart-canvas');
  // Get the 2D drawing context
  const context = canvas.getContext('2d');

  // Create a new bar chart
  new Chart(canvas, {
    type: 'bar',
    data: data,
    options: options
  });

  const imageDataUrl = canvas.toDataURL();
  localStorage.setItem('chartImageData', imageDataUrl);

  // // Convert canvas to data URL (image)
  // const imageDataUrl = canvas.toDataURL();

  // // Store image data in localStorage
  // localStorage.setItem('chartImageData', imageDataUrl);
}

// Add event listener to the button
document.getElementById('visual-representation-button').addEventListener('click', function () {
  // Get the canvas element
  // const canvas = document.getElementById('chart-canvas');
  // Get the 2D drawing context
  // const context = canvas.getContext('2d');
  // Call the function to draw the chart
  drawBarChart();
  // Convert canvas to data URL (image)
  // const imageDataUrl = canvas.toDataURL();

  // Store image data in localStorage
  // localStorage.setItem('chartImageData', imageDataUrl);
});

function redirectToDashboard() {
  // Set the URL of the dashboard.html page
  window.location.href = 'dashboard.html';
}















































//gemini
// function handleLinkClick(event) {
//   // Extract the menu item text
//   const selectedItem = event.target.textContent.trim();

//   // Update the variable title in the right section
//   variableTitle.textContent = selectedItem;

//   // Replace this with your logic to dynamically update the content
//   // based on the selected item (e.g., fetch data or render specific templates)
//   // For example:
//   const contentPlaceholder = document.querySelector('.variable-content .container');
//   contentPlaceholder.innerHTML = `<h2>Content for ${selectedItem}</h2>`;
// }