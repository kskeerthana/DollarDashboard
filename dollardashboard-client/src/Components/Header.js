import { useState, useRef} from 'react';
import { Navbar, Nav, Modal, Button, Form } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { Link } from "react-router-dom";
// import logo from './logo.png';
import './Header.css';

function Header() {
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
      }, (error) => {
          console.log(error.text);
      });
  };


  return (
    <Navbar expand="md" className="header">
      <Navbar.Brand href="/">
        <img src={"logo"} alt="Logo" className="logo" />
        <span className="company-name">Company Name</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" className="nav-link">Home</Nav.Link>
          <Nav.Link href="#" className="nav-link">About</Nav.Link>
          <Nav.Link href="#" className="nav-link">Services</Nav.Link>
          <Nav.Link href="#" className="nav-link">Products</Nav.Link>
          <Nav.Link href="#" className="nav-link">Contact</Nav.Link>
        </Nav>
        <Button variant="primary" onClick={handleShowModal} className="contact-button">
          Contact Us
        </Button>
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
    
    
  );
}

export default Header;
