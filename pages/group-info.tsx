import CentralLoader from "@/src/components/common/Central-loader";
import dynamic from "next/dynamic";
import React from "react";
import useMedia from "@/src/hooks/useMedia";

const MobileGroupInfo = dynamic(
  () => import("@/src/components/group-info/m-group-info"),
  {
    loading: () => <CentralLoader />,
    ssr: false,
  }
);
const DesktopGroupInfo = dynamic(
  () => import("@/src/components/group-info/d-group-info"),
  {
    loading: () => <CentralLoader />,
    ssr: false,
  }
);

const GroupInfo = () => {
  const { isMobile, isReady } = useMedia();

  if (!isReady) {
    return <CentralLoader />;
  }

  return <div>{isMobile ? <MobileGroupInfo /> : <DesktopGroupInfo />}</div>;
};

export default GroupInfo;
