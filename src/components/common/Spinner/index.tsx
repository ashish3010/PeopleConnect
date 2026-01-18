import React from "react";
import styles from "./spinner.module.css";

interface SpinnerProps {
  size?: "xs" | "s" | "m" | "l" | "xl";
  color?: string;
}

const Spinner = ({ size = "m", color = "var(--primary)" }: SpinnerProps) => {
  const spinnerSize = () => {
    if (size === "xs") {
      return {
        width: "16px",
        height: "16px",
        borderWidth: "2px",
      };
    }
    if (size === "s") {
      return {
        width: "24px",
        height: "24px",
        borderWidth: "2px",
      };
    }
    if (size === "m") {
      return {
        width: "32px",
        height: "32px",
        borderWidth: "3px",
      };
    }
    if (size === "l") {
      return {
        width: "48px",
        height: "48px",
        borderWidth: "5px",
      };
    }
    if (size === "xl") {
      return {
        width: "64px",
        height: "64px",
        borderWidth: "10px",
      };
    }
  };
  return (
    <span
      className={`${styles.loader}`}
      style={{ ...spinnerSize(), borderColor: color }}
    ></span>
  );
};

export default Spinner;
