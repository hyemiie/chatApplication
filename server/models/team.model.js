/* eslint-disable no-undef */
// models/team.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChatSchema = require('./chat.model').schema; // Use the schema, not the model

const TeamSchema = new Schema({
  teamName: {
    type: String,
    required: true,
  },
  chatHistory: [ChatSchema], // Correctly reference the schema
}, { timestamps: true });

const Team = mongoose.model("Team", TeamSchema);

module.exports = Team;
