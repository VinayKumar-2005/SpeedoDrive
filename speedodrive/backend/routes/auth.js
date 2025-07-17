const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// === POST /api/auth/register ===
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: '✅ User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Server Error' });
  }
});

// === POST /api/auth/login ===
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter email and password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d'
    });

    res.json({
      message: '✅ Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Server Error' });
  }
});

module.exports = router;
