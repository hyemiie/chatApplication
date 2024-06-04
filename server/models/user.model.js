/* eslint-disable no-undef */
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please input your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your password"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    required: [true, "Please choose a role"],
  },
  image: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
