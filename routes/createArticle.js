// // routes/createArticle.js

// const express = require('express');
// const router = express.Router();
// const Article = require('../models/article');

// // Route to handle article creation form submission
// router.post('/', async (req, res) => {
//   const { title, body } = req.body;

//   try {
//     // Create a new article record in the database
//     const newArticle = await Article.create({
//       title,
//       body,
//       // Assuming you have a foreign key for the user who created the article
//       userId: req.session.user.id // Assign the ID of the logged-in user to the article
//     });

//     res.status(201).json(newArticle);
//   } catch (error) {
//     console.error('Error creating article:', error);
//     res.status(500).json({ error: 'An unexpected error occurred' });
//   }
// });

// module.exports = router;

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
      author // Assign the username of the logged-in user as the author of the article
    });

    // Redirect the user to the article page after successful creation
    res.redirect('/article');

  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});


module.exports = router;
