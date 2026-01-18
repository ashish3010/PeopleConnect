import React from "react";
import Spinner from "../Spinner";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
  loading = false,
  type = "button",
  form,
}) => {
  const hasTextColor = className && /text-(white|\[.*\])/.test(className);

  return (
    <button
      onClick={onClick}
      type={type}
      form={form}
      disabled={disabled || loading}
      className={`w-full py-2 px-8 rounded-[var(--radius-sm)] bg-[var(--primary)] ${
        hasTextColor ? "" : "text-[var(--text-inverse)]"
      } font-medium text-base shadow-sm transition-colors hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] disabled:opacity-50 disabled:cursor-not-allowed ${
        className || ""
      }`}
      style={{ borderRadius: "var(--radius-sm)" }}
    >
      <span className="flex items-center justify-center gap-1">
        {children}
        {loading && <Spinner size="xs" color="var(--text-inverse)" />}
      </span>
    </button>
  );
};

export default Button;
