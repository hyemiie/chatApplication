import React from "react";
import './action.css'

const Action = () => {
  return (
    <div className="action-page">
     <svg className="screen-background">
        <defs>
          <pattern
            id="vlines"
            width="80"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              stroke="#e0e0e0"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vlines)" />
      </svg>
      <div className="action-div">
        <h2>Get Started</h2>
        <p>No extensive techincal expertise required</p>
            <button>Get Started for free</button>
      </div>
    </div>
  );
};

export default Action;
