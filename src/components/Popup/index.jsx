import React from "react";
import { useDispatch } from "react-redux";
import { setActivePopup } from "../../redux";

import s from "./Popup.module.scss";

const Popup = ({ children }) => {
  const dispatch = useDispatch();
  const closeModalWindow = (e) => {
    if (e.target.closest(".popup")) {
      return;
    }
    dispatch(setActivePopup(""));
  };
  return (
    <div className={s.overlay} onClick={closeModalWindow}>
      <div className={`${s.popup} popup`}>{children}</div>
    </div>
  );
};

export default Popup;
