const router = require('express').Router();
const { RecipeIngredient } = require('../../models');
const withAuth = require('../../utils/auth');

// GET one recipe by Id
router.get('/:recipeId', async (req, res) => {
    try {
      const recipeId = await RecipeIngredient.findByPk(req.params.recipeId);
      if (!recipeId) {
        res.status(404).json({ message: 'No recipe with this id!' });
        return;
      }
      res.status(200).json(recipeId);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// POST create a new recipe
router.post('/', async (req, res) => {
    try {
      const recipeId = await RecipeIngredient.create(req.body);
      res.status(200).json(recipeId);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // Updates recipe by Id
router.put('/:recipeId', (req, res) => {
    // Calls the update method on the Recipe model
    RecipeIngredient.update(
      {
        // All the fields you can update and the data attached to the request body.
        ingredientId: req.body.ingredientId,
        quantity: req.body.quantity,
        measurement:req.body.measurement,
      },
      {
        // Gets the recipes based on the id given in the request parameters
        where: {
            recipeId: req.params.recipeId,
        },
      }
    )
      .then((updatedRecipe) => {
        // Sends the updated Recipe as a json response
        res.json(updatedRecipe);
      })
      .catch((err) => res.status(500).json("Could not find name to update"));
  });

  //delete recipe
router.delete('/:recipeId', async (req, res) => {
    try {
      const recipeId = await RecipeIngredient.destroy({
        where: {
            recipeId: req.params.recipeId
        },
      });
  
      if (!recipeId) {
        res.status(404).json({ message: 'No Recipe found with this id!' });
        return;
      }
  
      res.status(200).json(blogData, + "Recipe has been deleted");
    } catch (err) {
      res.status(500).json("Could not be deleted");
    }
  });

  module.exports = router;
  