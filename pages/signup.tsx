import CentralLoader from "@/src/components/common/Central-loader";
import dynamic from "next/dynamic";
import React from "react";

const MobileSignup = dynamic(() => import("@/src/components/signup/m-signup"), {
  loading: () => <CentralLoader />,
  ssr: false,
});
const DesktopSignup = dynamic(
  () => import("@/src/components/signup/d-signup"),
  {
    loading: () => <CentralLoader />,
    ssr: false,
  }
);

const SignUp = () => {
  return (
    <div>
      <MobileSignup />
      <DesktopSignup />
    </div>
  );
};

export default SignUp;
