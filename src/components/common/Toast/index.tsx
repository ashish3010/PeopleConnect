import React, { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  duration = 3000,
  onClose,
  position = "bottom-center",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = React.useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300); // Animation duration
  }, [onClose]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          iconBg: "bg-[var(--success)]",
          iconColor: "text-white",
          closeColor: "text-[var(--success)]",
          bgColor: "bg-[var(--success)]/10",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "error":
        return {
          iconBg: "bg-[var(--danger)]",
          iconColor: "text-white",
          closeColor: "text-[var(--danger)]",
          bgColor: "bg-[var(--danger)]/10",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "warning":
        return {
          iconBg: "bg-[var(--warning)]",
          iconColor: "text-white",
          closeColor: "text-[var(--warning)]",
          bgColor: "bg-[var(--warning)]/10",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      default:
        return {
          iconBg: "bg-[var(--info)]",
          iconColor: "text-white",
          closeColor: "text-[var(--info)]",
          bgColor: "bg-[var(--info)]/10",
          icon: (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16V12M12 8H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case "top-right":
        return "top-4 right-4";
      case "top-left":
        return "top-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2";
      case "bottom-center":
        return "bottom-4 left-1/2 transform -translate-x-1/2";
      default:
        return "top-4 right-4";
    }
  };

  const typeStyles = getTypeStyles();
  const positionStyles = getPositionStyles();

  return (
    <div
      className={`fixed ${positionStyles} z-50 transition-all duration-300 ${
        isExiting
          ? "opacity-0 translate-y-[-10px]"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div
        className={`${typeStyles.bgColor} rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px] flex items-center gap-3 backdrop-blur-md h-16`}
      >
        {/* Circular Icon */}
        <div
          className={`${typeStyles.iconBg} ${typeStyles.iconColor} w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}
        >
          {typeStyles.icon}
        </div>

        {/* Message */}
        <div className="flex-1">
          <p
            className="text-[var(--text-primary)]"
            style={{ fontSize: "15px", fontWeight: "500" }}
          >
            {message}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`${typeStyles.closeColor} hover:opacity-80 transition-opacity flex-shrink-0`}
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
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;
