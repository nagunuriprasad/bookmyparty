import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

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
  directorLoginEmail: string;
  directorPassword: string;
  directorConfirmPassword: string;
  inchargeName: string;
  inchargeGender: string;
  inchargePhone: string;
  inchargeLoginEmail: string;
  inchargePassword: string;
  inchargeConfirmPassword: string;
  profileImage?: File | null;
  gstCertificate?: File | null;
  selectedDocs?: string[];
  whatsappAgree: boolean;
  staffingPartnerAgree: boolean;
  vendorAgree: boolean;

  [key: string]: any; // dynamic doc numbers
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
    companyName: "",
    registrationType: "",
    email: "",
    phone: "",
    vendorType: "",
    vendorSubType: "",
    companyServices: "",
    eventService: "",
    regdAddress: "",
    regdCity: "",
    regdArea: "",
    regdPin: "",
    workAddress: "",
    workCity: "",
    workArea: "",
    workPin: "",
    directorName: "",
    directorGender: "",
    directorPhone: "",
    directorLoginEmail: "",
    directorPassword: "",
    directorConfirmPassword: "",
    inchargeName: "",
    inchargeGender: "",
    inchargePhone: "",
    inchargeLoginEmail: "",
    inchargePassword: "",
    inchargeConfirmPassword: "",
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
  { message: string }, // expected response type
  FormData, // we send FormData (for files)
  { rejectValue: string }
>(
  "company/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8014/api/vendersignup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data; // expected { message: string }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || err.message || "❌ Network error"
      );
    }
  }
);

// ================== SLICE ==================
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setFormData: <K extends keyof CompanyFormData>(
      state,
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
      .addCase(submitCompanyForm.fulfilled, (state, action) => {
        state.isSubmitting = false;
        state.successMessage =
          action.payload?.message || "✅ Company registered successfully!";
        state.formErrors = {};
        state.formData = { ...initialState.formData }; // reset form
      })
      .addCase(submitCompanyForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.errorMessage =
          action.payload || "❌ Failed to submit company form";
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
