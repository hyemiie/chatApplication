// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const bcrypt = require("bcrypt");

// eslint-disable-next-line no-undef
const UserSchema = require("../models/user.model");
// eslint-disable-next-line no-undef
const jwt = require("jsonwebtoken");
const secretKey = "thisisthesecretkey";

const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Find user by email
    const user = await UserSchema.findOne({ email });
    if (!user) {
      console.log("No user");

      return res.status(401).json({ error: "User not found" });
    }

    if (password == user.password) {
      // console.log("Yes");
    } else {
      console.log("Password Invalid");
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey);

    // Return token as response
    res.status(200).json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const localStorageItem = req.body;

    const user = req.headers["authorization"]; // Extract user ID from JWT payload
    console.log("User", user);

    const token = user.split(" ")[1]; // Extract the token

    const decodedToken = jwt.verify(token, secretKey);
    console.log("decode", decodedToken);

    const userId = decodedToken.userId;
    console.log("userId", userId);

    const signedInUser = await UserSchema.findOne({
      email: "yemiojedapo1@gmail.com",
    });
    console.log("signedInUser", signedInUser);

    if (!signedInUser) {
      return res.status(404).json({ message: "User not foyund" });
    }

    const username = signedInUser.username;
    console.log("username", username);

    res.status(200).json({ username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Register = async (req, res) => {
  console.log("Received registration data:", req.body);
  const data = req.body;

  try {
    const { username, password, email, role } = req.body;

    // Assuming you have a User model with create method
    const newUser = await UserSchema.create({
      username: username,
      email: email,
      password: password,
      role: role, // If the role is also being stored
    });

    res.status(200).json({ newUser });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({
      error: error.message || "An error occurred during registration",
    });
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  Login,
  Register,
  getCurrentUser,
};