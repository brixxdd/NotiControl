const express = require('express');
const router = express.Router();
const TrendingTopic = require('../models/TrendingTopic');

// GET all trending topics
router.get('/', async (req, res) => {
  try {
    const topics = await TrendingTopic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new trending topic
router.post('/', async (req, res) => {
  const topic = new TrendingTopic({
    title: req.body.title,
    stats: req.body.stats,
    gradientFrom: req.body.gradientFrom,
    gradientTo: req.body.gradientTo,
  });

  try {
    const newTopic = await topic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// You might want routes for PUT (update) and DELETE later

module.exports = router; 