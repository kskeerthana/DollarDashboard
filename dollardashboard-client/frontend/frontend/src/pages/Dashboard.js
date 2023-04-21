import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Header from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if(!localStorage.getItem('username')){
      console.log('noUser')
      navigate('/');
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <Container fluid className="p-0">
      <Header />
      <Row className="m-0">
        <Col className="p-0 d-flex justify-content-center">
          <Card className="bg-primary text-white p-4" style={{ maxWidth: '500px', border: 'none', borderRadius: '10px' }}>
            <Card.Title className="text-center">Welcome {username ? `back, ${username}` : 'to Your Dashboard'}</Card.Title>
            <Card.Text className="text-center mb-4">
              This is where you can manage your account and access all of your features.
            </Card.Text>
            <div className="text-center">
                <a href='/job'>
                <Button variant="outline-light">Get Started</Button>
                </a>
              
            </div>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default Dashboard;
