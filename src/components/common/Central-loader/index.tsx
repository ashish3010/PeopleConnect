import React from "react";
import Spinner from "../Spinner";

interface CentralLoaderProps {
  isLoading?: boolean;
}

const CentralLoader: React.FC<CentralLoaderProps> = ({ isLoading = true }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[var(--bg-main)] bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
      </div>
    </div>
  );
};

export default CentralLoader;
