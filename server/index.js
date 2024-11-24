/* eslint-disable no-undef */
// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB
mongoose
  .connect(
    process.env.MONGO_URI
    )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log("Connection Failed:", error);
  });
// Define Mongoose Schemas
const messageSchema = new mongoose.Schema({
  teamId: String,
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

const teamSchema = new mongoose.Schema({
  name: String,
  messages: [messageSchema],
});

const Team = mongoose.model('Team', teamSchema);
const Message = mongoose.model('Message', messageSchema);

// Middleware
app.use(express.json());
app.use(express.static('public'));

// API Routes
app.get('/teams/:teamId/messages', async (req, res) => {
  const { teamId } = req.params;
  const team = await Team.findById(teamId).populate('messages');
  res.send(team ? team.messages : []);
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinTeam', async ({ teamId }) => {
    socket.join(teamId);
    const team = await Team.findById(teamId);
    socket.emit('chatHistory', team ? team.messages : []);
  });

  socket.on('message', async ({ teamId, username, message }) => {
    const newMessage = new Message({ teamId, username, message });
    await newMessage.save();

    let team = await Team.findById(teamId);
    if (!team) {
      team = new Team({ _id: teamId, name: `Team ${teamId}`, messages: [] });
    }
    team.messages.push(newMessage);
    await team.save();

    io.to(teamId).emit('message', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
