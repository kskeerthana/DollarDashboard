
import React from 'react';
import { Card } from 'react-bootstrap';
import Header from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';


function AboutUsPage() {
    const cardsData = [
      {
        title: 'Our Mission',
        description: 'To make the world a better place.',
      },
      {
        title: 'Our History',
        description: 'We started in 2000 with a small team of developers.',
      },
      {
        title: 'Our Team',
        description: 'Meet the people who make it all happen.',
      },
    ];
  
    return (
        <div>
        <Header/>
        <div className="container mt-4">
        <h2>About Us</h2>
        <div className="card-group d-flex flex-wrap flex-md-nowrap flex-column">
          {cardsData.map((card, index) => (
            <Card className='card' key={index}>
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

export default AboutUsPage;