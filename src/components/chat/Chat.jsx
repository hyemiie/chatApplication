// import React, { useEffect, useState, useRef } from "react";
// import "./chat.css";
// import EmojiPicker from "emoji-picker-react";
// import { io } from "socket.io-client";
// import { socket } from "../../socket";
// import axios from "axios";

// const Chat = ({ teamId }) => {
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const endRef = useRef(null);
//   const [isConnected, setIsConnected] = useState(socket.connected);

//   useEffect(() => {
//     const newSocket = io("https://chatapplication-backend-d65c.onrender.com");

//     newSocket.on("connect", () => {
//       setIsConnected(true);
//       joinRoom(teamId);
//     });

//     newSocket.on("receive_message", (data) => {
//       setChatHistory((prevChatHistory) => [...prevChatHistory, data]);
//       endRef.current?.scrollIntoView({ behavior: "smooth" });
//     });

//     return () => {
//       newSocket.off("connect");
//       newSocket.off("receive_message");
//     };
//   }, [teamId]);

//   const joinRoom = (teamId) => {
//     const username = "Yemi";
//     const room = teamId; // Use the teamId as the room name
//     socket.emit("join_room", { username, room });
//   };

//   const sendMessage = async () => {
//     const token = localStorage.getItem("token");
//     const userInput = document.getElementById("userInput").value;
//     const room = teamId; // Use the teamId as the room
//     const sender = "Yemi";
//     const data = { message: userInput, room, sender };
//     socket.emit("sendMessage", data);
//     setText(''); // Clear the input field after sending
//   };

//   const getMessage = async (teamId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(`https://chatapplication-backend-d65c.onrender.com/teamChat`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: { teamId },
//       });
//       setChatHistory(response.data);
//     } catch (error) {
//       console.error("Error fetching team chat:", error);
//     }
//   };

//   useEffect(() => {
//     if (teamId) {
//       getMessage(teamId); // Fetch messages whenever the teamId changes
//     }
//   }, [teamId]);

//   const handleEmoji = (e) => {
//     setText((prev) => prev + e.emoji);
//     setOpen(false);
//   };

//   return (
//     <div className="chat">
//       <div className="top">
//         <div className="user">
//           <img src="./avatar.png" alt="" />
//           <div className="texts">
//             <span>Jane Doe</span>
//             <p>Lorem ipsum dolor sit amet</p>
//           </div>
//         </div>
//         <div className="icons">
//           <img src="./phone.png" alt="" />
//           <img src="./video.png" alt="" />
//           <img src="./info.png" alt="" />
//         </div>
//       </div>
//       <div className="center">
//         {chatHistory.map((chat) => (
//           <div key={chat._id} className="message">
//             <img src="./avatar.png" alt="" />
//             <div className="texts">
//               <p>{chat.chatHistory}</p>
//               <span>{chat.createdAt}</span>
//             </div>
//           </div>
//         ))}
//         <div ref={endRef}></div>
//       </div>
//       <div className="bottom">
//         <div className="icons">
//           <img src="./img.png" alt="" />
//           <img src="./camera.png" alt="" />
//           <img src="./mic.png" alt="" />
//         </div>
//         <input
//           type="text"
//           placeholder="Type a message..."
//           onChange={(e) => setText(e.target.value)}
//           value={text}
//           id="userInput"
//         />
//         <div className="emoji">
//           <img
//             src="./emoji.png"
//             alt=""
//             onClick={() => setOpen((prev) => !prev)}
//           />
//           <div className="picker">
//             <EmojiPicker open={open} onEmojiClick={handleEmoji} />
//           </div>
//         </div>
//         <button className="sendButton" onClick={sendMessage}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
