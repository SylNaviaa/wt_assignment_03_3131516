const express = require('express');
const router = express.Router();
const path = require('path');

// Route to serve the dashboard HTML file
router.get('/', (req, res) => {
  // Determine if the user is logged in
  const loggedIn = req.session.user !== undefined && req.session.user !== null;

  // Send the dashboard HTML file along with the login status
  res.render('dashboard', { loggedIn: loggedIn, user: req.session.user });
});

module.exports = router;
