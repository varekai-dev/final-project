import React, { forwardRef } from "react";
import clsx from "clsx";

import { ChevronIcon, CloseIcon } from "../../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../../redux/slices/ordersSlice";

import s from "./SelectCountry.module.scss";

const SelectCountry = forwardRef(
  (
    {
      helperText,
      error,
      name,
      label,
      setValue,
      defaultValue = "",
      clearErrors,
      ...props
    },
    ref
  ) => {
    const [isOpen, setOpen] = React.useState(false);
    const wrapperRef = React.useRef(null);
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.orders.countries);
    const [selectedItem, setSelectedItem] = React.useState(defaultValue || "");
    const toggleDropdown = () => {
      setOpen(!isOpen);
    };
    const handleItemClick = (id) => {
      selectedItem === id
        ? setSelectedItem(null)
        : setSelectedItem(countries[id].label);
      setValue(name, countries[id].label);
      clearErrors("country");
    };

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    React.useEffect(() => {
      document.addEventListener("click", handleClickOutside, false);
      return () => {
        document.removeEventListener("click", handleClickOutside, false);
      };
    }, []);
    React.useEffect(() => {
      dispatch(fetchCountries());
    }, [dispatch]);
    const handleClose = () => {
      setSelectedItem("");
      setValue(name, "");
    };

    return (
      <>
        <div className={s.dropdownWrapper}>
          <div className={clsx(s.dropdown, error && s.error)}>
            <div
              className={s.dropdownHeader}
              onClick={toggleDropdown}
              ref={wrapperRef}
            >
              <label
                className={clsx(
                  s.label,
                  selectedItem && s.labelActive,
                  error && s.error
                )}
              >
                {label}
              </label>
              <input value={selectedItem} name={name} readOnly {...props} />

              {!selectedItem ? (
                <i className={s.icon}>
                  <ChevronIcon fill={error ? "#f44336" : ""} />
                </i>
              ) : (
                <i onClick={handleClose} className={clsx(s.icon)}>
                  <CloseIcon width="16" height="16" />
                </i>
              )}
            </div>
            <div className={clsx(s.dropdownBody, isOpen && s.open)}>
              {countries &&
                countries.map((item, index) => (
                  <div
                    id={index}
                    className={s.dropdownItem}
                    onClick={(e) => handleItemClick(e.target.id)}
                    key={item.value}
                  >
                    {item.label}
                  </div>
                ))}
            </div>
          </div>
          {error && <span>{helperText}</span>}
        </div>
      </>
    );
  }
);

export default SelectCountry;
