const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import database connection

const Recipe = sequelize.define('Recipe', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}); 
module.exports = Recipe;
