/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const Chat = require("../models/chat.model");
const mongoose = require("mongoose");
const Team = require("../models/team.model");


const addtoChat = (socket, io) => {
  socket.on("sendMessage", async (data) => {
    const { userInput, room, sender } = data;
    const teamId = room; // Assuming room is teamId
    const message = userInput;

    io.to(room).emit("receiveMessage", { message, sender });

    try {
      const newChat = new Chat({
        issuename: room,
        chatHistory: message,
        sender,
        teamId
      });
      await newChat.save();

      console.log("Message added successfully", newChat);
    } catch (error) {
      console.error("Error adding message", error);
    }
  });
};



const getTeamChat = async (req, res) => {
  const teamId = req.query.teamId;
console.log(teamId)
  try {
    const teamChat = await Chat.find({teamId: teamId})
    if (!teamChat) {
      return res.status(404).json({ error: "No chat found for this team" });
    }
    res.status(200).json(teamChat);
    console.log(teamChat)
  } catch (error) {
    console.error("Error fetching team chat:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {  
  getTeamChat, addtoChat
}
