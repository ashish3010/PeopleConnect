import { signUpRes, resendOTPRes, verifyOTPRes } from "../seeds/auth";

export const handleSignup = () => {
  return signUpRes;
};

export const handleResendOTP = () => {
  return resendOTPRes;
};

export const handleVerifyOTP = () => {
  return verifyOTPRes;
};
