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
router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Recipe.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (updated) {
            const updatedRecipe = await Recipe.findByPk(req.params.id);
            res.status(200).json(updatedRecipe);
        } else {
            res.status(404).json({ message: 'No recipe found with this id to update' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
  //delete recipe
router.delete('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (recipeData) {
            res.status(200).json({ message: 'Recipe has been deleted' });
        } else {
            res.status(404).json({ message: 'No Recipe found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
