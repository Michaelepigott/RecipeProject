const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Join extends Model { }

Join.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        ingredient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ingredient',
                key: 'id'
            },
            onDelete: 'CASCADE',
        },
        quantity: {
            type: DataTypes.DECIMAL(6, 3),
            allowNull: false
        },
        measurement: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'join',
    }
);

module.exports = Join;