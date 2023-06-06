import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-buttons">
          <button>SERVICE</button>
          <button>STATUS</button>
          <button>FAQ</button>
        </div>
        <div className="footer-text">
          © Copyright 2023
          DollarDashboardTechnologies, Inc. Privacy Terms of Use Cookie Preferences
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com"><i className="fab fa-facebook"></i></a>
          <a href="https://www.twitter.com"><i className="fab fa-twitter"></i></a>
          <a href="https://www.linkedin.com"><i className="fab fa-linkedin"></i></a>
          <a href="https://www.youtube.com"><i className="fab fa-youtube"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;