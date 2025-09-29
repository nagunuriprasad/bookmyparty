import React, { useState } from "react";
import companyLogo from "./assets/Bp-image.png";
import { Link } from "react-router-dom";

import {
  FaTachometerAlt,
  FaCommentAlt,
  FaWallet,
  FaLock,
  FaShoppingCart,
  FaChevronRight,
  FaChevronDown,
  FaUserShield,
  FaMoneyBillWave,
  FaStore,
  FaClipboardList,
  FaUserEdit,
  FaHeart,
  FaCartPlus,
  FaBell,
  FaCalendarAlt,
  FaSignOutAlt,
  FaTrashAlt,
  FaTasks,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // For dropdowns

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    setOpenDropdown(null);
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // Handlers for Logout & Delete
  const handleLogout = () => {
    alert("You have been logged out securely.");
    // TODO: clear tokens, redirect to login page
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      alert("Account deleted successfully.");
      // TODO: call delete API, clear user data, redirect to signup page
    }
  };

  return (
    <div className="dashboard-container10">
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="sidebar-logo">
          <img src={companyLogo} alt="Company Logo" className="logo-imgs" />
          {isOpen && <h2>Admin Panel</h2>}
        </div>

        <nav className="sidebar-menu" style={{ overflowY: "auto", maxHeight: "100vh" }}>
          <ul>
            {/* Dashboard */}
            <li
              className={activeMenu === "Dashboard" ? "active" : ""}
              onClick={() => handleMenuClick("Dashboard")}
            >
              <FaTachometerAlt />
              {isOpen && <span>Dashboard</span>}
            </li>

            {/* Messages */}
            <li
              className={activeMenu === "Messages" ? "active" : ""}
              onClick={() => handleMenuClick("Messages")}
            >
              <FaCommentAlt />
              {isOpen && <span>Messages</span>}
            </li>

            {/* Wallet */}
            <li
              className={activeMenu === "Wallet" ? "active" : ""}
              onClick={() => handleMenuClick("Wallet")}
            >
              <FaWallet />
              {isOpen && <span>Wallet</span>}
            </li>

            {/* Password */}
            <li
              className={activeMenu === "Password" ? "active" : ""}
              onClick={() => handleMenuClick("Password")}
            >
              <FaLock />
              {isOpen && <span>Password</span>}
            </li>

            {/* Orders Dropdown */}
            <li className="dropdown" onClick={() => toggleDropdown("Orders")}>
              <FaShoppingCart />
              {isOpen && <span>Orders</span>}
              {isOpen &&
                (openDropdown === "Orders" ? (
                  <FaChevronDown style={{ marginLeft: "auto" }} />
                ) : (
                  <FaChevronRight style={{ marginLeft: "auto" }} />
                ))}
            </li>
            {openDropdown === "Orders" && isOpen && (
              <ul className="submenu">
                <li
                  className={activeMenu === "Self Orders" ? "active" : ""}
                  onClick={() => handleMenuClick("Self Orders")}
                >
                  Self Orders
                </li>
                <li
                  className={activeMenu === "Customer Orders" ? "active" : ""}
                  onClick={() => handleMenuClick("Customer Orders")}
                >
                  Customer Orders
                </li>
              </ul>
            )}

            {/* Contact Admin */}
            <li
              className={activeMenu === "Contact Admin" ? "active" : ""}
              onClick={() => handleMenuClick("Contact Admin")}
            >
              <FaUserShield />
              {isOpen && <span>Contact Admin</span>}
            </li>

            {/* Loans */}
            <li
              className={activeMenu === "Loans" ? "active" : ""}
              onClick={() => handleMenuClick("Loans")}
            >
              <FaMoneyBillWave />
              {isOpen && <span>Loans</span>}
            </li>

            {/* Market Place Dropdown with Events only */}
            <li className="dropdown" onClick={() => toggleDropdown("Market Place")}>
              <FaStore />
              {isOpen && <span>Market Place</span>}
              {isOpen &&
                (openDropdown === "Market Place" ? (
                  <FaChevronDown style={{ marginLeft: "auto" }} />
                ) : (
                  <FaChevronRight style={{ marginLeft: "auto" }} />
                ))}
            </li>
            {openDropdown === "Market Place" && isOpen && (
              <ul className="submenu">
                <li
                  className={activeMenu === "Upcoming Events" ? "active" : ""}
                  onClick={() => handleMenuClick("Upcoming Events")}
                >
                  <FaCalendarAlt /> Upcoming Events
                </li>
                <li
                  className={activeMenu === "Past Events" ? "active" : ""}
                  onClick={() => handleMenuClick("Past Events")}
                >
                  <FaCalendarAlt /> Past Events
                </li>
                <li
                  className={activeMenu === "Create Event" ? "active" : ""}
                  onClick={() => handleMenuClick("Create Event")}
                >
                  <FaCalendarAlt /> Create Event
                </li>
              </ul>
            )}

            {/* Subscriptions */}
            <li
              className={activeMenu === "Subscriptions" ? "active" : ""}
              onClick={() => handleMenuClick("Subscriptions")}
            >
              <FaClipboardList />
              {isOpen && <span>Subscriptions</span>}
            </li>

            {/* Edit Profile */}
            <li
              className={activeMenu === "Edit Profile" ? "active" : ""}
              onClick={() => handleMenuClick("Edit Profile")}
            >
              <FaUserEdit />
              {isOpen && <span>Edit Profile</span>}
            </li>

            {/* Logout */}
            <li onClick={handleLogout}>
              <FaSignOutAlt />
              {isOpen && <span>Logout</span>}
            </li>

            {/* Delete My Account */}
            <li onClick={handleDeleteAccount}>
              <FaTrashAlt style={{ color: "red" }} />
              {isOpen && <span style={{ color: "red" }}>Delete My Account</span>}
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="nav-control" onClick={toggleMenu}>
            <div className="hamburger">
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </div>
            {isOpen && <h1 style={{ color: "white" }}>{activeMenu}</h1>}
          </div>

          <div className="user-info">
            <FaHeart
              style={{ fontSize: "20px", color: "#e74c3c", cursor: "pointer", margin: "0 10px" }}
            />
            <FaCartPlus
              style={{ fontSize: "20px", color: "#3498db", cursor: "pointer", margin: "0 10px" }}
            />
            <FaBell className="icon-notifications" />
            <span className="username">
              RAM <h6>Admin</h6>
            </span>
          </div>
        </header>

        {/* Dynamic Content */}
        <section className="dashboard-cards10">
          {activeMenu === "Dashboard" && (
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

          {activeMenu === "Messages" && (
            <div className="content-box">
              <h2>Messages Section</h2>
            </div>
          )}

          {activeMenu === "Wallet" && (
            <div className="content-box">
              <h2>Wallet Section</h2>
            </div>
          )}

          {activeMenu === "Password" && (
            <div className="content-box">
              <h2>Change Password Section</h2>
            </div>
          )}

          {activeMenu === "Self Orders" && (
            <div className="content-box">
              <h2>Self Orders Section</h2>
            </div>
          )}

          {activeMenu === "Customer Orders" && (
            <div className="content-box">
              <h2>Customer Orders Section</h2>
            </div>
          )}

          {activeMenu === "Contact Admin" && (
            <div className="content-box">
              <h2>Contact Admin Section</h2>
            </div>
          )}

          {activeMenu === "Loans" && (
            <div className="content-box">
              <h2>Loans Section</h2>
            </div>
          )}

          {activeMenu === "Upcoming Events" && (
            <div className="content-box">
              <h2>Upcoming Events Section</h2>
            </div>
          )}

          {activeMenu === "Past Events" && (
            <div className="content-box">
              <h2>Past Events Section</h2>
            </div>
          )}

          {activeMenu === "Create Event" && (
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
          

          {activeMenu === "Subscriptions" && (
            <div className="content-box">
              <h2>Subscriptions Section</h2>
            </div>
          )}

          {activeMenu === "Edit Profile" && (
            <div className="content-box">
              <h2>Edit Profile Section</h2>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
