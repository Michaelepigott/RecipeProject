const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

if (username && password) {
const response = await fetch('/api/users/login', {
method: 'POST',
body: JSON.stringify({ username, password }),
headers: { 'Content-Type': 'application/json' },
});

if (response.ok) {
document.location.replace('/profile');
} else {
    
    const data = await response.json();
    const errorContainer = document.querySelector('#error-message');
    if (errorContainer) {
        errorContainer.textContent = data.message; 
        errorContainer.style.display = 'block';   
    }
    }
    }
};

document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
