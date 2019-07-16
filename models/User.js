const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 1000
  },
  peak: {
    type: Number,
    default: 1000
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  winstreak: {
    type: Number,
    required: true,
    default: 0
  },
  history: [
    {
      type: Number,
      required: true
    }
  ]
});

module.exports = User = mongoose.model("user", UserSchema);
