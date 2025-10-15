// src/slices/staffSignupSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// =================== TYPES ===================
export interface Address {
  address: string;
  city: string;
  area: string;
  pin: string;
  pickupArea?: string;
}

export interface Education {
  sno: string;
  qualification: string;
  year: string;
  marks: string;
  docs: File | null;
}

export interface JobDetails {
  jobTitle: string;
  service: string; // ✅ Added this new field
  experience: string;
  expertIn: string;
  languages: string[];
  description: string;
  workType: string;
  subscription: string;
  uploads: {
    aadhar: File | null;
    cv: File | null;
    pan: File | null;
    others: File | null;
  };
}

export interface StaffSignupForm {
  personalInfo: {
    fullname: string;
    firstName?: string;
    lastName?: string;
    dob: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    permanentAddress: Address;
    presentAddress: Address;
    profileImage: string | null;
    sameAsPresent: boolean;
  };
  education: Education[];
  jobDetails: JobDetails;
}

interface StaffSignupState {
  formData: StaffSignupForm;
  errors: string[];
  loading: boolean;
  success: boolean;
  message: string | null;
}

// =================== INITIAL STATE ===================
const initialState: StaffSignupState = {
  formData: {
    personalInfo: {
      fullname: "",
      dob: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      permanentAddress: { address: "", city: "", area: "", pin: "" },
      presentAddress: { address: "", city: "", area: "", pin: "", pickupArea: "" },
      profileImage: null,
      sameAsPresent: false,
    },
    // ✅ Create unique objects for each education row
    education: Array.from({ length: 5 }, () => ({
      sno: "",
      qualification: "",
      year: "",
      marks: "",
      docs: null,
    })),
    jobDetails: {
      jobTitle: "",
      service: "", // ✅ Added this line
      experience: "",
      expertIn: "",
      languages: [],
      description: "",
      workType: "",
      subscription: "",
      uploads: { aadhar: null, cv: null, pan: null, others: null },
    },
  },
  errors: [],
  loading: false,
  success: false,
  message: null,
};

// =================== ASYNC THUNK ===================
export const submitStaffSignup = createAsyncThunk(
  "staffSignup/submit",
  async (formData: StaffSignupForm, { rejectWithValue }) => {
    try {
      const formDataObj = new FormData();

      // Personal Info
      Object.entries(formData.personalInfo).forEach(([key, value]) => {
        if (typeof value === "string") formDataObj.append(key, value);
      });

      // Addresses
      formDataObj.append("permanentAddress", JSON.stringify(formData.personalInfo.permanentAddress));
      formDataObj.append("presentAddress", JSON.stringify(formData.personalInfo.presentAddress));

      // Education
      formData.education.forEach((edu, i) => {
        formDataObj.append(`education[${i}]`, JSON.stringify({ ...edu, docs: undefined }));
        if (edu.docs) formDataObj.append(`educationDocs[${i}]`, edu.docs);
      });

      // Job Details (including service)
      Object.entries(formData.jobDetails).forEach(([key, value]) => {
        if (key === "uploads") return; // Skip files for now
        if (Array.isArray(value)) formDataObj.append(key, JSON.stringify(value));
        else formDataObj.append(key, value as string);
      });

      // Uploads
      Object.entries(formData.jobDetails.uploads).forEach(([k, v]) => {
        if (v) formDataObj.append(k, v);
      });

      const response = await axios.post("http://localhost:8014/api/staffsignup", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  }
);

// =================== SLICE ===================
const staffSignupSlice = createSlice({
  name: "staffSignup",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<StaffSignupForm>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setErrors: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
    },
    clearMessages: (state) => {
      state.message = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitStaffSignup.pending, (state) => {
        state.loading = true;
        state.errors = [];
        state.success = false;
      })
      .addCase(submitStaffSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message || "Signup successful!";
      })
      .addCase(submitStaffSignup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.errors = [action.payload as string];
      });
  },
});

// =================== EXPORTS ===================
export const { setFormData, setErrors, clearMessages } = staffSignupSlice.actions;
export default staffSignupSlice.reducer;
