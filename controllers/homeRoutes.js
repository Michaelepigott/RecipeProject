const router = require('express').Router();
const { Recipe, Ingredient, Rec_Ingred, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all recipe ingredients and JOIN with Recipe and Ingredient data
        const recIngredData = await Rec_Ingred.findAll({
            include: [
                {
                    model: Recipe,
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
        const recIngreds = recIngredData.map((recIngred) => recIngred.get({ plain: true }));
    
        // Pass serialized data and session flag into template
        res.render('homepage', { 
            recIngreds, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
