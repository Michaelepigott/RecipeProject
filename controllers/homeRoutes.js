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
    // console.log(recipes)
    // console.log('first recipe')
    // console.log(recipes[0])
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
// ___________________________________________________________________________________

// Profile page route
router.get('/profile', withAuth, async (req, res) => {
  try {
      const userData = await User.findByPk(req.session.user_id, {
      attributes: ['user_name'],
      include: [{
              model: Recipe,
          attributes: ['id', 'name', 'instructions'],
          include: [{
                  model: Ingredient,
                  as: 'ingredients',
                  attributes: ['name'],
                  through: {
                      model: Join,
                      attributes: ['quantity', 'measurement'], 
              },
                  required: false,
              }],
              as: 'recipes',
          }],
      });
      
      
  
          if (!userData) {
                  return res.status(404).send('User not found');
      }
  
      const user = userData.get({ plain: true });
  
          res.render('profile', {
          userRecipes: user.recipes, 
              logged_in: true,
          });
      } catch (err) {
      console.error(err);
          res.status(500).send('Server Error');
      }
  });


//____________________________________________________________________________________

// Use withAuth middleware to prevent access to route
router.get('/newRecipe', withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id)
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, 
      // {
      // attributes: { exclude: ['password'] },
      // include: [{ model: Recipe }],
    // }
    );

    const user = userData.get({ plain: true });
console.log(user)
    res.render('newRecipe', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/newRecipe');
    return;
  }

  res.render('login');
});
//_______________________________________________________________________________

router.get('/new', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    res.render('new', {
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




router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect them to the profile page
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  // Otherwise, render the signup page
  res.render('signUp');
});


module.exports = router;


