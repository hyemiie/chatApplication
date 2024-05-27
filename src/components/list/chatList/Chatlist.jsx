import React, { useState, useEffect } from "react";
import "./chatList.css";
import Adduser from "./addUser/Adduser";
import axios from "axios";
import Chat from "../../chat/Chat"; // Import the Chat component

const Chatlist = () => {
  const [addMode, setAddMode] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeamId, setSelectedTeamId] = useState(null); // State to hold the selected team ID

  const getTeams = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/getAllTeams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const teams = response.data.user;
      setTeams(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const handleClick = (teamId) => {
    setSelectedTeamId(teamId); // Set the selected team ID
  };

  return (
    <div className="chatList">
    <div>
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
        <div key={team._id} className="item" onClick={() => handleClick(team._id)}>
          <img src="./avatar.png" alt="avatar" />
          <div className="texts">
            <span>{team.teamName}</span>
            <p>recent mesages</p>
          </div>
        </div>
      ))}
      </div>
      <div>
      {addMode && <Adduser />}
      
      {/* {selectedTeamId && <Chat teamId={selectedTeamId} className=""/>}   */}
    </div>
    </div>
  );
};

export default Chatlist;
