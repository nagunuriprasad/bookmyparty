import React, { useState } from "react";
import './assets/css/GroceryMenu.css';
import Navbar from './Navbar';

const GroceryMenu: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  const handleReset = () => {
    setTotalPrice(0);
  };

  return (
    <div className="custom-menu-container">
      <Navbar />
      <h1 className="title">VEGETABLES</h1>
      <table className="menu-table">
        <thead>
          <tr>
            <th></th>
            <th>name</th>
            <th>Price</th>
            <th>quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>soap</td>
            <td>2345rs per 10</td>
            <td>
              <input type="number" defaultValue={1} />
            </td>
          </tr>
        </tbody>
      </table>

      <h1 className="title">GREEN LEAF</h1>
      <table className="menu-table">
        <thead>
          <tr>
            <th>name</th>
            <th>Price</th>
            <th>quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3}>
              <button onClick={handleReset} className="reset-button">
                <span className="reset-icon">🔄</span>
              </button>
              <span className="total-price">Total Price: {totalPrice}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <form className="custom-menu-form">
        <label>
          Delivery Address:
          <textarea placeholder="Enter your delivery address"></textarea>
        </label>
        <label>
          Phone Number:
          <input type="text" placeholder="Enter your phone number" />
        </label>
        <label>
          Message (optional):
          <textarea placeholder="Additional instructions"></textarea>
        </label>
        <button type="submit" className="submit-button">
          Create Menu
        </button>
      </form>
    </div>
  );
};

export default GroceryMenu;
