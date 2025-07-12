import React, { useState } from "react";
import "./mobilepreview.css";
import MobileScreen from "./MobileScreen";

const MobilePreview = () => {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    { icon: "✔️", text: "Lightning-fast messaging" },
    { icon: "✔️", text: "End-to-end encryption" },
    { icon: "✔️", text: "Works everywhere, anytime" },
    { icon: "✔️", text: "Beautiful, intuitive design" },
  ];

  return (
    <div className="mobile-preview-section">
      {/* Animated background elements */}
      {/* <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div> */}

      <div className="content-wrapper">
        {/* Text Content */}
        <div className="text-content">
          <div className="badge">🚀 Mobile-First Design</div>

          <h2 className="main-title">
            Stay Connected
            <span className="gradient-text">Anywhere, Anytime</span>
          </h2>

          <p className="subtitle">
            Experience seamless conversations with our lightning-fast mobile
            app. Built for the modern world, designed for you.
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="features-card">
                <span className="features-icon">{feature.icon}</span>
                <span className="features-text">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* <div className="buttons-container">
            <button className="btn-primary">Start Chatting Now</button>
            <button className="btn-secondary">
                Learn More
              </button>
          </div> */}
        </div>

                 <div className="mobile">
                 <MobileScreen/>
                
</div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default MobilePreview;
