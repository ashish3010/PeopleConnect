import { useRouter } from "next/router";
import React from "react";

const Header = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <div className="w-full mb-4 px-4 pt-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-8 h-8"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="var(--text-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-[var(--text-primary)]">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Header;
