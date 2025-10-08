import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface LoginState {
  loginType: 'email' | 'mobile';
  email: string;
  password: string;
  mobile: string;
  otp: string;
  otpSent: boolean;
  rememberMe: boolean;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  loginType: 'email',
  email: '',
  password: '',
  mobile: '',
  otp: '',
  otpSent: false,
  rememberMe: false,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

// Async thunk for login
export const loginUser = createAsyncThunk<
  any,
  { loginType: 'email' | 'mobile'; email?: string; password?: string; mobile?: string; otp?: string },
  { rejectValue: string }
>(
  'login/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8014/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message || 'Login failed');
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginType: (state, action: PayloadAction<'email' | 'mobile'>) => {
      state.loginType = action.payload;
      state.error = null;
      if (action.payload === 'mobile') state.password = '';
      else state.otp = '';
    },
    // ✅ Type-safe setField reducer
    setField: <K extends keyof LoginState>(
      state,
      action: PayloadAction<{ field: K; value: LoginState[K] }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetLogin: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { setLoginType, setField, resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
