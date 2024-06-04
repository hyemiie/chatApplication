import React, { useState, useEffect, useRef } from "react";
import "./chatList.css";
import Adduser from "./addUser/Adduser";
import axios from "axios";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import '../../chat/chat.css';
import UserInfo from "../userInfo/UserInfo";

const Chatlist = ({ teamId }) => {
  const [addMode, setAddMode] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [userName, setUsername] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [teamErrors, setTeamErrors] = useState([]);
  const endRef = useRef(null);
  const socket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize socket connection and event listeners
  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.on("connect", () => {
      setIsConnected(true);
      joinRoom(teamId);
    });

    socket.current.on("receive_message", (data) => {
      console.log('Message received:', data);
      setChatHistory((prevChatHistory) => [...prevChatHistory, data]);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => {
      socket.current.off("connect");
      socket.current.off("receive_message");
    };
  }, [teamId]);

  // Function to join a chat room
  const joinRoom = (teamId) => {
    const username = "Yemi";
    const room = teamId;
    socket.current.emit("join_room", { username, room });
  };

  // Function to send a message
  const sendMessage = async () => {
    const userInput = text;
    const room = selectedTeamId;
    const sender = localStorage.getItem('userName');
    const data = { message: userInput, room, sender };
    socket.current.emit("sendMessage", data);

    setChatHistory((prevChatHistory) => [...prevChatHistory, { chatHistory: userInput, sender, createdAt: new Date().toISOString() }]);
    setText(''); // Clear the input field after sending

    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle key press in input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default behavior of form submission
      sendMessage();
    }
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
        setTeams(response.data.teams);
        console.log(response.data);
        console.log('teams', teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    const checkSignedUser = () => {
      const Username = localStorage.getItem('userName');
      setUsername(Username);
      console.log('userNames', Username);
    }

    getTeams();
    checkSignedUser();
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleClick = (teamId) => {
    getMessage(teamId);
    console.log(teamId);
  };

  const getTeamErrors = async () => {
    console.log(teamId);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get("http://localhost:5000/teamErrors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { teamId }
      });
      console.log(response);
      setTeamErrors(response.data.teamErrors);
      console.log('errors', teamErrors);
    } catch (error) {
      console.log('error', error);
    }
  }

  const addTeamError = async () => {
    try {
      const response = await axios.get("http://localhost:5000/addTeamError");
      console.log(response);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className="fullChat">
      <div className="chatList">
        <UserInfo />
        <div className="FirstDiv">
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
            <div key={team._id} className="item">
              <img src="./avatar.png" alt="avatar" />
              <div className="texts">
                <span onClick={getTeamErrors}>{team.teamName}</span>
                <p>recent messages</p>
              </div>
            </div>
          ))}

          <button onClick={addTeamError}>addTeamError</button>
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
                <div key={chat._id} className={`message ${chat.sender !== userName ? 'message' : "own"}`}>
                  <img src="./avatar.png" alt="avatar" />
                  <div className="texts userTxt">
                    {chat.chatHistory > 1 ? (
                      <p className="emptyChat">Empty Chat</p>
                    ) : (
                      <>
                        <p>{chat.chatHistory}</p>
                        <span>{new Date(chat.createdAt).toLocaleString()}</span>
                      </>
                    )}
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
                onKeyDown={handleKeyPress} // Handle key press event
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
          <div className="emptyChat">
            Empty chat
          </div>
        )}
      </div>

      {teamErrors.map((errors) => (
        <div key={errors.id} className="teamErrors" onClick={() => handleClick(errors._id)}>
          <ul className="teamLists"><li>{errors.teamError}</li></ul>
          <p>{}</p>
        </div>
      ))}

    </div>
  );
};

export default Chatlist;
