import React from 'react';
import './assets/css/AboutUs.css'; // External CSS file
import Faq from './Faq';
import ContactUs from './ContactUs';
const AboutUs = () => {
  return (
    <div className="aboutus-container">
      <h1 className="aboutus-title">ABOUT US</h1>

      <section className="aboutus-section">
        <div className="aboutus-item">
          <h2 className="aboutus-heading">Who Are We?</h2>
          <p className="aboutus-text">
            We are from Bookmypartys, A team of technology experts and industry leaders in Event Industry Organising, Planning and Management. We have developed innovative solutions to provide customers transparent one-stop E2E solutions to make events booking easy.
          </p>
        </div>

        <div className="aboutus-item">
          <h2 className="aboutus-heading">Our Team</h2>
          <p className="aboutus-text">
            With a decade of industry experience, we're passionate about helping to our customers and vendors to reach their goals in Event Management and Event Booking. Our solutions are designed to succeed in their Future events and entertainments. We're committed to our customers satisfaction and trust.
          </p>
        </div>

        <div className="aboutus-item">
          <h2 className="aboutus-heading">Our Approach</h2>
          <p className="aboutus-text">
            Our services include comprehensive consulting to identify gaps and opportunities, event plans with timelines and milestones, cost analysis, and schedules. We offer a suite of quality solutions to ensure customer satisfaction.
          </p>
        </div>

        <div className="aboutus-item">
          <h2 className="aboutus-heading">Our Clients</h2>
          <p className="aboutus-text">
            Our strong expertise in technology and the event industry has earned us long-term clientele. Some clients have shown a keen interest in joining us.
          </p>
        </div>
      </section>

     <div><Faq/></div>
    
    </div>
  );
};

export default AboutUs;
