import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: typeof window !== "undefined" ? Cookies.get("token") || null : null,
  isAuthenticated:
    typeof window !== "undefined" ? !!Cookies.get("token") : false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      Cookies.set("token", token, { expires: 7 });
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove("token");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
