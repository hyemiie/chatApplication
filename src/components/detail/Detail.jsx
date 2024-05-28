import React from "react";
import "./detail.css";

const Detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Setings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>{" "}
        <div className="option">
          <div className="title">
            <span>Shared Photos </span>
            <img src="./arrowDown.png" alt=""  />
          </div>
          <div className="photos">
            <div className="photoItem">
              <img src="./avatar.png" alt="" />
              <span>photo_2024_2.png</span>
            </div>
            <img src="./download.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files </span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block User</button>
        <button className="logout"> Logout </button>
      </div>
    </div>
  );
};

export default Detail;
