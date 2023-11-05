const Recipe = require('./Recipe');
const Ingredient = require('./Ingredient');
const Join = require('./Join');
const User = require('./User');

// Recipe belongsto User
Recipe.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
})
// User has many Recipes
User.hasMany(Recipe, {
    foreignKey: 'user_id', 
    as: 'recipes',
});
// Recipes belongToMany Ingredients
Recipe.belongsToMany(Ingredient, {
    through: Join,
    foreignKey: 'recipe_id',
    as: 'ingredients',
});
// Ingredients belongToMany Recipes
Ingredient.belongsToMany(Recipe, {
    through: Join,
    foreignKey: 'ingredient_id',
    as: 'recipes',
});


module.exports = { Recipe, Ingredient, Join, User };

