const router = require('express').Router();
const { Rec_Ingred } = require('../../models');
const withAuth = require('../../utils/auth');

// GET one recipe by Id
router.get('/:recipeId', async (req, res) => {
    try {
      const recipeId = await Rec_Ingred.findByPk(req.params.recipeId);
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
      const recipeId = await Rec_Ingred.create(req.body);
      res.status(200).json(recipeId);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // Updates recipe by Id
  router.put('/:recipeId/:ingredientId', async (req, res) => {
    // Extracting IDs for clarity
    const { recipeId, ingredientId } = req.params;
    
    try {
        // Update a specific RecipeIngredient
        const [updateCount] = await Rec_Ingred.update(req.body, {
            where: {
                recipeId: recipeId,
                ingredientId: ingredientId
            }
        });

        if (updateCount > 0) {
            // Fetch the updated Rec_Ingred record
            const updatedRec_Ingred = await Rec_Ingred.findOne({
                where: {
                    recipeId: recipeId,
                    ingredientId: ingredientId
                }
            });
            res.json(updatedRec_Ingred);
        } else {
            res.status(404).json({ message: 'No matching recipe ingredient found to update' });
        }
    } catch (err) {
        res.status(500).json({ message: "Could not update recipe ingredient", error: err.message });
    }
});


  //delete recipe
  router.delete('/:recipeId', async (req, res) => {
    try {
        const rec_IngredtData = await Rec_Ingred.destroy({
            where: {
                recipeId: req.params.recipeId,
            },
        });

        if (recIngredData) {
            res.status(200).json({ message: "Recipe ingredient has been deleted" });
        } else {
            res.status(404).json({ message: 'No Recipe ingredient found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
});


  module.exports = router;
  