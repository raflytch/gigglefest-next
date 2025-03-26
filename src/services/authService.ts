import api from "@/lib/api";
import { LoginRequest, LoginResponse, RegisterFormData } from "@/types/auth";

export interface ForgotPasswordRequest {
  email: string;
}

export interface GenerateOtpRequest {
  token: string;
}

export interface VerifyOtpRequest {
  token: string;
  otp: string;
}

export interface ResetPasswordRequest {
  token: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordResponse {
  status: string;
  message: string;
  data: {
    token: string;
  };
}

export interface GenerateOtpResponse {
  status: string;
  message: string;
  data: null;
}

export interface VerifyOtpResponse {
  status: string;
  message: string;
  data: null;
}

export interface ResetPasswordResponse {
  status: string;
  message: string;
  data: null;
}

export const authService = {
  register: async (userData: RegisterFormData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },

  resendVerification: async (email: string) => {
    try {
      const response = await api.post("/auth/resend-verification", { email });
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        throw error.response.data;
      }
      throw error;
    }
  },
};

export const forgotPassword = async (
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const response = await api.post<ForgotPasswordResponse>(
    "/auth/forgot-password",
    data
  );
  return response.data;
};

export const generateOtp = async (
  data: GenerateOtpRequest
): Promise<GenerateOtpResponse> => {
  const response = await api.post<GenerateOtpResponse>(
    "/auth/generate-otp",
    data
  );
  return response.data;
};

export const verifyOtp = async (
  data: VerifyOtpRequest
): Promise<VerifyOtpResponse> => {
  const response = await api.post<VerifyOtpResponse>("/auth/verify-otp", data);
  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await api.post<ResetPasswordResponse>(
    "/auth/reset-password",
    data
  );
  return response.data;
};
