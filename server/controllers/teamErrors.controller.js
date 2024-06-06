/* eslint-disable no-undef */
const express = require("express");
// eslint-disable-next-line no-undef
const bcrypt = require("bcrypt");

// eslint-disable-next-line no-undef
const TeamErrors =  require('../models/team.model')
// eslint-disable-next-line no-undef
const jwt = require("jsonwebtoken");
const TeamNames = require("../models/teamNames.model");
const secretKey = "thisisthesecretkey";


const GetTeamErrors = async (req, res) => {
    const teamId = '665ed6e56e99f5c7d4dfbfd7'
    try {
      const teamErrors = await TeamErrors.find({teamId: teamId})
      if (!teamErrors) {
        console.log("No Error added yet");
  
        return res.status(401).json({ error: "No Error added yet" });
      }
      else{
          console.log('teamError', teamErrors)
      }
      
  
      res.status(200).json({ teamErrors });
    } catch (error) {
      console.error("Team error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const AddTeamError = async (req, res) => {
    const newTeam = req.body.teamName;
    console.log("newTeam", newTeam)
  try {

   const TeamError = await TeamErrors.create({
    teamError: "Reduce wait Time",
    teamId:"665ed6e56e99f5c7d4dfbfd7",
    chatHistory:[]
    });
   console.log("TeamError", TeamError);

   

    res.status(200).json({ TeamError });
  } catch (error) { 
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

  module.exports={GetTeamErrors, AddTeamError}