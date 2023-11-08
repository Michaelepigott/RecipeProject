const router = require('express').Router();
const recipeRoutes = require('./recipeRoute');
const usersRoutes = require('./usersRoutes');

router.use('/recipe', recipeRoutes);
router.use('/users', usersRoutes);

module.exports = router;
