import React from "react";

const ChevronIcon = ({ width = 13, height = 8, fill = "#707070" }) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 1.09091L1.04 0L6.5 5.80364L11.96 0L13 1.09091L6.5 8L0 1.09091Z" />
    </svg>
  );
};

export default ChevronIcon;
