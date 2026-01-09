import React from "react";
import Button from "@/src/components/common/Button";
import BgSquares from "./bg-squares";
import { useRouter } from "next/router";

const MobileGetStarted = () => {
  const router = useRouter();
  return (
    <div className="md:hidden min-h-screen flex items-center justify-center bg-[var(--primary)] relative">
      <BgSquares />
      <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center py-12 px-4 relative z-10">
        {/* Logo */}
        <div className="mb-10 flex items-center justify-center">
          <div
            className="bg-white shadow-md flex items-center justify-center"
            style={{
              boxShadow: "var(--shadow-md)",
              width: 80,
              height: 80,
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span
              className="text-[3rem] font-bold"
              style={{ color: "var(--primary)" }}
            >
              hi
            </span>
          </div>
        </div>
        {/* Message */}
        <div className="text-center text-white text-lg font-medium mb-10 leading-snug">
          Build meaningful
          <br />
          professional connections.
          <br />
          Create and join groups
          <br />
          with purpose.
        </div>
        {/* Button at bottom */}
        <div className="fixed left-0 right-0 bottom-16 flex justify-center z-20">
          <Button
            className="bg-white text-[var(--primary)] font-semibold text-base shadow-md w-full max-w-xs px-8 rounded-[var(--radius-sm)]"
            onClick={() => router.push("/signup")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileGetStarted;
