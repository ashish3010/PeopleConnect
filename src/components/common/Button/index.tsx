import React from "react";

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
  // If className includes a text color utility, don't set text-white
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
      <span className="flex items-center justify-center gap-2">
        {children}
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
      </span>
    </button>
  );
};

export default Button;
