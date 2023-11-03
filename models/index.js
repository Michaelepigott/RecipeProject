const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const Rec_Ingred = require('./Rec_Ingred');
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
    through: Rec_Ingred,
    foreignKey: 'recipeId',
    onDelete: 'CASCADE',
    as: 'ingredients',
});

Ingredient.belongsToMany(Recipe, {
    through: Rec_Ingred,
    foreignKey: 'ingredientId',
    onDelete: 'CASCADE',
    as: 'recipes', 
});


module.exports = { Recipe, Ingredient, Rec_Ingred, User, UserRecipe };

