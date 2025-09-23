import React, { useState } from 'react';
import './assets/css/VendorDashboard.css';
import companyLogo from './assets/Bp-image.png';
import VendorWallet from './VendorWallet'; // Import VendorWallet component
import { FaEye, FaEyeSlash, FaHeart, FaCartPlus } from 'react-icons/fa'; // Eye icons
import WorkLogin from './WorkLogin'; // Create this component if not already created
import EditDeliveryProfile from './editprofile/editdeliveryprofile'

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
import DeliveryForm from './DeliveryForm';

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
    Delivery Boy name
    <h6>2 Wheeler</h6>
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
  <div className="container" style={{
    width: '90%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f7fb',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }}>
    <section className="delivery-boy-dashboard" style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>Delivery Boy Working Info</h2>

      <div className="dashboard-content" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'space-between',
      }}>
        
        {/* Assigned Deliveries Section */}
        <div className="box assigned-deliveries" style={{
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          flex: '1',
          minWidth: '280px',
          maxWidth: '31%',
        }}>
          <h3 style={{ fontSize: '1.5rem', color: '#2a3d66', marginBottom: '10px' }}>Assigned Deliveries</h3>
          <ul style={{ width: '100%' }}>
            <li style={{ fontSize: '1rem', color: '#666', padding: '8px 0' }}>Delivery 1: Completed</li>
            <li style={{ fontSize: '1rem', color: '#666', padding: '8px 0' }}>Delivery 2: On the Way</li>
            <li style={{ fontSize: '1rem', color: '#666', padding: '8px 0' }}>Delivery 3: Pending</li>
          </ul>
        </div>

        {/* Earnings Section */}
        <div className="box earnings" style={{
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          flex: '1',
          minWidth: '280px',
          maxWidth: '31%',
        }}>
          <h3 style={{ fontSize: '1.5rem', color: '#2a3d66', marginBottom: '10px' }}>Earnings</h3>
          <p style={{ fontSize: '1rem', color: '#666' }}>Today's Earnings: $50</p>
          <p style={{ fontSize: '1rem', color: '#666' }}>Weekly Earnings: $350</p>
          <p style={{ fontSize: '1rem', color: '#666' }}>Monthly Earnings: $1400</p>
        </div>

        {/* Shift Information */}
        <div className="box shift-info" style={{
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          flex: '1',
          minWidth: '280px',
          maxWidth: '31%',
        }}>
          <h3 style={{ fontSize: '1.5rem', color: '#2a3d66', marginBottom: '10px' }}>Shift Information</h3>
          <p style={{ fontSize: '1rem', color: '#666' }}>Shift Start: 8:00 AM</p>
          <p style={{ fontSize: '1rem', color: '#666' }}>Shift End: 5:00 PM</p>
          <p style={{ fontSize: '1rem', color: '#666' }}>Break Time: 1 Hour</p>
        </div>

        {/* Completed Deliveries */}
        <div className="box completed-deliveries" style={{
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          flex: '1',
          minWidth: '280px',
          maxWidth: '31%',
        }}>
          <h3 style={{ fontSize: '1.5rem', color: '#2a3d66', marginBottom: '10px' }}>Completed Deliveries</h3>
          <p style={{ fontSize: '1rem', color: '#666' }}>Total Deliveries: 50</p>
          <p style={{ fontSize: '1rem', color: '#666' }}>Feedback: 4.8/5</p>
        </div>

        {/* Notifications Section */}
        <div className="box notifications" style={{
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          flex: '1',
          minWidth: '280px',
          maxWidth: '31%',
        }}>
          <h3 style={{ fontSize: '1.5rem', color: '#2a3d66', marginBottom: '10px' }}>Notifications</h3>
          <ul>
            <li style={{ fontSize: '1rem', color: '#666', padding: '8px 0' }}>New Task Assigned</li>
            <li style={{ fontSize: '1rem', color: '#666', padding: '8px 0' }}>Urgent: Delivery Delayed</li>
            <li style={{ fontSize: '1rem', color: '#666', padding: '8px 0' }}>Meeting at 3 PM</li>
          </ul>
        </div>

        {/* Feedback Section */}
        <div className="box feedback" style={{
          backgroundColor: '#fff',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          flex: '1',
          minWidth: '280px',
          maxWidth: '31%',
        }}>
          <h3 style={{ fontSize: '1.5rem', color: '#2a3d66', marginBottom: '10px' }}>Submit Feedback</h3>
          <textarea style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} placeholder="Enter your feedback"></textarea>
          <button style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#00796b',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}>Submit</button>
        </div>
      </div>
    </section>
  </div>
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
             <EditDeliveryProfile />
            </section>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
