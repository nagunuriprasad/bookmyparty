// src/Header.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import companyLogo from './assets/bookmyparty.png';
import './assets/css/Header.css';
import LanguageSelector from './LanguageSelector';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('Login/Signup');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(`Login/Signup (${language})`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log('Searching for:', e.target.value);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Left: Logo, Location, Search */}
        <div className="d-flex align-items-center gap-3">
          <NavLink  to="/">
            <img src={companyLogo} alt="CompanyLogo" className="logo-img" />
          </NavLink>


          {/* Search Input */}
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          {/* Location Icon */}
          <a
            href="https://www.google.com/maps/@17.4334334,78.4418009,17z?entry=ttu"
            target="_blank"
            rel="noopener noreferrer"
            className="location-link-icon"
          >
            <FaMapMarkerAlt size={22} />
          </a>
        </div>

        {/* Right: Login + Language */}
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
