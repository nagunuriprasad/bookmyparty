import React from 'react';
import './assets/css/HomePage.css';
import image1 from './assets/bp-image1.jpg';
import image2 from './assets/bp-image2.jpg';
import image3 from './assets/bp-image3.jpg';
import image4 from './assets/bp-image4.jpg';
import image5 from './assets/bp-image5.jpg';
import image6 from './assets/bp-image6.jpg';
import HomeSlider from './HomeSlider';
import Packages from './Packages';

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./assets/css/HomeSlider.css";
import StarRating from './StarRating';

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

const images = [image1, image2, image3, image4, image5, image6];

const CarouselComponent = () => {
  return (
    <>
      <div className="marquee-container">
        <div className="marquee-track">
          {/* Displaying images for the marquee */}
          {images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`carousel ${index}`} 
              className="marquee-image" 
            />
          ))}
          {/* Repeat the images for a seamless loop */}
          {images.map((image, index) => (
            <img 
              key={index + images.length} 
              src={image} 
              alt={`carousel duplicate ${index}`} 
              className="marquee-image" 
            />
          ))}
        </div>
      </div>

      <div><HomeSlider/></div>
      <div><Packages/></div>

      {/* Popular Shops */}
      <div className="text-center mb-4 py-4 d-flex justify-content-center align-items-center">
        <h2 className="section-title px-5">
          <span className="px-2">
            Popular Shops <i className="fa-solid fa-store" aria-hidden="true"></i>
          </span>
        </h2>
      </div>

      {/* Product Carousel */}
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
                <h6 className="title">Shop Name:</h6>
                <div className="price-section">
                  <h6 className="price">Description:</h6>
                </div>
              </div>
              <div className="card-footer">
                <a href="/ShopOrder" className="btn btn-outline-primary">
                  <i className="fas fa-eye"></i> Visit
                </a>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </>
  );
};

export default CarouselComponent;
