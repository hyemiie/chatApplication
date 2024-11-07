import React, { useEffect } from "react";
import "./list.css";
import UserInfo from "./userInfo/UserInfo";
import Chatlist from "./chatList/Chatlist";
import { useNavigate } from "react-router-dom";

const List = () => {

  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('userName');
      console.log('token', token)
      if (!token) {
          navigate('/'); 
      }
  }, [navigate]);
  
  return (
    <div className="list">
    
      <Chatlist />
    </div>
  );
};

export default List;
