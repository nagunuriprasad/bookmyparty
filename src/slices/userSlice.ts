import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// ✅ Form data type
export interface UserFormData {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  city: string;
  area: string;
  pin: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  profileImage: string;
}

// ✅ Initial form data to use in TSX
export const initialFormData: UserFormData = {
  firstName: '',
  lastName: '',
  gender: '',
  dateOfBirth: '',
  address: '',
  city: '',
  area: '',
  pin: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  profileImage: '',
};

// ✅ Slice state
interface UserState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  success: null,
};

// ✅ Async thunk for API call
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: UserFormData, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:8014/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.message || 'Failed to register');
      }

      return await res.json();
    } catch (err: any) {
      return rejectWithValue(err.message || 'Something went wrong');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = 'User registered successfully!';
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to register';
      });
  },
});

export const { clearMessages } = userSlice.actions;
export default userSlice.reducer;
