import React, { useEffect, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faTrash,
  faPaperPlane,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { FolderPlus, Users } from "lucide-react";

import "./chat2.css"; // Updated modern CSS file
import { FaPeopleGroup } from "react-icons/fa6";
import Adduser from "../list/chatList/addUser/Adduser";

const ChatComponent = ({
  setAddMode,
  addMode,
  isMobileChatOpen,
  selectedTeamId,
  teamName,
  teamMembers,
  membersView,
  setMembersView,
  chatHistory,
  userName,
  userRole,
  setMessageID,
  endRef,
  handleFilesChange,
  handleKeyPress,
  handleEmoji,
  sendMessage,
  text,
  setText,
  setIsMobileChatOpen,
  open,
  setOpen,
}) => {
  const [teamView, setTeamView] = useState(false);

  console.log("selectedTeamId:", selectedTeamId);
  console.log("teamMembers received:", teamMembers);

  useEffect(() => {
    console.log("teamMembers changed:", teamMembers);
  }, [teamMembers]);

  const testlist = (status) => {
    console.log("status", status);
  };

  // Function to generate consistent color for a user
  const getUserColor = (username) => {
    const colors = [
      "#FF6B81", // bold pink
      "#42C2FF", // vivid sky blue
      "#F67280", // watermelon
      "#6C5CE7", // rich lavender
      "#00CEC9", // vibrant teal
      "#FDA7DC", // strong rose
      "#A29BFE", // bright lilac
      "#74B9FF", // electric blue
      "#FF9F43", // rich apricot
      "#55EFC4", // crisp mint
      // '#FDCB6E', // deep pastel yellow
      "#81ECEC", // bright cyan
      "#E17055", // coral orange
      "#FAB1A0", // punchy peach
      "#B388EB", // vivid violet
    ];

    // Create a simple hash from username
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Use hash to pick a color
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  };

  return (
    <>
      <div
        className={`chatHistory ${
          isMobileChatOpen ? "mobile-open" : "mobilechatHistory"
        }`}
      >
        {selectedTeamId ? (
          <div className="chat">
            <div className="top">
              <button
                className="chatBackButton"
                onClick={() => setIsMobileChatOpen(false)}
              >
                ←
              </button>

              <div className="user">
                <div className="teamDetail">
                  <span>{teamName}</span>
                </div>
              </div>
              <div className="buttonDiv">
                <button
                  onClick={() => setTeamView(true)}
                  className="viewMembers"
                >
                  <Users
                    style={{
                      width: "2rem",
                      height: "2rem",
                      backgroundColor: "transparent",
                    }}
                  />
                </button>
              </div>
            </div>

            <div className="center">
              {chatHistory.length === 0 ? (
                <div className="emptyDiv">
                  <div className="emptyImg"></div>
                  <h3 className="emptyChat">No messages yet</h3>
                  <p className="emptySubtext">
                    Start the conversation with your team!
                  </p>
                </div>
              ) : (
                chatHistory.map((chat, index) => {
                  const currentDate = new Date(chat.createdAt);
                  const previousDate =
                    index > 0
                      ? new Date(chatHistory[index - 1].createdAt)
                      : null;

                  const showDateHeader =
                    !previousDate ||
                    currentDate.toDateString() !== previousDate.toDateString();

                  const isOwnMessage = chat.sender === userName;

                  return (
                    <div key={chat._id} className="dateHeadDiv">
                      {showDateHeader && (
                        <div
                          className="dateHeader"
                          data-date={currentDate.toDateString()}
                        ></div>
                      )}

                      <div
                        className={`message ${isOwnMessage ? "own" : "other"}`}
                      >
                        {chat.chatHistory.type === "text" ? (
                          <div className="messageDiv">
                            <div className="msgheading">
                              <div
                                className="senderImg"
                                style={{
                                  backgroundColor: getUserColor(chat.sender),
                                }}
                              >
                                {String(chat.sender).slice(0, 2)}
                              </div>

                              {!isOwnMessage && (
                                <>
                                  <h2 className="chatSender">{chat.sender}</h2>
                                  <span className="messageTime received-time">
                                    {currentDate.toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </>
                              )}
                            </div>

                            <div className="messageBubble">
                              <div className="messageContent">
                                <p className="chatData">
                                  {chat.chatHistory.data}
                                </p>
                                <div className="messageFooter">
                                  {userRole === "Executive" && (
                                    <button
                                      className="deleteButton"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Are you sure you want to delete this message?"
                                          )
                                        ) {
                                          setMessageID(chat._id);
                                        }
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                            {isOwnMessage && (
                              <span className="messageTime sent-time">
                                {currentDate.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="messageDiv">
                            <div className="msgheading">
                              <div
                                className="senderImg"
                                style={{
                                  backgroundColor: getUserColor(chat.sender),
                                }}
                              >
                                {String(chat.sender).slice(0, 2)}
                              </div>

                              {!isOwnMessage && (
                                <>
                                  <h2 className="chatSender">{chat.sender}</h2>
                                  <span className="messageTime received-time">
                                    {currentDate.toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                </>
                              )}
                            </div>

                            <div className="messageBubble imageBubble">
                              <div className="messageContent">
                                <img
                                  src={`https://chat-server-3s8b.onrender.com${chat.chatHistory.data}`}
                                  alt="Shared content"
                                  className="chatImage"
                                />
                                <div className="messageFooter">
                                  {isOwnMessage && (
                                    <span className="messageTime sent-time">
                                      {currentDate.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  )}
                                  {userRole === "Executive" && (
                                    <button
                                      className="deleteButton"
                                      onClick={() => {
                                        if (
                                          window.confirm(
                                            "Are you sure you want to delete this message?"
                                          )
                                        ) {
                                          setMessageID(chat._id);
                                        }
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={endRef}></div>
            </div>

            {teamView && (
              <div className="teamMembersOverlay">
                <div className="teamMembers">
                  <button
                    onClick={() => setTeamView(false)}
                    className="backToChat"
                  >
                    <FaArrowLeft />
                    <span>Back to Chat</span>
                  </button>
                  <div className="addnewRoom">
                    <div className="membersTxts">
                      <h2>Add team</h2>
                      <p> Create a new team to practice</p>
                      <button onClick={() => setAddMode((prev) => !prev)}>
                        Add team
                      </button>
                    </div>
                    <div className="membersImgDiv">
                      <div className="membersImg1"></div>
                      <div className="membersImg2"></div>
                    </div>
                  </div>
                         {addMode && <Adduser />}
                  

                  <div className="teamMembersHeader">
                    <h2>Team Members ({teamMembers?.length || 0})</h2>
                  </div>

                  <div className="membersList">
                    {teamMembers?.map((member) => (
                      <div key={member._id} className="memberItem">
                        <div
                          className="memberAvatar"
                          style={{
                            backgroundColor: getUserColor(member.username),
                          }}
                        >
                          {member.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="memberInfo">
                          <span className="memberName">{member.username}</span>
                          {/* <span className="memberStatus">Online</span> */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bottom">
              <label className="fileInputLabel">
                <input
                  type="file"
                  onChange={handleFilesChange}
                  accept="image/*"
                  className="imageInput"
                />
                <span className="fileInputIcon">
                  <FaCamera />
                </span>
              </label>

              <div className="inputContainer">
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
                  <FontAwesomeIcon
                    icon={faSmile}
                    onClick={() => setOpen((prev) => !prev)}
                    className="emojiIcon"
                  />
                  {open && (
                    <div className="picker">
                      <EmojiPicker onEmojiClick={handleEmoji} />
                    </div>
                  )}
                </div>
              </div>

              <button className="sendButton" onClick={sendMessage}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        ) : (
          <div className="emptyDiv2">
            <div className="emptyImg"></div>
            <h3 className="emptyChat">Select a team to start chatting</h3>
            <p className="emptySubtext">
              Choose a team from the sidebar to begin messaging
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatComponent;
