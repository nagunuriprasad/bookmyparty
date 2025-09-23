import React, { useState } from "react";

const Checkout: React.FC = () => {
  const [address, setAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Credit Card");
  const [upiiD, setUpiiD] = useState<string>("");
  const [promoCode, setPromoCode] = useState<string>("");
  const [promoApplied, setPromoApplied] = useState<boolean>(false);

  const orderSummary = {
    items: [
      
      { name: "Pasta", price: 9.49 },
    ],
    deliveryFee: 3.99,
    discount: promoApplied ? 2.00 : 0.00,
  };

  const totalAmount = orderSummary.items.reduce((total, item) => total + item.price, 0) + orderSummary.deliveryFee - orderSummary.discount;

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handlePaymentChange = (payment: string) => {
    setPaymentMethod(payment);
  };

  const handlePromoCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
  };

  const handlePromoApply = () => {
    if (promoCode === "DISCOUNT") {
      setPromoApplied(true);
    } else {
      alert("Invalid promo code.");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`Proceeding with the payment using ${paymentMethod} to address: ${address}`);
  };

  return (
    <div style={styles.checkoutContainer}>
      <div style={styles.checkoutHeader}>
        <h1 style={styles.heading}>Proceed to Checkout</h1>
      </div>

      <form style={styles.checkoutForm} onSubmit={handleSubmit}>
        {/* Delivery Address */}
        <div style={styles.formGroup}>
          <label htmlFor="address" style={styles.label}>Delivery Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter your delivery address"
            required
            style={styles.input}
          />
        </div>

        {/* Payment Method Logos */}
        <div style={styles.paymentIcons}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo_2011.png"
            alt="Visa"
            style={paymentMethod === "Credit Card" ? { ...styles.icon, ...styles.activeIcon } : styles.icon}
            onClick={() => handlePaymentChange("Credit Card")}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Google_Pay_logo.svg"
            alt="Google Pay"
            style={paymentMethod === "Google Pay" ? { ...styles.icon, ...styles.activeIcon } : styles.icon}
            onClick={() => handlePaymentChange("Google Pay")}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/3a/PayPal_logo_2014.svg"
            alt="PayPal"
            style={paymentMethod === "PayPal" ? { ...styles.icon, ...styles.activeIcon } : styles.icon}
            onClick={() => handlePaymentChange("PayPal")}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Cash_on_delivery_logo.svg"
            alt="Cash on Delivery"
            style={paymentMethod === "Cash on Delivery" ? { ...styles.icon, ...styles.activeIcon } : styles.icon}
            onClick={() => handlePaymentChange("Cash on Delivery")}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/91/PhonePe_logo.png"
            alt="PhonePe"
            style={paymentMethod === "UPI" ? { ...styles.icon, ...styles.activeIcon } : styles.icon}
            onClick={() => handlePaymentChange("UPI")}
          />
        </div>

        {/* UPI ID input when UPI is selected */}
        {paymentMethod === "UPI" && (
          <div style={styles.formGroup}>
            <label htmlFor="upi-id" style={styles.label}>Enter UPI ID</label>
            <input
              type="text"
              id="upi-id"
              value={upiiD}
              onChange={(e) => setUpiiD(e.target.value)}
              placeholder="Enter your UPI ID"
              required
              style={styles.input}
            />
            <button
              type="button"
              style={styles.verifyButton}
              onClick={() => alert("UPI ID verified")}
            >
              Verify UPI ID
            </button>
          </div>
        )}

        {/* Promo Code Section */}
        <div style={styles.formGroup}>
          <label htmlFor="promo-code" style={styles.label}>Promo Code</label>
          <div style={styles.promoCodeWrapper}>
            <input
              type="text"
              id="promo-code"
              value={promoCode}
              onChange={handlePromoCodeChange}
              placeholder="Enter promo code"
              style={styles.input}
            />
            <button
              type="button"
              onClick={handlePromoApply}
              style={styles.promoButton}
            >
              Apply
            </button>
          </div>
          {promoApplied && <p style={styles.promoApplied}>Promo applied: -$2.00</p>}
        </div>

        {/* Order Summary */}
        <div style={styles.orderSummary}>
          <h3 style={styles.summaryTitle}>Order Summary</h3>
          {orderSummary.items.map((item, index) => (
            <p key={index}><strong>{item.name}:</strong> ${item.price.toFixed(2)}</p>
          ))}
          <p><strong>Delivery Fee:</strong> ${orderSummary.deliveryFee.toFixed(2)}</p>
          <p><strong>Discount:</strong> ${orderSummary.discount.toFixed(2)}</p>
          <p><strong>Total:</strong> ${totalAmount.toFixed(2)}</p>
        </div>

        {/* Checkout Button */}
        <div style={styles.checkoutActions}>
          <button type="submit" style={styles.checkoutBtn}>Proceed to Payment</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  checkoutContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    minHeight: "100vh",
    background: "#f7f7f7", // Soft background to highlight the form
  },
  checkoutHeader: {
    marginBottom: "40px",
  },
  heading: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: "2.5rem",
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    margin: 0,
  },
  checkoutForm: {
    backgroundColor: "white",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    transition: "all 0.3s ease",
    marginBottom: "20px",
    overflow: "hidden",
  },
  formGroup: {
    marginBottom: "25px",
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "1.1rem",
    fontWeight: "500",
    color: "#555",
    marginBottom: "8px",
  },
  input: {
    padding: "12px 20px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none",
    boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
    transition: "0.3s ease",
  },
  paymentIcons: {
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "25px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  icon: {
    width: "50px",
    height: "50px",
    margin: "0 15px",
    borderRadius: "8px",
    padding: "8px",
    transition: "all 0.3s ease",
    opacity: "0.8",
  },
  activeIcon: {
    border: "2px solid #007BFF",
    boxShadow: "0 0 8px rgba(0, 123, 255, 0.5)",
    opacity: "1",
  },
  verifyButton: {
    padding: "8px 15px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
  promoCodeWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoButton: {
    padding: "10px 15px",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  promoApplied: {
    fontSize: "0.9rem",
    color: "#28a745",
    marginTop: "10px",
  },
  summaryTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "10px",
  },
  orderSummary: {
    backgroundColor: "#f7f7f7",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 3px 5px rgba(0, 0, 0, 0.1)",
  },
  checkoutActions: {
    display: "flex",
    justifyContent: "center",
  },
  checkoutBtn: {
    padding: "12px 20px",
    fontSize: "1.2rem",
    color: "white",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Checkout;
