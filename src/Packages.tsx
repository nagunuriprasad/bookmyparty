// Slider.js using react-owl-carousel
import React from 'react';
import $ from 'jquery'; // Import jQuery
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './assets/css/HomeSlider.css';
import IBTC from './assets/Menu.png';
import IBTC1 from './assets/Menu.png';
import IBTC2 from './assets/Menu.png';
import IBTC3 from './assets/Menu.png';
import IBTC4 from './assets/Menu.png';
import StarRating from './StarRating';
const ProductSlider = () => {
  const images = [IBTC, IBTC1, IBTC2, IBTC3, IBTC4];

  const options = {
    loop: true,
    margin: 10, // Set margin between items
    nav: false, // Hide navigation arrows
    dots: false, // Disable the bottom dots
    autoplay: true,
    autoplayTimeout: 2000, // Time between transitions
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
  
  return (
    <div className="slider-container">
     <div className="text-center mb-4 py-4">
  <h2 className="section-title px-5">
  <span className="px-2">Packages <i className="fa-solid fa-box" aria-hidden="true"></i></span>

  </h2>
</div>
      <OwlCarousel className="owl-theme" {...options} >
        {images.concat(images).map((image, index) => (
          <div className="image-container" key={index} >
            <div className="card product-item">
              <div className="card-header product-img">
                <img src={image} alt={`Slide ${index + 1}`} />
                <div className="info-icon">
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </div>
              </div>

              <div className="card-body">
                <div className="star-rating">
                <StarRating/>
                </div>
                
                <h6 className="title">Product Title</h6>
                <div className="price-section">
                  <h6 className="price">Price</h6>
                </div>
              </div>
              <div className="card-footer">
                <a href="/detail" className="btn btn-outline-primary">
                  <i className="fas fa-eye"></i> View Detail
                </a>
                <a href="/user/login" className="btn btn-outline-primary">
                  <i className="fas fa-shopping-cart"></i> Place Order
                </a>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
};

export default ProductSlider;
