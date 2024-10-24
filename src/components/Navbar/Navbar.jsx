import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navPage">
      <div className="firstDiv">
        <div className="navLogo">
          <h3>Tier</h3>
        </div>
      </div>

      <div className="secDiv">
        <a href="/login">Login</a>
        <button>
          <a href="/lists">Get started free</a>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
