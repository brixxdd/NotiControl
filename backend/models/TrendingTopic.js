const mongoose = require('mongoose');

const trendingTopicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  stats: {
    type: String,
    required: true,
  },
  gradientFrom: {
    type: String,
    required: true,
  },
  gradientTo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TrendingTopic = mongoose.model('TrendingTopic', trendingTopicSchema);

module.exports = TrendingTopic; 