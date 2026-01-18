import CentralLoader from "@/src/components/common/Central-loader";
import dynamic from "next/dynamic";
import React from "react";
import useMedia from "@/src/hooks/useMedia/useMedia";

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
  const { isMobile, isReady } = useMedia();

  if (!isReady) {
    return <CentralLoader />;
  }

  return <div>{isMobile ? <MobileSignup /> : <DesktopSignup />}</div>;
};

export default SignUp;
