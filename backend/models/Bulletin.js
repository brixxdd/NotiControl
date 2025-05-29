const mongoose = require('mongoose');

const bulletinSchema = new mongoose.Schema({
  folio: {
    type: String,
    required: true,
    unique: true, // Folio should likely be unique
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  pdf: {
    type: String,
    required: false, // PDF is optional
  },
  image: {
    type: String,
    required: false, // Image is optional based on context, though table said URL (implying required). Let's make it optional for now based on 'puede ser null'.
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Bulletin = mongoose.model('Bulletin', bulletinSchema);

module.exports = Bulletin; 