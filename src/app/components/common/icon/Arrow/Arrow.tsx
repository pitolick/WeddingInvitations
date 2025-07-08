import React from "react";

interface ArrowProps {
  className?: string;
  width?: number;
  height?: number;
  direction?: "up" | "down" | "left" | "right";
  color?: string;
}

export const Arrow: React.FC<ArrowProps> = ({
  className = "",
  width = 24,
  height = 24,
  direction = "right",
  color = "currentColor",
}) => {
  const getTransform = () => {
    switch (direction) {
      case "up":
        return "rotate(-90)";
      case "down":
        return "rotate(90)";
      case "left":
        return "rotate(180)";
      case "right":
      default:
        return "";
    }
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: getTransform() }}
    >
      <path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Arrow;
