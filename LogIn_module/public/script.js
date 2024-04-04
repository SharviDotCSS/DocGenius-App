
const form = document.getElementById('login-form');
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('password-error');

    form.addEventListener('submit', function(event) {
      const password = passwordInput.value;

      if (!isPasswordValid(password)) {
        event.preventDefault(); // Prevent form submission
        passwordError.textContent = "Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character.";
        passwordInput.classList.add('error');
      } else {
        passwordError.textContent = "";
        passwordInput.classList.remove('error');
      }
    });

    function isPasswordValid(password) {
      // Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character
      const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    }








































































// document.addEventListener('DOMContentLoaded', () => {
//     const loginForm = document.getElementById('login-form');
//     const emailInput = document.getElementsByName('email')[0];
//     const passwordInput = document.getElementById('password');
//     const emailError = document.getElementById('email-error');
//     const passwordError = document.getElementById('password-error');
//     const submitButton = document.querySelector('.cta-button');

//     // Function to validate email and password fields
//     function validateFields() {
//         const emailValue = emailInput.value.trim();
//         const passwordValue = passwordInput.value;

//         console.log("Email: ",emailValue);
//         console.log("Password: ",passwordValue);

//         // Clear previous error messages
//         emailError.textContent = '';
//         passwordError.textContent = '';

//         // Simple validation
//         if (emailValue === '') {
//             emailError.textContent = 'Please enter your email address.';
//             return false;
//         }

//         if (passwordValue === '') {
//             passwordError.textContent = 'Please enter your password.';
//             return false;
//         }

//         return true;
//     }
//     // Add event listener to the form for submit
//     submitButton.addEventListener('click', async (e) => {
//         e.preventDefault();
    
//         // Validate fields
//         const isValid = validateFields();
    
//         if (isValid) {
//             const formData = {
//                 Email: emailInput.value.trim(),
//                 Password: passwordInput.value
//             };

//             console.log('Email:', emailInput.value.trim());
//         console.log('Password:', passwordInput.value);
    
//             // Log email value before sending the login request
//             console.log('Email value:', formData.Email);
    
//             try {
//                 const response = await fetch('/login', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(formData)
//                 });
    
//                 if (!response.ok) {
//                     throw new Error('Failed to authenticate');
//                 }
    
//                 // Reset the form after successful login
//                 loginForm.reset();
    
//                 // Redirect the user to another page upon successful login
//                 window.location.href = '/dashboard.html';
//             } catch (error) {
//                 console.error('Login error:', error.message);
//                 // Display an error message to the user
//             }
//         }
//     });
    
// })//
