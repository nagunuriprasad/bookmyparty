import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../slices/companySlice";
import userReducer from '../slices/userSlice';
import deliveryReducer from '../slices/deliveryFormSlice';
import staffSignupReducer from "../slices/staffSignupSlice";
import vendorReducer from "../slices/vendorSlice";
import walletReducer from "../slices/walletSlice";
import adminReducer from '../slices/adminSlice';
import serviceReducer from "../slices/serviceSlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    user: userReducer,
    deliveryForm: deliveryReducer,
    staffSignup: staffSignupReducer,
    vendor: vendorReducer,
    wallet: walletReducer,
     admin: adminReducer,
     service: serviceReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
