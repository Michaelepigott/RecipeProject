const router = require('express').Router();
const { Ingredient } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', async (req, res) => {
    try {
        const ingredientData = await Ingredient.findByPk(req.params.id, {
            // include: [
            //     { model: Recipe, attributes: ['id', 'name']}
            // ]
        });

        console.log('ingredientData:', ingredientData); // Add this line for debugging

        if (!ingredientData) {
            res.status(404).json({ message: 'No Ingredient with this id!' });
            return;
        }
        res.status(200).json(ingredientData);
    } catch (err) {
        console.log('Error:', err); // Add this line for debugging
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const [updated] = await Ingredient.update(req.body, {
            where: {
                id: req.params.id, 
            },
        });

        if (updated) {
            const updatedIngredient = await Ingredient.findByPk(req.params.id);
            res.status(200).json(updatedIngredient);
        } else {
            res.status(404).json({ message: 'No ingredient found with this id to update' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/', async (req, res) => {
    try {
        const ingredientData = await Ingredient.create(req.body);
        res.status(200).json(ingredientData);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const ingredientData = await Ingredient.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (ingredientData) {
            res.status(200).json({ message: 'Ingredient has been deleted' });
        } else {
            res.status(404).json({ message: 'No Ingredient found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
