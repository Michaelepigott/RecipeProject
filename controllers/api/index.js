const router = require('express').Router();
const recipeRoutes = require('./recipeRoute');
const ingredientRoutes = require('./ingredientRoutes');
const Rec_IngredRoutes = require('./Rec_IngredRoutes');
const userRoutes = require('./UserRoutes');

router.use('/recipe', recipeRoutes);
router.use('/ingredient', ingredientRoutes);
router.use('//Rec_IngredRoutes', Rec_IngredRoutes);
router.use('//User', userRoutes);

module.exports = router;
