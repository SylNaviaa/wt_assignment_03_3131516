// models/article.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration file

const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Article;