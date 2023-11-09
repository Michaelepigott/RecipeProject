//puts elements into dom
submitbtn = document.getElementById("submitbtn");
ingbtn = document.getElementById("ingbutton");
instinput = document.getElementById("instructions");
tiinput = document.getElementById("title");
inginput = document.getElementById("ingredient");
qtyinput = document.getElementById("quantity");
fracinput = document.getElementById("fraction");
unitinput = document.getElementById("unit");
ingdisplay = document.getElementById("ingdisplay");
ingredients = [];
const recipiePostlink = '/api/recipe/create'

function ingredient(qty,unit, name, fraction){
    this.qty = qty;
    this.name = name;
    this.unit = unit;
    this.instructions = instructions;
    this.fraction =  fraction;
}


function ingredientadd(){
    let ingqty = qtyinput.value;
    let ingunit = unitinput.value;
    let ingname = inginput.value;
    let ingfrac = fracinput.value;

    let ing = new ingredient(ingqty, ingunit, ingname, ingfrac);

    ingredients.push(ing);
    localStorage.setItem('added-ingredients',JSON.stringify(searchHistory));
    ingredientsdisplay()
}


function ingredientsdisplay(){
    ingdisplay.innerhtml = '';
    storedIngredients = localStorage.getItem('added-ingredients');
    if (storedIngredients){
        storedIngredients = JSON.parse(storedIngredients);
    }
    storedIngredients.forEach(function (ingredient){
        var listitem = document.createElement('li');
        listitem.textcontent = `${ingredient.qty} ${ingredient.unit} of ${ingredient.name}`;
        ingdisplay.appendChild(listitem);
    })

}


function serverPacket(name, instructions, ingredients){
    this.name = name;
    this.instructions = instructions;
    this.ingredients = ingredients;
}

async function postData(data) {
    try { 
        const response = await fetch(recipiePostlink, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), 
        });

        const result = await response.json();
        console.log("Success:", result);
 } catch (error) {
    console.error("Error:", error);
 }
} 

function sendToServer(){  
     var sendTitle = tiinput.value;
     var sendingredients = ingredients;
     var sendinstructions = instinput;
    
     var sendpacket = new serverPacket(sendTitle, sendingredients, sendinstructions);
     postData(sendpacket);
};




ingbtn.addEventListener('click',function(event){
    event.preventDefault();
    ingredientadd();
})


submitbtn.addEventListener('click',function(event){
    event.preventDefault();
    sendToServer();
})

$(function () {
    $('[data-bs-toggle="dropdown"]').dropdown();
});

$(function () {
    // Add a click event handler to all dropdown items
   // **Solution**: Instead of `.click(fn)` use `.on("click", fn)`. Instead of `.click()` use `.trigger("click")`.
    $('.dropdown-item').on('click', function (event) {
        // Prevent the default behavior of the anchor tag
        event.preventDefault();

        // Get the text of the clicked item
        var selectedText = $(this).text();

        // Update the button's text with the selected text
        $('#unit').text(selectedText);
       
    });
});
