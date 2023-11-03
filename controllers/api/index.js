const router = require('express').Router();
const recipeRoutes = require('./recipeRoute');
const ingredientRoutes = require('./ingredientRoutes');
const Rec_IngredRoutes = require('./Rec_IngredRoutes');

router.use('/recipe', recipeRoutes);
router.use('/ingredient', ingredientRoutes);
router.use('//Rec_IngredRoutes', Rec_IngredRoutes);

module.exports = router;
