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
            <div className="landingParagraph">
              <div className="textBrk1">
                <div className="brkText2">Discuss</div>
                <div className="img1">
                  <div></div>
                </div>
              </div>
             
              <div className="callImg">
                without a 
               
              </div>
              <div className="textBrk1">
                <div className="brkText2">Hitch</div>
                <div className="img2">
                  <div></div>
                </div>
              </div>
            </div>
            <h3>
              Accessible and allows you to communicate <br/>from anywhere at anytime
            </h3>
            {/* <div className="img1">
              <div>hi</div>
            </div> */}
            <div className="img2"></div>
            <div className="img3"></div>
            <div className="landingBtns">
              {" "}
              <button className="landingBtn">
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
