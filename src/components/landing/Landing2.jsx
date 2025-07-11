import React from "react";
import Screen from './Screen';
import './landing2.css';
import Navbar from "../Navbar/Navbar";

const Landing2 = () => {
  return (
    <div className="hero-section">
         <div className="navDiv">
            <Navbar />
          </div>
      <div className="hero-text">
        <h3>Introducing chattr</h3>
        <h2>The Team Chat app<br />you always wanted</h2>
        <p>
          {/* Notion Second Brain helps you capture and organize tasks, notes,<br />
          projects, resources, and goals inside one all-in-one streamlined system. */}
        
          No more switching between apps, losing messages, or missing updates.<br/>
           Just one clean, focused space to chat, collaborate, and make decisions — together.



        </p>
        <button>Get Instant Access</button>
      </div>
      <Screen/>

    
    </div>
  );
};

export default Landing2;
