const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    } else {
      // Redirect to the home page after logout
      res.redirect('/');
    }
  });
});

module.exports = router;
