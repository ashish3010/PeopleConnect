import { useMutation } from "@tanstack/react-query";
import { post } from "@/src/network";
import {
  LoginData,
  LoginResponse,
  SignupData,
  SignupResponse,
  VerifyOTPData,
  VerifyOTPResponse,
  ResendOTPData,
  ResendOTPResponse,
} from "./types";

const useAuth = () => {
  const signupMutation = useMutation<SignupResponse, Error, SignupData>({
    mutationFn: async (data: SignupData) => {
      const response = await post<SignupResponse>("/signup", data);
      return response.data;
    },
  });

  const loginMutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: async (data: LoginData) => {
      const response = await post<LoginResponse>("/login", data);
      return response.data;
    },
  });

  const verifyOTPMutation = useMutation<
    VerifyOTPResponse,
    Error,
    VerifyOTPData
  >({
    mutationFn: async (data: VerifyOTPData) => {
      const response = await post<VerifyOTPResponse>("/verify-otp", data);
      return response.data;
    },
  });

  const resendOTPMutation = useMutation<
    ResendOTPResponse,
    Error,
    ResendOTPData
  >({
    mutationFn: async (data: ResendOTPData) => {
      const response = await post<ResendOTPResponse>("/resend-otp", data);
      return response.data;
    },
  });

  const signup = {
    signup: signupMutation.mutateAsync,
    isSignupLoading: signupMutation.isPending,
    isSignupSuccess: signupMutation.isSuccess,
    signupError: signupMutation.error,
    signupData: signupMutation.data,
  };

  const login = {
    login: loginMutation.mutateAsync,
    isLoginLoading: loginMutation.isPending,
    isLoginSuccess: loginMutation.isSuccess,
    loginError: loginMutation.error,
    loginData: loginMutation.data,
  };

  const verifyOTP = {
    verifyOTP: verifyOTPMutation.mutateAsync,
    isVerifyOTPLoading: verifyOTPMutation.isPending,
    isVerifyOTPSuccess: verifyOTPMutation.isSuccess,
    verifyOTPError: verifyOTPMutation.error,
    verifyOTPData: verifyOTPMutation.data,
  };

  const resendOTP = {
    resendOTP: resendOTPMutation.mutateAsync,
    isResendOTPLoading: resendOTPMutation.isPending,
    isResendOTPSuccess: resendOTPMutation.isSuccess,
    resendOTPError: resendOTPMutation.error,
    resendOTPData: resendOTPMutation.data,
  };

  return { ...signup, ...login, ...verifyOTP, ...resendOTP };
};

export default useAuth;
