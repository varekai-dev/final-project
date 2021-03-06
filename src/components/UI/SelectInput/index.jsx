import React from "react";
import Select from "react-select";

const SelectInput = ({
  options,
  icon,
  placeholder,
  defaultValue,
  value,
  ...props
}) => {
  return (
    <div className="select-input">
      <i className="select-input__icon"> {icon}</i>
      <Select
        components={value !== null ? { DropdownIndicator: () => null } : ""}
        options={options}
        classNamePrefix="select"
        isClearable
        defaultValue={defaultValue}
        value={value}
        isSearchable={false}
        placeholder={placeholder}
        className="react-select-container"
        {...props}
      />
    </div>
  );
};

export default SelectInput;
