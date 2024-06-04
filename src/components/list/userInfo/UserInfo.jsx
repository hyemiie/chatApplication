import React from "react";
import "./userInfo.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
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
      const username = response.data.username;
      // const decoded = jwtDecode(token)

      // const userId = decoded.userId

      localStorage.setItem('userName', response.data.username)
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
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </div>
  );
};

export default UserInfo;
