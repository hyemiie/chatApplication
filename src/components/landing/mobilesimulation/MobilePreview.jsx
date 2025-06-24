import React, { useState } from 'react';
import './MobilePreview.css';
import MobileScreen from './MobileScreen';

const MobilePreview = () => {
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    { icon: '⚡', text: 'Lightning-fast messaging' },
    { icon: '🔒', text: 'End-to-end encryption' },
    { icon: '🌍', text: 'Works everywhere, anytime' },
    { icon: '✨', text: 'Beautiful, intuitive design' }
  ];

  return (
    <div className="mobile-preview-section">
      {/* Animated background elements */}
      {/* <div className="background-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div> */}

      {/* <div className="phone-container"> */}
        <div className="content-wrapper">
          
          {/* Text Content */}
          <div className="text-content">
            <div className="badge">
              🚀 Mobile-First Design
            </div>
            
            <h2 className="main-title">
              Stay Connected
              <span className="gradient-text">
                Anywhere, Anytime
              </span>
            </h2>
            
            <p className="subtitle">
              Experience seamless conversations with our lightning-fast mobile app. 
              Built for the modern world, designed for you.
            </p>

            {/* Feature List */}
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-text">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="buttons-container">
              <button className="btn-primary">
                Start Chatting Now
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="phone-section">
            <div 
              className={`phone-container ${isHovered ? 'hovered' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Phone Shadow */}
              <div className="phone-shadow"></div>
              
              {/* Phone Frame */}
              <div className="phone-frame">
                {/* Screen Bezel */}
                <div className="screen-bezel">
                  {/* Notch */}
                  <div className="notch">
                    <div className="notch-speaker"></div>
                  </div>
                  
                  {/* Screen Content */}
                  <div className="screen-content">
                    <MobileScreen />
                  </div>
                </div>
                
                {/* Phone Buttons */}
                <div className="phone-button btn-volume"></div>
                <div className="phone-button btn-volume-down"></div>
                <div className="phone-button btn-power"></div>
              </div>

              {/* Floating Elements */}
              {isHovered && (
                <>
                  <div className="floating-element element-1"></div>
                  <div className="floating-element element-2"></div>
                  <div className="floating-element element-3"></div>
                </>
              )}
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default MobilePreview;