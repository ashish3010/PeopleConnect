import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

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
        <XMarkIcon
          className="absolute right-0 top-1 w-5 h-5 text-[var(--primary)] cursor-pointer hover:text-[var(--primary-hover)] transition-colors"
          onClick={onRemove}
        />
      )}
    </div>
  );
};

export default FileInput;
