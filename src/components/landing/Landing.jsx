import React from "react";
import "./landing.css";
import Navbar from "../Navbar/Navbar";
import Screen from "./Screen.jsx";
import FeaturesSection from "./Features.jsx";
import TestimonialsSection from "./Features.jsx";
import Action from "./action/Action.jsx";
import Footer from "./footer/Footer.jsx";

const Landing = () => {
  return (
    <div className="landingPage">
      <div className="navDiv">
        <Navbar />
      </div>
      <div className="landingBody">
        <div className="teamSection">
          <div className="centralText">Connect with<br/> your Global Team</div>
          <div className="centralParagraph">Where teams connect, share ideas, and get work done—together.</div>
          <div className="orbitContainer">
            <svg className="circleDesign" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <circle cx="400" cy="400" r="380" className="outerCircle" />
              <circle cx="400" cy="400" r="280" className="middleCircle" />
              <circle cx="400" cy="400" r="180" className="innerCircle" />
            </svg>
            
            {/* Outer orbit with avatars */}
            <div className="orbit orbit1">
              <div className="avatar avatar1"></div>
              <div className="avatar avatar2"></div>
              <div className="avatar avatar3"></div>
              <div className="avatar avatar4"></div>
              <div className="icon icon1">💼</div>
              <div className="icon icon2">🌍</div>
              {/* <div className="icon icon3">💡</div> */}
              <div className="icon icon4">🚀</div>
            </div>
            
            {/* Middle orbit with avatars and icons */}
            <div className="orbit orbit2">
              <div className="avatar avatar5"></div>
              <div className="avatar avatar6"></div>
              <div className="icon icon5">⭐</div>
              {/* <div className="icon icon6">🎯</div> */}
              <div className="icon icon7">📊</div>
              <div className="icon icon8">🔗</div>
            </div>
            
            {/* Inner orbit with just icons */}
            <div className="orbit orbit3">
              <div className="icon" style={{
                top: '25px',
                left: 'calc(30% - 120px)',
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                color: 'white'
              }}>💬</div>
              <div className="icon" style={{
                top: 'calc(50% - 25px)',
                right: '-25px',
                background: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)',
                color: '#333'
              }}>🤝</div>
              {/* <div className="icon" style={{
                bottom: '-25px',
                left: 'calc(50% - 25px)',
                background: 'linear-gradient(135deg, #ffd3a5 0%, #fd9853 100%)',
                color: 'white'
              }}>⚡</div> */}
              {/* <div className="icon" style={{
                top: 'calc(50% - 25px)',
                left: '-25px',
                background: 'linear-gradient(135deg, #a8cdf0 0%, #f5c7f7 100%)',
                color: 'white'
              }}>🎨</div> */}
            </div>
          </div>
        </div>
      </div>
      <Screen/>
      <TestimonialsSection/>
      <Action/>
      <Footer/>
    </div>
  );
};

export default Landing;