const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
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
  }
});

module.exports = User = mongoose.model("user", UserSchema);