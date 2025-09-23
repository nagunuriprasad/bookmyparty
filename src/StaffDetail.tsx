import React, { useState } from "react"; // Import useState
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
import IdentityCard from './identitycard'; // Import the IdentityCard component
import StaffSelection from './StaffSelection'; // Import StaffSelection component

const StaffDetail: React.FC = () => {
  const [showCard, setShowCard] = useState(false); // State for showing/hiding the identity card
  const [showModal, setShowModal] = useState(false); // Manage modal state
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

  // Function to toggle the visibility of the identity card
  const toggleCard = () => setShowCard(!showCard);

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      width: "60%", // Reduced from 80%
      margin: "10px auto", // Reduced margin
      border: "1px solid #ddd",
      borderRadius: "8px", // Reduced radius
      overflow: "hidden",
      fontFamily: "'Arial', sans-serif",
      boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
    },
    header: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      padding: "15px", // Reduced padding
    },
    imageContainer: {
      width: "100px", // Reduced from 150px
      height: "100px",
      borderRadius: "50%",
      overflow: "hidden",
      border: "2px solid #ddd",
      marginRight: "15px", // Reduced margin
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    personalDetails: {
      flex: 1,
    },
    name: {
      fontSize: "20px", // Reduced from 24px
      fontWeight: "bold",
      margin: "0",
    },
    designation: {
      fontSize: "16px", // Reduced from 18px
      color: "#666",
      margin: "5px 0",
    },
    rating: {
      color: "#FFD700",
      marginTop: "8px", // Reduced margin
    },
    price: {
      fontSize: "16px", // Reduced font size
      color: "green",
      fontWeight: "bold",
    },
    body: {
      padding: "15px", // Reduced padding
    },
    section: {
      marginBottom: "15px", // Reduced margin
    },
    sectionHeader: {
      fontSize: "16px", // Reduced font size
      fontWeight: "bold",
      marginBottom: "8px", // Reduced margin
      borderBottom: "2px solid #ddd",
      paddingBottom: "4px", // Reduced padding
    },
    expertContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px", // Reduced gap
    },
    tab: {
      padding: "8px", // Reduced padding
      border: "1px solid #ddd",
      borderRadius: "4px", // Reduced radius
      backgroundColor: "#f9f9f9",
      cursor: "default",
      fontSize: "14px", // Reduced font size
    },
    description: {
      border: "1px solid #ddd",
      borderRadius: "4px", // Reduced radius
      padding: "8px", // Reduced padding
      backgroundColor: "#f9f9f9",
      minHeight: "80px", // Reduced height
    },
    bookButton: {
      display: "block",
      margin: "15px auto", // Reduced margin
      padding: "8px 15px", // Reduced padding
      backgroundColor: "#007BFF",
      color: "white",
      border: "none",
      borderRadius: "4px", // Reduced radius
      cursor: "pointer",
      fontSize: "14px", // Reduced font size
      textAlign: "center",
    },
  };

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
    },
    content: {
      background: '#fff',
      width: '90%',
      maxWidth: '1200px',
      borderRadius: '10px',
      overflowY: 'auto',
      maxHeight: '90vh',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
      position: 'relative',
    },
    header: {
      padding: '10px 20px',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #ddd',
    },
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
    },
    body: {
      padding: '20px',
    },
    footer: {
      textAlign: 'center',
      padding: '10px 20px',
      borderTop: '1px solid #ddd',
      backgroundColor: '#f8f9fa',
    },
  };


  return (
    <div>
      {/* Main Content - Staff Details */}
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.imageContainer}>
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              style={styles.image}
            />
          </div>
          <div style={styles.personalDetails}>
            <h1 style={styles.name}>Dhiraj Mattur</h1>
            <h2 style={styles.designation}>
              Chef (Specialist in South Indian Cuisine)
            </h2>
            <div style={styles.rating}>⭐⭐⭐⭐⭐ (5/5 Rating)</div>
          </div>
        </div>

        {/* Body Section */}
        <div style={styles.body}>
          {/* Languages Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>Languages Known</h3>
            <div style={styles.expertContainer}>
              {["Kannada", "English", "Hindi", "Telugu"].map((language) => (
                <div key={language} style={styles.tab}>
                  {language}
                </div>
              ))}
            </div>
          </div>

          {/* Food Preferences */}
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>Food Preferences</h3>
            <div style={styles.expertContainer}>
              {["Veg"].map((preference) => (
                <div key={preference} style={styles.tab}>
                  {preference}
                </div>
              ))}
            </div>
          </div>

          {/* Work Type */}
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>Work Type</h3>
            <div style={styles.expertContainer}>
              {["Part-Time"].map((workType) => (
                <div key={workType} style={styles.tab}>
                  {workType}
                </div>
              ))}
            </div>
          </div>

          {/* Subscription */}
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>Subscription</h3>
            <div style={styles.expertContainer}>
              {["Basic"].map((subscription) => (
                <div key={subscription} style={styles.tab}>
                  {subscription}
                </div>
              ))}
            </div>
          </div>

          {/* Expertise Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>Expert In</h3>
            <div style={styles.expertContainer}>
              {[
                "South Indian",
                "North Indian",
                "Italian",
                "Chinese",
                "Biryani",
                "Naan & Roties",
              ].map((expertise) => (
                <div key={expertise} style={styles.tab}>
                  {expertise}
                </div>
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div style={styles.section}>
            <h3 style={styles.sectionHeader}>Description</h3>
            <div style={styles.description}>
              <p>
                Dhiraj is a professional chef specializing in Indian cuisines
                with over 5 years of experience. He has worked in renowned
                restaurants and has exceptional skills in preparing traditional
                and fusion dishes.
              </p>
            </div>
          </div>

          {/* Book Button */}
          <center><button
                  className="btn btn-outline-primary"
                  onClick={() => setShowModal(true)}
                >
                  <i className="fas fa-shopping-cart"></i> Book Now</button></center>
        </div>
      </div>
      <h3><b><center>More from the Staff</center></b></h3>
      {/* Product Carousel - Placed outside the container, after staff details */}
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
                <h6>Staff Name</h6>
                <StarRating rating={5} /> {/* Assuming StarRating is a component */}
                <p>Special in :</p>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>

                

        {/* Modal for Staff Selection */}
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




    </div>
  );
};

export default StaffDetail;
