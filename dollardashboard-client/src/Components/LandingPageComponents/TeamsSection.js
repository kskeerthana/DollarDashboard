import React from "react";
import './TeamsSection.css';
import One from './img/Ashutosh.jpeg';
import Two from './img/ArundhatiPathrekar.jpeg';
import Three from './img/Burrhan.jpeg';
import Four from './img/Keerthana.jpeg';
import Five from './img/jayaKishnani.jpeg';
import { NavigationBar } from "../NavigationBar/NavigationBarLand";
import Footer from "./Footer";

function TeamsSection() {
  const teamMembers = [
    {
      name: "Ashutosh Raval",
      image: <img src={One} alt="Ashutosh Raval" className="team-member-image1" />,
    },
    {
      name: "Arundhati Pathrikar",
      image: <img src={Two} alt="Arundhati Pathrikar" className="team-member-image2" />,
    },
    {
      name: "Burhanudin Jinwala",
      image: <img src={Three} alt="Burhanudin Jinwala" className="team-member-image3" />,
    },
    {
      name: "Keerthana Srinivasan",
      image: <img src={Four} alt="Keerthana Srinivasan" className="team-member-image4" />,
    },
    {
      name: "Jaya Kishnani",
      image: <img src={Five} alt="Jaya Kishnani" className="team-member-image5" />,
    },
  ];

  return (
  <>
  <NavigationBar></NavigationBar>
    <section>
      <h1>Our Team</h1>
      <ul>
        {teamMembers.map((member) => (
          <li key={member.name}>
            {member.image}
            {member.name}
          </li>
        ))}
      </ul>
    </section>
    {/* <Footer></Footer> */}
    </>
  );
}

export default TeamsSection;