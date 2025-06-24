import React, { useState } from "react";
import "./navbar.css";
import { Menu } from "lucide-react"; // ✅ Correct import

const Navbar = () => {
  const [mobileScreen, setMobileScreen] = useState(false);

  return (
    <nav className="navPage">
      <div className="firstDiv">
        <div className="navLogo">
          <h3><a href="/">Tier</a></h3>
        </div>
        <div className="navMenu">
          <Menu onClick={() => setMobileScreen(!mobileScreen)} />
        </div>
      </div>

      <div className={`secDiv ${mobileScreen ? "shown" : "hidden"}`}>
        <a href="/login" className="loginBtn">Log in</a>
        <a href="/lists" className="getStartedBtn">Get started free</a>
      </div>
    </nav>
  );
};

export default Navbar;
