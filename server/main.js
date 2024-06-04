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
    console.log('data', data)

    const {message, room, sender} = data;
    const issuename = 'Developer error';
    const chatHistory = message;
    const teamId = room;

    io.to(teamId).emit("receiveMessage", {
      issuename,
      message,
      sender,
      teamId,
    });
    io.to(teamId).emit("receive_message", {
      message: message,
      user: sender,
    });

    try {
      const newChat = new Chat({
        issuename,
        chatHistory,
        sender,
        teamId,
      });

      // Save the new chat document to the database
      await newChat.save();
      let team = await Team.findById(teamId);
      if (!team) {
        team = new Team({
          _id: teamId,
          teamName: `Team ${teamId}`,
          chatHistory: [],
        });
      }
      team.chatHistory.push(newChat);
      await team.save();

      io.to(teamId).emit("message", newChat);
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
