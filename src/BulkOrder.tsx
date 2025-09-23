import React, { useState } from "react";

const BulkOrder: React.FC = () => {
  const [items, setItems] = useState([
    { name: "Soap", price: 20, unit: "1", quantity: 1, checked: false },
    { name: "Rice", price: 2000, unit: "25kg", quantity: 1, checked: false },
    { name: "Dal", price: 120, unit: "1kg", quantity: 1, checked: false },
    { name: "Floors", price: 100, unit: "1kg", quantity: 1, checked: false },
  ]);

  const GST_RATE = 18; // GST percentage
  const PLATFORM_FEE_RATE = 5; // Platform fee percentage

  const handleQuantityChange = (index: number, value: number) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = value;
    setItems(updatedItems);
  };

  const handleCheckChange = (index: number) => {
    const updatedItems = [...items];
    updatedItems[index].checked = !updatedItems[index].checked;
    setItems(updatedItems);
  };

  const calculateSubtotal = () =>
    items.reduce(
      (acc, item) =>
        item.checked ? acc + item.price * item.quantity : acc,
      0
    );

  const calculateGST = () => (calculateSubtotal() * GST_RATE) / 100;

  const calculatePlatformFee = () =>
    (calculateSubtotal() * PLATFORM_FEE_RATE) / 100;

  const calculateTotal = () =>
    calculateSubtotal() + calculateGST() + calculatePlatformFee();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bulk Order</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.cell}>Select</th>
            <th style={styles.cell}>Name</th>
            <th style={styles.cell}>Price</th>
            <th style={styles.cell}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} style={styles.row}>
              <td style={styles.cell}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckChange(index)}
                />
              </td>
              <td style={styles.cell}>{item.name}</td>
              <td style={styles.cell}>
                {item.price}rs per {item.unit}
              </td>
              <td style={styles.cell}>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  style={styles.input}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.summary}>
        <p style={styles.summaryText}>
          <strong>Subtotal:</strong> {calculateSubtotal().toFixed(2)}rs
        </p>
        <p style={styles.summaryText}>
          <strong>GST ({GST_RATE}%):</strong> {calculateGST().toFixed(2)}rs
        </p>
        <p style={styles.summaryText}>
          <strong>Platform Fee ({PLATFORM_FEE_RATE}%):</strong> {calculatePlatformFee().toFixed(2)}rs
        </p>
        <h2 style={styles.total}>
          <strong>Total Amount:</strong> {calculateTotal().toFixed(2)}rs
        </h2>
        <button style={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: "800px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
  },
  heading: {
    textAlign: "center" as const,
    color: "#333",
    marginBottom: "20px",
    textTransform: "uppercase" as const,
    letterSpacing: "2px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginBottom: "20px",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "center" as const,
  },
  row: {
    backgroundColor: "#fff",
  },
  input: {
    width: "50px",
    textAlign: "center" as const,
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  summary: {
    textAlign: "center" as const,
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#eaf6ff",
    borderRadius: "8px",
  },
  summaryText: {
    fontSize: "16px",
    color: "#333",
    margin: "5px 0",
  },
  total: {
    color: "#111",
    fontWeight: "bold" as const,
    marginTop: "10px",
    fontSize: "20px",
  },
  checkoutButton: {
    marginTop: "15px",
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default BulkOrder;
