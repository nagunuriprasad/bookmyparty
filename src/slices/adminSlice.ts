import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Async fetch for dashboard stats
export const fetchDashboardData = createAsyncThunk(
  'admin/fetchDashboardData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Error fetching dashboard data');
    }
  }
);

interface DashboardState {
  loading: boolean;
  error: string | null;
  stats: {
    totalServices: number;
    successfulOrders: number;
    totalOrders: number;
    cancelledOrders: number;
  };
}

const initialState: DashboardState = {
  loading: false,
  error: null,
  stats: {
    totalServices: 0,
    successfulOrders: 0,
    totalOrders: 0,
    cancelledOrders: 0,
  },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;
