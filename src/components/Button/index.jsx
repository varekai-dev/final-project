import clsx from "clsx";
import React from "react";

import s from "./Button.module.scss";

const colors = {
  orange: s.buttonOrange,
  blue: s.buttonBlue,
};

const Button = ({ onClick, children, color, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(className, s.button, colors[color])}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
