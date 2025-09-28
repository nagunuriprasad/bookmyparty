import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/css/VendorWallet.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { fetchWallet } from "./slices/walletSlice";

// define prop types
interface VendorWalletProps {
  title?: string;
}

const VendorWallet: React.FC<VendorWalletProps> = ({ title = "My" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { balance, totalPayments, latestPayments, creditAmount, otherBills, creditDue, loading, error } =
    useSelector((state: RootState) => state.wallet);

  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  return (
    <div className="vendor-wallet-container">
      <div className="vendor-wallet-header">
        <h2>{title} Vendor Wallet Balance</h2>
      </div>

      {loading && <p>Loading wallet...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="vendor-wallet-balance">
        <p>Total Wallet Balance</p>
        <h3>₹ {balance}</h3>
        <strong>Request for Payments ₹ </strong>
      </div>

      <div className="vendor-wallet-options">
        <div className="vendor-wallet-section wallet">
          <p>Total Payments</p>
          <h4>₹ {totalPayments}</h4>
          <button>Last 7 Transactions</button>
        </div>
        <div className="vendor-wallet-section rewards">
          <p>Latest Payments</p>
          <h4>₹ {latestPayments}</h4>
          <button>Last 3 Invoices</button>
        </div>
      </div>

      <div className="vendor-wallet-details">
        <div className="vendor-wallet-details-row">
          <div className="vendor-wallet-section">
            <p>Total Credit Amount</p>
            <h4>₹ {creditAmount}</h4>
            <button>Last 3 Credits</button>
          </div>
          <div className="vendor-wallet-section">
            <p>Other Bills</p>
            <h4>₹ {otherBills}</h4>
            <button>Last 7 Bills</button>
          </div>
        </div>
        <center>
          <div className="vendor-wallet-section">
            <p>Credit Balance Due</p>
            <h4>₹ {creditDue}</h4>
            <button>History</button>
          </div>
        </center>
      </div>

      <p>Use Wallet & Rewards for Event Schedules</p>

      <div className="promo">
        <p>Get up to 25% Off on Every Event Schedules</p>
        <code>Code: PARTYS365</code>
      </div>
    </div>
  );
};

export default VendorWallet;
