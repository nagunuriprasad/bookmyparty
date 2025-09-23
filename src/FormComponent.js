import React from 'react';
import './FormComponent.css';
import logo from './plogo.png'; // Make sure to have the logo image file in the same folder or adjust the path

const FormComponent = () => {
    return (
        <div className="form-container">
            <img src={logo} alt="Logo" className="logo" />
            <h2>PAY TO</h2>
            <form className="payment-form">
                <input type="text" placeholder="Enter Amount" />
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email Id" required />
                <input type="text" placeholder="Mobile Number" required />
                <input type="text" placeholder="GSTIN (if any)" />
                <textarea placeholder="Purpose of Payment"></textarea>
                <button type="submit">PAY ONLINE</button>
            </form>
        </div>
    );
};

export default FormComponent;
