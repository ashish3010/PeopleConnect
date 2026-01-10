import CentralLoader from "@/src/components/common/Central-loader";
import dynamic from "next/dynamic";
import React from "react";

const MobileOTP = dynamic(() => import("@/src/components/otp/m-otp"), {
  loading: () => <CentralLoader />,
  ssr: false,
});
const DesktopOTP = dynamic(() => import("@/src/components/otp/d-otp"), {
  loading: () => <CentralLoader />,
  ssr: false,
});

const OTP = () => {
  return (
    <div>
      <MobileOTP />
      <DesktopOTP />
    </div>
  );
};

export default OTP;
