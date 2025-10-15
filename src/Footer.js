import React, { useState } from 'react';
import './assets/css/Footer.css'; // External CSS
import companyLogo from './assets/bookmyparty.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome

// Import images
import googlePlay from './assets/google-play.png';
import appStore from './assets/app-store.png';

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Select Country");
  const [modalCountry, setModalCountry] = useState(""); // To store the country selected in the modal
  const countries = [
    'United States', 'United Kingdom', 'Australia', 'India', 'Germany', 'Canada', 'France', 
    'Japan', 'China', 'Brazil', 'South Africa', 'Italy', 'Spain', 'Mexico', 'Russia', 
    'South Korea', 'Argentina', 'Netherlands', 'Sweden', 'Norway', 'Turkey'
  ];

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCountrySelect = (country) => {
    setModalCountry(country);
    setSelectedCountry(country); // Update the country displayed on the "More Info" button
    handleCloseModal(); // Close the modal after selection
  };

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Company Info Section */}
        <div className="footer-section company-info">
          <img src={companyLogo} alt="Company Logo" className="footer-logo" />
          <ul>
            <li><a href="AboutUs">About Us</a></li>
            <li><a href="reviews/ReviewCarousel">Customer Review</a></li>
            <li><a href="/CareerPage">Career</a></li>
            <li><a href="ContactUs">Contact Us</a></li>
            
          </ul>
        </div>

        {/* Popular Services Section */}
        <div className="footer-section popular-services">
          <h4>Our Popular Services</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Packages</a></li>
            <li><a href="#">Events</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Staff</a></li>
          </ul>
        </div>

        {/* Terms & Policy Section */}
        <div className="footer-section terms-policy">
          <h4>Terms & Policy</h4>
          <ul>
            <li><a href="/TermsAndConditions">Terms & Conditions</a></li>
            <li><a href="/PrivacyPolicy">Privacy Policy</a></li>
            <li><a href="/CancelationRefundPolicy">Cancellation & Refund Policy</a></li>
            <li><a href="/ShippingDelivery">Shipping & Delivery</a></li>
            <li><a href="/confidentiality">Confidentiality Policy</a></li>
          </ul>
        </div>

        {/* Connect With Us Section */}
        <div className="footer-section connect-us">
          <h4>Connect With Us</h4>
          <ul>
            
            <li><a href="#">Partner With Us</a></li>
            <li><a href="#">Sitemap</a></li>
            <li><a href="/FeedbackPage">Suggestion And Feedback</a></li>
          </ul>
        </div>
      </div>

      {/* Contact Information & App Icons */}
      <div className="contact-and-apps">
        <div className="contact-info">
          <span><i className="fa fa-map-marker-alt"></i> Srinagar Colony, Hyderabad-500073</span>
          <span><i className="fa fa-envelope"></i> info@bookmypartys.com</span>
          <span>
            <i className="fa fa-phone-alt"></i> +91 8555973013
            <button
              className="btn btn-info btn-sm ml-2"
              onClick={handleOpenModal}
              style={{ 
                marginLeft: '10px', 
                backgroundColor: 'transparent', 
                border: '1px solidrgb(255, 255, 255)', 
                color: 'white' // Custom styles for transparent button
              }}
            >
              {selectedCountry} {/* Display the selected country */}
            </button>
          </span>
        </div>
        <div className="app-icons">
          <a href="#"><img src={googlePlay} alt="Google Play" /></a>
          <a href="#"><img src={appStore} alt="App Store" /></a>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" onClick={handleCloseModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Country Tabs */}
                <div className="country-tabs">
                  <h5>Select Country</h5>
                  <div className="tabs">
                    {countries.map((country, index) => (
                      <button
                        key={index}
                        className={`tab-button ${modalCountry === country ? 'active' : ''}`}
                        onClick={() => handleCountrySelect(country)}
                        style={{ 
                          backgroundColor: 'transparent', 
                          border: '1px solid #2B475C', 
                          color: '#2B475C', // Custom styles for transparent button
                          margin: '5px', 
                          padding: '10px' 
                        }}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                  {modalCountry && <p>Selected Country: {modalCountry}</p>}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
