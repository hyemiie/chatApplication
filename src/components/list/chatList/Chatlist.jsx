import React, { useState, useEffect, useRef } from "react";
import "./chatlist2.css";
import Adduser from "./addUser/Adduser";
import axios from "axios";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import "../../chat/chat.css";
import UserInfo from "../userInfo/UserInfo";

const Chatlist = ({ teamId }) => {
  const [addMode, setAddMode] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [userName, setUsername] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [teamErrors, setTeamErrors] = useState([]);
  const endRef = useRef(null);
  const socket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedToggle, setSelectedToggle] = useState(false);
  const [newErrorTeamID, setNewErrorTeamID] = useState("");
  const [inputVisibility, setInputVisibility] = useState({});

  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.on("connect", () => {
      setIsConnected(true);
      joinRoom(teamId);
    });

    socket.current.on("receive_message", (data) => {
      console.log("Message received:", data);
      setChatHistory((prevChatHistory) => [...prevChatHistory, data]);
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => {
      socket.current.off("connect");
      socket.current.off("receive_message");
      socket.current.disconnect();
    };
  }, [teamId]);

  const joinRoom = (teamId) => {
    const username = localStorage.getItem("userName") || "Guest";
    const room = teamId;
    socket.current.emit("join_room", { username, room });
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const userInput = text;
    const room = selectedTeamId;
    const sender = localStorage.getItem("userName") || "Guest";
    const data = { message: userInput, room, sender };
    socket.current.emit("sendMessage", data);

    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { chatHistory: userInput, sender, createdAt: new Date().toISOString() },
    ]);
    setText("");

    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

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
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    const checkSignedUser = () => {
      const Username = localStorage.getItem("userName");
      setUsername(Username);
      console.log("userNames", Username);
    };

    getTeams();
    checkSignedUser();
  }, []);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleErrorClick = (errorId) => {
    getMessage(errorId);
    console.log(errorId);
  };

  const getTeamErrors = async (teamId) => {
    console.log("teamId", teamId);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5000/teamErrors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { teamId },
      });
      console.log(response);
      setTeamErrors(response.data.teamErrors);
      setSelectedToggle(true);
      console.log("errors", teamErrors);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleteamClick = (teamId) => {
    getTeamErrors(teamId);
    console.log(teamId);
  };

  const addTeamError = async () => {
    const newChatError = document.getElementById("newErrorName").value;
    const teamId = newErrorTeamID;
    const data = { newChatError, teamId };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/addTeamError", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleInputVisibility = (teamId) => {
    setInputVisibility((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
    setNewErrorTeamID(teamId);
  };

  return (
    <div className="fullChat">
      <div className={`show ${selectedToggle ? "slide-in" : "hide"}`}>
        <button onClick={() => setSelectedToggle(false)} className="lastDivBtn">
          Go back
        </button>
        {teamErrors.map((error) => (
          <div key={error._id} className="teamErrDiv" onClick={() => handleErrorClick(error._id)}>
            {error.teamError.length < 1 ? (
              <p>Empty error</p>
            ) : (
              <ul className="teamLists">
                <li>{error.teamError}</li>
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="chatList">
        <div className="FirstDiv">
          <UserInfo />

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
            <div key={team._id} className="item" >
              <img src="./avatar.png" alt="avatar" />
              <div className="texts">
                <span onClick={() => handleteamClick(team._id)} className="teamName">{team.teamName}</span>
                <div className="chatSnippet">
                  recent messages
                  <button onClick={() => toggleInputVisibility(team._id)} className="addTeamBtn">
                    {inputVisibility[team._id] ? "-" : "+"}
                  </button>
                </div>
                {inputVisibility[team._id] && (
                  <div className="newTeamError">
                    <input id="newErrorName" />
                    <button type="submit" onClick={addTeamError}>Add to List</button>
                  </div>
                )}
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
              {chatHistory.length === 0 ? (
                <div className="emptyDiv">
                  <p className="emptyChat">
                    <h3>This chat is currently empty</h3>
                  </p>
                </div>
              ) : (
                chatHistory.map((chat) => (
                  <div
                    key={chat._id}
                    className={`message ${chat.sender !== userName ? "message" : "own"}`}
                  >
                    <img src="./avatar.png" alt="avatar" />
                    <div className="texts userTxt">
                      <p>{chat.chatHistory}</p>
                      <span>{new Date(chat.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
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
                onKeyDown={handleKeyPress}
                value={text}
                id="userInput"
              />
              <div className="emoji">
                <img
                  src="./emoji.png"
                  alt=""
                  onClick={() => setOpen((prev) => !prev)}
                />
                {open && (
                  <div className="picker">
                    <EmojiPicker onEmojiClick={handleEmoji} />
                  </div>
                )}
              </div>
              <button className="sendButton" onClick={sendMessage}>
                Send
              </button>
            </div>
          </div>
        ) : (
          <div className="emptyDiv2">
            <div className="emptyChat">
              <h3>This chat is currently empty</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatlist;
