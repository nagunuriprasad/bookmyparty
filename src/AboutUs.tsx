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
            We are IBTC Events & Entertainments Pvt Ltd, a team of technology experts and industry leaders in events and event management.
            We've developed innovative solutions to provide transparent one-stop end-to-end solutions for our customers.
          </p>
        </div>

        <div className="aboutus-item">
          <h2 className="aboutus-heading">Our Team</h2>
          <p className="aboutus-text">
            With a decade of industry experience, we're passionate about helping our customers reach their event goals. 
            Our solutions are designed to succeed in their selected events and entertainments. We're committed to your satisfaction and trust.
          </p>
        </div>

        <div className="aboutus-item">
          <h2 className="aboutus-heading">Our Approach</h2>
          <p className="aboutus-text">
            Our services include comprehensive consulting to identify gaps and opportunities, event plans with timelines and milestones, 
            cost analysis, and schedules. We offer a suite of quality solutions to ensure your satisfaction.
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
     <div><ContactUs/></div>
    </div>
  );
};

export default AboutUs;
