import React, { useState } from "react";
import companyLogo from "./assets/Bp-image.png";
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
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
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
            {isOpen && <h1>{activeMenu}</h1>}
          </div>

          <div className="user-info">
            <FaHeart style={{ fontSize: "20px", color: "#e74c3c", cursor: "pointer", margin: "0 10px" }} />
            <FaCartPlus style={{ fontSize: "20px", color: "#3498db", cursor: "pointer", margin: "0 10px" }} />
            <FaBell className="icon-notifications" />
            <span className="username">
              RAM <h6>Admin</h6>
            </span>
          </div>
        </header>

        {/* Dynamic Content */}
        <section className="dashboard-content">
          {activeMenu === "Dashboard" && <h2>Welcome to Admin Dashboard</h2>}
          {activeMenu === "Messages" && <h2>Messages Section</h2>}
          {activeMenu === "Wallet" && <h2>Wallet Section</h2>}
          {activeMenu === "Password" && <h2>Change Password Section</h2>}
          {activeMenu === "Self Orders" && <h2>Self Orders Section</h2>}
          {activeMenu === "Customer Orders" && <h2>Customer Orders Section</h2>}
          {activeMenu === "Contact Admin" && <h2>Contact Admin Section</h2>}
          {activeMenu === "Loans" && <h2>Loans Section</h2>}
          {activeMenu === "Upcoming Events" && <h2>Upcoming Events Section</h2>}
          {activeMenu === "Past Events" && <h2>Past Events Section</h2>}
          {activeMenu === "Create Event" && <h2>Create Event Section</h2>}
          {activeMenu === "Subscriptions" && <h2>Subscriptions Section</h2>}
          {activeMenu === "Edit Profile" && <h2>Edit Profile Section</h2>}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
