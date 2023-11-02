var ingredientInput = document.getElementById('text1');
var amountInput = document.getElementById('text2');
var unitInput = document.getElementById('dropdown');
var buttonEl = document.getElementById('submit')
function ingredient(name, amount, unit){
    this.name = name;
    this.amount = amount;
    this.unit = unit;
}

function addIngredient(){
    var newIngredient = ingredientInput.value;
    var newAmount = amountInput.value;
    var newUnit = unitInput.value;
    var output = new ingredient(newIngredient, newAmount, newUnit);
    console.log(output);
    return output;
    
};


buttonEl.addEventListener('click', function(event){
  event.preventDefault();
  addIngredient();  
});

function recipie(name,tags, ingredients, user, instructions){
    this.ingredients = ingredients;
    this.name = name;
    this.tags = tags;
    this.instructions = instructions;
    this.user =  user;
}
