const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = Chat = mongoose.model("chat", ChatSchema);
