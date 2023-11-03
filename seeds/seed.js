const sequelize = require('../config/connection');
const { User, Recipe, Ingredient, Rec_Ingred } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const ingredient of ingredientData) {
    await Ingredient.create({
      ...ingredient,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  for (const recipe of recipeData) {
    await Recipe.create({
      ...recipe,
      user_id: userRecipes[Math.floor(Math.random() * user.length)].id,
    });
  }
  for (const Rec_Ingred of rec_IngredData) {
    await Rec_Ingred.create({
      ...rec_Ingred,
      userRecipe_id: userRecipes[Math.floor(Math.random() * userRecipes.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
