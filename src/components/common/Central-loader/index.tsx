import React from "react";
import Spinner from "../Spinner";

interface CentralLoaderProps {
  label?: string;
}

const CentralLoader: React.FC<CentralLoaderProps> = ({  label = "" }) => {

  return (
    <div className="fixed inset-0 bg-[var(--bg-main)] bg-opacity-80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner />
        {label &&<p className="text-sm text-[var(--text-primary)] font-bold">{label}</p>}
      </div>
    </div>
  );
};

export default CentralLoader;
