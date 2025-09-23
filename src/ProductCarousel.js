// ProductCarousel.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './assets/css/ProductCarousel.css'; // Your custom styles

// Import your images
import IBTC from './assets/ibtc.png';
import IBTC1 from './assets/ibtc.png';
import IBTC2 from './assets/ibtc.png';
import IBTC3 from './assets/ibtc.png';
import IBTC4 from './assets/ibtc.png';

const ProductCarousel = () => {
  const products = [
    {
      id: 'Photographers',
      imgSrc: IBTC,
      title: 'Photography',
      price: '10000.000',
      detailLink: '/detail/3',
      loginLink: '/user/login',
    },
    {
      id: 'Caterers',
      imgSrc: IBTC1,
      title: 'Catering',
      price: '350.000',
      detailLink: '/detail/1',
      loginLink: '/user/login',
    },
    {
      id: 'Caterers2',
      imgSrc: IBTC2,
      title: 'Dfyugy',
      price: '50000.000',
      detailLink: '/detail/4',
      loginLink: '/user/login',
    },
    {
      id: 'Venues',
      imgSrc: IBTC3,
      title: 'Basic Venues',
      price: '5000.000',
      detailLink: '/detail/2',
      loginLink: '/user/login',
    },
    {
      id: 'Photographers2',
      imgSrc: IBTC4,
      title: 'Photography',
      price: '10000.000',
      detailLink: '/detail/3',
      loginLink: '/user/login',
    },
    // Add more products as needed
  ];

  return (
    <div>
    <div className="row px-xl-5">
      <div className="col">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={29}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          speed={3000} // Adjust the speed for continuous sliding
          allowTouchMove={false} // Disable manual swiping
          pagination={{ clickable: true }}
          navigation={false} // Set to true if you want navigation buttons
          className="mySwiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="card product-item border-0 rounded-3 shadow" id={product.id}>
                <div
                  className="card-header product-img position-relative overflow-hidden bg-transparent border p-0"
                  style={{ borderRadius: '20px', border: '1px solid #ddd' }}
                >
                  <img
                    className="img-fluid w-100"
                    src={product.imgSrc}
                    alt={product.title}
                    style={{ objectFit: 'cover', height: '300px', width: '100%' }}
                  />
                  <div
                    className="info-icon"
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    title=""
                  >
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-2 pb-3">
                  <div className="comment-review star-rating" style={{ color: 'gold' }}>
                    <i className="fa fa-star-half-empty" aria-hidden="true"></i>
                  </div>
                  <h6 className="text-truncate mb-3 text-dark">{product.title}</h6>
                  <div className="d-flex justify-content-center">
                    <h6 className="priceSymbol text-success"></h6>
                    <h6 className="price">{product.price}</h6>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                  <a href={product.detailLink} className="btn btn-outline-primary">
                    <i className="fas fa-eye text-primary mr-1" aria-hidden="true"></i>View Detail
                  </a>
                  <a type="button" href={product.loginLink} className="btn btn-outline-primary">
                    <i className="fas fa-shopping-cart text-primary mr-1" aria-hidden="true"></i> Place Order
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    </div>
  );
};

export default ProductCarousel;
