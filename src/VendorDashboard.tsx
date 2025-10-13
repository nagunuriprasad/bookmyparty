import React, { useState, useEffect } from "react";
import "./assets/css/VendorDashboard.css";
import companyLogo from "./assets/Bp-image.png";
import VendorWallet from "./VendorWallet";
import EditVendorProfile from "./editprofile/editvendorprofile";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaHeart,
  FaCartPlus,
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
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import {
  fetchVendors,
  fetchDashboard,
  updatePassword,
  clearMessages,
} from "./slices/vendorSlice";

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [isOrdersDropdownOpen, setOrdersDropdownOpen] = useState(false);
  const [isMarketDropdownOpen, setMarketDropdownOpen] = useState(false);

  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { vendors, dashboard, loading, error, message } = useSelector(
    (state: RootState) => state.vendor
  );

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    dispatch(fetchVendors());
    dispatch(fetchDashboard());
  }, [dispatch]);

  const toggleOldPasswordVisibility = () =>
    setOldPasswordVisible(!isOldPasswordVisible);
  const toggleNewPasswordVisibility = () =>
    setNewPasswordVisible(!isNewPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!isConfirmPasswordVisible);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    if (menu !== "Orders") setOrdersDropdownOpen(false);
    if (menu !== "Market Place") setMarketDropdownOpen(false);
    dispatch(clearMessages());
  };

  const toggleOrdersDropdown = () =>
    setOrdersDropdownOpen(!isOrdersDropdownOpen);

  const toggleMarketDropdown = () =>
    setMarketDropdownOpen(!isMarketDropdownOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and Confirm password do not match!");
      return;
    }
    dispatch(
      updatePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword,
      })
    );
  };

  return (
    <div className="dashboard-container10">
      {/* Sidebar */}
      <aside
        className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div className="sidebar-logo">
          <img src={companyLogo} alt="Company Logo" className="logo-imgs" />
        </div>
        <div className="sidebar-content">
          <nav className="sidebar-menu">
            <ul>
              <li onClick={() => handleMenuClick("Dashboard")}>
                <i className="fas fa-tachometer-alt"></i>
                <span>{isOpen && "Dashboard"}</span>
              </li>
              <li onClick={() => handleMenuClick("Messages")}>
                <FaEnvelope />
                <span>{isOpen && "Messages"}</span>
              </li>
              <li onClick={() => handleMenuClick("Wallet")}>
                <i className="fas fa-wallet"></i>
                <span>{isOpen && "Wallet"}</span>
              </li>
              <li onClick={() => handleMenuClick("Password")}>
                <FaLock />
                <span>{isOpen && "Password"}</span>
              </li>

              {/* Orders Dropdown */}
              <li onClick={toggleOrdersDropdown} className="orders-dropdown">
                <FaShoppingCart />
                <span>{isOpen && "Orders"}</span>
                {isOpen && (
                  <i
                    className={`fas ${
                      isOrdersDropdownOpen
                        ? "fa-chevron-down"
                        : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </li>
              {isOrdersDropdownOpen && isOpen && (
                <ul className="orders-submenu">
                  <li onClick={() => handleMenuClick("Staff Orders")}>
                    Self Orders
                  </li>
                  <li onClick={() => handleMenuClick("Customer Orders")}>
                    Customer Orders
                  </li>
                </ul>
              )}

              <li onClick={() => handleMenuClick("Contact Admin")}>
                <FaUser />
                <span>{isOpen && "Contact Admin"}</span>
              </li>
              <li onClick={() => handleMenuClick("Loans")}>
                <FaUniversity />
                <span>{isOpen && "Loans"}</span>
              </li>

              {/* Market Place Dropdown */}
              <li onClick={toggleMarketDropdown} className="market-dropdown">
                <FaStore />
                <span>{isOpen && "Market Place"}</span>
                {isOpen && (
                  <i
                    className={`fas ${
                      isMarketDropdownOpen
                        ? "fa-chevron-down"
                        : "fa-chevron-right"
                    }`}
                  ></i>
                )}
              </li>
              {isMarketDropdownOpen && isOpen && (
                <ul className="market-submenu">
                  <li onClick={() => handleMenuClick("Market Events")}>
                    Events
                  </li>
                </ul>
              )}

              <li onClick={() => handleMenuClick("Subscriptions")}>
                <FaTags />
                <span>{isOpen && "Subscriptions"}</span>
              </li>
              <li onClick={() => handleMenuClick("Edit Profile")}>
                <FaUserEdit />
                <span>{isOpen && "Edit Profile"}</span>
              </li>
              <li onClick={() => handleMenuClick("Logout")}>
                <FaSignOutAlt />
                <span>{isOpen && "Logout"}</span>
              </li>
              <li onClick={() => handleMenuClick("Delete Account")}>
                <FaTrashAlt />
                <span>{isOpen && "Delete My Account"}</span>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div
            className={`nav-control ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <div className="hamburger">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
            {isOpen && <h1 className="text-left">{activeMenu}</h1>}
          </div>
          <div className="user-info">
            <FaHeart
              style={{
                fontSize: "24px",
                color: "#e74c3c",
                cursor: "pointer",
                margin: "0 10px",
              }}
            />
            <FaCartPlus
              style={{
                fontSize: "24px",
                color: "#3498db",
                cursor: "pointer",
                margin: "0 10px",
              }}
            />
            <FaBell className="icon-notifications" />
            <span className="username">
              ramarao jallarap <h6>Vendor(Flower Shop)</h6>
              <h6>My ID : 3PG20</h6>
            </span>
          </div>
        </header>

        {/* Dynamic Content */}
        <section className="dashboard-cards10">
          {activeMenu === "Dashboard" && (
            <div className="cards10-container10">
              {loading ? (
                <p>Loading dashboard...</p>
              ) : (
                <>
                  <div className="card10">
                    <FaTasks className="card10-icon" />
                    <h2>{dashboard.totalServices || vendors.length}</h2>
                    <p>Total Services Created</p>
                  </div>
                  <div className="card10">
                    <FaCheckCircle className="card10-icon" />
                    <h2>{dashboard.successfulOrders}</h2>
                    <p>Successful Orders</p>
                  </div>
                  <div className="card10">
                    <FaShoppingCart className="card10-icon" />
                    <h2>{dashboard.totalOrders}</h2>
                    <p>Total Orders</p>
                  </div>
                  <div className="card10">
                    <FaTimesCircle className="card10-icon" />
                    <h2>{dashboard.cancelledOrders}</h2>
                    <p>Cancelled Orders</p>
                  </div>
                </>
              )}
            </div>
          )}

          {activeMenu === "Messages" && (
            <section className="messages-section">
              <h2>Messages</h2>
              <p>No new messages.</p>
            </section>
          )}

          {activeMenu === "Wallet" && (
            <section className="wallet-section">
              <VendorWallet />
            </section>
          )}

          {activeMenu === "Password" && (
            <section className="password-section">
              <h2 className="text-left">
                <center>Password Settings</center>
              </h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="form-group">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input
                    type={isOldPasswordVisible ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    value={passwordForm.oldPassword}
                    onChange={handleChange}
                    required
                  />
                  <span onClick={toggleOldPasswordVisibility}>
                    {isOldPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type={isNewPasswordVisible ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={passwordForm.newPassword}
                    onChange={handleChange}
                    required
                  />
                  <span onClick={toggleNewPasswordVisibility}>
                    {isNewPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span onClick={toggleConfirmPasswordVisibility}>
                    {isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Updating..." : "Change Password"}
                </button>

                {error && <p className="error-text">{error}</p>}
                {message && <p className="success-text">{message}</p>}
              </form>
            </section>
          )}

          {activeMenu === "Staff Orders" && (
            <section className="orders-section">
              <h2 className="text-left">Staff Orders</h2>
              <p>No staff orders placed yet.</p>
            </section>
          )}

          {activeMenu === "Customer Orders" && (
            <section className="orders-section">
              <h2 className="text-left">Customer Orders</h2>
              <p>No customer orders placed yet.</p>
            </section>
          )}

          {activeMenu === "Contact Admin" && (
            <section className="contact-admin-section">
              <h2 className="text-left">Contact Admin</h2>
              <p>Reach out to the admin for support.</p>
            </section>
          )}

          {activeMenu === "Loans" && (
            <section className="loans-section">
              <h2 className="text-left">Loans</h2>
              <p>View your loan options here.</p>
            </section>
          )}

          {activeMenu === "Market Events" && (
            <section className="exact-market-events-section">
              <h2 className="text-left exact-market-events-title">
                <center>Services</center>
              </h2>
              <p className="exact-market-events-description">
                Viewing the upcoming events in the market.
              </p>

              <div className="exact-market-events-grid">
                <div className="exact-market-event-add-card">
                  <Link to="/ServiceMenu">
                    <button className="exact-market-event-add-btn">+</button>
                  </Link>
                </div>
                <div className="exact-market-event-add-card1">
                  <center>
                    <button className="exact-market-event-edit-btn">Edit</button>
                  </center>
                  <center>
                    <button className="exact-market-event-update-btn">
                      Update
                    </button>
                  </center>
                </div>
              </div>
            </section>
          )}

          {activeMenu === "Edit Profile" && (
            <section className="Edit Profile">
              <EditVendorProfile />
            </section>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
