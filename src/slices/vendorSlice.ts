import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// ========== TYPES ==========
interface Vendor {
  id: number;
  name: string;
  email: string;
}

interface Wallet {
  balance: number;
  totalPayments?: number;
  latestPayments?: number;
  creditAmount?: number;
  otherBills?: number;
  creditDue?: number;
}

interface DashboardData {
  totalServices: number;
  successfulOrders: number;
  totalOrders: number;
  cancelledOrders: number;
}

// Slice state
interface VendorState {
  vendors: Vendor[];
  wallet: Wallet;
  dashboard: DashboardData;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: VendorState = {
  vendors: [],
  wallet: { balance: 0 },
  dashboard: {
    totalServices: 0,
    successfulOrders: 0,
    totalOrders: 0,
    cancelledOrders: 0,
  },
  loading: false,
  error: null,
  message: null,
};

// ========== ASYNC ACTIONS ==========

// ✅ Fetch vendors
export const fetchVendors = createAsyncThunk("vendor/fetchVendors", async () => {
  const response = await axios.get("http://localhost:8014/api/vendors");
  return response.data;
});

// ✅ Fetch wallet
export const fetchWallet = createAsyncThunk("vendor/fetchWallet", async () => {
  const response = await axios.get("http://localhost:8014/api/vendor-wallet");
  return response.data;
});

// ✅ Fetch dashboard data
export const fetchDashboard = createAsyncThunk("vendor/fetchDashboard", async () => {
  const response = await axios.get("http://localhost:8014/api/vendor-dashboard");
  return response.data;
});

// ✅ Update password (still from backend)
export const updatePassword = createAsyncThunk(
  "vendor/updatePassword",
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put("http://localhost:8014/api/vendors/password", {
        oldPassword,
        newPassword,
      });
      return response.data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Password update failed");
    }
  }
);

// ========== SLICE ==========
const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ----- Vendors -----
      .addCase(fetchVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendors.fulfilled, (state, action: PayloadAction<Vendor[]>) => {
        state.loading = false;
        state.vendors = action.payload;
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch vendors";
      })

      // ----- Wallet -----
      .addCase(fetchWallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action: PayloadAction<Wallet>) => {
        state.loading = false;
        state.wallet = action.payload;
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch wallet";
      })

      // ----- Dashboard -----
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action: PayloadAction<DashboardData>) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch dashboard data";
      })

      // ----- Password -----
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updatePassword.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Password update failed";
      });
  },
});

export const { clearMessages } = vendorSlice.actions;
export default vendorSlice.reducer;
