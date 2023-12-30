import { useState } from "react";
import "./header.css"
function Navbar() {
  return (
    <>
      <nav>
        <div id="nav">
          <div id="logoname">
          <p>CyberCrew</p>
          </div>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Content</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Contact US</a></li>
          </ul>
        </div>
      </nav>

    </>
  );
}

export default Navbar;
