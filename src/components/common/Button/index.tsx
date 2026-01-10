import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
  type = "button",
  form,
}) => {
  // If className includes a text color utility, don't set text-white
  const hasTextColor = className && /text-(white|\[.*\])/.test(className);
  return (
    <button
      onClick={onClick}
      type={type}
      form={form}
      disabled={disabled}
      className={`w-full py-2 px-8 rounded-[var(--radius-sm)] bg-[var(--primary)] ${
        hasTextColor ? "" : "text-[var(--text-inverse)]"
      } font-medium text-base shadow-sm transition-colors hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed ${
        className || ""
      }`}
      style={{ borderRadius: "var(--radius-sm)" }}
    >
      {children}
    </button>
  );
};

export default Button;
