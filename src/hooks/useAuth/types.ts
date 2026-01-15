export interface SignupData {
  email: string;
  name: string;
  contact: string;
  organization: string;
  department: string;
  designation: string;
  linkedin?: string;
  github?: string;
  website?: string;
  image?: File | null;
}

export interface SignupResponse {
  status: boolean;
  message: string;
  name?: string;
}

export interface LoginData {
  email: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  name?: string;
}

export interface VerifyOTPData {
  otp: string;
}

export interface VerifyOTPResponse {
  status: boolean;
  message: string;
}

export interface ResendOTPData {
  email: string;
}

export interface ResendOTPResponse {
  status: boolean;
  message: string;
}
