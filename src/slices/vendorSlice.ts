import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Vendor type
interface Vendor {
  id: number;
  name: string;
  email: string;
}

// Wallet type
interface Wallet {
  balance: number;
  totalPayments?: number;
  latestPayments?: number;
  creditAmount?: number;
  otherBills?: number;
  creditDue?: number;
}

// Slice state
interface VendorState {
  vendors: Vendor[];
  wallet: Wallet;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: VendorState = {
  vendors: [],
  wallet: { balance: 0 },
  loading: false,
  error: null,
  message: null,
};

// ✅ Fetch vendors
export const fetchVendors = createAsyncThunk("vendor/fetchVendors", async () => {
  const response = await axios.get("http://localhost:8014/api/services");
  return response.data;
});

// ✅ Update password
export const updatePassword = createAsyncThunk(
  "vendor/updatePassword",
  async (
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put("http://localhost:5000/api/vendors/password", {
        oldPassword,
        newPassword,
      });
      return response.data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Password update failed");
    }
  }
);

// ✅ Fetch wallet
export const fetchWallet = createAsyncThunk("vendor/fetchWallet", async () => {
  const response = await axios.get("http://localhost:8014/api/vendors/wallet");
  return response.data;
});

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
      // fetch vendors
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

      // update password
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
      })

      // fetch wallet
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
      });
  },
});

export const { clearMessages } = vendorSlice.actions;
export default vendorSlice.reducer;
