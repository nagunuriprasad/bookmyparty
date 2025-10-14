// src/Header.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import companyLogo from './assets/bookmyparty.png';


import './assets/css/Header.css'; // External CSS for additional styling
import LanguageSelector from './LanguageSelector';

const Header = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('Login/Signup'); // Default text

    const handleLanguageChange = (language: string) => {
        // Change the button text based on selected language
        setSelectedLanguage(`Login/Signup (${language})`);
    };

    return (
        <header className="header">
            <div className="container-main header-container">
                <div className="logo-container">
                    {/* Company Logo */}
                    <NavLink className="logo" to="/">
                        <img src={companyLogo} alt="Company Logo" className="logo-img" />
                    </NavLink>
                </div>
                {/* Login Button */}
                <div className="login-container">
                    <NavLink className="login-button" to="/LoginForm">
                        {selectedLanguage}
                    </NavLink>
                </div>
                <LanguageSelector onLanguageChange={handleLanguageChange} />
            </div>
        </header>
    );
};

export default Header;
