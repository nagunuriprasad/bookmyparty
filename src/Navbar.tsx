import React, { useState } from "react";
import "./assets/css/Navbar.css";
import "./assets/css/FilterForm.css"; // 👈 separate CSS for filters
import { Dropdown, Modal, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import FilterForm from "./FilterForm";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const handleFilterShow = () => setShowFilter(true);
  const handleFilterClose = () => setShowFilter(false);

  const getNavLinkClass = (path: string) =>
    location.pathname === path ? "nav-link navbar-underline" : "nav-link";

  return (
    <>
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
              {/* ==============================
                  ALL SERVICES DROPDOWN
              ============================== */}
              <li className="nav-item d-flex align-items-center justify-content-center service-item">
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
                    <span>All Services</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="custom-dropdown-menu">
                    {[
                      "Packages",
                      "Conventions",
                      "Function Halls",
                      "Gardens",
                      "Clubhouses",
                      "Community halls",
                      "Farmhouse",
                      "Resorts",
                      "Banquet halls",
                      "Restaurants",
                      "Caterers",
                      "Live Food Counters",
                      "Tea & Coffee Stalls",
                      "Salad Stall",
                      "Juice Specialists",
                      "Veg Snack Specialists",
                      "Non Veg Snack Specialists",
                      "Roti Specialists",
                      "Butter Non& Kulcha Specialists",
                      "Chat Stall",
                      "Fruit stall",
                      "Soup Specialists",
                      "South Indian Breakfast",
                      "Chinese Stall",
                      "Mongolian Stalls",
                      "Cocktail Stalls",
                      "Pizza’s & Burgers stalls",
                      "Bakery Stalls",
                      "Sweet Stalls",
                      "Ice Cream Stalls",
                      "Pan Counters",
                      "Drinking Water Stalls",
                      "Chocolate Counters",
                      "Photo&Vediography",
                      "Decors",
                      "Kiddy Game",
                      "Band set",
                      "Mehndi Specialists",
                      "Baharat setup & Team",
                      "Pundits",
                      "Beauticians",
                      "Event Display Specialist",
                      "Tents & Walls",
                      "Lights & Sounds",
                      "Rental Suppliers",
                      "Digital Screens",
                      "Digital D.J Vehicles",
                      "LED Counters",
                      "Smoke Projectors",
                      "Chafing Dish Rental",
                      "Event Dress Rentals",
                      "D.j",
                      "Music show",
                      "Dance show",
                      "Comedy show",
                      "Mimicry show",
                      "Magic shows",
                      "Anchors",
                      "Celebrity Guests",
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

                {/* ==============================
                    FILTER ICON (Separate CSS)
                ============================== */}
                <button
                  className="filter-btn"
                  onClick={handleFilterShow}
                  title="Open Filters"
                >
                  <i className="fa fa-sliders"></i>
                  <span>Filters</span>
                </button>
              </li>

              {/* ==============================
                  MAIN NAVIGATION LINKS
              ============================== */}
              {[
                { path: "/", icon: "fa-home", label: "Home" },
                { path: "/myparty", icon: "fa-birthday-cake", label: "My Party" },
                { path: "/studio", icon: "fa-crown", label: "Studio" },
                { path: "/shop", icon: "fa-shopping-cart", label: "Shop" },
                { path: "/staff", icon: "fa-users", label: "Staff" },
              ].map((navItem, index) => (
                <li className="nav-item" key={index}>
                  <Link
                    className={getNavLinkClass(navItem.path)}
                    to={navItem.path}
                  >
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

      {/* ==============================
          FILTER POPUP MODAL
      ============================== */}
      <Modal show={showFilter} onHide={handleFilterClose} centered>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <FilterForm />
        </Modal.Body>
        
      </Modal>
    </>
  );
};

export default Navbar;
