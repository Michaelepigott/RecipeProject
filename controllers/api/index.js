const router = require('express').Router();
const recipeRoutes = require('./recipeRoutes');
const ingredientRoutes = require('./ingredientRoutes');
const ingredientRecipeRoutes = require('./ingredientRecipeRoutes');

router.use('/recipe', recipeRoutes);
router.use('/ingredient', ingredientRoutes);
router.use('/ingredientRecipe', ingredientRecipeRoutes);

module.exports = router;
