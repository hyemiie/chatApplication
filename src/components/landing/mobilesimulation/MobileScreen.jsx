import React, { useState } from 'react';
import './mobilescreen.css';

const MobileScreen = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  
  const teamChannels = [
    { id: 1, name: 'QA', members: 12, unread: 3, lastMessage: 'Bug fix deployed successfully', online: true },
    { id: 2, name: 'Development', members: 8, unread: 0, lastMessage: 'Code review completed', online: true },
    { id: 3, name: 'Marketing', members: 15, unread: 7, lastMessage: 'Campaign launch next week', online: false },
    { id: 4, name: 'Operations', members: 6, unread: 1, lastMessage: 'Server maintenance scheduled', online: true },
  ];

  return (
    <div className="channel-container">
      <div className="channel-header">
        <div className="header-content">
          <div className="team-indicator"></div>
          Team Channels 💼
        </div>
      </div>
      
      <div className="channel-list">
        {teamChannels.map(channel => (
          <div 
            key={channel.id} 
            className={`channel-item ${selectedChannel === channel.id ? 'selected' : ''}`}
            onClick={() => setSelectedChannel(channel.id)}
          >
            <div className="channel-info">
              <div className="channel-main">
                <div className="channel-name-row">
                  <span className="channel-hash">#</span>
                  <span className="channel-name">{channel.name}</span>
                  <div className={`status-dot ${channel.online ? 'online' : 'offline'}`}></div>
                </div>
                {/* <div className="channel-meta">
                  <span className="member-count">{channel.members} members</span>
                  {channel.unread > 0 && (
                    <div className="unread-badge">{channel.unread}</div>
                  )}
                </div> */}
              </div>
              <div className="last-message">{channel.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="channel-footer">
        <div className="add-channel-btn">
          <svg className="plus-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Channel</span>
        </div>
      </div>
    </div>
  );
};

export default MobileScreen;