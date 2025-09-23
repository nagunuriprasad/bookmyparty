import React, { useState } from 'react';
import './assets/css/VendorDashboard.css';
import companyLogo from './assets/Bp-image.png';


import { FaEye, FaEyeSlash, FaHeart, FaCartPlus } from 'react-icons/fa'; // Eye icons

import EditUserProfile from './editprofile/edituserprofile'
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
} from 'react-icons/fa';

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar state
  const [activeMenu, setActiveMenu] = useState('Dashboard'); // Active menu state
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false); // Orders dropdown state
  
    const [isOldPasswordVisible, setOldPasswordVisible] = useState(false); // Initial state is 'false' for hidden
    const [isNewPasswordVisible, setNewPasswordVisible] = useState(false); // Initial state is 'false' for hidden
    const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // Initial state is 'false' for hidden
  
    const toggleOldPasswordVisibility = () => setOldPasswordVisible(!isOldPasswordVisible);
    const toggleNewPasswordVisibility = () => setNewPasswordVisible(!isNewPasswordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!isConfirmPasswordVisible);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    if (menu !== 'Orders') setOrdersDropdownOpen(false); // Close orders dropdown
    
  };

  const toggleOrdersDropdown = () => setOrdersDropdownOpen(!isOrdersDropdownOpen);


  return (
    <div className="dashboard-container10">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-logo">
          <img src={companyLogo} alt="Company Logo" className="logo-imgs" />
        </div>
        <nav className="sidebar-menu">
          <ul>
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
          <div className="user-info">
            {/* My Wishlist Icon with Inline CSS */}
                          <FaHeart style={{ fontSize: '24px', color: '#e74c3c', cursor: 'pointer', margin: '0 10px' }} />
            
                          {/* Add to Cart Icon with Inline CSS */}
                          <FaCartPlus style={{ fontSize: '24px', color: '#3498db', cursor: 'pointer', margin: '0 10px' }} />
            <FaBell className="icon-notifications" />
            <span className="username">User<h6>Vip</h6></span>
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

          {activeMenu === 'Customer Orders' && (
            <section className="orders-section">
              <h2 className="text-left">Customer Orders</h2>
              <p>No customer orders placed yet.</p>
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

            {activeMenu === 'Edit Profile' && (
             <section className="Edit Profile">
             <EditUserProfile />
            </section>
          )}

          
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
