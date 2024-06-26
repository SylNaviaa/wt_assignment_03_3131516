const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// Route to handle article creation form submission
router.post('/', async (req, res) => {
  const { title, body } = req.body;
  const author = req.session.user.username; // Get the username of the logged-in user

  try {
    // Create a new article record in the database
    const newArticle = await Article.create({
      title,
      body,
      author
    });

    // Redirect the user to the article page after successful creation
    res.redirect('/article');

  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});


module.exports = router;
