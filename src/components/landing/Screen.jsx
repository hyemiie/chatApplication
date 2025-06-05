import React from "react";
import "./screen.css";
import { FaArrowLeft, FaEnvelope } from "react-icons/fa6";

export default function Screen() {
  return (
    <div className="screen-page">
      {/* SVG Vertical Lines Background */}
      <svg className="screen-background">
        <defs>
          <pattern
            id="vlines"
            width="80"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vlines)" />
      </svg>

      {/* Chat Container */}
      <div className="screen-container">
        <header className="chat-header">
          <FaArrowLeft /> 
          <h2>PhaseB Marketing</h2>
        </header>

        <div className="chat-messages">
          <div className="chat-message-group">
            <div className="avatar blue"></div>
            <div className="message white">
              Hey team, are we still on for the 3 PM meeting?
            </div>
          </div>
          <div className="chat-message-group right">
            <div className="message blue-light">Yes, I’ll be joining shortly.</div>
          </div>
          <div className="chat-message-group">
            <div className="avatar purple"></div>
            <div className="message white">
              Same here! Looking forward to the updates.
            </div>
          </div>
        </div>

        <footer className="chat-footer">
          <input
            type="text"
            placeholder="Type a message..."
            className="message-input"
            disabled
          />
        </footer>
      </div>
    </div>
  );
}
