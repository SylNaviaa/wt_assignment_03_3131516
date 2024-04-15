// models/index.js

const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '../database.sqlite' // Specify the path to your SQLite database file
});

// Define models and relationships here

module.exports = sequelize;
