import React, { useState } from 'react';
import './assets/css/StaffDashboard.css';
import companyLogo from './assets/Bp-image.png';
import VendorWallet from './VendorWallet'; // Import VendorWallet component
import { FaEye, FaEyeSlash, FaHeart, FaCartPlus } from 'react-icons/fa'; // Eye icons
import WorkLogin from './WorkLogin'; // Create this component if not already created
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

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
import EditStaffProfile from './editprofile/editstaffprofile';

const Dashboard = () => {
  // Define the flipped state for the identity card
  const [isFlipped, setIsFlipped] = useState(false);

  // Toggle flip state for the identity card
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Staff and company details
  const staff = {
    name: 'Dhiraj M',
    id: '3PG20CS015',
    role: 'Event Architect',
    phone: '+91-7019400565',
    picture: 'https://via.placeholder.com/150',
    bloodGroup: 'A+',
  };

  const company = {
    name: 'BookMyPartys',
    website: 'bookmypartys.com/',
    address: 'Srinagar colony, Hyderabad-500073',
    contact: '+91 8555973013',
  };

  // Generate QR Code URL
  const qrCodeValue = `${staff.name} : ${staff.phone}`;
  const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeValue)}&size=120x120&color=007bff`;

  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [activeMenu, setActiveMenu] = useState('Dashboard'); // Active menu state
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false); // Orders dropdown state
  const [orders, setOrders] = useState([
    { id: "003", description: "Corporate Event", status: "Pending" },
    { id: "004", description: "Anniversary Celebration", status: "Pending" },
  ]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false); // Initial state is 'false' for hidden
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false); // Initial state is 'false' for hidden
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Initial state is 'false' for hidden
  const [isIdentityCardVisible, setIsIdentityCardVisible] = useState(false); // State for identity card visibility

  const toggleOldPasswordVisibility = () => setOldPasswordVisible(!isOldPasswordVisible);
  const toggleNewPasswordVisibility = () => setNewPasswordVisible(!isNewPasswordVisible);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!isConfirmPasswordVisible);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu !== 'Orders') setOrdersDropdownOpen(false); // Close orders dropdown
  };

  const toggleOrdersDropdown = () => setOrdersDropdownOpen(!isOrdersDropdownOpen);

  // Function to handle identity card visibility toggle
  const handleIdentityCardClick = () => {
    setIsIdentityCardVisible(!isIdentityCardVisible); // Toggle visibility of the identity card
  };

  // Function to handle order actions (Accept or Deny)
  const handleOrderAction = (orderId, action) => {
    if (action === "Accept") {
      // Handle accepting the order (e.g., update the order status)
      console.log(`Order ${orderId} accepted.`);
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: "Accepted" } : order
      ));
    } else if (action === "Deny") {
      // Handle denying the order (e.g., update the order status)
      console.log(`Order ${orderId} denied.`);
      setOrders(orders.filter(order => order.id !== orderId)); // Remove the denied order
    }
  };

  return (
    <div className="dashboard-container10">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-logo">
          <img src={companyLogo} alt="Company Logo" className="logo-imgs" />
        </div>
        <nav className="sidebar-menu">
          <ul>
          <li onClick={() => handleMenuClick('Work Login')}>
              <i className="fas fa-sign-in-alt"></i>
              <span>{isOpen && 'Work Login'}</span>
            </li>
            <li onClick={() => handleMenuClick('Dashboard')}>
              <i className="fas fa-tachometer-alt"></i>
              <span>{isOpen && 'Dashboard'}</span>
            </li>
            <li onClick={() => handleMenuClick('Messages')}>
              <FaEnvelope />
              <span>{isOpen && 'Messages'}</span>
            </li>
            <li onClick={() => handleMenuClick('Wallet')}>
              <i className="fas fa-wallet"></i>
              <span>{isOpen && 'Wallet'}</span>
            </li>
            <li onClick={() => handleMenuClick('Password')}>
              <FaLock />
              <span>{isOpen && 'Password'}</span>
            </li>

            {/* Orders Dropdown */}
            <li onClick={toggleOrdersDropdown} className="orders-dropdown">
              <FaShoppingCart />
              <span>{isOpen && 'Orders'}</span>
              {isOpen && (
                <i
                  className={`fas ${
                    isOrdersDropdownOpen ? 'fa-chevron-down' : 'fa-chevron-right'
                  }`}
                ></i>
              )}
            </li>
            {isOrdersDropdownOpen && isOpen && (
              <ul className="orders-submenu">
                <li onClick={() => handleMenuClick('Staff Orders')}>Self Orders</li>
                
              </ul>
            )}

            <li onClick={() => handleMenuClick('Contact Admin')}>
              <FaUser />
              <span>{isOpen && 'Contact Admin'}</span>
            </li>
            <li onClick={() => handleMenuClick('Loans')}>
              <FaUniversity />
              <span>{isOpen && 'Loans'}</span>
            </li>

            

            <li onClick={() => handleMenuClick('Subscriptions')}>
              <FaTags />
              <span>{isOpen && 'Subscriptions'}</span>
            </li>
            <li onClick={() => handleMenuClick('Edit Profile')}>
              <FaUserEdit />
              <span>{isOpen && 'Edit Profile'}</span>
            </li>
            <li onClick={() => handleMenuClick('Logout')}>
              <FaSignOutAlt />
              <span>{isOpen && 'Logout'}</span>
            </li>
            <li onClick={() => handleMenuClick('Delete Account')}>
              <FaTrashAlt />
              <span>{isOpen && 'Delete My Account'}</span>
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

          <div className="user-info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
  
  {/* Go Online / Go Offline Toggle Button */}
  <label className="online-toggle" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginRight: '20px' }}>
    <div
      style={{
        width: '50px',
        height: '25px',
        backgroundColor: '#ccc',
        borderRadius: '25px',
        position: 'relative',
        transition: 'background-color 0.3s',
      }}
    >
      <input
        type="checkbox"
        id="online-toggle"
        style={{
          opacity: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          cursor: 'pointer',
        }}
        onChange={(e) => {
          const toggleLabel = document.getElementById('toggle-label');
          if (e.target.checked) {
            toggleLabel.innerText = 'Online';
            toggleLabel.style.backgroundColor = '#2ecc71'; // Green color for Online
          } else {
            toggleLabel.innerText = 'Go Online';
            toggleLabel.style.backgroundColor = '#ccc'; // Gray color for Offline
          }
        }}
      />
      <span
        id="toggle-label"
        style={{
          position: 'absolute',
          top: '50%',
          left: '4px',
          transform: 'translateY(-50%)',
          width: '40px',
          height: '20px',
          borderRadius: '20px',
          backgroundColor: '#ccc',
          color: '#fff',
          textAlign: 'center',
          lineHeight: '20px',
          fontSize: '12px',
          fontWeight: 'bold',
          transition: 'left 0.3s, background-color 0.3s',
        }}
      >
        Go Online
      </span>
    </div>
  </label>

  {/* My Wishlist Icon with Inline CSS */}
  <FaHeart style={{ fontSize: '24px', color: '#e74c3c', cursor: 'pointer', margin: '0 10px' }} />

  {/* Add to Cart Icon with Inline CSS */}
  <FaCartPlus style={{ fontSize: '24px', color: '#3498db', cursor: 'pointer', margin: '0 10px' }} />

  {/* Notifications Icon with Inline CSS */}
  <FaBell className="icon-notifications" style={{ fontSize: '24px', color: '#f39c12', cursor: 'pointer', margin: '0 10px' }} />

  {/* Delivery Boy Info */}
  <span className="username" style={{ marginRight: '10px' }}>
    Staff Name
    <h6>Super Chef</h6>
    <h6>My ID : 3PG20</h6>
  </span>
</div>

          
        </header>
       

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

          {activeMenu === 'Wallet' && (
            <section className="wallet-section">
              <VendorWallet />
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
                          <span
                            className="eye-icon"
                            onClick={toggleOldPasswordVisibility}
                          >
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
                          <span
                            className="eye-icon"
                            onClick={toggleNewPasswordVisibility}
                          >
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
                          <span
                            className="eye-icon"
                            onClick={toggleConfirmPasswordVisibility}
                          >
                            {isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />} {/* Eye icon changes based on visibility */}
                          </span>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">Change Password</button>
                    </form>
                  </section>
                )}

          {/* Conditionally render different types of orders */}
          {activeMenu === 'Event Orders' && (
            <section className="orders-section">
              <h2 className="text-left">Event Orders</h2>
              <p>No event orders placed yet.</p>
            </section>
          )}

          {activeMenu === 'Shop Orders' && (
            <section className="orders-section">
              <h2 className="text-left">Shop Orders</h2>
              <p>No shop orders placed yet.</p>
            </section>
          )}

          {activeMenu === 'Travel Orders' && (
            <section className="orders-section">
              <h2 className="text-left">Travel Orders</h2>
              <p>No travel orders placed yet.</p>
            </section>
          )}

          {activeMenu === 'Insta Food Orders' && (
            <section className="orders-section">
              <h2 className="text-left">Insta Food Orders</h2>
              <p>No Insta Food orders placed yet.</p>
            </section>
          )}

          {activeMenu === 'Staying Hotels Orders' && (
            <section className="orders-section">
              <h2>Staying Hotels Orders</h2>
              <p>No staying hotels orders placed yet.</p>
            </section>
          )}

          {activeMenu === 'Staff Orders' && (
            <section className="orders-section">
              <h2 className="text-left">Staff Orders</h2>
              <p>No staff orders placed yet.</p>
            </section>
          )}

{activeMenu === 'Work Login' && (
  <section className="work-dashboard text-center py-12 px-6 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen relative">
    {/* Button for Identity Card at the top-right corner */}
      <button
        onClick={handleIdentityCardClick}
        className="identity-card-btn"
      >
        <img
          src={staff.picture}
          alt="Staff profile picture"
          className="identity-card-img"
        />
      </button>




    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 drop-shadow-md">
      🚀 Staff Work Overview
    </h1>

   {/* Identity Card Modal */}
{isIdentityCardVisible && (
  <div className="fixed top-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 z-50 p-4">
    {/* Identity Card Content */}
    <div
      style={{
        width: '400px',
        height: '550px',
        borderRadius: '15px',
        backgroundColor: '#fff', // Keeps only the card visible
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        border: '2px solid #007bff',
        position: 'fixed', // Keeps the card fixed in the viewport
        top: '50px', // Offset from top
        right: '0', // Fix the card to the right side of the screen
        marginTop: '50px', // Adds margin on top for spacing
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        cursor: 'pointer',
      }}
      
      
      
      onClick={handleCardClick}
    >
      {/* Front Side */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(0deg)',
        }}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-4">
          <h2 className="m-0">BookMyPartys</h2>
          <p className="mt-1 text-sm">
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {company.website}
            </a>
          </p>
        </div>

        {/* Staff Picture */}
        <div className="flex justify-center py-4">
          <img
            src={staff.picture}
            alt={`${staff.name}'s picture`}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-600"
          />
        </div>

        {/* Staff Details */}
        <div className="text-center px-4">
          <h3 className="text-blue-600 font-semibold">{staff.name}</h3>
          <p className="text-gray-700 text-sm">
            ID: <strong>{staff.id}</strong>
          </p>
          <p className="text-gray-700 text-sm">
            Role: <strong>{staff.role}</strong>
          </p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mt-4">
          <img
            src={qrCodeURL}
            alt="QR Code"
            className="border-2 border-blue-600 p-2 rounded-lg"
          />
        </div>
      </div>

      {/* Back Side */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          backgroundColor: '#fff',
          transform: 'rotateY(180deg)',
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Company Header */}
        <div className="bg-blue-600 text-white text-center py-4 rounded-t-lg">
          <h2 className="m-0">BookMyPartys</h2>
          <p className="mt-1 text-sm">
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {company.website}
            </a>
          </p>
        </div>

        {/* Staff Details */}
        <div className="text-center mt-4">
          <h3 className="text-blue-600 font-semibold">{staff.name}</h3>
          <p className="text-gray-700 text-sm">
            ID: <strong>{staff.id}</strong>
          </p>
          <p className="text-gray-700 text-sm">
            Role: <strong>{staff.role}</strong>
          </p>
          <p className="text-gray-700 text-sm">
            Blood Group: <strong>{staff.bloodGroup}</strong>
          </p>
          <p className="text-gray-700 text-sm">
            Phone: <strong>{staff.phone}</strong>
          </p>
        </div>

        {/* Divider */}
        <hr className="my-4 border-blue-400" />

        {/* Company Details */}
        <div className="text-center">
          <h4 className="text-blue-600 font-semibold">Company Info</h4>
          <p className="text-gray-700 text-sm">
            Address: <strong>{company.address}</strong>
          </p>
          <p className="text-gray-700 text-sm">
            Contact: <strong>{company.contact}</strong>
          </p>
          <p className="text-gray-700 text-sm">
            Website:{' '}
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {company.website}
            </a>
          </p>
        </div>
      </div>
    </div>

   
  </div>
)}


    <div className="dashboard-content flex flex-wrap justify-between gap-8 max-w-7xl mx-auto">
      {/* Existing work boxes */}
      <div className="work-box login-logout-box">
        <h3 className="work-box-title">🔐 Login & Logout</h3>
        <p className="text-gray-600 text-lg">Last Login: <span className="font-semibold text-green-600">9:00 AM</span></p>
        <p className="text-gray-600 text-lg">Last Logout: <span className="font-semibold text-red-600">6:00 PM</span></p>
      </div>
      <div className="work-box attendance-box">
        <h3 className="work-box-title">📅 Attendance</h3>
        <p className="text-gray-600 text-lg">Total Days Present: <span className="font-semibold text-green-600">22</span></p>
        <p className="text-gray-600 text-lg">Total Absences: <span className="font-semibold text-red-600">3</span></p>
      </div>
      <div className="work-box order-summary-box">
        <h3 className="work-box-title">📦 Order Summary</h3>
        <p className="text-gray-600 text-lg">Completed Orders: <span className="font-semibold text-blue-600">15</span></p>
        <p className="text-gray-600 text-lg">Total Earnings: <span className="font-semibold text-green-600">$1,250</span></p>
      </div>
      <div className="work-box upcoming-orders-box">
        <h3 className="work-box-title">🛒 Upcoming Orders</h3>
        {orders.length > 0 ? (
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="bg-gray-50 p-4 rounded-lg mb-4 border-l-4 border-blue-500 shadow-md">
                <p className="text-gray-800 font-semibold">{order.description}</p>
                <div className="flex justify-between mt-3">
                  <button onClick={() => handleOrderAction(order.id, "Accept")} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition shadow-md">✅ Accept</button>
                  <button onClick={() => handleOrderAction(order.id, "Deny")} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md">❌ Deny</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-lg">No upcoming orders.</p>
        )}
      </div>
      <div className="work-box order-history-box">
        <h3 className="work-box-title">📜 Order History</h3>
        {orderHistory.length > 0 ? (
          <ul>
            {orderHistory.map((order, index) => (
              <li key={index} className="bg-green-50 p-4 rounded-lg mb-4 border-l-4 border-green-500 shadow-md">
                <p className="text-gray-800 font-semibold">{order.description}</p>
                <p className="text-gray-500 text-md">Status: <span className="font-semibold text-blue-700">{order.status}</span></p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-lg">No orders accepted yet.</p>
        )}
      </div>
    </div>
  </section>
)}






          {activeMenu === 'Contact Admin' && (
            <section className="contact-admin-section">
              <h2 className="text-left">Contact Admin</h2>
              <p>Reach out to the admin for support.</p>
            </section>
          )}

          {activeMenu === 'Loans' && (
            <section className="loans-section">
              <h2 className="text-left">Loans</h2>
              <p>View your loan options here.</p>
            </section>
          )}

          {activeMenu === 'Market Events' && (
            <section className="market-events-section">
              <h2 className="text-left">Market Events</h2>
              <p>View the upcoming events in the market.</p>
            </section>
          )}

          {activeMenu === 'Edit Profile' && (
             <section className="Edit Profile">
             <EditStaffProfile />
            </section>
          )}





        </section>
      </main>
    </div>
  );
};

export default Dashboard;
