import React, { useState } from "react"; 
import "./assets/css/Navbar.css";
import { Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const getNavLinkClass = (path: string) => {
    return location.pathname === path
      ? "nav-link navbar-underline"
      : "nav-link";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavCollapse}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`navbar-collapse ${isNavCollapsed ? "collapse" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {/* Dropdown for All Categories */}
            <li className="nav-item">
              <Dropdown>
                <Dropdown.Toggle
                  className="nav-link"
                  id="navbarDropdown"
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-th-list"
                    style={{ fontSize: "22px", color: "#e84848" }}
                  ></i>
                  <span>All Categories</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown-menu">
                  {[
                    "Packages",
                    "Venues",
                    "Decors",
                    "Tents & Walls",
                    "Caterers",
                    "Lights & Sounds",
                    "Photographer",
                    "D.J",
                    "Entertainments",
                    "Band set",
                    "Bharaath setup & Team",
                    "Celebs & Models",
                    "Digital Screens",
                    "Digital D.J Vehicles",
                    "Tea & Coffee Specialists",
                    "Salad Stall",
                    "Juice Specialists",
                    "Veg Snack Specialists",
                    "Non Veg Snack Specialists",
                    "Roti Specialists",
                    "Butter Non & Kulcha Specialists",
                    "Chat Stall",
                    "Fruit Stall",
                    "Soup Specialists",
                    "South Indian Breakfast",
                    "Chinese Stall",
                    "Mongolian Stalls",
                    "Pizza’s & Burgers",
                    "Cool Cakes Stall",
                    "Sweet Stalls",
                    "Ice Cream Stalls",
                    "Pan Counters",
                    "Drinking Waters",
                    "Live Food Counters",
                    "LED Counters",
                    "Chocolate Counters",
                    "Smoke Projectors",
                    "Event Management Companies",
                    "Chef n Dish Rental",
                    "Event Display Specialists",
                    "Event Dress Rentals",
                    "Invitation Printers",
                    "Anchors",
                    "Pundits",
                    "Beauticians",
                    "Mahanadi Specialists",
                    "Cocktail Specialists",
                    "Liquor Bars",
                  ].map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      href={`/myparty?category=${item
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      <i
                        className="fa fa-circle"
                        style={{ color: "#e84848", fontSize: "10px" }}
                      ></i>{" "}
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </li>

            {/* Other Navigation Links */}
            {[
              { path: "/", icon: "fa-home", label: "Home" },
              { path: "/myparty", icon: "fa-birthday-cake", label: "My Party" },
              { path: "/studio", icon: "fa-crown", label: "Studio" },
              { path: "/shop", icon: "fa-shopping-cart", label: "Shop" },
              { path: "/staff", icon: "fa-users", label: "Staff" },
            ].map((navItem, index) => (
              <li className="nav-item" key={index}>
                <Link className={getNavLinkClass(navItem.path)} to={navItem.path}>
                  <i
                    className={`fa ${navItem.icon}`}
                    style={{ color: "#e84848", fontSize: "22px" }}
                  ></i>
                  <span>{navItem.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
