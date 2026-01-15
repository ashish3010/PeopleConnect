import { signUpRes, resendOTPRes } from "../seeds/auth";

export const handleSignup = () => {
  return signUpRes;
};

export const handleResendOTP = () => {
  return resendOTPRes;
};
