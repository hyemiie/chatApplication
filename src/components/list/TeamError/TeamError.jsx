import React, { useState } from 'react';
import { Search, Plus, Minus, Hash, MessageCircle, Lightbulb, Users, Settings } from 'lucide-react';
import './TeamError.css';
import { FaPlus } from 'react-icons/fa';

const TeamChannels = ({
  teams = [],
  userRole = "User",
  handleteamClick,
  searchChat,
  addTeamError,
  teamMembers = [],
  membersView,
  setMembersView,
  className,
  isMobileChatOpen

}) => {
  const [addMode, setAddMode] = useState(false);
  const [inputVisibility, setInputVisibility] = useState({});
  const [activeChannel, setActiveChannel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Default channels that appear for all users
  const defaultChannels = [
    { id: 'welcome', name: 'welcome', icon: MessageCircle, color: '#10b981' },
    { id: 'suggestions', name: 'suggestions', icon: Lightbulb, color: '#f59e0b' },
    { id: 'general', name: 'general', icon: Hash, color: '#6b7280' },
  ];

  const toggleInputVisibility = (teamId) => {
    setInputVisibility(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    searchChat(value);
  };

  const handleChannelClick = (channelId, isTeam = false) => {
    setActiveChannel(channelId);
    if (isTeam) {
      handleteamClick(channelId);
    } else {
      // Handle default channel clicks
      console.log(`Navigating to ${channelId} channel`);
    }
  };

  const filteredTeams = teams.filter(team => 
    team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<div className={`chat-channels ${className}`}>
      {/* Header Section */}
      <div className="channels-header">
        <div className="header-title">
          <Hash className="header-icon" size={18} />
          <h2>Channels</h2>
        </div>
        
        {/* Search Bar */}
        <div className="search-container">
          <div className="search-bar">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Search channels..."
              value={searchTerm}
              onChange={handleSearchInputChange}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {/* Default Channels */}
      <div className="channels-section">
        <div className="section-header">
          <h2 className="section-title">Channels</h2>
        </div>
        <div className="channels-list">
          {defaultChannels.map((channel) => {
            const IconComponent = channel.icon;
            return (
              <div
                key={channel.id}
                className={`channel-item ${activeChannel === channel.id ? 'active' : ''}`}
                onClick={() => handleChannelClick(channel.id)}
              >
                <IconComponent 
                  size={16} 
                  className="channel-icon"
                  style={{ color: channel.color }}
                />
                <span className="channel-name"># {channel.name}</span>
                <div className="channel-indicator"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Teams Section */}
      <div className="channels-section">
        <div className="section-header">
          <span className="section-title">Teams</span>
          <span className="team-count">({filteredTeams.length})</span>
        </div>
        
        <div className="channels-list">
          {filteredTeams.map((team) => (
            <div key={team._id} className="team-container">
              <div 
                className={`channel-item team-item ${activeChannel === team._id ? 'active' : ''}`}
                onClick={() => handleChannelClick(team._id, true)}
              >
                <Users size={16} className="channel-icon team-icon" />
                <span className="channel-name"># {team.teamName}</span>
                
                {userRole !== "Executive" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleInputVisibility(team._id);
                    }}
                    className="toggle-btn"
                  >
                    {inputVisibility[team._id] ? 
                      <Minus size={14} className="toggle-icon" /> : 
                      <Plus size={14} className="toggle-icon" />
                    }
                  </button>
                )}
              </div>
              
              {inputVisibility[team._id] && (
                <div className="add-error-form">
                  <div className="form-group">
                    <input 
                      id={`newErrorName-${team._id}`}
                      placeholder="Enter error name..."
                      className="error-input"
                    />
                    <button 
                      type="submit" 
                      onClick={(e) => {
                        e.stopPropagation();
                        addTeamError();
                      }}
                      className="add-btn"
                    >
                      <FaPlus/>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Team Members Modal */}
      {membersView && (
        <div className="members-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Team Members</h3>
              <button 
                onClick={() => setMembersView(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            <div className="members-list">
              {teamMembers.map((member) => (
                <div key={member._id} className="member-item">
                  <div className="member-avatar">
                    {member.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="member-name">{member.username}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default TeamChannels;