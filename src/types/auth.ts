export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
  // Add other user properties as needed
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  age: number;
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  isPending?: boolean;
}

export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: number;
      email: string;
      name: string;
      age: number;
      phoneNumber: string;
      role: string;
      isVerified: boolean;
      verificationToken: string;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
}

export interface ResendVerificationResponse {
  status: string;
  message: string;
  data: {
    message: string;
  };
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ErrorResponse {
  success: boolean;
  message: string;
}
