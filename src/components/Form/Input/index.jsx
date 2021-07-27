import clsx from "clsx";
import React from "react";

import s from "./Input.module.scss";

const Input = ({ className, type, required, placeholder }) => {
  return (
    <div className={clsx(className, s.formItem)}>
      <input type={type} id={placeholder} required={required} />
      <label htmlFor={placeholder}>{placeholder}</label>
    </div>
  );
};

export default Input;
