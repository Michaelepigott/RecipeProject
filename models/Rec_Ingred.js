const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class RecipeIngredient extends Model { }

RecipeIngredient.init(
    {
        recipeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipes',
                key: 'id'
            }
        },
        ingredientId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ingredients',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.DECIMAL(6, 3),
            allowNull: false
        },
        measurement: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipeIngredient',
    }
);

module.exports = RecipeIngredient;