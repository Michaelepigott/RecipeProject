const sequelize = require('../config/connection');
const { User, Recipe, Ingredient, Join } = require('../models');

const userData = require('./user-seeds.json');
const recipeData = require('./recipe-seeds.json');
const ingredientData = require('./ingredient-seeds.json');
const joinData = require('./join.json');

const seedUsers = async (transaction) => {
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
    transaction,
  });
  console.log('Users seeded!');
};

const seedRecipes = async (transaction) => {
  await Recipe.bulkCreate(recipeData, {
    returning: true,
    transaction,
  });
  console.log('Recipes seeded!');
};

const seedIngredients = async (transaction) => {
  await Ingredient.bulkCreate(ingredientData, {
    returning: true,
    transaction,
  });
  console.log('Ingredients seeded!');
};

const seedJoinData = async (transaction) => {
  await Join.bulkCreate(joinData, {
    returning: true,
    transaction,
  });
  console.log('Recipe ingredients seeded!');
};

const seedDatabase = async () => {
  const transaction = await sequelize.transaction();

  try {
    await sequelize.sync({ force: true });
    console.log('Database synced!');

    await seedUsers(transaction);
    await seedRecipes(transaction);
    await seedIngredients(transaction);
    await seedJoinData(transaction);

    await transaction.commit();
    console.log('All seeds planted!');
  } catch (error) {
    await transaction.rollback();
    console.error('Failed to seed database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();




