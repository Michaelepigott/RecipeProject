const router = require('express').Router();
const { Recipe, User, Ingredient, Join } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all recipes and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['user_name'],
        },
        {
          model: Ingredient,
          through: {
            model: Join,
            attributes: ['quantity', 'measurement'],
          },
          as: 'ingredients',
          attributes: ['name']
        }
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    console.log(recipes)
    console.log('first recipe')
    console.log(recipes[0])
    // Pass serialized data and session flag into template
    res.render('homepage', {
      recipes,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// router.get('/recipe/:id', async (req, res) => {
//   try {
//     const recipeData = await Recipe.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           as: 'user',
//           attributes: ['user_name'],
//         },
//       ],
//     });

//     const recipe = recipeData.get({ plain: true });

//     res.render('recipe', {
//       ...recipe,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newRecipe', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['newRecipe'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render('newRecipe', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status('you must be logged in').json(err);
  }
});

router.get('/signUp', async (req, res) => {
  try {

    res.render('signUp') 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;


