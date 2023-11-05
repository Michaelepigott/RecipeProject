const router = require('express').Router();
const { Recipe, User, Join, Ingredient} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all recipe ingredients and JOIN with Recipe and Ingredient data
        const recipeData = await Recipe.findAll({
            include: [
                {
                    model: Join,
                    attributes: ['id', 'name'],
                    as: 'recipes'
                },
                {
                    model: Ingredient,
                    attributes: ['id', 'name'],
                    as: 'ingredients'
                }
            ]
        });

        // Serialize data so the template can read it
        const final = recipeData.map((recipes) => recipes.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('homepage', { 
            final, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
