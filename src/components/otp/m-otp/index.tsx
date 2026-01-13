import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Button from "@/src/components/common/Button";

const MobileOTP = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow numbers
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call logic will be added here later
    // For now, just navigate or handle success
    console.log("OTP submitted:", otp);
    router.push("/home");
  };

  const handleResendOTP = () => {
    // API call logic will be added here later
    console.log("Resending OTP...");
    setResendTimer(60); // Reset timer to 60 seconds
  };

  const isFormValid = otp.trim().length === 6;

  return (
    <div className="md:hidden">
      <div className="min-h-screen bg-[var(--bg-main)] flex flex-col">
        {/* Header outside the card */}
        <div className="w-full mb-4 px-4 pt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-8 h-8"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="var(--text-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-[var(--text-primary)]">
              Hi Fix
            </h1>
          </div>
        </div>

        {/* Main white card */}
        <div className="w-full bg-[var(--bg-card)] rounded-t-3xl shadow-lg overflow-hidden flex-1 flex flex-col pb-24">
          <div className="flex-1 overflow-y-auto px-6 pt-6">
            {/* Greeting text */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] leading-tight">
                Enter OTP
                <br />
                Verification Code
              </h2>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              id="otp-form"
              className="space-y-6 pb-4"
            >
              {/* OTP input */}
              <div className="relative">
                <label className="block text-sm text-[var(--text-muted)] mb-1">
                  OTP <span className="text-[var(--danger)]">*</span>
                </label>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={handleChange}
                  maxLength={6}
                  className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base transition-colors text-center text-2xl tracking-widest"
                  required
                />
              </div>

              {/* Resend OTP */}
              <div className="flex items-center justify-end mt-4">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={resendTimer > 0}
                  className="text-sm font-bold text-[var(--primary)] hover:text-[var(--primary-hover)] disabled:text-[var(--text-muted)] disabled:cursor-not-allowed transition-colors"
                >
                  {resendTimer > 0
                    ? `Resend OTP in ${resendTimer}s`
                    : "Resend OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Fixed button at bottom of viewport */}
        <div className="fixed bottom-0 left-0 right-0 px-6 pb-6 pt-4 bg-[var(--bg-card)] border-t border-[var(--border)] z-10">
          <Button
            type="submit"
            form="otp-form"
            disabled={!isFormValid}
            className="h-10 rounded-xl font-semibold"
          >
            Verify OTP
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileOTP;
