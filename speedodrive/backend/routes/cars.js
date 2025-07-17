const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cars' });
  }
});

// Add car (for admin use)
router.post('/', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json({ message: 'Car added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding car' });
  }
});

module.exports = router;
