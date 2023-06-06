import React from 'react';
import { useState, useRef} from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { Link } from "react-router-dom";
// import logo from './logo.png';
import { LinkContainer } from 'react-router-bootstrap';
import { FaBars } from 'react-icons/fa';
import './NavigationBar.css'

export const NavigationBar = () => {
  const form = useRef();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("emailjs")

    emailjs.sendForm('service_pdgfa8g', 'template_yj5ioh9', form.current, 'cEhby2bneSLwToKdo')
      .then((result) => {
          console.log(result);
          setShowModal(false)
      }, (error) => {
          console.log(error.text);
      });
  };

    const userName = localStorage.getItem('username') 
  return (
    <Navbar  expand="md">
      <LinkContainer to="/">
        <Navbar.Brand style={{ color: 'white'}}>DollarDashboard</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <FaBars />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        <Nav.Item style={{ color: 'white', marginRight: '30px',fontWeight:'Bold',fontSize:'18px' }}>
            Hi!,{userName}
          </Nav.Item>
          <LinkContainer to="/profileEdit">
            <Nav.Link style={{ color: 'white' }}>Profile</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/saving">
            <Nav.Link style={{ color: 'white' }}>Savings</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/expenseTrack">
            <Nav.Link style={{ color: 'white' }}>Expesne Track</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/stock">
            <Nav.Link style={{ color: 'white' }}>Stock</Nav.Link>
          </LinkContainer>
          <Button variant="primary" onClick={handleShowModal} className="contact-button">
          Contact Us
        </Button>
          <LinkContainer to="/">
            <Nav.Link style={{ color: 'white' }}>Logout</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={form}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" name="user_name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" name="user_email"/>
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" name="message"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={sendEmail}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  )
}
