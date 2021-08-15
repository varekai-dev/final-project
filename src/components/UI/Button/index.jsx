import clsx from "clsx";
import React from "react";

import s from "./Button.module.scss";

const colors = {
  orange: s.buttonOrange,
  blue: s.buttonBlue,
  transparent: s.buttonTransparent,
};

const Button = ({ children, color, className, disabled, ...props }) => {
  return (
    <button
      className={clsx(className, s.button, colors[color])}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
