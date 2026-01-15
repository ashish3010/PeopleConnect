import React from "react";

interface FileInputProps {
  name?: string;
  accept?: string;
  value?: File | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  disabled?: boolean;
  className?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  name = "image",
  accept = "image/*",
  value,
  onChange,
  onRemove,
  disabled = false,
  className = "",
}) => {
  const hasFile = !!value;

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        disabled={disabled || hasFile}
        className="w-full bg-transparent border-0 border-b-2 border-[var(--border)] focus:border-[var(--primary)] outline-none pb-2 pr-10 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-base transition-colors file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary)] file:text-[var(--text-inverse)] hover:file:bg-[var(--primary-hover)] file:cursor-pointer cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      />
      {hasFile && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-0 bottom-2 flex items-center justify-center w-8 h-8 rounded-full hover:bg-[var(--bg-hover)] transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default FileInput;
