import CentralLoader from "@/src/components/common/Central-loader";
import dynamic from "next/dynamic";
import React from "react";
import useMedia from "@/src/hooks/useMedia/useMedia";

const MobileGetStarted = dynamic(
  () => import("@/src/components/get-started/m-get-started"),
  {
    loading: () => <CentralLoader />,
    ssr: false,
  }
);
const DesktopGetStarted = dynamic(
  () => import("@/src/components/get-started/d-get-started"),
  {
    loading: () => <CentralLoader />,
    ssr: false,
  }
);

const GetStarted = () => {
  const { isMobile, isReady } = useMedia();

  if (!isReady) {
    return <CentralLoader />;
  }

  return <div>{isMobile ? <MobileGetStarted /> : <DesktopGetStarted />}</div>;
};

export default GetStarted;
