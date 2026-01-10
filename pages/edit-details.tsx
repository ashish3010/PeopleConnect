import CentralLoader from "@/src/components/common/Central-loader";
import dynamic from "next/dynamic";
import React from "react";

const MobileEditDetails = dynamic(
  () => import("@/src/components/edit-details/m-edit-details"),
  {
    loading: () => <CentralLoader />,
    ssr: false,
  }
);
const DesktopEditDetails = dynamic(
  () => import("@/src/components/edit-details/d-edit-details"),
  {
    loading: () => <CentralLoader />,
    ssr: false,
  }
);

const EditDetails = () => {
  return (
    <div>
      <MobileEditDetails />
      <DesktopEditDetails />
    </div>
  );
};

export default EditDetails;
