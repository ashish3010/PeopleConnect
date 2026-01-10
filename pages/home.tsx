import CentralLoader from "@/src/components/common/Central-loader";
import dynamic from "next/dynamic";
import React from "react";

const MobileHome = dynamic(() => import("@/src/components/home/m-home"), {
  loading: () => <CentralLoader />,
  ssr: false,
});
const DesktopHome = dynamic(() => import("@/src/components/home/d-home"), {
  loading: () => <CentralLoader />,
  ssr: false,
});

const Home = () => {
  return (
    <div>
      <MobileHome />
      <DesktopHome />
    </div>
  );
};

export default Home;
