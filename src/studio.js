import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link for routing
import './assets/css/HomePage.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import IBTC from './assets/ibtc.png';  // Update this path as needed
import StarRating from './StarRating';  // Assuming you have this component

const Studio = () => {
  const [selectedTab, setSelectedTab] = useState('Private');
  const [partyPackage, setPartyPackage] = useState('Package');
  const [packageType, setPackageType] = useState('Package Type');

  const images = [IBTC, IBTC, IBTC, IBTC, IBTC]; // Example images array

  const options = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      1024: {
        items: 3,
      },
    },
  };

  // Defining products/services for each tab
  const tabProducts = {
    All: [
      { title: 'Service 1', image: IBTC, price: '$100' },
      { title: 'Service 2', image: IBTC, price: '$150' },
      { title: 'Service 3', image: IBTC, price: '$200' },
      { title: 'Service 4', image: IBTC, price: '$250' },
    ],
    Private: [
      { title: 'Private Service 1', image: IBTC, price: '$120' },
      { title: 'Private Service 2', image: IBTC, price: '$180' },
      { title: 'Private Service 3', image: IBTC, price: '$220' },
      { title: 'Private Service 4', image: IBTC, price: '$260' },
    ],
    Corporate: [
      { title: 'Corporate Service 1', image: IBTC, price: '$130' },
      { title: 'Corporate Service 2', image: IBTC, price: '$170' },
      { title: 'Corporate Service 3', image: IBTC, price: '$210' },
      { title: 'Corporate Service 4', image: IBTC, price: '$250' },
    ],
    Education: [
      { title: 'Education Service 1', image: IBTC, price: '$140' },
      { title: 'Education Service 2', image: IBTC, price: '$160' },
      { title: 'Education Service 3', image: IBTC, price: '$200' },
      { title: 'Education Service 4', image: IBTC, price: '$240' },
    ],
    Sport: [
      { title: 'Sport Service 1', image: IBTC, price: '$110' },
      { title: 'Sport Service 2', image: IBTC, price: '$150' },
      { title: 'Sport Service 3', image: IBTC, price: '$190' },
      { title: 'Sport Service 4', image: IBTC, price: '$230' },
    ],
    Public: [
      { title: 'Public Service 1', image: IBTC, price: '$90' },
      { title: 'Public Service 2', image: IBTC, price: '$130' },
      { title: 'Public Service 3', image: IBTC, price: '$170' },
      { title: 'Public Service 4', image: IBTC, price: '$210' },
    ],
  };

  return (
    <div>
      {/* Tabs Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          margin: '20px auto',
          padding: '10px',
          borderBottom: '2px solid #ddd',
          maxWidth: '100%',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {['All', 'Private', 'Corporate', 'Education', 'Sport', 'Movies'].map((tab) => (
          <button
            key={tab}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: selectedTab === tab ? '#007bff' : '#f5f5f5',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              color: selectedTab === tab ? 'white' : 'black',
              flexShrink: 0,
              whiteSpace: 'nowrap',
              minWidth: '120px',
            }}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}

        {/* Party Package Dropdown */}
        <select
          style={{
            padding: '8px 12px',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
            marginLeft: 'auto',
            width: '100%',
            maxWidth: '200px',
            flexShrink: 0,
          }}
          value={partyPackage}
          onChange={(e) => setPartyPackage(e.target.value)}
        >
          <option value="Package">Package</option>
          <option value="Two Combo">Two Combo</option>
          <option value="Three Combo">Three Combo</option>
          <option value="Limited Combo">Limited Combo</option>
          <option value="Unlimited Combo">Unlimited Combo</option>
        </select>

        {/* Package Type Dropdown */}
        <select
          style={{
            padding: '8px 12px',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
            marginLeft: 'auto',
            width: '100%',
            maxWidth: '200px',
            flexShrink: 0,
          }}
          value={packageType}
          onChange={(e) => setPackageType(e.target.value)}
        >
          <option value="Package Type">Pro Types</option>
          <option value="Luxury">Luxury</option>
          <option value="Ultra Modern">Ultra Modern</option>
          <option value="Celebrity">Celebrity</option>
          <option value="Royal">Royal</option>
        </select>
      </div>

      {/* Services Section based on selected tab */}
      <div className="slider-container">
        <div className="text-center mb-4 py-4">
          <h2 className="section-title px-5">
            <span className="px-2">
              {selectedTab} Services <i className="fa-solid fa-box" aria-hidden="true"></i>
            </span>
          </h2>
        </div>
        <OwlCarousel className="owl-theme" {...options}>
          {tabProducts[selectedTab].map((product, index) => (
            <div className="image-container" key={index}>
              <div className="card product-item">
                <div className="card-header product-img">
                  <img src={product.image} alt={`Product ${index + 1}`} />
                  <div className="info-icon">
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                </div>

                <div className="card-body">
                  <div className="star-rating">
                    <StarRating />
                  </div>
                  <h6 className="title">{product.title}</h6>
                  <div className="price-section">
                    <h6 className="price">{product.price}</h6>
                  </div>
                </div>
                <div className="card-footer">
                  <Link to="/DetailPage" className="btn btn-outline-primary">
                    <i className="fas fa-eye"></i> View Detail
                  </Link>
                  <a href="#" className="btn btn-outline-primary">
                    <i className="fas fa-shopping-cart"></i> Add to Cart
                  </a>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>

      {/* More Services Section */}
      <div className="slider-container">
        <div className="text-center mb-4 py-4">
          <h2 className="section-title px-5">
            <span className="px-2">
              More Services <i className="fa-solid fa-box" aria-hidden="true"></i>
            </span>
          </h2>
        </div>
        <OwlCarousel className="owl-theme" {...options}>
          {images.concat(images).map((image, index) => (
            <div className="image-container" key={index}>
              <div className="card product-item">
                <div className="card-header product-img">
                  <img src={image} alt={`Slide ${index + 1}`} />
                  <div className="info-icon">
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                </div>

                <div className="card-body">
                  <div className="star-rating">
                    <StarRating />
                  </div>
                  <h6 className="title">Product Title</h6>
                  <div className="price-section">
                    <h6 className="price">Price</h6>
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

export default Studio;
