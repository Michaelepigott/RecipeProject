async function newFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#name').value;
    const ingredient = document.querySelector('#ingrient').value;
    const instructions = document.querySelector('#instructions').value;
    const user_name = document.querySelector('#user_name').value;


    const response = await fetch(`/api/Recipe`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            ingredient,
            instructions,
            user_name,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add recipe');
    }
}

document
    .querySelector('.new-recipe-form')
    .addEventListener('submit', newFormHandler);