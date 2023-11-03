const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

// GET one recipe
router.get('/:id', async (req, res) => {
    try {
      const recipeData = await Recipe.findByPk(req.params.id);
      if (!recipeData) {
        res.status(404).json({ message: 'No recipe with this id!' });
        return;
      }
      res.status(200).json(recipeData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// POST create a new recipe
router.post('/', async (req, res) => {
    try {
      const recipeData = await Recipe.create(req.body);
      res.status(200).json(recipeData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // Updates recipe
router.put('/;id', (req, res) => {
    // Calls the update method on the Recipe model
    Recipe.update(
      {
        // All the fields you can update and the data attached to the request body.
        name: req.body.name,
        instructions: req.body.instructions,
      },
      {
        // Gets the recipes based on the name given in the request parameters
        where: {
          name: req.params.name,
        },
      }
    )
      .then((updatedRecipe) => {
        // Sends the updated Recipe as a json response
        res.json(updatedRecipe);
      })
      .catch((err) => res.status(500).json(err));
  });

  //delete recipe
router.delete('/:id', async (req, res) => {
    try {
      const recipeData = await Recipe.destroy({
        where: {
          id: req.params.id
        },
      });
  
      if (!recipeData) {
        res.status(404).json({ message: 'No Recipe found with this id!' });
        return;
      }
  
      res.status(200).json({message: "Recipe has been deleted"});
    } catch (err) {
      res.status(500).json("Could not be deleted");
    }
  });

  module.exports = router;
  