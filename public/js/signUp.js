
const signupFormHandler = async (event) => {
event.preventDefault();

const user_name = document.querySelector('#username-signup').value.trim();
const password = document.querySelector('#password-signup').value.trim();

    if (user_name && password) {
    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ user_name, password }),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
    } else {
        const data = await response.json();
        const errorContainer = document.querySelector('#signup-error-message');
        if (errorContainer) {
                errorContainer.textContent = data.message;
                errorContainer.style.display = 'block';
        }
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);