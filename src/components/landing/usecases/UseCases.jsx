// UseCases.jsx
import React from 'react';
import './usecase.css';

const UseCases = () => {
  return (
    <section className="use-cases-section">
    {/* <svg className="screen-background">
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
      </svg> */}
      <h2 className="section-title">Built for Every Role</h2>
      <div className="use-cases-grid">
        <div className="use-case-card">
          <h3>💻 Developers</h3>
          <p>Debug faster with inline code threads and real-time updates.</p>
        </div>
        <div className="use-case-card">
          <h3>📅 Managers</h3>
          <p>Run standups, track blockers, and get project clarity instantly.</p>
        </div>
        <div className="use-case-card">
          <h3>📄 Designers</h3>
          <p>Share Figma previews and gather feedback directly in context.</p>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
