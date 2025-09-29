import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalGroups: number;
  totalPermissions: number;
}

interface AdminState {
  stats: DashboardStats;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  stats: {
    totalUsers: 0,
    totalOrders: 0,
    totalGroups: 0,
    totalPermissions: 0,
  },
  loading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "admin/fetchDashboardData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/admin/dashboard"); // Replace with your API
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    });
    builder.addCase(fetchDashboardData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default adminSlice.reducer;
