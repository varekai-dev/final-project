import clsx from "clsx";
import React, { forwardRef } from "react";

import s from "./Input.module.scss";

const Input = forwardRef(
  ({ className, type, helperText, error, label, ...rest }, ref) => {
    return (
      <div className={clsx(className, s.formItem, error && s.error)}>
        <input type={type} id={label} required="required" ref={ref} {...rest} />
        <label htmlFor={label}>{label}</label>
        {error && <span>{helperText}</span>}
      </div>
    );
  }
);

export default Input;
