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

ingbtn.addEventListener('click',function(event){
    event.preventDefault();
    ingredientadd();
})

