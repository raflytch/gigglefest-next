import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PasswordResetState {
  token: string | null;
  otp: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PasswordResetState = {
  token: null,
  otp: null,
  email: null,
  loading: false,
  error: null,
  success: false,
};

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setOtp: (state, action: PayloadAction<string | null>) => {
      state.otp = action.payload;
    },
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
    },
    resetState: (state) => {
      state.token = null;
      state.otp = null;
      state.email = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  setLoading,
  setError,
  setSuccess,
  setToken,
  setOtp,
  setEmail,
  resetState,
} = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
