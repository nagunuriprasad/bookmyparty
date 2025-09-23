import React, { useState } from 'react';

import companyLogo from './assets/Bp-image.png';
import { FaEye, FaEyeSlash, FaHeart, FaCartPlus } from 'react-icons/fa'; // Eye icons
import {
  FaTasks,
  FaCheckCircle,
  FaShoppingCart,
  FaTimesCircle,
  FaBell,
  FaTags,
  FaUserEdit,
  FaSignOutAlt,
  FaTrashAlt,
  FaEnvelope,
  FaLock,
  FaUser,
  FaUniversity,
  FaStore,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [showSubtypes, setShowSubtypes] = useState(false); // For toggling subtypes
  const [activeMenu, setActiveMenu] = useState('Dashboard'); // Active menu state
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false); // Orders dropdown state
  const [isMarketDropdownOpen, setMarketDropdownOpen] = useState(false); // Market Place dropdown state
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false); // Initial state is 'false' for hidden
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false); // Initial state is 'false' for hidden
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Initial state is 'false' for hidden
  
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 38;

  const [isPriceManagerOpen, setIsPriceManagerOpen] = useState(false);
  const [isStaffFormVisible, setStaffFormVisible] = useState(false);
  const [selectedStaffCategory, setSelectedStaffCategory] = useState('');
  const [selectedPriceCategory, setSelectedPriceCategory] = useState('Basic');
  const [staffCount, setStaffCount] = useState(1);

  const [isProductsServicesOpen, setIsProductsServicesOpen] = useState(false);
  const [isStaffOpen, setIsStaffOpen] = useState(false);
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false);
  const [isRetailshopOpen, setIsRetailshopOpen] = useState(false);
  const [isGroceriesOpen, setIsGroceriesOpen] = useState(false);
  const [isTaxOpen, setIsTaxOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const [successMessage, setSuccessMessage] = useState(false);

  const [showStaffPrices, setShowStaffPrices] = React.useState(false);
  const [staffPriceData, setStaffPriceData] = useState([]);



const handleUpdate = () => {
  const category = document.getElementById("category")?.value;
  const subCategory = document.getElementById("subCategory")?.value;
  const itemName = document.getElementById("itemName")?.value;
  const price = parseInt(document.getElementById("price")?.value);

  const newItem = { category, subCategory, itemName, price };

  let currentData = JSON.parse(localStorage.getItem("menuItems") || "[]");
  currentData.push(newItem);

  localStorage.setItem("menuItems", JSON.stringify(currentData));
  setSuccessMessage(true);

  // Hide message after 3 seconds
  setTimeout(() => setSuccessMessage(false), 3000);
};

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);

    // Toggle 'Price Manager' menu
    if (menu === 'Price Manager') {
      setIsPriceManagerOpen(!isPriceManagerOpen);
    } else {
      setIsPriceManagerOpen(false);
    }

    // Close Orders and Market dropdowns if any other menu is clicked
    if (menu !== 'Orders') setOrdersDropdownOpen(false);
    if (menu !== 'Market Place') setMarketDropdownOpen(false);

    // Toggle subtypes for User Management
    if (menu === 'User Management') {
      setShowSubtypes(!showSubtypes);
    }

     // Toggle subtypes for Work Login
     if (menu === 'Work Login') {
      setShowSubtypes(!showSubtypes);
    }

    // Handle Staff form visibility
    if (menu === 'Staff') {
      setStaffFormVisible(true);
    } else {
      setStaffFormVisible(false);
    }

    // Toggle submenu states for specific menu items
    if (menu === 'Products & Services') {
      setIsProductsServicesOpen(!isProductsServicesOpen);
    } else if (menu === 'Staff') {
      setIsStaffOpen(!isStaffOpen);
    } else if (menu === 'Customised Chat Menu') {
      setIsChatMenuOpen(!isChatMenuOpen);
    } else if (menu === 'Customised Retailshop') {
      setIsRetailshopOpen(!isRetailshopOpen);
    } else if (menu === 'Customised Groceries') {
      setIsGroceriesOpen(!isGroceriesOpen);
    } else if (menu === 'Tax') {
      setIsTaxOpen(!isTaxOpen);
    }
  };

  const handlePriceCategoryChange = (e) => {
    setSelectedPriceCategory(e.target.value);
  };

  const handleStaffCategoryChange = (e) => {
    setSelectedStaffCategory(e.target.value);
  };

  // Define toggleOrdersDropdown function
  const toggleOrdersDropdown = () => setOrdersDropdownOpen(!isOrdersDropdownOpen);

  return (
    <div className="dashboard-container10">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
  <div className="sidebar-logo">
    <img src={companyLogo} alt="Company Logo" className="logo-imgs" />
  </div>
  <nav className="sidebar-menu" style={{ overflowY: 'auto', maxHeight: '100vh' }}>
    <ul>
      <li onClick={() => handleMenuClick('Dashboard')}>
        <i className="fas fa-tachometer-alt"></i>
        <span>{isOpen && 'Dashboard'}</span>
      </li>
      <li onClick={() => handleMenuClick('User Management')}>
        <i className="fas fa-users"></i>
        <span>{isOpen && 'User Management'}</span>
      </li>
      {showSubtypes && (
        <ul className="sub-menu" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Customers</li>
          <li>Staffs</li>
          <li>Vendors</li>
          <li>Delivery Boys</li>
        </ul>
      )}

      <li onClick={() => handleMenuClick('Manage Groups')}>
        <i className="fas fa-server"></i>
        <span>{isOpen && 'Manage Groups'}</span>
      </li>
      <li onClick={() => handleMenuClick('Permissions')}>
        <i className="fas fa-layer-group"></i>
        <span>{isOpen && 'Permissions'}</span>
      </li>
      <li onClick={() => handleMenuClick('Messages')}>
        <i className="fas fa-comment-alt"></i>
        <span>{isOpen && 'Messages'}</span>
      </li>
      <li onClick={() => handleMenuClick('Wallet')}>
        <i className="fas fa-wallet"></i>
        <span>{isOpen && 'Wallet'}</span>
      </li>
      <li onClick={() => handleMenuClick('Price Manager')}>
        <i className="fas fa-money-bill"></i>
        <span>{'Price Manager'}</span>
      </li>
      {isPriceManagerOpen && (
        <ul className="sub-menu" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li onClick={() => handleMenuClick('Products & Services')}>Products & Services</li>
          <li onClick={() => handleMenuClick('Staff')}>Staff</li>
          <li onClick={() => handleMenuClick('Customised Caterers Menu')}>Customised Caterers Menu</li>
          <li onClick={() => handleMenuClick('Customised Chat Menu')}>Customised Chat Menu</li>
          <li onClick={() => handleMenuClick('Customised Retailshop')}>Customised Retailshop</li>
          <li onClick={() => handleMenuClick('Customised Groceries')}>Customised Groceries</li>
          <li onClick={() => handleMenuClick('Tax')}>
            <i className="fas fa-Money"></i>
            <span>Tax</span>
          </li>
        </ul>
      )}

      <li onClick={() => handleMenuClick('Work Login')}>
        <i className="fas fa-users"></i>
        <span>{isOpen && 'Work Login'}</span>
      </li>
      {showSubtypes && (
        <ul className="sub-menu" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li>Staffs</li>
          <li>Vendors</li>
          <li>Delivery Boys</li>
        </ul>
      )}

      <li onClick={() => handleMenuClick('Inbox')}>
        <i className="fas fa-inbox"></i>
        <span>{isOpen && 'Inbox'}</span>
      </li>

      <li onClick={toggleOrdersDropdown} className="orders-dropdown">
        <FaShoppingCart />
        <span>{isOpen && 'Orders'}</span>
        {isOpen && (
          <i
            className={`fas ${isOrdersDropdownOpen ? 'fa-chevron-down' : 'fa-chevron-right'}`}
          ></i>
        )}
      </li>
      {isOrdersDropdownOpen && isOpen && (
        <ul className="orders-submenu">
          <li onClick={() => handleMenuClick('Staff Orders')}>Staff Orders</li>
          <li onClick={() => handleMenuClick('Customer Orders')}>Customer Orders</li>
          <li onClick={() => handleMenuClick('Vendor Orders')}>Vendor Orders</li>
          <li onClick={() => handleMenuClick('DeliveryBoy Orders')}>DeliveryBoy Orders</li>
        </ul>
      )}

      <li onClick={() => handleMenuClick('Calendar')}>
        <i className="fas fa-calendar-alt"></i>
        <span>{isOpen && 'Calendar'}</span>
      </li>
      <li onClick={() => handleMenuClick('Notes')}>
        <i className="fas fa-clipboard"></i>
        <span>{isOpen && 'Notes'}</span>
      </li>
      <li onClick={() => handleMenuClick('Delivery')}>
        <i className="fas fa-truck"></i>
        <span>{isOpen && 'Delivery'}</span>
      </li>
      <li onClick={() => handleMenuClick('Bookmarks')}>
        <i className="fas fa-bookmark"></i>
        <span>{isOpen && 'Bookmarks'}</span>
      </li>
      <li onClick={() => handleMenuClick('Subscriptions')}>
        <i className="fas fa-box"></i>
        <span>{isOpen && 'Subscriptions'}</span>
      </li>
    </ul>
  </nav>
</aside>

{/* Main Content */}
<main className="main-content">
  <header className="dashboard-header">
    <div className={`nav-control ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
      <div className="hamburger">
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
      {isOpen && <h1 className="text-left">{activeMenu}</h1>}
    </div>
    <div className="user-info">
      {/* My Wishlist Icon with Inline CSS */}
      <FaHeart style={{ fontSize: '24px', color: '#e74c3c', cursor: 'pointer', margin: '0 10px' }} />

      {/* Add to Cart Icon with Inline CSS */}
      <FaCartPlus style={{ fontSize: '24px', color: '#3498db', cursor: 'pointer', margin: '0 10px' }} />
      <FaBell className="icon-notifications" />
      
      <span className="username">RAM <h6>Admin</h6></span>
    </div>
  </header>


  {activeMenu === 'Products & Services'  && (
  <div className="services-container">
    <section className="services-section">
      <form className="services-form">
        <h2 className="form-title">Update Products & Services Prices (%)</h2>

        {/* Radio Buttons */}
        <div className="radio-group">
          <center>
            <label className="radio-label">
              <input type="radio" name="priceUpdate" value="increase" /> Increase
            </label>
            <label className="radio-label">
              <input type="radio" name="priceUpdate" value="decrease" /> Decrease
            </label>
          </center>
        </div>

        {/* Events */}
        <div className="form-category">
          <h3 className="category-title">Events category</h3>
          <div className="form-group-horizontal">
            <select id="eventSubCategory" name="eventSubCategory" className="form-select">
              <option value="none">All</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate</option>
              <option value="birthday">Birthday</option>
              <option value="packages">Packages</option>
              <option value="venues">Venues</option>
              <option value="decors">Decors</option>
              <option value="tents-walls">Tents & Walls</option>
              <option value="caterers">Caterers</option>
              <option value="lights-sounds">Lights & Sounds</option>
              <option value="photographer">Photographer</option>
              <option value="dj">D.J</option>
              <option value="entertainments">Entertainments</option>
              <option value="band-set">Band set</option>
              <option value="bharaath-setup-team">Bharaath setup & Team</option>
              <option value="celebs-models">Celebs & Models</option>
              <option value="digital-screens">Digital Screens</option>
              <option value="digital-dj-vehicles">Digital D.J Vehicles</option>
              <option value="tea-coffee-specialists">Tea & Coffee Specialists</option>
              <option value="salad-stall">Salad Stall</option>
              <option value="juice-specialists">Juice Specialists</option>
              <option value="veg-snack-specialists">Veg Snack Specialists</option>
              <option value="non-veg-snack-specialists">Non Veg Snack Specialists</option>
              <option value="roti-specialists">Roti Specialists</option>
              <option value="butter-non-kulcha-specialists">Butter Non & Kulcha Specialists</option>
              <option value="chat-stall">Chat Stall</option>
              <option value="fruit-stall">Fruit Stall</option>
              <option value="soup-specialists">Soup Specialists</option>
              <option value="south-indian-breakfast">South Indian Breakfast</option>
              <option value="chinese-stall">Chinese Stall</option>
              <option value="mongolian-stalls">Mongolian Stalls</option>
              <option value="pizzas-burgers">Pizza’s & Burgers</option>
              <option value="cool-cakes-stall">Cool Cakes Stall</option>
              <option value="sweet-stalls">Sweet Stalls</option>
              <option value="ice-cream-stalls">Ice Cream Stalls</option>
              <option value="pan-counters">Pan Counters</option>
              <option value="drinking-waters">Drinking Waters</option>
              <option value="live-food-counters">Live Food Counters</option>
              <option value="led-counters">LED Counters</option>
              <option value="chocolate-counters">Chocolate Counters</option>
              <option value="smoke-projectors">Smoke Projectors</option>
              <option value="event-management-companies">Event Management Companies</option>
              <option value="chef-dish-rental">Chef n Dish Rental</option>
              <option value="event-display-specialists">Event Display Specialists</option>
              <option value="event-dress-rentals">Event Dress Rentals</option>
              <option value="invitation-printers">Invitation Printers</option>
              <option value="anchors">Anchors</option>
              <option value="pundits">Pundits</option>
              <option value="beauticians">Beauticians</option>
              <option value="mahanadi-specialists">Mahanadi Specialists</option>
              <option value="cocktail-specialists">Cocktail Specialists</option>
              <option value="liquor-bars">Liquor Bars</option>
            </select>

            <select id="eventCategory" name="eventCategory" className="form-select">
              <option value="none">None</option>
              <option value="basic">Basic</option>
              <option value="pro">Pro</option>
              <option value="vip">VIP</option>
              <option value="standard">Standard</option>
            </select>

            <input
              type="number"
              className="quantity-box"
              name="eventQuantity"
              placeholder="Enter Price here"
            />
          </div>
        </div>

        {/* Travels */}
        <div className="form-category center-category">
          <h3 className="category-title">Travels category</h3>
          <div className="form-group-horizontal">
            <select id="travelsSubCategory" name="travelsSubCategory" className="form-select">
              <option value="none">All</option>
              <option value="wedding">CABS</option>
              <option value="corporate">AUTOS</option>
              <option value="birthday">BUSES</option>
              <option value="packages">TRUCKS</option>
            
            </select>

            

            <input
              type="number"
              className="quantity-box"
              name="travelsQuantity"
              placeholder="Enter Price here"
            />
          </div>
        </div>

        {/* Products */}
        <div className="form-category">
          <h3 className="category-title">Products category</h3>
          <div className="form-group-horizontal">
            <select id="productsSubCategory" name="productsSubCategory" className="form-select">
              <option value="none">All</option>
              <option value="wholesale-package">Wholesale Package</option>
              <option value="wholesale-shop">Wholesale Shop</option>
              <option value="retail-shops">Retail Shops</option>
              <option value="grocery-shops">Grocery Shops</option>
              <option value="fruit-shops">Fruit Shops</option>
              <option value="chicken-shops">Chicken Shops</option>
              <option value="mutton-shops">Mutton Shops</option>
              <option value="fish-shops">Fish Shops</option>
              <option value="dairy-shops">Dairy Shops</option>
              <option value="paneer-shops">Paneer Shops</option>
              <option value="gift-shops">Gift Shops</option>
              <option value="fashion-shops">Fashion Shops</option>
              <option value="footwear-shops">Footwear Shops</option>
              <option value="balloon-shops">Balloon Shops</option>
              <option value="bakery-shops">Bakery Shops</option>
              <option value="flower-shops">Flower Shops</option>
              <option value="decoration-shops">Decoration Shops</option>
              <option value="pooja-stores">Pooja Stores</option>
              <option value="cracker-shops">Cracker Shops</option>
              <option value="jewelry-shops">Jewelry Shops</option>
              <option value="fancy-stores">Fancy Stores</option>
              <option value="beauty-cosmetics">Beauty & Cosmetics</option>

            </select>

            

            <input
              type="number"
              className="quantity-box"
              name="productsQuantity"
              placeholder="Enter Price here"
            />
          </div>
        </div>

        {/* INSTA FOOD */}
        <div className="form-category center-category">
          <h3 className="category-title">Insta Food category</h3>
          <div className="form-group-horizontal">
            <select id="staffSubCategory" name="staffSubCategory" className="form-select">
              <option value="none">All</option>
              <option value="wedding">RESTAURANTS</option>
              <option value="corporate">HOTELS & MESS</option>
              <option value="birthday">TIFFEN CENTERS</option>
              <option value="packages">CHINESE</option>
              
            </select>

            

            <input
              type="number"
              className="quantity-box"
              name="staffQuantity"
              placeholder="Enter Price here"
            />
          </div>
        </div>




        {/* Hotel */}
        <div className="form-category center-category">
          <h3 className="category-title">Hotel category</h3>
          <div className="form-group-horizontal">
            <select id="staffSubCategory" name="staffSubCategory" className="form-select">
              <option value="none">All</option>
              <option value="wedding">LUXURY HOTELS</option>
              <option value="corporate">BUDGET HOTELS</option>
              <option value="birthday">FAMILY ROOMS</option>
              <option value="packages">SUITS</option>
              <option value="venues">DELUXE ROOMS</option>
              <option value="decors">RESORTS</option>
              <option value="tents-walls">BOUTIQUE HOTELS</option>
              <option value="caterers">BUSINESS HOTELS</option>
              <option value="lights-sounds">PET-FRIENDLY HOTELS</option>
              <option value="photographer">HOSTELS</option>
              <option value="dj">VILLAS</option>
              <option value="entertainments">HOLIDAY HOMES</option>
             
            </select>

            

            <input
              type="number"
              className="quantity-box"
              name="staffQuantity"
              placeholder="Enter Price here"
            />
          </div>
        </div>

        {/* Update Button */}
        <div className="form-button-container">
          <button type="button" className="update-button">Update</button>
        </div>
      </form>
    </section>
  </div>
)}

{activeMenu === 'Staff' && (
  <div className="containeres">
    <section className="Staff">
      <form className="staff-forms">
        <h2>Staff Prices</h2>

        <div className="form-group">
          <label htmlFor="staffCategory">Staff Categories</label>
          <select
            id="staffCategory"
            value={selectedStaffCategory}
            onChange={handleStaffCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="Cook">Cook</option>
            <option value="Helper">Helper</option>
            <option value="Chef">Chef</option>
            <option value="Master Chefs">Master Chefs</option>
            <option value="Chefs">Chefs</option>
            <option value="Assistant Chefs">Assistant Chefs</option>
            <option value="Stage Setup Boys">Stage Setup Boys</option>
            <option value="Flower Décor Boys">Flower Décor Boys</option>
            <option value="Balloon Setup Boys">Balloon Setup Boys</option>
            <option value="Catering Boys">Catering Boys</option>
            <option value="Food Pickup Boys">Food Pickup Boys</option>
            <option value="Buffet Service Boys">Buffet Service Boys</option>
            <option value="Hotel Management Boys">Hotel Management Boys</option>
            <option value="Welcome Girls">Welcome Girls</option>
            <option value="Chinese Girls">Chinese Girls</option>
            <option value="Foreign Girls for Welcome">Foreign Girls for Welcome</option>
            <option value="HM Girls">HM Girls</option>
            <option value="Couple Service">Couple Service</option>
            <option value="Liquor Service Boys">Liquor Service Boys</option>
            <option value="Cocktails Service Boys">Cocktails Service Boys</option>
            <option value="Bar Tenders">Bar Tenders</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="priceCategory">Price Category</label>
          <select
            id="priceCategory"
            value={selectedPriceCategory}
            onChange={handlePriceCategoryChange}
          >
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Pro">Pro</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="staffCount">Price</label>
          <input
            type="number"
            id="staffCount"
            value={staffCount}
            onChange={(e) => setStaffCount(e.target.value)}
            min="1"
          />
        </div>
        <center>
          <button
            type="button"
            className="update-button"
            onClick={() => {
              const updatedData = [
                ...staffPriceData,
                {
                  subscriptionType: selectedPriceCategory,
                  workTitle: selectedStaffCategory,
                  price: staffCount,
                },
              ];
              setStaffPriceData(updatedData);
              alert('Staff Prices Updated');
            }}
          >
            Update Staff Prices
          </button>
          <button
            type="button"
            className="view-button"
            onClick={() => setShowStaffPrices(true)}
          >
            View Staff Prices
          </button>
        </center>
      </form>
    </section>

    {showStaffPrices && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={() => setShowStaffPrices(false)}>
            &times;
          </button>
          <h2>Staff Prices</h2>
          <table className="staff-prices-table">
            <thead>
              <tr>
                <th>Subscription Type</th>
                <th>Work Title</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {staffPriceData.map((data, index) => (
                <tr key={index}>
                  <td>{data.subscriptionType}</td>
                  <td>{data.workTitle}</td>
                  <td>{data.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
)}



{/* Render Customised Caterers Menu Prices form if 'Customised Caterers Menu' is selected */}
{activeMenu === 'Customised Caterers Menu' && (
  <div className="containeres">
    <section className="groceries-shop-prices">
      <form className="groceries-forms">
        <h2>Customised Caterers Menu</h2>

        {/* Customised Caterers Menu Category selection */}
        <div className="form-group">
          <label for="category">Menu Category</label>
          <select id="category" name="category">
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>

        {/* Item Name input */}
        <div className="form-group">
          <label for="itemName">Item Name</label>
          <input type="text" id="itemName" name="itemName" />
        </div>

        {/* Quantity in Kgs */}
        <div className="form-group">
          <label for="quantity">Quantity (in Kgs)</label>
          <input type="number" id="quantity" name="quantity" />
        </div>

        {/* Number input for items */}
        <div className="form-group">
          <label for="number">Number</label>
          <input type="number" id="number" name="number" />
        </div>

        {/* Update Button */}
        <center>
          <button type="button" className="update-button" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" className="view-button" onClick={() => window.location.href = "/CaterersMenu"}>View</button>
        </center>
        {successMessage && <div className="success-message">Item has been successfully updated!</div>}
      </form>
    </section>
  </div>
)}


{/* Render Customised Chat Menu form if 'Customised Chat Menu' is selected */}
{activeMenu === 'Customised Chat Menu' && (
  <div className="containeres">
    <section className="groceries-shop-prices">
      <form className="groceries-forms">
        <h2>Customised Chat Menu</h2>

        {/* Customised Chat Menu selection */}
        <div className="form-group">
          <label htmlFor="category">Menu Category</label>
          <select id="category" name="category">
            <option value="category1">Select Day</option>
            <option value="breakfast">Breakfast</option>
            <option value="highTea">High Tea</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </div>

        {/* Customised Chat Menu selection */}
        <div className="form-group">
          <label htmlFor="subCategory">Select Category</label>
          <select id="subCategory" name="subCategory">
            <option value="chatBhandar">Chat Bhandar</option>
            <option value="sweetMela">Sweet Mela</option>
            <option value="spicyFiesta">Spicy Fiesta</option>
            <option value="soupyFair">Soupy Fair</option>
          </select>
        </div>

        {/* Item Name input */}
        <div className="form-group">
          <label htmlFor="itemName">Item Name</label>
          <input type="text" id="itemName" name="itemName" />
        </div>

        {/* Price input */}
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" />
        </div>

        {/* Update Button */}
        <center>
          <button type="button" className="update-button" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" className="view-button" onClick={() => window.location.href = "/CustomMenu"}>View</button>
        </center>
        {successMessage && <div className="success-message">Item has been successfully updated!</div>}
      </form>
    </section>
  </div>
)}


{/* Render Retail Shop Prices form if 'Customised Retail Shop' is selected */}
{activeMenu === 'Customised Retailshop' && (
  <div className="containeres">
    <section className="groceries-shop-prices">
      <form className="groceries-forms">
        <h2>Retail Shop Prices</h2>

       {/* Groceries Category Name input */}
        <div className="form-group">
          <label for="itemName">Item Name</label>
          <input type="text" id="itemName" name="itemName" />
        </div>

        {/* Quantity in Kgs */}
        <div className="form-group">
          <label for="quantity">Quantity (in Kgs)</label>
          <input type="number" id="quantity" name="quantity" />
        </div>

        {/* Number input for items */}
        <div className="form-group">
          <label for="number">Price Per Quantity</label>
          <input type="number" id="number" name="number" />
        </div>

        {/* Update Button */}
        <center>
          <button type="button" className="update-button" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" className="view-button" onClick={() => window.location.href = "/RetailShopMenu"}>View</button>
        </center>
        {successMessage && <div className="success-message">Item has been successfully updated!</div>}
     
      </form>
    </section>
  </div>
)}


{/* Render Groceries Shop Prices form if 'Customised Groceries' is selected */}
{activeMenu === 'Customised Groceries' && (
  <div className="containeres">
    <section className="groceries-shop-prices">
      <form className="groceries-forms">
        <h2>Groceries Shop Prices</h2>

        {/* Groceries Category selection */}
        <div className="form-group">
          <label for="category">Groceries Category</label>
          <select id="category" name="category">
            <option value="category1">Vegetables</option>
            <option value="category2">Green Leaf</option>
           
          </select>
        </div>

        {/* Item Name input */}
        <div className="form-group">
          <label for="itemName">Item Name</label>
          <input type="text" id="itemName" name="itemName" />
        </div>

        {/* Quantity in Kgs */}
        <div className="form-group">
          <label for="quantity">Quantity (in Kgs)</label>
          <input type="number" id="quantity" name="quantity" />
        </div>

        {/* Number input for items */}
        <div className="form-group">
          <label for="number">Price Per Quantity</label>
          <input type="number" id="number" name="number" />
        </div>

        {/* Update Button */}
        <center>
          <button type="button" className="update-button" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" className="view-button" onClick={() => window.location.href = "/GroceryMenu"}>View</button>
        </center>
        {successMessage && <div className="success-message">Item has been successfully updated!</div>}
     
      </form>
    </section>
  </div>
)}


{activeMenu === 'Tax' && (
  <div className="containeres">
    <section className="Tax">
      <form className="taxes-forms">
        <h2>Taxes</h2>
        <div className="form-group">
          <label htmlFor="gst">GST</label>
          <input type="text" id="gst" name="gst" value="0.00" />
        </div>
        <div className="form-group">
          <label htmlFor="platformCharges">Platform Charges</label>
          <input type="text" id="platformCharges" name="platformCharges" value="0.00" />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryCharges">Delivery Charges</label>
          <input type="text" id="deliveryCharges" name="deliveryCharges" value="0.00" />
        </div>
        <div className="form-group">
          <label htmlFor="otherCharges">Other Charges</label>
          <input type="text" id="otherCharges" name="otherCharges" value="0.00" />
        </div>
        <center>
          <button type="button" className="update-button" onClick={() => {/* Update logic here */}}>Update</button>
        </center>
      </form>
    </section>
  </div>
)}

  {/* Dynamic Content Based on Active Menu */}
  <section className="dashboard-cards10">
    {activeMenu === 'Dashboard' && (
      <div className="cards10-container10">
        {/* Dashboard Cards */}
        <div className="card10">
          <FaTasks className="card10-icon" />
          <h2>0</h2>
          <p>Total Services Created</p>
        </div>
        <div className="card10">
          <FaCheckCircle className="card10-icon" />
          <h2>0</h2>
          <p>Successful Orders</p>
        </div>
        <div className="card10">
          <FaShoppingCart className="card10-icon" />
          <h2>0</h2>
          <p>Total Orders</p>
        </div>
        <div className="card10">
          <FaTimesCircle className="card10-icon" />
          <h2>0</h2>
          <p>Cancelled Orders</p>
        </div>
      </div>
    )}

    {activeMenu === 'Messages' && (
      <section className="messages-section">
        <h2>Messages</h2>
        <p>No new messages.</p>
      </section>
    )}




    {activeMenu === 'Password' && (
      <section className="password-section">
        <h2 className="text-left"> <center>Password Settings</center></h2>
        <form>
          <div className="form-group">
            <label htmlFor="oldPassword">Old Password</label>
            <div className="password-input-container">
              <input
                type={isOldPasswordVisible ? 'text' : 'password'} // Hidden by default, shows on click
                id="oldPassword"
                name="oldPassword"
                placeholder="Enter your old password"
                required
              />
              <span className="eye-icon" onClick={toggleOldPasswordVisibility}>
                {isOldPasswordVisible ? <FaEye /> : <FaEyeSlash />} {/* Eye icon changes based on visibility */}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <div className="password-input-container">
              <input
                type={isNewPasswordVisible ? 'text' : 'password'} // Hidden by default, shows on click
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                required
              />
              <span className="eye-icon" onClick={toggleNewPasswordVisibility}>
                {isNewPasswordVisible ? <FaEye /> : <FaEyeSlash />} {/* Eye icon changes based on visibility */}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="password-input-container">
              <input
                type={isConfirmPasswordVisible ? 'text' : 'password'} // Hidden by default, shows on click
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your new password"
                required
              />
              <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                {isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />} {/* Eye icon changes based on visibility */}
              </span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
      </section>
    )}


    {/* permissions Section */}
    {activeMenu === 'Permissions' && (
      <div className="permissions-container">
      <h2>Permissions</h2>
      <table className="permissions-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code Name</th>
            <th>Content Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission.id}>
              <td>{permission.name}</td>
              <td>{permission.codeName}</td>
              <td>{permission.contentType}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(permission.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(permission.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          &lt;
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
    )}

    {/* Manage Groups Section */}
    {activeMenu === 'Manage Groups' && (
      <div className="manage-groups-container">
        <h2>Manage Groups</h2>
        <button className="add-group-btn">ADD GROUP +</button>
        <table className="groups-table">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>User Count</th>
              <th>Perms Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Vendor', users: 6, perms: 0 },
              { name: 'Staff', users: 1, perms: 0 },
              { name: 'Delivery boy', users: 3, perms: 0 },
              { name: 'Customer', users: 0, perms: 0 },
            ].map((group, index) => (
              <tr key={index}>
                <td>{group.name}</td>
                <td>
                  <span className="user-count">
                    <i className="fas fa-users"></i> {group.users}
                  </span>
                </td>
                <td>
                  <span className="perms-count">
                    <i className="fas fa-lock"></i> {group.perms}
                  </span>
                </td>
                <td>
                  <button className="edit-btn">
                    <i className="fas fa-pen"></i>
                  </button>
                  <button className="delete-btn">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
</main>
</div>

  );

};

export default AdminDashboard;
