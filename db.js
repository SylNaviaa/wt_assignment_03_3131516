const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite', // Adjust this path to your SQLite database file
  logging: (msg) => {
    // Log only non-table creation messages
    if (!msg.includes('Executing (default): CREATE TABLE')) {
      console.log(msg);
    }
  },
});

module.exports = sequelize;
