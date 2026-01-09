import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  // If className includes a text color utility, don't set text-white
  const hasTextColor = className && /text-(white|\[.*\])/.test(className);
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 px-8 rounded-[var(--radius-sm)] bg-[var(--bg-card)] ${
        hasTextColor ? '' : 'text-white'
      } font-medium text-base shadow-sm transition-colors hover:bg-[var(--primary-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${
        className || ""
      }`}
      style={{ borderRadius: "var(--radius-sm)" }}
    >
      {children}
    </button>
  );
};

export default Button;
