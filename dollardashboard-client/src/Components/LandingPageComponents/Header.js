import React from "react";

function Header({ isLoggedIn, onLogoutClick }) {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <a href="/logout" onClick={onLogoutClick}>
                  Logout
                </a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
