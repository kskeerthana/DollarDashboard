
import React from 'react';
import { Card } from 'react-bootstrap';
import Header from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';



function ContactUsPage() {
  const navigate = useNavigate();
  const cardsData = [
        {
          title: 'Job Title 1',
          description: 'Description of job 1.',
        },
        {
          title: 'Job Title 2',
          description: 'Description of job 2.',
        },
        {
          title: 'Job Title 3',
          description: 'Description of job 3.',
        },
      ];
      useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if(!localStorage.getItem('username')){
          console.log('noUser')
          navigate('/');
        }
      }, []);
    return (
        <div>
        <Header/>
        <div className="container mt-4">
        <h2>Contact Us</h2>
        <div className="card-group d-flex flex-wrap flex-md-nowrap flex-column">
          {cardsData.map((card, index) => (
            <Card key={index}>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Text>{card.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Footer/>
      </div>
    );
  }

export default ContactUsPage;