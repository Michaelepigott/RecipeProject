const router = require('express').Router();
const recipeRoutes = require('./recipeRoute');
const userRoutes = require('./userRoutes');

router.use('/recipe', recipeRoutes);
router.use('/user', userRoutes);

module.exports = router;
