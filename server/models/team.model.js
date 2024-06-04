/* eslint-disable no-undef */
// models/team.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChatSchema = require('./chat.model').schema; // Use the schema, not the model

const TeamErrors = new Schema({
  teamError: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    required: true,
  },
  chatHistory: [ChatSchema], // Correctly reference the schema
}, { timestamps: true });

const TeamError = mongoose.model("TeamErrors", TeamErrors);

module.exports = TeamError;
