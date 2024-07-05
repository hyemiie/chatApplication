import React from "react";
import "./userInfo.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faEllipsisH, faCamera, faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons/faCameraRetro";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons/faNoteSticky";

const UserInfo = () => {

  const [username, setUsername] = useState("");

  const getUsername = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/getCurrentUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
console.log('token', token)
      const username = response.data.signedInUser.username;
      console.log("response", response)
      // const decoded = jwtDecode(token)

      // const userId = decoded.userId

      localStorage.setItem('userName', response.data.signedInUser.username)
      localStorage.setItem('userRole', response.data.signedInUser.role)
      // console.log(userId)
      // console.log(decoded)
      
      setUsername(username);
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  useEffect(() => {
    getUsername(); // Call the function to fetch the username when the component mounts
  }, []);
  return (
    <div className="userInfo">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>{username}</h2>
      </div>
      <div className="icons">
      <FontAwesomeIcon icon={faEllipsisH} />
      <FontAwesomeIcon icon={faVideoCamera} />
       
      </div>
    </div>
  );
};

export default UserInfo;
