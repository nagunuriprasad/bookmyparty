import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Address {
  addressLine: string;
  city: string;
  area: string;
  pin: string;
  pickupArea?: string;
}

interface Education {
  sno: string;
  qualification: string;
  year: string;
  marks: string;
  docs: string | File;
}

interface JobUploads {
  aadhar: string | File;
  cv: string | File;
  pan: string | File;
  others: string | File;
}

interface JobDetails {
  jobTitle: string;
  experience: string;
  expertIn: string;
  languages: string;
  description: string;
  workType: string;
  subscription: string;
  uploads: JobUploads;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  permanentAddress: Address;
  presentAddress: Address;
  profileImage: string | File;
}

export interface DeliveryFormState {
  personalInfo: PersonalInfo;
  education: Education[];
  jobDetails: JobDetails;
  errors: string[];
  successMessage: string;
}

const initialState: DeliveryFormState = {
  personalInfo: {
    firstName: '',
    lastName: '',
    dob: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    permanentAddress: { addressLine: '', city: '', area: '', pin: '' },
    presentAddress: { addressLine: '', city: '', area: '', pin: '', pickupArea: '' },
    profileImage: '',
  },
  education: Array(5).fill({
    sno: '',
    qualification: '',
    year: '',
    marks: '',
    docs: '',
  }),
  jobDetails: {
    jobTitle: '',
    experience: '',
    expertIn: '',
    languages: '',
    description: '',
    workType: '',
    subscription: '',
    uploads: { aadhar: '', cv: '', pan: '', others: '' },
  },
  errors: [],
  successMessage: '',
};

// ✅ Async thunk with API call
export const submitDeliveryForm = createAsyncThunk<
  string, // success return type
  DeliveryFormState, // input type
  { rejectValue: string } // error type
>('deliveryForm/submit', async (formData, { rejectWithValue }) => {
  try {
    const formDataToSend = new FormData();

    // Personal info
    Object.entries(formData.personalInfo).forEach(([key, value]) => {
      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else if (typeof value === 'object') {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, value as string);
      }
    });

    // Education array
    formData.education.forEach((edu, index) => {
      Object.entries(edu).forEach(([key, value]) => {
        if (value instanceof File) {
          formDataToSend.append(`education[${index}][${key}]`, value);
        } else {
          formDataToSend.append(`education[${index}][${key}]`, value as string);
        }
      });
    });

    // Job details
    Object.entries(formData.jobDetails).forEach(([key, value]) => {
      if (key === 'uploads') {
        Object.entries(value as JobUploads).forEach(([fKey, fVal]) => {
          if (fVal instanceof File) {
            formDataToSend.append(`jobDetails[uploads][${fKey}]`, fVal);
          } else {
            formDataToSend.append(`jobDetails[uploads][${fKey}]`, fVal as string);
          }
        });
      } else {
        formDataToSend.append(`jobDetails[${key}]`, value as string);
      }
    });

    // ✅ Replace with your backend API URL
    const response = await fetch('http://localhost:8014/api/delivery-form', {
      method: 'POST',
      body: formDataToSend,
    });

    if (!response.ok) {
      const error = await response.json();
      return rejectWithValue(error.message || 'Form submission failed');
    }

    const data = await response.json();
    return data.message || 'Form submitted successfully!';
  } catch (err: any) {
    return rejectWithValue(err.message || 'Something went wrong');
  }
});

const deliveryFormSlice = createSlice({
  name: 'deliveryForm',
  initialState,
  reducers: {
    updatePersonalInfo: (
      state,
      action: PayloadAction<{ key: string; value: any; subSection?: string }>
    ) => {
      const { key, value, subSection } = action.payload;
      if (subSection) {
        (state.personalInfo as any)[subSection][key] = value;
      } else {
        (state.personalInfo as any)[key] = value;
      }
    },
    updateEducation: (
      state,
      action: PayloadAction<{ index: number; key: string; value: any }>
    ) => {
      const { index, key, value } = action.payload;
      state.education[index] = { ...state.education[index], [key]: value };
    },
    updateJobDetails: (
      state,
      action: PayloadAction<{ key: string; value: any; subSection?: string }>
    ) => {
      const { key, value, subSection } = action.payload;
      if (subSection) {
        (state.jobDetails as any)[subSection][key] = value;
      } else {
        (state.jobDetails as any)[key] = value;
      }
    },
    setErrors: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
    },
    clearMessages: (state) => {
      state.errors = [];
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitDeliveryForm.fulfilled, (state, action) => {
        state.successMessage = action.payload;
        state.errors = [];
      })
      .addCase(submitDeliveryForm.rejected, (state, action) => {
        if (action.payload) {
          state.errors = [action.payload];
        } else {
          state.errors = ['Something went wrong!'];
        }
      });
  },
});

export const {
  updatePersonalInfo,
  updateEducation,
  updateJobDetails,
  setErrors,
  clearMessages,
} = deliveryFormSlice.actions;

export default deliveryFormSlice.reducer;
