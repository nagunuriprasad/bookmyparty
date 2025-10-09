import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// ================== INTERFACES ==================
export interface CompanyFormData {
  companyName: string;
  registrationType: string;
  email: string;
  phone: string;
  companyServices: string;
  eventService: string;
  vendorType: string;
  vendorSubType: string;
  regdAddress: string;
  regdCity: string;
  regdArea: string;
  regdPin: string;
  workAddress: string;
  workCity: string;
  workArea: string;
  workPin: string;
  directorName: string;
  gender: string;
  inchargeName: string;
  inchargeGender: string;
  inchargeEmail: string;
  inchargeContact: string;
  loginEmail: string;
  password: string;
  confirmPassword: string;
  profileImage?: File | null;
  gstCertificate?: File | null;
  selectedDocs?: string[]; // ✅ Required for vendor icons selection
}

// ================== STATE INTERFACE ==================
interface CompanyFormState {
  formData: CompanyFormData;
  formErrors: Partial<Record<keyof CompanyFormData, string>>;
  isSubmitting: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

// ================== INITIAL STATE ==================
const initialState: CompanyFormState = {
  formData: {
    companyName: '',
    registrationType: '',
    email: '',
    phone: '',
    vendorType: '',
    vendorSubType: '',
    companyServices: '',
    eventService: '',
    regdAddress: '',
    regdCity: '',
    regdArea: '',
    regdPin: '',
    workAddress: '',
    workCity: '',
    workArea: '',
    workPin: '',
    directorName: '',
    gender: '',
    inchargeName: '',
    inchargeGender: '',
    inchargeEmail: '',
    inchargeContact: '',
    loginEmail: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
    gstCertificate: null,
    selectedDocs: [],
  },
  formErrors: {},
  isSubmitting: false,
  successMessage: null,
  errorMessage: null,
};

// ================== ASYNC THUNK (Secure Submission) ==================
export const submitCompanyForm = createAsyncThunk<
  any,
  CompanyFormData,
  { rejectValue: string }
>(
  'company/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      // Validate password match before submission
      if (formData.password !== formData.confirmPassword) {
        return rejectWithValue('❌ Passwords do not match');
      }

      // Validate required vendor type
      if (!formData.vendorType) {
        return rejectWithValue('❌ Please select a vendor type');
      }

      // Securely prepare multipart/form-data
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          data.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((v) => data.append(`${key}[]`, v));
        } else if (value !== undefined && value !== null) {
          data.append(key, value.toString());
        }
      });

      // API Call (replace URL in production)
      const response = await fetch('http://localhost:8014/api/company-form', {
        method: 'POST',
        body: data,
        headers: {
          // No Content-Type (browser sets it for multipart automatically)
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || '❌ Failed to submit form');
      }

      const result = await response.json();
      return result;
    } catch (err: any) {
      return rejectWithValue(err.message || '❌ Network error');
    }
  }
);

// ================== SLICE ==================
const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setFormData: (
      state,
      action: PayloadAction<{ name: keyof CompanyFormData; value: any }>
    ) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    setFormErrors: (
      state,
      action: PayloadAction<Partial<Record<keyof CompanyFormData, string>>>
    ) => {
      state.formErrors = action.payload;
    },
    resetFormMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
    resetForm: (state) => {
      state.formData = { ...initialState.formData };
      state.formErrors = {};
      state.isSubmitting = false;
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCompanyForm.pending, (state) => {
        state.isSubmitting = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(submitCompanyForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.successMessage = '✅ Company registered successfully!';
        state.formErrors = {};
      })
      .addCase(submitCompanyForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.errorMessage =
          action.payload || '❌ Failed to submit company form';
      });
  },
});

// ================== EXPORTS ==================
export const {
  setFormData,
  setFormErrors,
  resetFormMessages,
  resetForm,
} = companySlice.actions;

export default companySlice.reducer;
