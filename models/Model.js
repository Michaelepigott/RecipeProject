const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Model extends Model {}

Model.init(
  {
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: '',
  }
);

module.exports = Model;
