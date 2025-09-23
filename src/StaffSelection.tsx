import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './assets/css/HomeSlider.css';
import IBTC from './assets/ibtc.png';
import IBTC1 from './assets/ibtc.png';
import IBTC2 from './assets/ibtc.png';
import IBTC3 from './assets/ibtc.png';
import IBTC4 from './assets/ibtc.png';
import StarRating from './StarRating';

// Import PartyTable and StaffSelectionForm from the src directory
import PartyTable from './PartyTable';
import StaffSelectionForm from './StaffSelectionForm';

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
    <>
      {/* Party Table Section */}
      <div className="mb-4">
        <h2 className="section-title text-center py-3">Party Details</h2>
        <PartyTable />
      </div>

      {/* Staff Selection Form Section */}
      <div className="mb-4">
        <StaffSelectionForm />
      </div>

      {/* Additional Input Fields */}
                <div className="additional-info mb-4">
                <h2 className="section-title text-center py-3">Additional Information</h2>
                
                <div className="form-group mb-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <label htmlFor="email" style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem', display: 'block' }}>
                    Email ID:
                    </label>
                    <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                    />
                </div>
                
                <div className="form-group mb-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <label htmlFor="phone" style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem', display: 'block' }}>
                    Phone Number:
                    </label>
                    <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    placeholder="Enter your phone number"
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                    />
                </div>
                
                <div className="form-group mb-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <label htmlFor="otherInfo" style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.5rem', display: 'block' }}>
                    Any Other Info:
                    </label>
                    <textarea
                    className="form-control"
                    id="otherInfo"
                    rows="3"
                    placeholder="Enter any additional information"
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                    ></textarea>
                </div>
                
                <div className="text-center">
                    <button
                    className="btn btn-primary"
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        borderRadius: '5px',
                        backgroundColor: '#007bff',
                        border: 'none',
                        color: '#fff',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        cursor: 'pointer',
                    }}
                    >
                    <i className="fas fa-check" style={{ marginRight: '5px' }}></i>
                    Confirm Order
                    </button>
                </div>
                </div>


      
    </>
  );
};

export default ProductSlider;
