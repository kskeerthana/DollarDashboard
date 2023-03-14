import React from "react";
//import { Link } from "react-router-dom";
//import "./App.css";

function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
           MyLogo
        </div>
        <ul className="nav-links">
          <li>
           Home
          </li>
          <li>
          Contact
          </li>
          <li>
           About Us
          </li>
          <li>
           FAQ
          </li>
          <li>
           Login
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;