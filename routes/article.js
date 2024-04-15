// routes/article.js

const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', async (req, res) => {
  try {
      // Fetch articles from the database
      const articles = await Article.findAll();

      // Determine if the user is logged in
      const loggedIn = req.session.user !== undefined && req.session.user !== null;

      // Pass the articles data and login status to the view
      res.render('articles', { articles: articles, loggedIn: loggedIn });
  } catch (error) {
      console.error('Error fetching articles:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

module.exports = router;

