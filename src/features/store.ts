import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import passwordResetReducer from "./auth/passwordResetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    passwordReset: passwordResetReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
