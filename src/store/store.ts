import { configureStore } from "@reduxjs/toolkit";
import companyReducer from "../slices/companySlice";
import userReducer from '../slices/userSlice';
import deliveryReducer from '../slices/deliveryFormSlice';
import staffSignupReducer from "../slices/staffSignupSlice";

export const store = configureStore({
  reducer: {
    company: companyReducer,
    user: userReducer,
    deliveryForm: deliveryReducer,
    staffSignup: staffSignupReducer,
  },
});

// Types for hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
