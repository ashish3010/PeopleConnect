import CentralLoader from "@/src/components/common/Central-loader";
import dynamic from "next/dynamic";
import React from "react";
import useMedia from "@/src/hooks/useMedia/useMedia";

const MobileHome = dynamic(() => import("@/src/components/home/m-home"), {
  loading: () => <CentralLoader />,
  ssr: false,
});
const DesktopHome = dynamic(() => import("@/src/components/home/d-home"), {
  loading: () => <CentralLoader />,
  ssr: false,
});

const Home = () => {
  const { isMobile, isReady } = useMedia();

  if (!isReady) {
    return <CentralLoader />;
  }

  return <div>{isMobile ? <MobileHome /> : <DesktopHome />}</div>;
};

export default Home;
