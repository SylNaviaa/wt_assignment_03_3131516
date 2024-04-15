// Assuming you have Sequelize initialized and your model defined in article.js

const sequelize = require('../config/database'); // Assuming you have a database configuration file
const Article = require('../models/article');

// Synchronize models with the database
async function syncDatabase() {
    try {
        // Define your model associations or configurations here if needed
        // For example: Article.associate(models);

        // Sync models with the database
        await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}

// Call the syncDatabase function to sync models with the database
syncDatabase();
