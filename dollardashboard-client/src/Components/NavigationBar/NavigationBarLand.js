import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaBars } from 'react-icons/fa';
import './NavigationBar.css'
// import {Logo} from '../LandingPageComponents/img/Logo.png'

export const NavigationBar = () => {

    const userName = localStorage.getItem('username') 
  return (
    <Navbar  expand="md">
      <LinkContainer to="/">
        <Navbar.Brand style={{ color: 'white'}}>
          DollarDashboard
          </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <FaBars />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/aboutUs">
            <Nav.Link style={{ color: 'white' }}>About</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/team">
            <Nav.Link style={{ color: 'white' }}>Team</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link style={{ color: 'white' }}>Login</Nav.Link>
          </LinkContainer>     
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
