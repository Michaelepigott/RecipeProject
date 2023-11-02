const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      instructions: {
        type: DataTypes.TEXT,
        allowNull: false
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
<<<<<<< HEAD
    modelName: 'Recipe',
=======
    modelName: 'recipe',
>>>>>>> main
  }
);

module.exports = Recipe;
