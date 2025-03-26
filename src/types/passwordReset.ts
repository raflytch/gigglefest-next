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
