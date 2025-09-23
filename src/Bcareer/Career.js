import React from 'react';
import Slider from 'react-slick';
import './Career.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Career = () => {
  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Images for the carousel
  const images = [
    { src: '/images/event-manager.jpg', title: 'Event Manager' },
    { src: '/images/event-planner.jpg', title: 'Event Planner' },
    { src: '/images/event-innovator.jpg', title: 'Event Innovator' },
  ];

  // Email button handler
  const handleEmailClick = () => {
    const email = "founder@bookmypartys.com";
    const subject = "Job Application";
    const body = "Dear Hiring Team,\n\nI am interested in applying for a position at Bookmypartys. Please find my resume attached.\n\nThank you!\n\nBest regards,\n[Your Name]";
    
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="career-page">
      {/* Carousel Component */}
      <div className="carousel-container">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image.src} alt={image.title} />
              <h2>{image.title}</h2>
            </div>
          ))}
        </Slider>
      </div>

      {/* Introduction Section */}
      <section className="introduction">
        <h2>Introduction of the Company</h2>
        <p>Bookmypartys is one of the Biggest Event Industry Platforms in India. It has a pan-India existence in all Metro cities and Tier 2 and Tier 3 Cities as well. We are looking for the following Requirements and Vacancies.</p>
      </section>

      {/* Vacancies Section */}
      <section className="vacancies">
        <h2>Vacancies</h2>
        <p>Event Manager (Head Operations)</p>
        <p>Event Planner (Head Operations)</p>
        <p>Event Innovator (Head Operations)</p>
      </section>

      {/* Roles and Responsibilities Section */}
      <section className="roles-responsibilities">
        <h2>Roles and Responsibilities</h2>

        <h3>Time Management:</h3>
        <ul>
          <li>Control task completion time for events.</li>
          <li>Maintain team energy throughout events, including overnight work if needed.</li>
          <li>Manage delivery team services with pre-planning and flexibility.</li>
        </ul>

        <h3>Organizational Skills:</h3>
        <ul>
          <li>Delegate tasks effectively and track multiple tasks simultaneously.</li>
          <li>Ensure organizational systems and procedures are followed with timely updates.</li>
          <li>Address vendor infrastructure issues and handle unexpected challenges with high-level client interaction.</li>
        </ul>

        <h3>Leadership:</h3>
        <ul>
          <li>Lead teams, manage vendors, and coordinate with clients for successful events.</li>
          <li>Train delivery teams on responsibilities and ensure energy throughout event completion.</li>
        </ul>

        <h3>Problem Solving:</h3>
        <ul>
          <li>Develop creative ideas to meet client visions within budget constraints.</li>
          <li>Troubleshoot and solve issues effectively.</li>
        </ul>

        <h3>Creativity:</h3>
        <ul>
          <li>Bring innovation and imagination to hosting memorable events.</li>
        </ul>

        <h3>Communication Skills:</h3>
        <ul>
          <li>Communicate proactively with all stakeholders for alignment and clarity.</li>
        </ul>

        <h3>Attention to Detail:</h3>
        <ul>
          <li>Manage multiple tasks, providers, and suppliers while meeting client expectations.</li>
        </ul>

        <h3>Vendor Negotiation:</h3>
        <ul>
          <li>Work with vendors offering custom services with flexible pricing options.</li>
        </ul>

        <h3>Budget Management:</h3>
        <ul>
          <li>Use effective budgeting skills to ensure successful event management.</li>
        </ul>

        <h3>Client Interaction:</h3>
        <ul>
          <li>Engage with clients to address sudden requirements and billing issues professionally.</li>
        </ul>
      </section>

      {/* Apply Via Email Button */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={handleEmailClick} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Apply Via Email
        </button>
      </div>
    </div>
  );
};

export default Career;
