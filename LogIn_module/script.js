document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const submitButton = document.querySelector('.cta-button');

    // Function to validate email and password fields
    function validateFields() {
        const emailValue = emailInput.value.trim();
        const passwordValue = passwordInput.value;

        // Clear previous error messages
        emailError.textContent = '';
        passwordError.textContent = '';

        // Simple validation
        if (emailValue === '') {
            emailError.textContent = 'Please enter your email address.';
            return false;
        }

        if (passwordValue === '') {
            passwordError.textContent = 'Please enter your password.';
            return false;
        }

        return true;
    }

    // Add event listener to the form for submit
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate fields
        const isValid = validateFields();

        if (isValid) {
            // Here you would typically send the login data to the server for authentication
            // For demonstration purposes, I'll just log the values to console
            console.log('Email:', emailInput.value.trim());
            console.log('Password:', passwordInput.value);

            // Reset the form after successful login (you will add this code)
            loginForm.reset();

            // You can redirect the user to another page upon successful login
            // window.location.href = '/dashboard.html';
        }
    });

    // Enable submit button only when both email and password are provided
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            const isValidForm = validateFields();
            if (isValidForm) {
                submitButton.removeAttribute('disabled');
            } else {
                submitButton.setAttribute('disabled', 'true');
            }
        });
    });
});
