import React from "react";
import "./landing.css";
import Navbar from "../Navbar/Navbar";

const Landing = () => {
  return (
    <div className="landingBody">
      <div className="navDiv">
        <Navbar />
      </div>
      <div className="landingBodyDiv">
        <div className="landinPage">
          <div className="landingDiv">
            <p className="landingParagraph">
              {/* All team discussions<h2>in one room</h2> */}
              All team discussions<h2>in one room</h2>
            </p>
            <h3>
              Accessible and allows you to communicate from anywhere at anytime
            </h3>
           <div className="landingBtns"> <button className="landingBtn">
              {" "}
              <a href="/lists">Get Started</a>
            </button>
            <button className="landingBtn2">
              {" "}
              <a href="/lists">Learn more</a>
            </button>
            </div>
          </div>
        </div>
        <div className="imgDiv">
          <div className="landingImg"></div>
        </div>
        {/* <div className="txtDiv">
          <div className="landingDescImg"></div>
          <div className="landingDesc">
          <h2>Message Chat</h2>
          <h3>Live, Smart Communication</h3>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Landing;
