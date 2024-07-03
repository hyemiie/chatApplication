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
    type: new Schema({
      type: {
        type: String,
        required: true,
        enum: ['text', 'image', 'voice_note']  // Enums to specify the type of message
      },
      data: {
        type: Schema.Types.Mixed,  // Can be a string (for text) or an object (for image/voice_note)
        required: true
      },
      filename: String,  // Only used for image and voice_note
      gridfs_id: Schema.Types.ObjectId  // Only used for image and voice_note
    }),
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
