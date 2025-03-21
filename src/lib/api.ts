import axios from "axios";
import Cookies from "js-cookie";
import { store } from "@/features/store";
import { setAuthError } from "@/features/auth/authSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const errorMessage = error.response.data?.message || "An error occurred";
      store.dispatch(setAuthError(errorMessage));

      if (error.response.status === 401) {
        Cookies.remove("token");
      }
    } else if (error.request) {
      store.dispatch(setAuthError("Network error. Please try again."));
    } else {
      store.dispatch(setAuthError(error.message));
    }
    return Promise.reject(error);
  }
);

export default api;
