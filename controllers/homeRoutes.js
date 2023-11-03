const router = require('express').Router();
const { Recipe, Ingredient, Rec_Ingred, User, UserRecipe } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all final recipes by a certain user and JOIN with user data
      const recIngredData = await Rec_Ingred.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      // Serialize data so the template can read it
      const rec_Ingreds = recIngredData.map((rec_Ingred) => rec_Ingred.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        rec_Ingreds, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;