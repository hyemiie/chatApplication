// ValueProps.jsx
import React from 'react';
import './valueprop.css';

const ValueProps = () => {
  return (
    <section className="value-props-section">
      <h2 className="section-title">Why Choose Chattr?</h2>
      <div className="value-props-grid">
        <div className="value-card">
          <span>🧩</span>
          <p>Integrates with Notion & Google Drive</p>
        </div>
        <div className="value-card">
          <span>🔒</span>
          <p>End-to-end encryption</p>
        </div>
        <div className="value-card">
          <span>🚀</span>
          <p>Blazing fast performance</p>
        </div>
        <div className="value-card">
          <span>👩‍💻</span>
          <p>Built for remote teams</p>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
