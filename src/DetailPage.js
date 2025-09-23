import React, { useState, useEffect } from 'react';
import './assets/css/DetailPage.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel'; // Ensure this is installed via npm
import StarRating from './StarRating'; // Adjust path if necessary
import { Link } from 'react-router-dom'; // Ensure react-router-dom is installed

const DetailPage = () => {
  const [activeTab, setActiveTab] = useState('Description');
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  // Function to render the content of the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'Description':
        return <p>Service long Description: This is a detailed explanation of the services provided.</p>;
      case 'Information':
        return <p>Additional information about the service can be found here.</p>;
      case 'Company Standards':
        return <p>Details about the company's standards and practices.</p>;
      case 'Reviews':
        return (
          <div className="review-section">
            <p>No reviews yet. Be the first to review!</p>
            <form className="review-form">
              <div className="rating">
                <label>Your Rating *</label>
                <div className="stars">
                  <StarRating rating={rating} setRating={setRating} /> {/* Integrated StarRating */}
                </div>
              </div>
              <div className="review-input">
                <label>Your Review *</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  required
                />
              </div>
              <div className="email-input">
                <label>Your email address will not be published. Required fields are marked *</label>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  required
                />
              </div>
              <button type="submit" className="submit-review-btn">
                Submit Review
              </button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  // Auto-scroll effect for carousel
  useEffect(() => {
    const servicesTrack = document.querySelector('.services-track');
    const companyTrack = document.querySelector('.company-track');
    const suggestionsTrack = document.querySelector('.suggestions-track');

    let offset = 0;
    const speed = 2;

    const scrollAnimation = () => {
      offset += speed;

      if (servicesTrack) servicesTrack.style.transform = `translateX(-${offset}px)`;
      if (companyTrack) companyTrack.style.transform = `translateX(-${offset}px)`;
      if (suggestionsTrack) suggestionsTrack.style.transform = `translateX(-${offset}px)`;

      if (servicesTrack && offset >= servicesTrack.scrollWidth / 2) offset = 0;
      requestAnimationFrame(scrollAnimation);
    };

    scrollAnimation();

    return () => {
      cancelAnimationFrame(scrollAnimation); // Cleanup function
    };
  }, []);

  const options = {
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1000: { items: 4 },
    },
  };

  return (
    <div className="detail-page">
      {/* Header with company information */}
      <div className="company-info1">
      ibtc events and entertainments pvt ltd
        <h2>srinagar colony, 500073</h2>
        <p className="contact-number">.</p>
      </div>

      {/* Circle Containers */}
      <div className="circle-container">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="circle">
            <img src="https://via.placeholder.com/50" alt={`circle-${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Services */}
      <div className="slider-container">
        <div className="text-center mb-4 py-4">
          <h2 className="section-title px-5">
            <span className="px-2">
              Services <i className="fa-solid fa-box" aria-hidden="true"></i>
            </span>
          </h2>
        </div>
        <OwlCarousel className="owl-theme" {...options}>
          {[...Array(8)].map((_, index) => (
            <div className="image-container" key={index}>
              <div className="card product-item">
                <div className="card-header product-img">
                  <img src="https://via.placeholder.com/150" alt={`Slide ${index + 1}`} />
                  <div className="info-icon">
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="card-body">
                  <div className="star-rating">
                    <StarRating /> {/* Integrated StarRating */}
                  </div>
                  <h6 className="title">Suggestion #{index + 1}</h6>
                  <div className="price-section">
                    <h6 className="price">{(Math.random() * 1000).toFixed(2)} PAX</h6>
                  </div>
                </div>
                <div className="card-footer">
                <Link to="/DetailPage" className="btn btn-outline-primary">
                    <i className="fas fa-eye"></i> View Detail
                  </Link>
                  <a href="/user/login" className="btn btn-outline-primary">
                    <i className="fas fa-shopping-cart"></i> Place Order
                  </a>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>

      {/* Product Details */}
      <div className="product-detail">
          <div className="product-image">
            <img src="https://via.placeholder.com/300" alt="Product" />
          </div>
          <div className="product-info">
            <h3>catering#1231</h3>
            <p>777.000 Per PAX</p>
            <p>Product ID: 4</p>
            <p>Vendor ID: VT0100006</p>
            <p>Availability: In stock</p>
            <span className="badge">Caterers</span>
            <span className="badge">good</span>
            <p>Best in standard venue selection</p>
            <button className="customize-menu-btn">Customize menu</button>

            {/* Four Small Image Containers with Checkboxes and Descriptions */}
            <div className="custom-options">
              <div className="custom-option-row">
                <div className="custom-option">
                  <div className="custom-image-container">
                    <img src="https://via.placeholder.com/40" alt="Option 1" />
                    <input type="checkbox" id="customOption1" />
                  </div>
                </div>
                <div className="custom-option">
                  <div className="custom-image-container">
                    <img src="https://via.placeholder.com/40" alt="Option 2" />
                    <input type="checkbox" id="customOption2" />
                  </div>
                </div>
              </div>
              <div className="custom-option-row">
                <div className="custom-option">
                  <div className="custom-image-container">
                    <img src="https://via.placeholder.com/40" alt="Option 3" />
                    <input type="checkbox" id="customOption3" />
                  </div>
                </div>
                <div className="custom-option">
                  <div className="custom-image-container">
                    <img src="https://via.placeholder.com/40" alt="Option 4" />
                    <input type="checkbox" id="customOption4" />
                  </div>
                </div>
              </div>
              <p className="custom-description">Choose your preferences from above options.</p>
            </div>

            {/* No. of PAX */}
            <div className="custom-pax-selection">
              <label htmlFor="customNoOfPAX">No. of PAX:</label>
              <input type="number" id="customNoOfPAX" min="1" />
            </div>

            {/* Place Order and Add to Cart Buttons */}
            <div className="custom-action-buttons">
            <div className="custom-action-buttons">
              <a href="/CateringPage" className="custom-btn custom-primary-btn">
                <i className="fas fa-eye"></i> Place Order
              </a>
              <button className="custom-btn custom-secondary-btn">
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>

            </div>
          </div>
        </div>



      {/* Tabs Section */}
      <div className="tabs">
        <div className="tab-header">
          <button
            className={activeTab === 'Description' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('Description')}
          >
            Description
          </button>
          <button
            className={activeTab === 'Information' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('Information')}
          >
            Information
          </button>
          <button
            className={activeTab === 'Company Standards' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('Company Standards')}
          >
            Company Standards
          </button>
          <button
            className={activeTab === 'Reviews' ? 'tab active' : 'tab'}
            onClick={() => setActiveTab('Reviews')}
          >
            Reviews (0)
          </button>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </div>

      {/* More From The Company */}
      <div className="slider-container">
        <div className="text-center mb-4 py-4">
          <h2 className="section-title px-5">
            <span className="px-2">
              More From The Company <i className="fa-solid fa-box" aria-hidden="true"></i>
            </span>
          </h2>
        </div>
        <OwlCarousel className="owl-theme" {...options}>
          {[...Array(8)].map((_, index) => (
            <div className="image-container" key={index}>
              <div className="card product-item">
                <div className="card-header product-img">
                  <img src="https://via.placeholder.com/150" alt={`Slide ${index + 1}`} />
                  <div className="info-icon">
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="card-body">
                  <div className="star-rating">
                    <StarRating /> {/* Integrated StarRating */}
                  </div>
                  <h6 className="title">Suggestion #{index + 1}</h6>
                  <div className="price-section">
                    <h6 className="price">{(Math.random() * 1000).toFixed(2)} PAX</h6>
                  </div>
                </div>
                <div className="card-footer">
                <Link to="/DetailPage" className="btn btn-outline-primary">
                    <i className="fas fa-eye"></i> View Detail
                  </Link>
                  <a href="/user/login" className="btn btn-outline-primary">
                    <i className="fas fa-shopping-cart"></i> Place Order
                  </a>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default DetailPage;
