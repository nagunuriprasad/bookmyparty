import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import companyLogo from "./assets/bookmyparty.png";
import "./assets/css/Header.css";
import LanguageSelector from "./LanguageSelector";
import { FaMapMarkerAlt } from "react-icons/fa";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Login/Signup");
  const [searchQuery, setSearchQuery] = useState("");
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  // Manual location fields
  const [manualLocation, setManualLocation] = useState({
    state: "",
    city: "",
    pincode: "",
  });

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(`Login/Signup (${language})`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log("Searching for:", e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setManualLocation((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Left Section */}
        <div className="d-flex align-items-center gap-3">
          <NavLink to="/">
            <img src={companyLogo} alt="CompanyLogo" className="logo-img" />
          </NavLink>

          {/* Search Box */}
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Location Icon + Popup */}
          <div
            className="location-wrapper"
            onMouseEnter={() => setShowLocationPopup(true)}
            onMouseLeave={() => setShowLocationPopup(false)}
          >
            <FaMapMarkerAlt size={22} className="location-link-icon" />

            {showLocationPopup && (
              <div className="location-popup">
                <p className="popup-title">Enter Location</p>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={manualLocation.state}
                  onChange={handleLocationChange}
                  className="location-input"
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={manualLocation.city}
                  onChange={handleLocationChange}
                  className="location-input"
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  value={manualLocation.pincode}
                  onChange={handleLocationChange}
                  className="location-input"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="login-container d-flex align-items-center gap-3">
          <NavLink className="login-button" to="/LoginForm">
            {selectedLanguage}
          </NavLink>
          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </div>
      </div>
    </header>
  );
};

export default Header;
