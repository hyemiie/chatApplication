/* eslint-disable no-undef */
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const ChatSchema = require("./models/chat.model");
const { Register, getCurrentUser } = require("./controllers/user.controller");
const { Login } = require("./controllers/user.controller");
const { GetAllTeams, AddTeam } = require("./controllers/team.controller");
const { getTeamChat, addtoChat } = require("./controllers/chat.controller");
const Chat = require("./models/chat.model");
const Team = require("./models/team.model");
const { GetTeamErrors, AddTeamError } = require("./controllers/teamErrors.controller");
const TeamError = require("./models/team.model");

app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from React app origin

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);
    // console.log(`User ${username} joined room ${room}`);
  });

  socket.on("sendMessage", async (data) => {
    console.log('data', data);
  
    const { message, room, sender } = data;
    const issuename = 'Developer error';
    const chatHistory = message;
    const errorId = room;
  
    io.to(errorId).emit("receiveMessage", {
      issuename,
      message,
      sender,
      errorId,
    });
  
    // This is the event your client is listening to
    io.to(errorId).emit("receive_message", {
      message: message,
      user: sender,
    });
    console.log('receive_message event emitted');

  
    try {
      const newChat = new Chat({
        issuename,
        chatHistory,
        sender,
        errorId,
      });
  
      // Save the new chat document to the database
      await newChat.save();
  
      // Find the TeamError document by errorId
      let teamError = await TeamError.findOne({ errorId: errorId });
  
      if (!teamError) {
        // Create a new TeamError document if it doesn't exist
        teamError = new TeamError({
          _id: errorId,
          teamError: `Team ${errorId}`,
          teamId: '665ed6e56e99f5c7d4dfbfd7',
          chatHistory: [],
        });
      }
  
      // Push the new chat to the chatHistory array
      teamError.chatHistory.push(newChat);
  
      // Save the updated TeamError document
      await teamError.save();
  
      io.to(errorId).emit("message", newChat);
      console.log("Message added successfully", newChat);
    } catch (error) {
      console.log("Error occurred:", error);
    }
  });
  
});

io.listen(4000);



app.post("/register", Register);
app.post("/login", Login);
app.get("/teamChat", getTeamChat);
app.get("/getCurrentUser", getCurrentUser);
app.get("/getAllTeams", GetAllTeams);
app.post("/addTeam", AddTeam);
app.post("/addChat", addtoChat);
app.get('/teamErrors', GetTeamErrors)
app.get('/addTeamError',AddTeamError)

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
  .connect(
    "mongodb+srv://yemiojedapo1:09030184479@cluster0.wx4gmqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection Failed:", error);
  });
