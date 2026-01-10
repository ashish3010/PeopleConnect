import CentralLoader from "@/src/components/common/Central-loader";
import dynamic from "next/dynamic";
import React from "react";

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
  return (
    <div>
      <MobileGetStarted />
      <DesktopGetStarted />
    </div>
  );
};

export default GetStarted;
