import React, { useState, useEffect, useRef } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./assets/css/HomeSlider.css";
import ShopOrder from "./ShopOrder";

import IBTC from './assets/ibtc.png';
import IBTC1 from './assets/ibtc.png';
import IBTC2 from './assets/ibtc.png';
import IBTC3 from './assets/ibtc.png';
import IBTC4 from './assets/ibtc.png';
import StarRating from './StarRating';

const images = [IBTC, IBTC1, IBTC2, IBTC3, IBTC4];

// Tabs data
const tabs = [
  "All",
  "Wholesale Package",
  "Wholesale Shop",
  "Retail Shops",
  "Grocery Shops",
  "Fruit Shops",
  "Chicken Shops",
  "Mutton Shops",
  "Fish Shops",
  "Dairy Shops",
  "Paneer Shops",
  "Gift Shops",
  "Fashion Shops",
  "Footwear Shops",
  "Balloon Shops",
  "Bakery Shops",
  "Flower Shops",
  "Decoration Shops",
  "Pooja Stores",
  "Cracker Shops",
  "Jewelry Shops",
  "Fancy Stores",
  "Beauty & Cosmetics",
];

const ProductSlider = () => {
  const [selectedTab, setSelectedTab] = useState("All");  // Default to "All"
  const [specialTab, setSpecialTab] = useState("");  // To hold the state for "Package" or "Bulk Order" tab
  const [searchTerm, setSearchTerm] = useState("");  // Search term state
  const [products, setProducts] = useState([]);  // State to store the products
  const tabsRef = useRef(null); // Reference for the tab container

  useEffect(() => {
    // Simulating data fetching with shops from A to Z, random descriptions and locations
    const fetchedProducts = [
      { name: "Apple Store", shop: "Apple Shop", location: "Bengaluru", description: "Electronics, Mobiles, Accessories", image: IBTC },
      { name: "Bakery Delights", shop: "Bakery Shop", location: "Chennai", description: "Fresh Breads, Cakes, Pastries", image: IBTC },
      { name: "Chick N Fish", shop: "Chicken Shop", location: "Hyderabad", description: "Fresh Chicken & Fish", image: IBTC },
      { name: "Dairy Farm", shop: "Dairy Shop", location: "Pune", description: "Milk, Butter, Cheese", image: IBTC1 },
      { name: "Exotic Flowers", shop: "Flower Shop", location: "Goa", description: "Fresh Flowers, Bouquets", image: IBTC2 },
      { name: "Fruits & Veggies", shop: "Fruit Shop", location: "Mumbai", description: "Fresh Fruits and Vegetables", image: IBTC3 },
      { name: "Gourmet Food", shop: "Grocery Shop", location: "Bengaluru", description: "Organic Grocery and Spices", image: IBTC4 },
      { name: "Healthy Eats", shop: "Grocery Shop", location: "Hyderabad", description: "Organic and Health Foods", image: IBTC },
      { name: "Ice Cream World", shop: "Dessert Shop", location: "Chennai", description: "Ice Cream, Gelato, Sorbet", image: IBTC1 },
      { name: "Jewel Craft", shop: "Jewelry Shop", location: "Pune", description: "Gold and Diamond Jewelry", image: IBTC2 },
      { name: "Killer Kicks", shop: "Footwear Shop", location: "Mumbai", description: "Sports Shoes, Sneakers", image: IBTC3 },
      { name: "Luxe Gifts", shop: "Gift Shop", location: "Goa", description: "Personalized Gifts, Hampers", image: IBTC4 },
      { name: "Mutton House", shop: "Mutton Shop", location: "Bengaluru", description: "Fresh Mutton and Meat", image: IBTC },
      { name: "Nuts & Seeds", shop: "Grocery Shop", location: "Chennai", description: "Nuts, Seeds, Dry Fruits", image: IBTC1 },
      { name: "Oven Fresh", shop: "Bakery Shop", location: "Mumbai", description: "Breads, Cakes, Pies", image: IBTC2 },
      { name: "Pooja Essentials", shop: "Pooja Store", location: "Hyderabad", description: "Pooja Items, Puja Samagri", image: IBTC3 },
      { name: "Quick Chicken", shop: "Chicken Shop", location: "Pune", description: "Fresh Chicken, Poultry", image: IBTC4 },
      { name: "Royal Flowers", shop: "Flower Shop", location: "Goa", description: "Fresh Flowers, Wedding Bouquets", image: IBTC },
    ];
    setProducts(fetchedProducts);
  }, []);

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


  // Scroll tabs function
  const scrollTabs = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // Handle tab clicks
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);

    // Update the special tab logic
    if (tab === "Wholesale Package") {
      setSpecialTab("Package");
    } else if (tab === "Wholesale Shop") {
      setSpecialTab("Bulk Order");
    } else {
      setSpecialTab(""); // Reset when other tabs are selected
    }
  };

  // Filter products and shops only if search term exists
  const filteredProducts = searchTerm
    ? products.filter((product) => {
        return (
          product.shop.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : products; // If there's no search term, show all products

  return (
    <div className="slider-container">
      {/* Tabs Container */}
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
          minWidth: "120px",
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

      {/* Search Bar Below Tabs */}
      <div
        style={{
          marginBottom: "20px", // Add margin for space below the search bar
          textAlign: "center",
        }}
      >
        <input
            type="text"
            placeholder="Search for products or shops at Near by location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "12px 16px", // Slightly larger padding for better usability
              width: "100%",
              maxWidth: "400px",
              margin: "10px 0",
              borderRadius: "24px",
              border: "1px solid #ddd", // Softer border color for a clean look
              fontSize: "1rem",
              color: "#333", // Darker text color for better readability
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Enhanced shadow for depth
              backgroundColor: "#ffffff", // Crisp white background
              outline: "none",
              transition: "all 0.3s ease", // Smooth transition for all interactions
              caretColor: "#ff6f61", // Custom caret color for branding
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#ff6f61"; // Highlight border on focus
              e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.15)"; // Larger shadow on focus
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ddd"; // Reset border color on blur
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // Reset shadow on blur
            }}
             // Reset shadow on blur
        />

      </div>

      {/* Product Carousel */}
      <OwlCarousel className="owl-theme" {...options}>
        {filteredProducts.map((product, index) => (
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

                <h6 className="title">Shop Name: {product.shop}</h6>
                <div className="price-section">
                  <h6 className="price">Description: {product.description}</h6>
                  <h6 className="price">Location: {product.location}</h6>
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
    </div>
  );
};

export default ProductSlider;
