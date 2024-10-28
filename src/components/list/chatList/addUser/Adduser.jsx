import React from "react";
import "./addUser.css";
import { useState} from "react";
 import axios from "axios";
const Adduser = () => {

//  const [teams, setTeams] = useState([])
const addTeam = async () => {
  const teamName = document.getElementById('newTeam').value; // Assuming 'newTeam' is an input element
  try {
      const token = localStorage.getItem("token");
      console.log(token);

      const response = await axios.post("https://chatapplication-backend-d65c.onrender.com/addTeam", { teamName }, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      console.log( response.data.Teams)
    

      alert('Team Added');
      console.log("Done");
  } catch (error) {
      console.error("Error adding team:", error);
  }
};

  return (
    <div className="addUser">
      <form action="">
        <input type="text" name="username" id="newTeam" placeholder="Team name" />
      </form>
      <div className="user">
        <div className="detail">
          <img src="./avatar.png" alt="" />
        </div>
        <button onClick={addTeam}>Add Team</button>
      </div>
    </div>
  );
};

export default Adduser;
