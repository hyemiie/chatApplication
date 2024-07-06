import React, { useState, useEffect, useRef } from "react";
import "./chatlist2.css";
import Adduser from "./addUser/Adduser";
import axios from "axios";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import "../../chat/chat.css";
import UserInfo from "../userInfo/UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faVideoCamera,
  faAngleLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { deleteModel } from "mongoose";

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
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [newErrorTeamID, setNewErrorTeamID] = useState("");
  const [inputVisibility, setInputVisibility] = useState({});
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [userSearch, setuserSearch] = useState("");
  const [userRole, setUserRole] = useState("");
  const [messageID, setMessageID] = useState("");

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

    socket.current.on("new image", (data) => {
      setImages((prevImages) => [...prevImages, data.url]);
    });

    return () => {
      socket.current.off("connect");
      socket.current.off("receive_message");
      socket.current.disconnect();
      socket.current.off("new image");
    };
  }, [teamId]);

  const joinRoom = (teamId) => {
    const username = localStorage.getItem("userName") || "Guest";
    const room = teamId;
    socket.current.emit("join_room", { username, room });
  };

  const sendMessage = async () => {
    if (!text.trim() && !file) return; // Exit early if both text and file are empty

    if (file) {
      // Handle file upload
      const formData = new FormData();
      formData.append("image", file);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("response", response);

        if (response.data.success) {
          const imageUrl = response.data.url;

          const room = selectedTeamId;
          const sender = localStorage.getItem("userName") || "Guest";
          const data = { url: imageUrl, room, sender, type: "image" };
          console.log("response", response);

          socket.current.emit("sendMessage", data);
          io.to(room).emit("new message");
          alert("you have a new message");

          // Update chat history with the sent message
          setChatHistory((prevChatHistory) => [
            ...prevChatHistory,
            {
              chatHistory: { type: "image", data: imageUrl },
              sender,
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      // Handle text message
      const userInput = text;
      const room = selectedTeamId;
      const sender = localStorage.getItem("userName") || "Guest";
      const data = { message: userInput, room, sender, type: "text" };

      socket.current.emit("sendMessage", data);

      // Update chat history with the sent message
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        {
          chatHistory: { type: "text", data: userInput },
          sender,
          createdAt: new Date().toISOString(),
        },
      ]);
    }

    setText(""); // Clear input field after sending
    endRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to bottom of chat
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
      console.log("res", chatHistory);
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
      const userRole = localStorage.getItem("userRole");
      setUsername(Username);
      setUserRole(userRole);
      console.log("userNames", Username);
      console.log("userRole", userRole);
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

  const handleChatSelect = () => {
    setIsMobileChatOpen(true);
    console.log("mobilechat");
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
      const response = await axios.post(
        "http://localhost:5000/addTeamError",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          console.log("Image URL:", response.data.url);
          // Handle further logic (e.g., sending the URL via socket.io)
        }
      } catch (error) {
        console.log("Error uploading image:", error);
      }
    }
  };

  const handleFilesChange = (e) => {
    setFile(e.target.files[0]);
    console.log("file", file);
  };

  const deleteChat = async () => {
    if (!messageID) return; // Exit if no messageId is set
    try {
      const response = await axios.delete(`http://localhost:5000/delete`, {
        params: { messageID, selectedTeamId},
      });
      console.log("deleted");
      alert("Message deleted");
      setMessageID(null);
      setChatHistory(response.data.updatedChat)
      console.log("response", response)
    } catch (error) {
      console.log(error);
      alert("Failed to delete message");
    }
  };


  useEffect(() => {
    if (messageID) {
      deleteChat();
    }
  }, [messageID]);

  const searchChat = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/getAllTeams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { teamId },
      });
      // setTeamErrors(response.data);
      const searchedTeam = response.data.teams;
      const userSearchUpdate = searchedTeam.filter((searched) =>
        searched.teamName.includes(userSearch)
      );
      console.log("userSearchupdate", userSearchUpdate);

      setTeams(userSearchUpdate);
    } catch (error) {
      console.error("Error fetching team chat:", error);
    }
  };

  const Search = (e) => {
    setuserSearch(e.target.value);
    console.log("userSearch", userSearch);
  };

  return (
    <div className="fullChat">
      <div className={`show ${selectedToggle ? "slide-in" : "hide"}`}>
        <button onClick={() => setSelectedToggle(false)} className="lastDivBtn">
          Go back
        </button>
        {teamErrors.map((error) => (
          <div
            key={error._id}
            className="teamErrDiv"
            onClick={() => handleErrorClick(error._id)}
          >
            {error.teamError.length < 1 ? (
              <p>Empty error</p>
            ) : (
              <ul className="teamLists">
                <li onClick={() => handleChatSelect()}>{error.teamError}</li>
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
              <img src="/search.png" alt="search icon" onClick={searchChat} />
              <input
                type="text"
                placeholder="Search"
                onChange={(event) => {
                  Search(event);
                  searchChat(event.target.value);
                }}
              />{" "}
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
                <div className="teamDiv">
                  <span
                    onClick={() => handleteamClick(team._id)}
                    className="teamName"
                  >
                    {team.teamName}
                  </span>
                  {userRole == "Executive" ? (
                    <button
                      onClick={() => toggleInputVisibility(team._id)}
                      className="addTeamBtn"
                    >
                      {inputVisibility[team._id] ? <h2>-</h2> : <h2>+</h2>}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                {/* {!inputVisibility[team._id] ? 
  <div className="chatSnippet">recent messages</div>
  : null
} */}
                <div className="chatSnippet">recent messages</div>
                {inputVisibility[team._id] && (
                  <div className="newTeamError">
                    <input id="newErrorName" />
                    <button type="submit" onClick={addTeamError}>
                      Add to List
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {addMode && <Adduser />}
      <div
        className={`chatHistory ${
          isMobileChatOpen ? "mobile-open" : "mobilechatHistory"
        }`}
      >
        {selectedTeamId ? (
          <div className="chat">
            <div className="top">
              <div className="user">
                <button
                  onClick={() => setIsMobileChatOpen(false)}
                  className="chatBackButton"
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="angleLeft" />
                </button>
                <img src="./avatar.png" alt="" />
                <div className="texts">
                  <span>{userName}</span>
                  <p>Lorem ipsum dolor sit</p>
                </div>
              </div>
              <div className="icons">
                <FontAwesomeIcon icon={faEllipsisH} />
                <FontAwesomeIcon icon={faVideoCamera} />
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
                    className={`message ${
                      chat.sender !== userName ? "message" : "own"
                    }`}
                  >
                    {chat.chatHistory.type == "text" ? (
                      <div>
                        <img src="./avatar.png" alt="avatar" />
                        <div className="texts userTxt">
                          <div className="delChat">
                            <p>{chat.chatHistory.data} </p>
                            {userRole == "Executive" ? (
                              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this message?")) {
                    setMessageID(chat._id);
                  }
                }}
              />
                            ) : (
                              ""
                            )}
                          </div>

                          <span>
                            {new Date(chat.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <img src="./avatar.png" alt="avatar" />
                        <div className="texts userTxt">
                          <img
                            src={`http://localhost:5000${chat.chatHistory.data}`}
                            alt="Image"
                          />
                          <span>
                            {new Date(chat.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
              <div ref={endRef}></div>
            </div>
            <div className="bottom">
              {/* <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
              /> */}
              {/* <div className="icons"> */}
              {/* <img src="./img.png" alt="" /> */}
              {/* <label htmlFor="fileInput" className="custom-file-upload">
                <img src="./img.png" alt="" />
</label> */}
              <input
                type="file"
                onChange={handleFilesChange}
                accept="image/*"
                className="imageInput"
              />
              {/* </div> */}
              <input
                type="text"
                placeholder="Type a message..."
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyPress}
                value={text}
                id="userInput"
                className="userMessage"
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
            <div className="emptyChat"></div>
          </div>
        )}
      </div>

      <div id="chat">
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} />
        ))}
      </div>

      {/* <button onClick={deleteChat}>Delete</button> */}
    </div>
  );
};

export default Chatlist;
