import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { parseCookies, setCookie, destroyCookie } from "nookies";
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

const getInitialToken = () => {
  if (typeof window !== "undefined") {
    const cookies = parseCookies();
    return cookies.token || null;
  }
  return null;
};

const initialState: AuthState = {
  token: getInitialToken(),
  user: null,
  isAuthenticated: typeof window !== "undefined" ? !!getInitialToken() : false,
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
      setCookie(null, "token", token, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      });
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      destroyCookie(null, "token", { path: "/" });
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
      setCookie(null, "registration_email", action.payload.email, {
        maxAge: 24 * 60 * 60,
        path: "/",
      });
    },
    clearRegistrationData: (state) => {
      state.registrationEmail = null;
      state.verificationToken = null;
      destroyCookie(null, "registration_email", { path: "/" });
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
