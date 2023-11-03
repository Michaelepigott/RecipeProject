const sequelize = require('../config/connection');
const { User, Recipe, Ingredient, Rec_Ingred, UserRecipe } = require('../models');

const userData = require('./userData.json');
const recipeData = require('./recipe.json');
const ingredientData = require('./ingredient.json');
const recIngData = require('./rec_Ingred.json');
const userRecipeData = require('./userRecipe.json');


const seedUsers = async () => {
  try {
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    console.log('Users seeded!');
  } catch (error) {
    console.error('Failed to seed users:', error);
  }
};

const seedRecipes = async () => {
  try {
    await Recipe.bulkCreate(recipeData, {
      returning: true, 
    });
    console.log('Recipes seeded!');
  } catch (error) {
    console.error('Failed to seed recipes:', error);
  }
};

const seedIngredients = async () => {
  try {
    await Ingredient.bulkCreate(ingredientData, {
      returning: true,
    });
    console.log('Ingredients seeded!');
  } catch (error) {
    console.error('Failed to seed ingredients:', error);
  }
};

const seedRecIngData = async () => {
  try {
    await Rec_Ingred.bulkCreate(recIngData, {
      returning: true,
    });
    console.log('Recipe ingredients seeded!');
  } catch (error) {
    console.error('Failed to seed recipe ingredients:', error);
  }
};


const seedUserRecipes = async () => {
  try {
    await UserRecipe.bulkCreate(userRecipeData, {
      returning: true,
    });
    console.log('User recipes seeded!');
  } catch (error) {
    console.error('Failed to seed user recipes:', error);
  }
};

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced!');
    
    await seedUsers();
    await seedRecipes();
    await seedIngredients();
    await seedRecIngData();
    await seedUserRecipes();

    console.log('All seeds planted!');
  } catch (error) {
    console.error('Failed to seed database:', error);
  } finally {
    // This ensures that all seeding operations are complete before exiting.
    process.exit(0);
  }
};

seedDatabase();




