// src/Header.tsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import companyLogo from './assets/bookmyparty.png';
import './assets/css/Header.css';
import LanguageSelector from './LanguageSelector';

const Header = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('Login/Signup');
    const [searchQuery, setSearchQuery] = useState('');

    const handleLanguageChange = (language: string) => {
        setSelectedLanguage(`Login/Signup (${language})`);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
        // You can integrate actual search logic here
    };

    return (
        <header className="header py-2">
            <div className="container-main d-flex align-items-center justify-content-between">
                {/* Logo + Location + Search */}
                <div className="d-flex align-items-center gap-3">
                    <NavLink className="logo" to="/">
                        <img src={companyLogo} alt="Company Logo" className="logo-img" />
                    </NavLink>

                    {/* Location Link */}
                    <a
                        href="https://www.google.com/maps/@17.4334334,78.4418009,17z?entry=ttu&g_ep=EgoyMDI1MTAxMi4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="location-link btn btn-outline-primary btn-sm"
                    >
                        Location
                    </a>

                    {/* Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="d-flex">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button type="submit" className="btn btn-primary ms-2">
                            Search
                        </button>
                    </form>
                </div>

                {/* Login Button + Language Selector */}
                <div className="d-flex align-items-center gap-3">
                    <NavLink className="login-button btn btn-outline-secondary" to="/LoginForm">
                        {selectedLanguage}
                    </NavLink>
                    <LanguageSelector onLanguageChange={handleLanguageChange} />
                </div>
            </div>
        </header>
    );
};

export default Header;
