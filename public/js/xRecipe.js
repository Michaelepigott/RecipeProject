document.addEventListener('DOMContentLoaded', function() {
    const recipeForm = document.getElementById('recipeForm');
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    const addIngredientButton = document.getElementById('addIngredient');

    addIngredientButton.addEventListener('click', function() {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add('ingredient');
        ingredientDiv.innerHTML = `
            <input type="text" name="ingredientName" placeholder="Ingredient Name" required>
        `;
        ingredientsContainer.appendChild(ingredientDiv);
    });

    recipeForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(recipeForm);

        // Extract recipe name and instructions
        const recipeName = formData.get('recipeName');
        const recipeInstructions = formData.get('recipeInstructions');

        // Extract ingredient names
        const ingredientNames = formData.getAll('ingredientName');

        // Construct the data object
        const recipeData = {
            recipe: {
                name: recipeName,
                instructions: recipeInstructions,
            },
            ingredients: ingredientNames, // Send an array of ingredient names
        };

        // Send the recipeData to the server using a fetch request or an AJAX request.
        // Replace the following with your server endpoint and method.
        fetch('/api/recipe/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Recipe data submitted successfully:', data);
            // You can perform additional actions here, such as displaying a success message.
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle any errors that may occur during the submission.
        });
    });
});