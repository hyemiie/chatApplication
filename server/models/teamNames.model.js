/* eslint-disable no-undef */
// models/team.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TeamErrors = require('./chat.model').schema; // Use the schema, not the model

const teamName = new Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamErrors: [TeamErrors], // Correctly reference the schema
}, { timestamps: true });

const TeamNames = mongoose.model("teamNames", teamName);

module.exports = TeamNames;
