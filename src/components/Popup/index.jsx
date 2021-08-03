import React from "react";
import reactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { setActivePopup } from "../../redux/slices/popupSlice";

import s from "./Popup.module.scss";

const Popup = ({ children }) => {
  const dispatch = useDispatch();
  const closeModalWindow = (e) => {
    if (e.target.closest(".popup")) {
      return;
    }
    dispatch(setActivePopup(""));
  };
  return reactDOM.createPortal(
    <div className={s.overlay} onClick={closeModalWindow}>
      <div className={`${s.popup} popup`}>{children}</div>
    </div>,
    document.getElementById("modal")
  );
};

export default Popup;
