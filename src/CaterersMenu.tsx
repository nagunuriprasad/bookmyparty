import React, { useState } from "react";
import './assets/css/CaterersMenu.css';
import Navbar from './Navbar';


const CaterersMenu: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const handleReset = () => {
    setTotalPrice(0);
  };

  return (
    
    <div className="custom-menu-container">
        <div><Navbar/></div>
        
      <div className="meal-options">
      
        <button className="meal-button">BREAKFAST</button>
        <button className="meal-button">HIGH TEA</button>
        <button className="meal-button">LUNCH</button>
        <button className="meal-button">DINNER</button>
      </div>
      <div className="price-container">
        <button onClick={handleReset} className="reset-button">
          <span className="reset-icon">🔄</span>
        </button>
        <span className="total-price">Total Price: {totalPrice}</span>
      </div>
      <form className="custom-menu-form">
        <label>
          Event Type
          <select>
            <option>-----select-----</option>
            <option>Private</option>
            <option>Corporate</option>
            <option>Educational</option>
            <option>Cinema</option>
            <option>Sports</option>

          </select>
        </label>
        <label>
          Event Subtype
          <select>
            <option>-----select-----</option>
            <option>Basic</option>
            <option>Standard</option>
            <option>VIP</option>
            <option>Pro</option>
          </select>
        </label>
        <label>
          Event Name
          <input type="text" placeholder="Ex: Birthday, Marriage, etc" />
        </label>
        <label>
          Event Date and Time
          <input type="datetime-local" />
        </label>
        <label>
          Delivery Date and Time
          <input type="datetime-local" />
        </label>
        <label>
          Religion
          <input type="text" placeholder="Ex: Hindu, Christian, Jains, Muslim" />
        </label>
        <label>
          Mother Language
          <input type="text" />
        </label>
        <label>
          Most Guests Are From
          <input type="text" />
        </label>
        <label>
          Event Place
          <input type="text" />
        </label>
        <label>
          Event Address
          <input type="text" />
        </label>
        <label>
          Contact Number
          <input type="text" />
        </label>
        <label>
          Any Extra Information (optional)
          <textarea></textarea>
        </label>
        <button type="submit" className="submit-button">
          Create Menu
        </button>
      </form>
    </div>
  );
};

export default CaterersMenu;
