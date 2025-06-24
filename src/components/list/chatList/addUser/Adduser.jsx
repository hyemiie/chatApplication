import React from "react";
import "./addUser.css";
import { useState} from "react";
 import axios from "axios";
import { Check, UserCheck, X } from "lucide-react";
const Adduser = () => {

 const [teamView, setTeamView] = useState(false)
const addTeam = async () => {
  const teamName = document.getElementById('newTeam').value; // Assuming 'newTeam' is an input element
  try {
      const token = localStorage.getItem("token");
      console.log(token);

      const response = await axios.post("https://chat-server-3s8b.onrender.com/addTeam", { teamName }, {
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

if(teamView == true){
  return;
}

  return (
    <div className="addUser">
    <div className="addUserDiv">
    {/* <button onClick={()=> setTeamView(true)} className="cancelBtn"><X/></button> */}
            <div className="user">
<form action="">
          <button onClick={()=> setTeamView(true)} className="cancelBtn"><X/></button>

        <input type="text" name="username" id="newTeam" placeholder="Team name" />
      </form>
        <div className="detail">
        <button onClick={addTeam} className="addnewteam"><Check/></button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Adduser;
