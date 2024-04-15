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

// Route to handle registration form submission
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  console.log('Received username:', username);
  console.log('Received password:', password);

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      // If the username already exists, display a pop-up message
      return res.send('<script>alert("This username is already taken. Please choose another one."); window.location.href="/register";</script>');
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user record in the database
    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    // Send a pop-up message indicating successful registration
    res.send('<script>alert("Registration successful!"); window.location.href="/";</script>');

  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

module.exports = router;
