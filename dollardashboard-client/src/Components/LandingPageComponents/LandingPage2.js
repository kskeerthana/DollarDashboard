import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './LandingPage2.css';
import image from './img/slide2.gif'
import { NavigationBar } from '../NavigationBar/NavigationBarLand';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <>
    <NavigationBar></NavigationBar>
    <Container fluid className="landing-container">
        
      <Row className="landing-row">
        <Col md={6} className="landing-col left-col">
          <h1 className="landing-heading">Your One stop Financial Tracker</h1>
          <p className="landing-text">
          Track your Finances Easily Smartly with DollarDashboard. Never before features to solve all you budgeting problems.
          </p>
          <Button className="landing-btn" variant="primary">Get started</Button>
        </Col>
        <Col md={6} className="landing-col right-col">
          <img className="landing-img" src={image} alt="landing-img" />
        </Col>
      </Row>
      {/* <Footer></Footer> */}
    </Container>
    </>
  );
};

export default LandingPage;
