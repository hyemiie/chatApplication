/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const Chat = require("../models/chat.model");
const mongoose = require("mongoose");
const Team = require("../models/team.model");


const addtoChat = (socket, io) => {


  
  // socket.on("sendMessage", async (data) => {
  //   console.log('data', data);

  //   const { message, room, sender } = data;
  //   console.log(data)
  //   const issuename = 'Developer error';
  //   const chatHistory = message;
  //   const errorId = room;

  //   io.to(errorId).emit("receiveMessage", {
  //     issuename,
  //     message,
  //     sender,
  //     errorId,
  //   });
  //   io.to(errorId).emit("receive_message", {
  //     message: message,
  //     user: sender,
  //   });

  //   try {
  //     const newChat = new Chat({
  //       issuename,
  //       chatHistory,
  //       sender,
  //       errorId,
  //     });

  //     // Save the new chat document to the database
  //     await newChat.save();

  //     // Find the TeamError document by errorId
  //     let teamError = await TeamError.findOne({ errorId: errorId });

  //     if (!teamError) {
  //       // Create a new TeamError document if it doesn't exist
  //       teamError = new TeamError({
  //         _id: errorId,
  //         teamError: `Team ${errorId}`,
  //         teamId: '665ed6e56e99f5c7d4dfbfd7',
  //         chatHistory: [],
  //       });
  //     }

  //     // Push the new chat to the chatHistory array
  //     teamError.chatHistory.push(newChat);

  //     // Save the updated TeamError document
  //     await teamError.save();

  //     io.to(errorId).emit("message", newChat);
  //     console.log("Message added successfully", newChat);
  //   } catch (error) {
  //     console.log("Error occurred:", error);
  //   }
  // });
};


const getTeamChat = async (req, res) => {
  const errorId = req.query.teamId;
console.log(errorId)
  try {
    const teamChat = await Chat.find({errorId: errorId})
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


const deleteChat = async (req, res) => {
  const messageId = req.query.messageID;
  const teamId = req.query.selectedTeamId;
  console.log("teamId", teamId)
  console.log("Attempting to delete message with ID:", messageId);

  try {
    const result = await Chat.deleteOne({ _id: messageId });

    if (result.deletedCount === 1) {
      console.log("Message deleted successfully");
      
    
      const updatedChat = await Chat.find({errorId:teamId }).sort({ createdAt: 1 });

      res.status(200).json({ 
        message: "Chat deleted successfully",
        updatedChat: updatedChat
      });
      console.log("Done");

    } else {
      console.log("Message not found");
      res.status(404).json({ error: "Message not found" });
    }
  } catch (error) {
    console.log('Error deleting message:', error);
    res.status(500).json({ error: "Error deleting chat", details: error.message });
  }
};

module.exports = {  
  getTeamChat, addtoChat,deleteChat
}
