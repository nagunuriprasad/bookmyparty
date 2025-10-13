import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./assets/css/VendorWallet.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store/store";
import { fetchWallet, clearMessages } from "./slices/vendorSlice";

interface VendorWalletProps {
  title?: string;
}

const VendorWallet: React.FC<VendorWalletProps> = ({ title = "My" }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Access wallet state from Redux
  const { wallet, loading, error, message } = useSelector(
    (state: RootState) => state.vendor
  );

  // Destructure wallet values safely
  const {
    balance = 0,
    totalPayments = 0,
    latestPayments = 0,
    creditAmount = 0,
    otherBills = 0,
    creditDue = 0,
  } = wallet || {};

  // Fetch wallet data from slice
  useEffect(() => {
    dispatch(fetchWallet());

    // Cleanup messages when component unmounts
    return () => {
      dispatch(clearMessages());
    };
  }, [dispatch]);

  return (
    <div className="vendor-wallet-container">
      <div className="vendor-wallet-header">
        <h2>{title} Vendor Wallet Balance</h2>
      </div>

      {/* Status Messages */}
      {loading && <p className="loading-text">Fetching wallet data...</p>}
      {error && <p className="error-text">{error}</p>}
      {message && <p className="success-text">{message}</p>}

      {/* Wallet Summary */}
      {!loading && !error && (
        <>
          <div className="vendor-wallet-balance">
            <p>Total Wallet Balance</p>
            <h3>₹ {balance.toFixed(2)}</h3>
            <strong>Request for Payments ₹</strong>
          </div>

          {/* Payment Overview */}
          <div className="vendor-wallet-options">
            <div className="vendor-wallet-section wallet">
              <p>Total Payments</p>
              <h4>₹ {totalPayments.toFixed(2)}</h4>
              <button onClick={() => navigate("/transactions")}>
                View Last 7 Transactions
              </button>
            </div>
            <div className="vendor-wallet-section rewards">
              <p>Latest Payments</p>
              <h4>₹ {latestPayments.toFixed(2)}</h4>
              <button onClick={() => navigate("/invoices")}>
                View Last 3 Invoices
              </button>
            </div>
          </div>

          {/* Detailed Info */}
          <div className="vendor-wallet-details">
            <div className="vendor-wallet-details-row">
              <div className="vendor-wallet-section">
                <p>Total Credit Amount</p>
                <h4>₹ {creditAmount.toFixed(2)}</h4>
                <button onClick={() => navigate("/credits")}>
                  View Last 3 Credits
                </button>
              </div>
              <div className="vendor-wallet-section">
                <p>Other Bills</p>
                <h4>₹ {otherBills.toFixed(2)}</h4>
                <button onClick={() => navigate("/bills")}>
                  View Last 7 Bills
                </button>
              </div>
            </div>

            <center>
              <div className="vendor-wallet-section">
                <p>Credit Balance Due</p>
                <h4>₹ {creditDue.toFixed(2)}</h4>
                <button onClick={() => navigate("/history")}>View History</button>
              </div>
            </center>
          </div>

          {/* Footer Note */}
          <p>Use Wallet & Rewards for Event Schedules</p>

          <div className="promo">
            <p>Get up to 25% Off on Every Event Schedule</p>
            <code>Code: PARTYS365</code>
          </div>
        </>
      )}
    </div>
  );
};

export default VendorWallet;
