import React from "react";
import "./userInfo.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faEllipsisH,
  faCamera,
  faVideoCamera,
} from "@fortawesome/free-solid-svg-icons";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons/faCameraRetro";
import { faNoteSticky } from "@fortawesome/free-solid-svg-icons/faNoteSticky";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Guest? Try signing in");
  const [logoutView, setLogoutView] = useState(false);
  const getUsername = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://chatapplication-backend-d65c.onrender.com/getCurrentUser",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("token", token);
      const username = response.data.signedInUser.username;
      console.log("response", response);
      // const decoded = jwtDecode(token)

      // const userId = decoded.userId

      localStorage.setItem("userName", response.data.signedInUser.username);
      localStorage.setItem("userRole", response.data.signedInUser.role);
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

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    alert("Logged out");
    navigate("/");
  };

  return (
    <div className="userInfo">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2 onClick={() => setLogoutView(true)}>{username}</h2>
      </div>
      {logoutView ? <div className="logout" onClick={handleLogout}>Logout?</div> : ""}
      {/* <div className="icons">
      <FontAwesomeIcon icon={faEllipsisH} />
      <FontAwesomeIcon icon={faVideoCamera} />
       
      </div> */}
    </div>
  );
};

export default UserInfo;
