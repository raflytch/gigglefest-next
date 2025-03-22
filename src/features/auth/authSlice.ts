import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User } from "@/types/auth";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  registrationEmail: string | null;
  verificationToken: string | null;
}

const initialState: AuthState = {
  token: typeof window !== "undefined" ? Cookies.get("token") || null : null,
  user: null,
  isAuthenticated:
    typeof window !== "undefined" ? !!Cookies.get("token") : false,
  loading: false,
  error: null,
  registrationEmail: null,
  verificationToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: User }>
    ) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
      Cookies.set("token", token, { expires: 7 });
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      Cookies.remove("token");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    setRegistrationData: (
      state,
      action: PayloadAction<{ email: string; verificationToken: string }>
    ) => {
      state.registrationEmail = action.payload.email;
      state.verificationToken = action.payload.verificationToken;
      Cookies.set("registration_email", action.payload.email, { expires: 1 });
    },
    clearRegistrationData: (state) => {
      state.registrationEmail = null;
      state.verificationToken = null;
      Cookies.remove("registration_email");
    },
  },
});

export const {
  setCredentials,
  logout,
  setLoading,
  setAuthError,
  clearAuthError,
  setRegistrationData,
  clearRegistrationData,
} = authSlice.actions;
export default authSlice.reducer;
