import React, { useState } from "react";

interface InputProps {
  type?: string;
  name?: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  maxLength,
  required = false,
  className = "",
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;
  const isActive = isFocused || hasValue;

  return (
    <div className={`relative ${className}`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 pt-5 text-[var(--text-primary)] text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed peer"
      />
      <label
        className={`absolute left-0 transition-all duration-200 pointer-events-none ${
          isActive
            ? "top-0 text-xs text-[var(--primary)]"
            : "top-5 text-base text-[var(--text-muted)]"
        }`}
      >
        {label}
        {required && <span className="text-[var(--danger)] ml-1">*</span>}
      </label>
    </div>
  );
};

export default Input;
