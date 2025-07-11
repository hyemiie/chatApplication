import React, { useState } from 'react';
import { ArrowLeft, Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import './screen.css';
import CompanyLogosSection from './companies/CompanyLogosSection';

export default function TeamChatApp() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Alex Chen',
      avatar: 'AC',
      message: 'Hey team, are we still on for the 3 PM meeting?',
      time: '2:45 PM',
      isOwn: false,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      sender: 'You',
      message: 'Yes, I\'ll be joining shortly. Just finishing up the presentation slides.',
      time: '2:47 PM',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Sarah Kim',
      avatar: 'SK',
      message: 'Same here! Looking forward to the updates on the Q4 campaign.',
      time: '2:48 PM',
      isOwn: false,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      sender: 'Mike Johnson',
      avatar: 'MJ',
      message: 'I\'ve uploaded the latest analytics report to the shared folder.',
      time: '2:50 PM',
      isOwn: false,
      color: 'bg-green-500'
    },
    {
      id: 5,
      sender: 'You',
      message: 'Perfect! I\'ll review it before the meeting.',
      time: '2:51 PM',
      isOwn: true
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  
  return (
    <div className="chat-app-container">    
      <div className="chat-container">
        
        <header className="chat-header">
          <div className="header-left">
            <button className="back-button">
              <ArrowLeft className="icon-sm" />
            </button>
            <div className="team-info">
              <div className="team-avatar">
                QA
              </div>
              <div className="team-details">
                <h1 className="team-name">qa-testing</h1>
                <p className="team-status">4 members • 3 online</p>
              </div>
            </div>
          </div>
          
          <div className="header-actions">
          
            <button className="action-button">
              <MoreVertical className="icon-sm" />
            </button>
          </div>
        </header>

        <div className="messages-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.isOwn ? 'own-message' : 'other-message'}`}>
              <div className={`message-group ${msg.isOwn ? 'own-group' : 'other-group'}`}>
                
                {!msg.isOwn && (
                  <div className={`message-avatar ${msg.color}`}>
                    {msg.avatar}
                  </div>
                )}
                
                <div className={`message-content ${msg.isOwn ? 'own-content' : 'other-content'}`}>
                  {!msg.isOwn && (
                    <span className="sender-name">{msg.sender}</span>
                  )}
                  <div className={`message-bubble ${msg.isOwn ? 'own-bubble' : 'other-bubble'}`}>
                    <p className="message-text">{msg.message}</p>
                  </div>
                  <span className="message-time">{msg.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="input-area">
          <div className="input-wrapper">
            <div className="input-container">
              <div className="input-content">
                <button className="input-action-button">
                  <Paperclip className="icon-sm" />
                </button>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="message-input"
                  rows="1"
                />
                <button className="input-action-button">
                  <Smile className="icon-sm" />
                </button>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`send-button ${message.trim() ? 'send-active' : 'send-disabled'}`}
            >
              <Send className="icon-sm" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}