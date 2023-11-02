const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const RecipeIngredient = require('./recipeIngredient');
<<<<<<< HEAD

Recipe.hasMany(RecipeIngredient, {
=======
const User = require('./User');
const UserRecipe = require('./UserRecipe');


User.belongsToMany(Recipe, {
    through: UserRecipe,
    foreignKey: 'userId',
    as: 'recipes', 
});

Recipe.belongsToMany(User, {
    through: UserRecipe,
    foreignKey: 'recipeId',
});

Recipe.belongsToMany(Ingredient, {
    through: RecipeIngredient,
>>>>>>> main
    foreignKey: 'recipeId',
    onDelete: 'CASCADE',
    as: 'ingredients',
});

<<<<<<< HEAD

Ingredient.hasMany(RecipeIngredient, {
=======
Ingredient.belongsToMany(Recipe, {
    through: RecipeIngredient,
>>>>>>> main
    foreignKey: 'ingredientId',
    onDelete: 'CASCADE',
    as: 'recipes', 
});

<<<<<<< HEAD
RecipeIngredient.belongsTo(Recipe, {
    foreignKey: 'recipeId',
});


RecipeIngredient.belongsTo(Ingredient, {
    foreignKey: 'ingredientId',
});

module.exports = { Recipe, Ingredient, RecipeIngredient };
=======
// ecipeIngredient.belongsTo(Recipe, {
//     foreignKey: 'recipeId',
// });


// RecipeIngredient.belongsTo(Ingredient, {
//     foreignKey: 'ingredientId',
// });

module.exports = { Recipe, Ingredient, RecipeIngredient, User, UserRecipe };
>>>>>>> main

