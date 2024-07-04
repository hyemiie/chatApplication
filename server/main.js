/* eslint-disable no-undef */
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require('multer');
const path = require('path');
const GridFS = require('gridfs-stream');
const fs = require('fs');

const Chat = require("./models/chat.model");
const TeamError = require("./models/team.model");
const { Register, getCurrentUser } = require("./controllers/user.controller");
const { Login } = require("./controllers/user.controller");
const { GetAllTeams, AddTeam } = require("./controllers/team.controller");
const { getTeamChat, addtoChat, deleteChat } = require("./controllers/chat.controller");
const { GetTeamErrors, AddTeamError } = require("./controllers/teamErrors.controller");

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
  gfs = GridFS(conn.db, mongoose.mongo);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Destination directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File naming convention
  }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, url: imageUrl }); // Return image URL in JSON response
    console.log("doneee")
  } else {
    res.status(400).json({ success: false, message: 'File upload failed' });
  }
});


io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });

  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);
    console.log(`User ${username} joined room ${room}`);
  });

  socket.on("sendMessage", async (data) => {
    console.log('data', data);

    const { message, type, url, room, sender } = data;
    const issuename = 'Developer error';
    const errorId = room;

    let chatHistory;
    if (type === 'image' || type === 'voice_note') {
      chatHistory = {
        type: type,
        data: url
      };
    } else {
      chatHistory = {
        type: 'text',
        data: message
      };
    }

    io.to(errorId).emit("receiveMessage", {
      issuename,
      chatHistory,
      sender,
      errorId,
    });

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

      // if (!teamError) {
      //   teamError = new TeamError({
      //     teamError: `Team ${errorId}`,
      //     teamId: '665ed6e56e99f5c7d4dfbfd7',
      //     chatHistory: [],
      //   });
      // }

      // Push the new chat to the chatHistory array
      teamError.chatHistory.push(newChat);

      // Save the updated TeamError document
      await teamError.save();
      res.status(200).json({message:`hello ${sender} sent a message`});

      io.to(errorId).emit("message", newChat);
      console.log("Message added successfully", newChat);
    } catch (error) {
      console.log("Error occurred:", error);
    }
  });
});


app.post("/register", Register);
app.post("/login", Login);
app.get("/teamChat", getTeamChat);
app.get("/getCurrentUser", getCurrentUser);
app.get("/getAllTeams", GetAllTeams);
app.post("/addTeam", AddTeam);
app.post("/addChat", addtoChat);
app.get('/teamErrors', GetTeamErrors);
app.post('/addTeamError', AddTeamError);
app.delete('/delete', deleteChat)

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
  .connect(
    "mongodb+srv://yemiojedapo1:09030184479@cluster0.wx4gmqb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection Failed:");
    console.log("Error name:", error.name);
    console.log("Error message:", error.message);
    console.log("Full error:", error);
  });
