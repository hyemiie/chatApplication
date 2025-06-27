import React, { useState, useEffect, useRef } from "react";
import "./chatlist2.css";
import Adduser from "./addUser/Adduser";
import axios from "axios";
import { io } from "socket.io-client";
import EmojiPicker from "emoji-picker-react";
import "../../chat/chat.css";
import UserInfo from "../userInfo/UserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mail, MessageCircle, MessageCircleCode, MessageSquare, MessagesSquare, Speech, StickyNote } from "lucide-react";
import {
  faEllipsisH,
  faVideoCamera,
  faAngleLeft,
  faTrash,
  faFile,
  faSquareEnvelope,
  faPaperPlane,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { deleteModel } from "mongoose";
import video from "../../../Images/video2.mp4";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Cross, CrossIcon, FolderPlus, SearchIcon } from "lucide-react";
import { FaCross } from "react-icons/fa6";
import { CgCrop, CgCross } from "react-icons/cg";
import ChatComponent from "../../chat/Chat";
import ChatList from "../TeamError/TeamError";
import TeamChannels from "../TeamError/TeamError";

const Welcome = ({ teamId }) => {
  const [addMode, setAddMode] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [userName, setUsername] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [teamErrors, setTeamErrors] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
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
  const [membersView, setMembersView] = useState(false);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    socket.current = io("https://chat-server-3s8b.onrender.com");

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
    if (!text.trim() && !file) return; 

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "https://chat-server-3s8b.onrender.com/upload",
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
      const userInput = text;
      const room = selectedTeamId;
      const sender = localStorage.getItem("userName") || "Guest";
      const data = { message: userInput, room, sender, type: "text" };

      socket.current.emit("sendMessage", data);

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
      const response = await axios.get(
        `https://chat-server-3s8b.onrender.com/teamChat`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { teamId },
        }
      );
      setChatHistory(response.data);
      console.log("res", chatHistory);
    } catch (error) {
      console.error("Error fetching team chat:", error);
    }
  };

 

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };


  const handleChatSelect = () => {
    setIsMobileChatOpen(true);
    console.log("mobilechat");
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
          "https://chat-server-3s8b.onrender.com/upload",
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
      const response = await axios.delete(
        `https://chat-server-3s8b.onrender.com/delete`,
        {
          params: { messageID, selectedTeamId },
        }
      );
      console.log("deleted");
      alert("Message deleted");
      setMessageID(null);
      setChatHistory(response.data.updatedChat);
      console.log("response", response);
    } catch (error) {
      console.log(error);
      alert("Failed to delete message");
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const allUsers = async () => {
    try {
      const response = await axios.get(
        `https://chat-server-3s8b.onrender.com/allUsers`,
        {
          params: { messageID, selectedTeamId },
        }
      );
      console.log("Team members response", response.data);

      setTeamMembers(response.data.AllUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("teamMembers updated:", teamMembers);
  }, [teamMembers]);

  useEffect(() => {
    if (messageID) {
      deleteChat();
    }
  }, [messageID]);

  useEffect(() => {
    allUsers();
  }, []); // Empty dependency array means it runs only once

  const searchChat = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://chat-server-3s8b.onrender.com/getAllTeams`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { teamId },
        }
      );
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



  return (
    <div className="fullChat">
    {!isMobileChatOpen && (
  <>
    <div className={`show ${selectedToggle ? "slide-in" : "hide"}`}>
      <button onClick={() => {
        setSelectedToggle(false);
        setIsMobileChatOpen(false); 
      }} className="lastDivBtn">
        Go back
      </button>

  
    </div>

  </>
)}






      <div id="chat">
        {images.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default Welcome;
