// sequelize.js or db.js

const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite', // Adjust this path to your SQLite database file
  logging: (msg) => {
    if (msg.includes('Executing (default):')) {
      // Do not log table creation messages
      return;
    }
    console.log(msg);
  },
});

module.exports = sequelize;
