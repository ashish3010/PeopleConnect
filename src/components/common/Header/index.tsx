import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React from "react";

const Header = ({
  title,
  hideBackButton,
}: {
  title: string;
  hideBackButton?: boolean;
}) => {
  const router = useRouter();

  return (
    <div className="w-full mb-4 px-4 pt-4">
      <div className="flex items-center gap-2">
        {!hideBackButton && (
          <ChevronLeftIcon
            className="w-6 h-6 text-[var(--primary)]"
            onClick={() => router.back()}
          />
        )}
        <h1 className="text-lg font-bold text-[var(--text-primary)]">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default Header;
