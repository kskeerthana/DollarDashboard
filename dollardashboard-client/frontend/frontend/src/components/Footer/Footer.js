import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-light mt-5 fixed-bottom">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ultrices elit a elementum aliquet.
            </p>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>123 Main St.</li>
              <li>Anytown, US 10001</li>
              <li>(123) 456-7890</li>
              <li>support@neujobportal.com</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Instagram</a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p className="text-center">
              &copy; {new Date().getFullYear()} NEU JobPortal. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
