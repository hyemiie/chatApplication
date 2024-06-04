/* eslint-disable no-undef */
// models/chat.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  issuename: {
    type: String,
    // required: true,
  },
  chatHistory: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  errorId: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
