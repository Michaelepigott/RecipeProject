
const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const user_name = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (user_name  && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ user_name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  console.log("here2")
      if (response.ok) {
        document.location.replace('/newRecipe');
      } else {
        alert(response.statusText);
      }
    }
  };


  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);