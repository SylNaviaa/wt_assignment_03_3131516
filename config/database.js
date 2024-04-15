// // config/database.js

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('database_name', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'sqlite'
//   // Other options
// });

// module.exports = sequelize;



// config/database.js

const { Sequelize } = require('sequelize');
const path = require('path');

// SQLite configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'), // Adjust the database file path as needed
  // Other options
});

module.exports = sequelize;

