const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// Express route handler for rendering the home page
router.get('/', async (req, res) => {
  try {
      // Fetch recent articles from the database
      const articles = await Article.findAll({ limit: 10, order: [['createdAt', 'DESC']] });

      // Determine if the user is logged in
      const loggedIn = req.session.user !== undefined && req.session.user !== null;

      // Render the home page and pass the articles and login status to the template
      res.render('home', { articles, loggedIn });
  } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

module.exports = router;
