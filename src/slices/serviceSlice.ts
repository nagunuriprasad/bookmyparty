import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ServiceForm {
  category: string;
  eventType: string;
  subscriptionType: string;
  title: string;
  cost: string;
  shortDescription: string;
  longDescription: string;
  companyInfo: string;
  companyStandards: string;
  tags: string[];
  images: File[];
  videos: File[];
}

interface ServiceState {
  form: ServiceForm;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ServiceState = {
  form: {
    category: "",
    eventType: "",
    subscriptionType: "",
    title: "",
    cost: "",
    shortDescription: "",
    longDescription: "",
    companyInfo: "",
    companyStandards: "",
    tags: [],
    images: [],
    videos: [],
  },
  loading: false,
  error: null,
  success: false,
};

// Async thunk for submitting the form to backend
export const submitServiceForm = createAsyncThunk(
  "service/submitForm",
  async (formData: ServiceForm, { rejectWithValue }) => {
    try {
      const data = new FormData();

      data.append("category", formData.category);
      data.append("eventType", formData.eventType);
      data.append("subscriptionType", formData.subscriptionType);
      data.append("title", formData.title);
      data.append("cost", formData.cost);
      data.append("shortDescription", formData.shortDescription);
      data.append("longDescription", formData.longDescription);
      data.append("companyInfo", formData.companyInfo);
      data.append("companyStandards", formData.companyStandards);
      data.append("tags", JSON.stringify(formData.tags));

      // Append images
      formData.images.forEach((file) => data.append("images", file));
      // Append videos
      formData.videos.forEach((file) => data.append("videos", file));

      // Use axios to send POST request
      const token = localStorage.getItem("token"); // secure token for auth
      const response = await axios.post("http://localhost:8014/api/services", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      // Return custom error message
      return rejectWithValue(error.response?.data?.message || "Failed to submit service");
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    updateForm(state, action: PayloadAction<Partial<ServiceForm>>) {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm(state) {
      state.form = initialState.form;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitServiceForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitServiceForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitServiceForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Submit failed!";
      });
  },
});

export const { updateForm, resetForm } = serviceSlice.actions;
export default serviceSlice.reducer;
