const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new event
router.post('/', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    date: req.body.date,
    time: req.body.time,
    location: req.body.location,
    category: req.body.category,
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 