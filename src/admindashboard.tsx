import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { fetchDashboardData } from "./slices/adminSlice";
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
  FaClipboardList,
  FaUserEdit,
  FaBell,
  FaCalendarAlt,
  FaHeart
} from "react-icons/fa";

const AdminDashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const { stats, loading, error } = useSelector((state: RootState) => state.admin);

  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    setOpenDropdown(null);
  };
  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const sidebarItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "User Management", icon: <FaUserShield /> },
    { name: "Manage Groups", icon: <FaClipboardList /> },
    { name: "Permissions", icon: <FaLock /> },
    { name: "Messages", icon: <FaCommentAlt /> },
    { name: "Wallet", icon: <FaWallet /> },
    { name: "Price Manager", icon: <FaMoneyBillWave /> },
    { name: "Work Login", icon: <FaClipboardList /> },
    { name: "Inbox", icon: <FaCommentAlt /> },
    { 
      name: "Orders", icon: <FaShoppingCart />, submenu: [
        "Staff Orders",
        "Customer Orders",
        "Vendor Orders",
        "DeliveryBoy Orders"
      ] 
    },
    { name: "Calendar", icon: <FaCalendarAlt /> },
    { name: "Notes", icon: <FaClipboardList /> },
    { name: "Delivery", icon: <FaShoppingCart /> },
    { name: "Bookmarks", icon: <FaHeart /> },
    { name: "Subscriptions", icon: <FaClipboardList /> },
  ];

  return (
    <div className="dashboard-container10">
      <aside className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <div className="sidebar-logo">
          <img src={companyLogo} alt="Company Logo" className="logo-imgs" />
          {isOpen && <h2>Admin Panel</h2>}
        </div>
        <nav className="sidebar-menu" style={{ overflowY: "auto", maxHeight: "100vh" }}>
          <ul>
            {sidebarItems.map((item) => (
              <React.Fragment key={item.name}>
                <li
                  className={activeMenu === item.name ? "active" : ""}
                  onClick={() => item.submenu ? toggleDropdown(item.name) : handleMenuClick(item.name)}
                >
                  {item.icon}
                  {isOpen && <span>{item.name}</span>}
                  {item.submenu && isOpen && (openDropdown === item.name ? <FaChevronDown style={{ marginLeft: "auto" }} /> : <FaChevronRight style={{ marginLeft: "auto" }} />)}
                </li>
                {item.submenu && openDropdown === item.name && isOpen && (
                  <ul className="submenu">
                    {item.submenu.map((sub) => (
                      <li key={sub} className={activeMenu === sub ? "active" : ""} onClick={() => handleMenuClick(sub)}>
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}

            {/* Logout */}
            <li onClick={handleLogout}>
              <FaUserEdit />
              {isOpen && <span>Logout</span>}
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
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
            <FaBell className="icon-notifications" />
            <span className="username">RAM <h6>Admin</h6></span>
          </div>
        </header>

        <section className="dashboard-cards10">
          {activeMenu === "Dashboard" && (
            <div className="cards10-container10">
              {loading ? <p>Loading...</p> : error ? <p style={{ color: "red" }}>{error}</p> : (
                <>
                  <div className="card10"><h2>{stats.totalUsers}</h2><p>Total Users</p></div>
                  <div className="card10"><h2>{stats.totalOrders}</h2><p>Total Orders</p></div>
                  <div className="card10"><h2>{stats.totalGroups}</h2><p>Total Groups</p></div>
                  <div className="card10"><h2>{stats.totalPermissions}</h2><p>Total Permissions</p></div>
                </>
              )}
            </div>
          )}
          {activeMenu !== "Dashboard" && <div className="content-box"><h2>{activeMenu} Section</h2></div>}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
