document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    const submitbtn = document.getElementById("submitbtn");
    const ingbtn = document.getElementById("ingbutton");
    const instinput = document.getElementById("instructions");
    const tiinput = document.getElementById("title");
    const inginput = document.getElementById("ingredient");
    const qtyinput = document.getElementById("quantity");
    const unitButton = document.getElementById("unit");
    const ingdisplay = document.getElementById("ingdisplay");
    const recipePostLink = '/api/recipe/create';
    let ingredients = [];

    // Ingredient class
    function Ingredient(quantity, measurement, name) {
        this.quantity = quantity;
        this.measurement = measurement;
        this.name = name;
    }

    // Add ingredient to the list and display
    function ingredientAdd() {
        let ingqty = qtyinput.value;
        let ingunit = unitButton.textContent;
        let ingname = inginput.value;

        let ing = new Ingredient(ingqty, ingunit, ingname);
        ingredients.push(ing);
        localStorage.setItem('added-ingredients', JSON.stringify(ingredients));
        ingredientsDisplay();
    }

    // Display ingredients on the page
    function ingredientsDisplay() {
        ingdisplay.innerHTML = ''; // Clear the display
        ingredients.forEach(function(ingredient) {
            var listItem = document.createElement('li');
            listItem.textContent = `${ingredient.quantity} ${ingredient.measurement} of ${ingredient.name}`;
            ingdisplay.appendChild(listItem);
        });
    }

    // Server packet data structure
    function ServerPacket(name, instructions, ingredients) {
        this.name = name;
        this.instructions = instructions;
        this.ingredients = ingredients;
    }

    // Post data to the server and handle response
    async function postData(data) {
        try {
            const response = await fetch(recipePostLink, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Success:", result);
                // Redirect to the profile page if the submission is successful
                window.location.href = '/profile'; // Modify this URL to the correct profile page route
            } else {
                throw new Error('Network response was not ok.');
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Event listeners for buttons
    ingbtn.addEventListener('click', function(event) {
        event.preventDefault();
        ingredientAdd();
    });

    submitbtn.addEventListener('click', function(event) {
        event.preventDefault();
        postData(new ServerPacket(tiinput.value, instinput.value, ingredients));
    });

    // Dropdown unit selection logic
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            var selectedText = this.textContent;
            unitButton.textContent = selectedText; // Update the button text
        });
    });
});


