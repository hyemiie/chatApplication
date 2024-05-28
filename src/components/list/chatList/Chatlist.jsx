import React, { useState, useEffect, useRef } from "react";
import "./chatList.css";
import Adduser from "./addUser/Adduser";
import axios from "axios";
import { io } from "socket.io-client";
import { socket } from '../../../socket';
import EmojiPicker from "emoji-picker-react";
import '../../chat/chat.css';

const Chatlist = ({ teamId }) => {
  const [addMode, setAddMode] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const endRef = useRef(null);
  const [isConnected, setIsConnected] = useState(socket.connected);

  // Initialize socket connection and event listeners
  useEffect(() => {
    const newSocket = io("http://localhost:5000");

    newSocket.on("connect", () => {
      setIsConnected(true);
      joinRoom(teamId);
    });

    newSocket.on("receive_message", (data) => {
      setChatHistory((prevChatHistory) => [...prevChatHistory, data]);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => {
      newSocket.off("connect");
      newSocket.off("receive_message");
    };
  }, [teamId]);

  // Function to join a chat room
  const joinRoom = (teamId) => {
    const username = "Yemi";
    const room = teamId;
    socket.emit("join_room", { username, room });
  };

  // Function to send a message
  const sendMessage = async () => {
    const userInput = text;
    const room = teamId;
    const sender = "Yemi";
    const data = { message: userInput, room, sender };
    socket.emit("sendMessage", data);
    setText(''); // Clear the input field after sending
  };

  // Fetch messages for the selected team
  const getMessage = async (teamId) => {
    setSelectedTeamId(teamId);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/teamChat`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { teamId },
      });
      setChatHistory(response.data);
    } catch (error) {
      console.error("Error fetching team chat:", error);
    }
  };

  // Fetch teams on component mount
  useEffect(() => {
    const getTeams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/getAllTeams", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTeams(response.data.user);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    getTeams();
  }, []);

  // Handle emoji selection
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  // Handle team selection
  const handleClick = (teamId) => {
    getMessage(teamId);
  };

  return (
    <div className="fullChat">
    <div className="chatList">
      <div>
        <div className="search">
          <div className="searchBar">
            <img src="/search.png" alt="search icon" />
            <input type="text" placeholder="Search" />
          </div>
          <img
            src={addMode ? "./minus.png" : "./plus.png"}
            alt="toggle add mode"
            className="add"
            onClick={() => setAddMode((prev) => !prev)}
          />
        </div>

        {teams.map((team) => (
          <div key={team._id} className="item" onClick={() => handleClick(team._id)}>
            <img src="./avatar.png" alt="avatar" />
            <div className="texts">
              <span>{team.teamName}</span>
              <p>recent messages</p>
            </div>
          </div>
        ))}
      </div>
      </div>

      {addMode && <Adduser />}
      <div className="chatHistory">
        {selectedTeamId ? (
          <div className="chat">
            <div className="top">
              <div className="user">
                <img src="./avatar.png" alt="" />
                <div className="texts">
                  <span>Jane Doe</span>
                  <p>Lorem ipsum dolor sit amet</p>
                </div>
              </div>
              <div className="icons">
                <img src="./phone.png" alt="" />
                <img src="./video.png" alt="" />
                <img src="./info.png" alt="" />
              </div>
            </div>
            <div className="center">
              {chatHistory.map((chat) => (
                <div key={chat._id} className="message">
                  <img src="./avatar.png" alt="" />
                  <div className="texts">
                    <p>{chat.chatHistory}</p>
                    <span>{chat.createdAt}</span>
                  </div>
                </div>
              ))}
              <div ref={endRef}></div>
            </div>
            <div className="bottom">
              <div className="icons">
                <img src="./img.png" alt="" />
                <img src="./camera.png" alt="" />
                <img src="./mic.png" alt="" />
              </div>
              <input
                type="text"
                placeholder="Type a message..."
                onChange={(e) => setText(e.target.value)}
                value={text}
                id="userInput"
              />
              <div className="emoji">
                <img
                  src="./emoji.png"
                  alt=""
                  onClick={() => setOpen((prev) => !prev)}
                />
                <div className="picker">
                  <EmojiPicker open={open} onEmojiClick={handleEmoji} />
                </div>
              </div>
              <button className="sendButton" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chatlist;
