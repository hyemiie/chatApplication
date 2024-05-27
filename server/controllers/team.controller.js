/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const bcrypt = require("bcrypt");

// eslint-disable-next-line no-undef
const TeamSchema =  require('../models/team.model')
// eslint-disable-next-line no-undef
const jwt = require("jsonwebtoken");
const secretKey = "thisisthesecretkey";

const GetAllTeams = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    // Find user by email
    const user = await TeamSchema.find({})
    if (!user) {
      console.log("No user");

      return res.status(401).json({ error: "User not found" });
    }
    else{
        console.log('user', user)
    }
    

    res.status(200).json({ user });
  } catch (error) {
    console.error("Team error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const AddTeam = async (req, res) => {
    const newTeam = req.body.teamName;
    console.log("newTeam", newTeam)
  try {

   const Teams = await TeamSchema.create({
        teamName: newTeam,
    });
//    console.log("signedInUser", Teams);

   

    res.status(200).json({ Teams });
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
    GetAllTeams,
    AddTeam,
  
};
