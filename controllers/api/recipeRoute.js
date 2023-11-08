const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Join, Recipe, Ingredient } = require('../../models');
const withAuth = require('../../utils/auth');
const { Op } = require('sequelize');


// get all Recipes 
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.findAll({
            include: [{
                model: Ingredient,
                through: {
                    model: Join,
                    attributes: ['quantity', 'measurement'], 
                },
                as: 'ingredients',
                attributes: ['user_name'] 
            }]
        });
        res.json(recipes);
    } catch (err) {
        console.error(err); 
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
});

// get one Recipes 
router.get('/:id', async (req, res) => {
    try {
        const recipes = await Recipe.findOne({
            where: {
                id: req.params.id },
            include: [{
                model: Ingredient,
                through: {
                    model: Join,
                    attributes: ['quantity', 'measurement'], 
                },
                as: 'ingredients',
                attributes: ['name'] 
            }]
        });
        res.json(recipes);
    } catch (err) {
        console.error(err); 
        res.status(500).json({
            error: err.message,
            stack: err.stack,
        });
    }
});

// serach for recipe with any name that is 
router.get('/search', async (req, res) => {
    try {
        const query = req.query.query; 
        
        // Check if query is not empty or null
        if (!query) {
            return res.status(400).json({ message: 'Please provide a search query.' });
        }

        const recipes = await Recipe.findAll({
            include: [{
                model: Ingredient,
                as: 'ingredients',
                attributes: ['id', 'name'],
                through: {
                    model: Join,
                    attributes: ['quantity', 'measurement'],
                }
            }],
            // help to find all recipes that contain the letters used in search
            where: {
                name: {
                    [Op.like]: `%${query}%`
                }
            }
        });
        
        // Check if the search returned any recipes
        if (recipes.length === 0) {
            // No recipes found
            return res.status(404).json({ message: 'No recipes found.' });
        }
        
        // Recipes found
        res.json(recipes);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json(err);
    }
});

router.post('/create', async (req, res) => {
    // Check if the user is logged in
    if (!req.session.logged_in) {
        return res.status(401).json({ message: "Please log in to create a recipe" });
    }

    const t = await sequelize.transaction();

    try {
        // Destructure the body to get name, instructions, and ingredients
        const { name, instructions, ingredients } = req.body;
        
        // Create the recipe with the session user_id
        const recipe = await Recipe.create({
            name,
            instructions,
            user_id: req.session.user_id,
        }, { transaction: t });

        // Check if ingredient is already in or not
        for (const ingredient of ingredients) {
            let ing = await Ingredient.findOne({
                where: { name: ingredient.name },
                transaction: t
            });

            if (!ing) {
                ing = await Ingredient.create({
                    name: ingredient.name
                }, { transaction: t });
            }

            await Join.create({
                recipe_id: recipe.id,
                ingredient_id: ing.id,
                quantity: ingredient.quantity,
                measurement: ingredient.measurement
            }, { transaction: t });
        }

        try {
            // Commit the transaction
            await t.commit();
        } catch (commitError) {
            // Commit failed: log the error and check if rollback is necessary
            console.error('Commit failed: ', commitError);
            if (t.finished !== 'commit') {
                await t.rollback();
            }
            // Since commit failed, respond with error
            return res.status(500).json({ message: 'Failed to commit the transaction.' });
        }

        // Fetch the recipe with its ingredients to send back
        const result = await Recipe.findByPk(recipe.id, {
            include: [{
                model: Ingredient,
                as: 'ingredients',
                through: {
                    attributes: ['quantity', 'measurement'],
                }
            }]
        });

        res.status(201).json(result);
    } catch (error) {
        // If an error occurs before commit, roll back the transaction
        if (t.finished !== 'commit') {
            await t.rollback();
        }
        res.status(400).json({ error: error.message });
    }
});

router.put('/update', async (req, res) => {
    if (!req.session.logged_in) {
        return res.status(401).json({ message: "Please login to update a recipe" });
    }

    const t = await sequelize.transaction();

    try {
        const { name, newName, newInstructions, newIngredients } = req.body;
        // Get the recipe by name and user_id
        let recipe = await Recipe.findOne({
            where: {
                name,
                user_id: req.session.user_id,
            },
            include: 'ingredients',
            transaction: t,
        });
        if (!recipe) {
            await t.rollback();
            return res.status(404).json({ message: "Recipe not found or you don't have permission to update this recipe" });
        }
        // Update recipe name and instructions if they have new values
        if (newName || newInstructions) {
            await recipe.update({
                name: newName || recipe.name,
                instructions: newInstructions || recipe.instructions,
            }, { transaction: t });
        }
        // map all current ingredients to their IDs
        const currentIngredientMap = {};
        recipe.ingredients.forEach(ingredient => {
            currentIngredientMap[ingredient.id] = ingredient;
        });
        // Track the ingredient IDs that are kept so we can delete any that are not kept later
        // set method is a js built in object that allows to store values
        const keptIngredientIds = new Set();
        // If there are new ingredients add it
        if (newIngredients && Array.isArray(newIngredients)) {
            for (const newIng of newIngredients) {
                let ingredient = await Ingredient.findOne({
                    where: { name: newIng.name },
                    transaction: t,
                });
                if (ingredient) {
                    // Update the Join table 
                    await Join.update({
                        quantity: newIng.quantity,
                        measurement: newIng.measurement,
                    }, {
                        where: {
                            recipe_id: recipe.id,
                            ingredient_id: ingredient.id,
                        },
                        transaction: t,
                    });
                    keptIngredientIds.add(ingredient.id);
                } else {
                    // If the ingredient doesn't exist, create it and then add it to the Join table 
                    ingredient = await Ingredient.create({
                        name: newIng.name,
                    }, { transaction: t });

                    await Join.create({
                        recipe_id: recipe.id,
                        ingredient_id: ingredient.id,
                        quantity: newIng.quantity,
                        measurement: newIng.measurement,
                    }, { transaction: t });
                    keptIngredientIds.add(ingredient.id);
                }
            }
        }
        // Remove ingredients that are not needed
        // using object.keys js method to return an array of ing object key's that are no more in the currentIngredientMap and then check the length of the array if > 0 then 
        // those will be deleted fro the recipe
        const ingredientsToRemove = Object.keys(currentIngredientMap).filter(id => !keptIngredientIds.has(Number(id)));
        if (ingredientsToRemove.length > 0) {
            await Join.destroy({
                where: {
                    recipe_id: recipe.id,
                    ingredient_id: ingredientsToRemove,
                },
                transaction: t,
            });
        }

        // Commit the transaction
        await t.commit();

        // Return the updated recipe
        const updatedRecipe = await Recipe.findByPk(recipe.id, {
            include: 'ingredients',
        });

        res.status(200).json(updatedRecipe);
    } catch (error) {
        await t.rollback();
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:name', async (req, res) => {
    // Check if the user is logged in
    if (!req.session.logged_in) {
        return res.status(401).json({ message: "Please log in to delete a recipe" });
    }

    const t = await sequelize.transaction();

    try {
        // Extract the name from request parameters
        const { name } = req.params;

        // Find the recipe by name and user_id to ensure the user owns the recipe
        const recipe = await Recipe.findOne({
            where: {
                name,
                user_id: req.session.user_id
            }
        }, { transaction: t });

        // If the recipe does not exist or does not belong to the user, return an error
        if (!recipe) {
            await t.rollback();
            return res.status(404).json({ message: "Recipe not found or you don't have permission to delete this recipe" });
        }

        // Delete the recipe
        await recipe.destroy({ transaction: t });

        // Commit the transaction
        await t.commit();

        res.status(200).json({ message: "Recipe successfully deleted" });
    } catch (error) {
        // If an error occurs, roll back the transaction
        await t.rollback();
        res.status(400).json({ error: error.message });
    }
});



module.exports = router;
