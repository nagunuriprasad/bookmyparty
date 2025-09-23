import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupOptions.css'; // Adjust the path as necessary

import user from './imgs/user.png'; // Replace with actual path
import vendor from './imgs/vendor.png'; // Replace with actual path
import staff from './imgs/staff.png'; // Replace with actual path
import delivery from './imgs/delivery.png'; // Adjust the path as necessary

const SignupOptions = () => {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleThemeToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={`signup-options ${darkMode ? 'dark-mode' : ''}`}>
            <div className="theme-toggle">
                <button onClick={handleThemeToggle} className="theme-button">
                    {darkMode ? '🌞' : '🌙'}
                </button>
            </div>
            <div className="options-container">
                <div className="option" onClick={() => handleNavigation('/UserForm')}>
                    <img src={user} alt="User Signup" />
                    <h3>User Signup</h3>
                </div>
                <div className="option" onClick={() => handleNavigation('/CompanyForm')}>
                    <img src={vendor} alt="Vendor Signup" />
                    <h3>Vendor Signup</h3>
                </div>
                <div className="option" onClick={() => handleNavigation('/StaffSignup')}>
                    <img src={staff} alt="Staff Signup" />
                    <h3>Staff Signup</h3>
                </div>
                <div className="option" onClick={() => handleNavigation('/DeliveryForm')}>
                    <img src={delivery} alt="Delivery Boy Signup" />
                    <h3>Delivery Boy Signup</h3>
                </div>
            </div>
        </div>
    );
};

export default SignupOptions;
