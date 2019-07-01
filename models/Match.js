const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  score1: {
    type: String,
    required: true
  },
  score2: {
    type: String,
    required: true
  },
  winner: {
    type: String,
    required: true
  },

  name1: {
    type: String,
    required: true
  },
  name2: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  rating1: {
    type: Number,
    required: true
  },
  rating2: {
    type: Number,
    required: true
  },
  diffOne: {
    type: Number,
    required: true
  },
  diffTwo: {
    type: Number,
    required: true
  }
});

module.exports = Match = mongoose.model("match", MatchSchema);
