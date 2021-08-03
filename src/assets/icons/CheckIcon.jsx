import React from "react";

const CheckIcon = ({ width = 19, height = 13, fill = "white" }) => {
  return (
    <svg
      width={width}
      fill={fill}
      height={height}
      viewBox="0 0 19 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 1.08765L17.846 0L6.65537 10.7988L1.15395 5.49004L0 6.57769L6.65537 13L19 1.08765Z" />
    </svg>
  );
};

export default CheckIcon;
