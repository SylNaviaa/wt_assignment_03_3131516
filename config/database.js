const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
});

module.exports = sequelize;

