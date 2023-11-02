// Get the parent element of the dropdown
const measureParent = document.querySelector('.Measurement_Choices');

// Add a click event listener to the parent element
measureParent.addEventListener('click', function (event) {
    // Check if the clicked element is an anchor tag
    if (event.target.tagName === 'A') {
        // Get the selected value
        const selectedValue = event.target.textContent;

        // Convert the selected value to a string
        const measure = String(selectedValue);

        // Use the stringValue as needed
        console.log(measure);
    }
});

// Get the parent element of the dropdown
const numberParent = document.querySelector('.Number_Choices');

// Add a click event listener to the parent element
numberParent.addEventListener('click', function (event) {
    // Check if the clicked element is an anchor tag
    if (event.target.tagName === 'A') {
        // Get the selected value
        const selectedValue = event.target.textContent;

        // Convert the selected value to a string
        const number = String(selectedValue);

        // Use the stringValue as needed
        console.log(number);
    }
});

// Get the parent element of the dropdown
const fractionParent = document.querySelector('.Fraction_Choices');

// Add a click event listener to the parent element
fractionParent.addEventListener('click', function (event) {
    // Check if the clicked element is an anchor tag
    if (event.target.tagName === 'A') {
        // Get the selected value
        const selectedValue = event.target.textContent;

        // Convert the selected value to a string
        const fraction = String(selectedValue);

        // Use the stringValue as needed
        console.log(fraction);
    }
});