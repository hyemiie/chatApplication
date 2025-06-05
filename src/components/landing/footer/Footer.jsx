import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} TeamChaat. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
