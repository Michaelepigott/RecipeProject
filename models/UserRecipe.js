const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserRecipe extends Model {}

UserRecipe.init(
    {
        recipeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipes', 
                key: 'id'
            }
            },
            userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users', 
                key: 'id'
            }
            },
    
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'UserRecipe',
}
);

module.exports = UserRecipe;