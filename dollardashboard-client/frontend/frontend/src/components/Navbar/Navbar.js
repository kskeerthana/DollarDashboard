import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import './Header.css';
import { useNavigate } from 'react-router-dom';



function Header() {
    const navigate = useNavigate();
  const userName = localStorage.getItem('username') || 'Guest';

  const handleLogout = () => {
    localStorage.clear(); // Clear session data
    navigate('/');
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
      <Navbar.Brand href="/dashboard">NEU Job Portal</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/job">Job</Nav.Link>
          <Nav.Link href="/about-us">About Us</Nav.Link>
          <Nav.Link href="/contact-us">Contact Us</Nav.Link>
          <Nav.Link href="/profile">profile</Nav.Link>
          <Nav.Link href="/profileEdit">profileEdit</Nav.Link>
        </Nav>
        <Nav className='profile-dropdown'>
          <NavDropdown title={<div className="profile-icon"><FaUserCircle size={25} /> Hi, {userName}!</div>} alignRight>
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
