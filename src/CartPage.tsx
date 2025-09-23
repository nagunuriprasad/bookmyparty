import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./assets/css/CartPage.css";

const CartPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState(location.state?.cart || []);

  // Calculate total price
  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Remove item from cart
  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: number, increment: boolean) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
        if (newQuantity <= 0) {
          // Remove item if quantity is less than 1
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean)); // Remove any null values
  };

  return (
    <div className="cart-page">
      <h1>My Cart</h1>
      {cart.length > 0 ? (
        <>
          <ul className="cart-list">
            {cart.map((item: any) => (
              <li key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>{item.name}</p>
                  <p>₹{item.price} x {item.quantity}</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, false)}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() => updateQuantity(item.id, true)}
                    >
                      +
                    </button>
                    <button
                        className="delete-button"
                        onClick={() => removeItem(item.id)}
                        >
                        <i className="fas fa-trash-alt"></i>
                    </button>

                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h2>Total: ₹{calculateTotal()}</h2>
          </div>
          <div className="cart-actions">
            <button className="checkout-button">Proceed to Checkout</button>
            <button className="back-button" onClick={() => navigate("/ShopOrder")}>
              Back to Shop
            </button>
          </div>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
