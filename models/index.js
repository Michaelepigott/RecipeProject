const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const RecipeIngredient = require('./recipeIngredient');

Recipe.hasMany(RecipeIngredient, {
    foreignKey: 'recipeId',
    onDelete: 'CASCADE',
    as: 'ingredients',
});


Ingredient.hasMany(RecipeIngredient, {
    foreignKey: 'ingredientId',
    onDelete: 'CASCADE',
    as: 'recipes', 
});

RecipeIngredient.belongsTo(Recipe, {
    foreignKey: 'recipeId',
});


RecipeIngredient.belongsTo(Ingredient, {
    foreignKey: 'ingredientId',
});

module.exports = { Recipe, Ingredient, RecipeIngredient };

