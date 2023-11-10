const router = require('express').Router();
const recipeRoutes = require('./recipeRoute');
const usersRoutes = require('./usersRoutes');
// const profileRoutes = require('./profileRoute');

router.use('/recipe', recipeRoutes);
router.use('/users', usersRoutes);
// router.use('/profile', profileRoutes);

module.exports = router;
