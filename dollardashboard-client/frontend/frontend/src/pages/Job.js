
import React from 'react';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Header from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';




function Job() {
    const cardsData = [
        {
          title: 'Address',
          description: '123 Main St, Anytown USA',
        },
        {
          title: 'Phone',
          description: '1-800-555-5555',
        },
        {
          title: 'Email',
          description:'contact@neujobportal.com',
        }
    ]
  
    return (
        <div>
        <Header/>
        <div className="container mt-4">
        <h2>Jobs</h2>
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

export default Job;