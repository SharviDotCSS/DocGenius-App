const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const form = document.getElementById('loginForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Clear previous errors
  usernameInput.classList.remove('is-invalid');
  passwordInput.classList.remove('is-invalid');
  usernameInput.nextElementSibling.textContent = '';
  passwordInput.nextElementSibling.textContent = '';

  let isValid = true;

  // Username validation
  if (!usernameInput.value.trim()) {
    usernameInput.classList.add('is-invalid');
    usernameInput.nextElementSibling.textContent = 'Username cannot be empty';
    isValid = false;
  } else if (!/^[a-zA-Z0-9_]+$/.test(usernameInput.value)) {
    usernameInput.classList.add('is-invalid');
    usernameInput.nextElementSibling.textContent = 'Username can only contain letters, numbers, and underscores';
    isValid = false;
  }

  // Password validation
  if (!passwordInput.value.trim()) {
    passwordInput.classList.add('is-invalid');
    passwordInput.nextElementSibling.textContent = 'Password cannot be empty';
    isValid = false;
  } else if (passwordInput.value.length < 8) {
    passwordInput.classList.add('is-invalid');
    passwordInput.nextElementSibling.textContent = 'Password must be at least 8 characters long';
    isValid = false;
  } else if (!/\d/.test(passwordInput.value)) {
    passwordInput.classList.add('is-invalid');
    passwordInput.nextElementSibling.textContent = 'Password must contain at least one number';
    isValid = false;
  } else if (!/[A-Z]/.test(passwordInput.value)) {
    passwordInput.classList.add('is-invalid');
    passwordInput.nextElementSibling.textContent = 'Password must contain at least one uppercase letter';
    isValid = false;
  } else if (!/[^a-zA-Z0-9]/.test(passwordInput.value)) {
    passwordInput.classList.add('is-invalid');
    passwordInput.nextElementSibling.textContent = 'Password must contain at least one special character';
    isValid = false;
  }

  // Enable/disable login button based on validation
  loginButton.disabled = !isValid;
});
