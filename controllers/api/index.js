const router = require('express').Router();
const recipeRoutes = require('./recipeRoute');
// const ingredientRoutes = require('./ingredientRoutes');
// const joinRoutes = require('./join');
const userRoutes = require('./userRoutes');

router.use('/recipe', recipeRoutes);
// router.use('/ingredient', ingredientRoutes);
// router.use('/Rec_Ingred', joinRoutes);
router.use('/user', userRoutes);

module.exports = router;
