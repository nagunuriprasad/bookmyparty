import React, { useState, useRef } from 'react';
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
import StaffSelection from './StaffSelection'; // Import StaffSelection component

const ProductSlider: React.FC = () => {
  const images = [IBTC, IBTC1, IBTC2, IBTC3, IBTC4];
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const tabsRef = useRef<HTMLDivElement>(null);

  const options = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 },
    },
  };

  const tabs = [
    "Masters, Chefs & Associates",
    "Event Management Staff",
    "Stage Setup & Decoration Staff",
    "Welcome & Service Girls",
    "Catering Staff",
    "Security & Bouncers",
    "House Keeping Staff",
  ];

  // Scroll tabs
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredProducts = images.filter((image) => {
    const matchesTab = selectedTab === "All" || image === selectedTab;
    const matchesSearch = image.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const modalStyles = {
    background: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    } as React.CSSProperties,
    content: {
      background: '#fff',
      width: '90%',
      maxWidth: '1200px',
      borderRadius: '10px',
      overflowY: 'auto',
      maxHeight: '90vh',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      position: 'relative',
    } as React.CSSProperties,
    header: {
      padding: '10px 20px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #ddd',
    } as React.CSSProperties,
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      background: 'none',
      border: 'none',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      cursor: 'pointer',
    } as React.CSSProperties,
    body: {
      padding: '20px',
    } as React.CSSProperties,
    footer: {
      textAlign: 'center',
      padding: '10px 20px',
      borderTop: '1px solid #ddd',
      backgroundColor: '#f8f9fa',
    } as React.CSSProperties,
  };

  return (
    <>
      {/* Tabs Section */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: "10px 0",
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
          backgroundColor: "#fff",
        }}
        className="tabs-container-wrapper"
      >
        <button
          onClick={() => scrollTabs('left')}
          style={{
            backgroundColor: "#f5f5f5",
            border: "1px solid #ccc",
            borderRadius: "5%",
            cursor: "pointer",
            padding: "0px",
            marginRight: "3px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {"<"}
        </button>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            scrollbarWidth: "none",
            flex: 1,
          }}
          ref={tabsRef}
          className="tabs-container"
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                backgroundColor: selectedTab === tab ? "#007bff" : "#f5f5f5",
                border: "1px solid #ccc",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                color: selectedTab === tab ? "white" : "black",
                flexShrink: 0,
                whiteSpace: "nowrap",
                minWidth: "150px",
                marginRight: "10px",
              }}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollTabs('right')}
          style={{
            backgroundColor: "#f5f5f5",
            border: "1px solid #ccc",
            borderRadius: "5%",
            cursor: "pointer",
            padding: "0px",
            marginLeft: "3px",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          {">"}
        </button>
      </div>

     

      {/* Title */}
      <div className="text-center mb-4 py-4 d-flex justify-content-center align-items-center">
        <h2 className="section-title px-5">
          <span className="px-2">
            Staff <i className="fa-solid fa-users" aria-hidden="true"></i>
          </span>
        </h2>
      </div>

      {/* Owl Carousel */}
      <OwlCarousel className="owl-theme" {...options}>
        {filteredProducts.concat(filteredProducts).map((image, index) => (
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
                <h6 className="title">Name:</h6>
                <div className="price-section">
                  <h6 className="price">Designation:</h6>
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setShowModal(true)}
                >
                  <i className="fas fa-eye"></i> View Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>

      {/* Modal */}
      {showModal && (
        <div style={modalStyles.background} onClick={(e) => e.stopPropagation()}>
          <div style={modalStyles.content}>
            <div style={modalStyles.header}>
              <button
                style={modalStyles.closeButton}
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h3>Select Staff</h3>
            </div>
            <div style={modalStyles.body}>
              <StaffSelection />
            </div>
            <div style={modalStyles.footer}>
              <button onClick={() => setShowModal(false)} className="btn btn-primary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSlider;
