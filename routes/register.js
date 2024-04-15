// register.js

const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

// Route to serve the registration form
router.get('/', (req, res) => {
  // Determine if the user is logged in
  const loggedIn = req.session.user !== undefined && req.session.user !== null;

  // Render the registration page along with the login status
  res.render('register', { loggedIn: loggedIn });
});

// Route to handle registration success
router.get('/reg-success', (req, res) => {
  res.sendFile('registration-success.html', { root: 'public' });
});

// Route to handle registration form submission
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  console.log('Received username:', username);
  console.log('Received password:', password);

  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user record in the database
    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    // Redirect to the registration success page after a delay
    setTimeout(() => {
      res.redirect('/reg-success');
    }, 3000); // 3000 milliseconds = 3 seconds

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

module.exports = router;
