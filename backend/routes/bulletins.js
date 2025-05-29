const express = require('express');
const router = express.Router();
const Bulletin = require('../models/Bulletin');

// GET all bulletins
router.get('/', async (req, res) => {
  try {
    const bulletins = await Bulletin.find();
    res.json(bulletins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new bulletin
router.post('/', async (req, res) => {
  const bulletin = new Bulletin({
    folio: req.body.folio,
    title: req.body.title,
    date: req.body.date,
    pdf: req.body.pdf,
    image: req.body.image,
  });

  try {
    const newBulletin = await bulletin.save();
    res.status(201).json(newBulletin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 