const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rec_Ingred extends Model { }

Rec_Ingred.init(
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
        modelName: 'rec_Ingred',
    }
);

module.exports = Rec_Ingred;