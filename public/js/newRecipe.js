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
    const closeBtn = document.getElementById("close-button");
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
    
        // Validation checks
        let errors = [];
        if (ingqty === '' || isNaN(ingqty) || ingqty <= 0) {
            errors.push("Enter a valid quantity as a number (use decimals for fractions).");
        }
        if (ingunit === 'unit') {
            errors.push("Please select a unit of measurement.");
        }
        if (ingname === '') {
            errors.push("Please enter the ingredient name.");
        }
    
        // If there are errors, show them in a modal, else add the ingredient
        if (errors.length > 0) {
            document.getElementById('modal-text').innerText = "Please correct the following:\n- " + errors.join("\n- ");
            openModal();
        } else {
            let ing = new Ingredient(ingqty, ingunit, ingname);
            ingredients.push(ing);
            localStorage.setItem('added-ingredients', JSON.stringify(ingredients));
            ingredientsDisplay();
        }
    }
    
    function openModal() {
        var myModal = new bootstrap.Modal(document.getElementById('modal'));
        myModal.show();
    }
    
    function closeModal() {
        var myModal = new bootstrap.Modal(document.getElementById('modal'));
        myModal.hide();
    }
    
    // Add event listener for closing the modal
    closeBtn.addEventListener('click', closeModal);
    
    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        let modal = document.getElementById('modal');
        if (event.target == modal) {
            closeModal();
        }
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
                window.location.href = '/profile'; 
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
        if (validateForm()) {
            postData(new ServerPacket(tiinput.value, instinput.value, ingredients));
        } else {
            // Show error message in the modal
            showModal("Please fill in all required fields.");
        }
    });

    function validateForm() {
        // Check if title, instructions, and ingredients are provided
        if (tiinput.value.trim() === '' || instinput.value.trim() === '' || ingredients.length === 0) {
            return false; // Form is invalid
        }
        return true;
    }

    function showModal(message) {
        document.getElementById('modal-text').innerText = message;
        var myModal = new bootstrap.Modal(document.getElementById('modal'));
        myModal.show();
    }

    // Dropdown unit selection logic
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            var selectedText = this.textContent;
            unitButton.textContent = selectedText; 
        });
    });
    qtyinput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9\.]/g, ''); 
    });

    qtyinput.addEventListener('keypress', function(e) {
        if (!/^[0-9]*\.?[0-9]*$/.test(this.value + e.key)) {
            e.preventDefault();
        }
        });
});


