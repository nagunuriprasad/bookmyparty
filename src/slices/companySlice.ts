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
  directorGender: string;
  directorPhone: string;
  directorEmail: string;
  inchargeName: string;
  inchargeGender: string;
  inchargePhone: string;
  inchargeEmail: string;
  loginEmail: string;
  password: string;
  confirmPassword: string;
  profileImage?: File | null;
  gstCertificate?: File | null;
  selectedDocs?: string[];
  whatsappAgree: boolean;
  staffingPartnerAgree: boolean;
  vendorAgree: boolean;

  // Dynamic document number fields
  [key: string]: any;
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
    directorGender: '',
    directorPhone: '',
    directorEmail: '',
    inchargeName: '',
    inchargeGender: '',
    inchargePhone: '',
    inchargeEmail: '',
    loginEmail: '',
    password: '',
    confirmPassword: '',
    profileImage: null,
    gstCertificate: null,
    selectedDocs: [],
    whatsappAgree: false,
    staffingPartnerAgree: false,
    vendorAgree: false,
  },
  formErrors: {},
  isSubmitting: false,
  successMessage: null,
  errorMessage: null,
};

// ================== ASYNC THUNK ==================
export const submitCompanyForm = createAsyncThunk<
  any,
  CompanyFormData,
  { rejectValue: string }
>(
  'company/submitForm',
  async (formData, { rejectWithValue }) => {
    try {
      // Frontend checks
      if (formData.password !== formData.confirmPassword) {
        return rejectWithValue('❌ Passwords do not match');
      }
      if (!formData.vendorType) {
        return rejectWithValue('❌ Please select a vendor type');
      }
      if (!formData.whatsappAgree || !formData.staffingPartnerAgree || !formData.vendorAgree) {
        return rejectWithValue('❌ Please agree to all terms and conditions');
      }

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

      const response = await fetch('http://localhost:8014/api/company-form', {
        method: 'POST',
        body: data,
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
    setFormData: <K extends keyof CompanyFormData>(
      state: CompanyFormState,
      action: PayloadAction<{ name: K; value: CompanyFormData[K] }>
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
        state.errorMessage = action.payload || '❌ Failed to submit company form';
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
