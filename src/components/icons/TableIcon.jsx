import React from "react";

const TableIcon = ({ width = 24, height = 24, fill = "#707070" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 21H3C1.9 21 1 20.1 1 19V5C1 3.9 1.9 3 3 3H21C22.1 3 23 3.9 23 5V19C23 20.1 22.1 21 21 21ZM21 5H3V8H21V5Z" />
    </svg>
  );
};

export default TableIcon;
