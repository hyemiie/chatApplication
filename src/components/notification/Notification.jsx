import React from "react";
import { ToastContainer } from "react-toastify";
import "./notification.css";
import "react-toastify/ReactToastify.css";

const Notification = () => {
  return (
    <div className="">
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Notification;
