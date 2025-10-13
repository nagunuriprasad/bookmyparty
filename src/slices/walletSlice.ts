// src/slices/walletSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface WalletState {
  balance: number;
  totalPayments: number;
  latestPayments: number;
  creditAmount: number;
  otherBills: number;
  creditDue: number;
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  balance: 0,
  totalPayments: 0,
  latestPayments: 0,
  creditAmount: 0,
  otherBills: 0,
  creditDue: 0,
  loading: false,
  error: null,
};

// ✅ API call
export const fetchWallet = createAsyncThunk(
  "wallet/fetchWallet",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:8010/api/vendors/wallet"); // <-- change API URL
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to load wallet data");
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearWalletError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWallet.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.balance = action.payload.balance || 0;
        state.totalPayments = action.payload.totalPayments || 0;
        state.latestPayments = action.payload.latestPayments || 0;
        state.creditAmount = action.payload.creditAmount || 0;
        state.otherBills = action.payload.otherBills || 0;
        state.creditDue = action.payload.creditDue || 0;
      })
      .addCase(fetchWallet.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWalletError } = walletSlice.actions;
export default walletSlice.reducer;
