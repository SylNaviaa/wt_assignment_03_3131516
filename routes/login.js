const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const router = express.Router();

router.get('/', (req, res) => {
  // Determine if the user is logged in
  const loggedIn = req.session.user !== undefined && req.session.user !== null;

  // Render the login page along with the login status
  res.render('login', { loggedIn });
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Set the user in the session
    req.session.user = user;

    // Check user role
    if (user.role === 'admin') {
      // Redirect admin users to the admin dashboard
      return res.redirect('/admin/dashboard');
    } else {
      // Redirect regular users to the dashboard
      return res.redirect('/dashboard');
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

module.exports = router;
