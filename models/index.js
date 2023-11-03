const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const RecipeIngredient = require('./Rec_Ingred');
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
    foreignKey: 'recipeId',
    onDelete: 'CASCADE',
    as: 'ingredients',
});

Ingredient.belongsToMany(Recipe, {
    through: RecipeIngredient,
    foreignKey: 'ingredientId',
    onDelete: 'CASCADE',
    as: 'recipes', 
});

// ecipeIngredient.belongsTo(Recipe, {
//     foreignKey: 'recipeId',
// });


// RecipeIngredient.belongsTo(Ingredient, {
//     foreignKey: 'ingredientId',
// });

module.exports = { Recipe, Ingredient, RecipeIngredient, User, UserRecipe };

