import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define your API endpoints
const API_BASE = 'https://your-api.com/admin';

// Async thunk for fetching staff prices
export const fetchStaffPrices = createAsyncThunk(
  'admin/fetchStaffPrices',
  async () => {
    const response = await axios.get(`${API_BASE}/staff-prices`);
    return response.data;
  }
);

// Async thunk for updating staff prices
export const updateStaffPrices = createAsyncThunk(
  'admin/updateStaffPrices',
  async (payload: { subscriptionType: string; workTitle: string; price: number }) => {
    const response = await axios.post(`${API_BASE}/staff-prices`, payload);
    return response.data;
  }
);

// Slice state interface
interface StaffPrice {
  subscriptionType: string;
  workTitle: string;
  price: number;
}

interface AdminState {
  staffPrices: StaffPrice[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  staffPrices: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    // local updates if needed
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchStaffPrices
      .addCase(fetchStaffPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffPrices.fulfilled, (state, action: PayloadAction<StaffPrice[]>) => {
        state.loading = false;
        state.staffPrices = action.payload;
      })
      .addCase(fetchStaffPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch staff prices';
      })

      // updateStaffPrices
      .addCase(updateStaffPrices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaffPrices.fulfilled, (state, action: PayloadAction<StaffPrice>) => {
        state.loading = false;
        const existingIndex = state.staffPrices.findIndex(
          (sp) =>
            sp.workTitle === action.payload.workTitle &&
            sp.subscriptionType === action.payload.subscriptionType
        );
        if (existingIndex >= 0) {
          state.staffPrices[existingIndex] = action.payload;
        } else {
          state.staffPrices.push(action.payload);
        }
      })
      .addCase(updateStaffPrices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update staff price';
      });
  },
});

export const { clearError } = adminSlice.actions;

export default adminSlice.reducer;
