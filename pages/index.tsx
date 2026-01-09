import DesktopGetStarted from "@/src/components/get-started/d-get-started";
import MobileGetStarted from "@/src/components/get-started/m-get-started";
import React from "react";

const GetStarted = () => {
  return (
    <div>
      <MobileGetStarted />
      <DesktopGetStarted />
    </div>
  );
};

export default GetStarted;
