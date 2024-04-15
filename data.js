const sequelize = require('../config/database'); // Importing database configuration
const Article = require('../models/article');

// Synchronize models with the database
async function syncDatabase() {
    try {
        // Sync models with the database
        await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
}

// Call the syncDatabase function to sync models with the database
syncDatabase();
