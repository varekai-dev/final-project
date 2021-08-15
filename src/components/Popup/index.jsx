import React from "react";
import reactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import { CloseIcon } from "../../assets/icons";
import { setActivePopup } from "../../redux/slices/popupSlice";

import s from "./Popup.module.scss";

const Popup = ({ children }) => {
  const dispatch = useDispatch();
  const loadingStatus = useSelector((state) => state.status.loading);
  const closeModalWindow = (e) => {
    if (e.target.closest(".popup")) {
      return;
    }
    dispatch(setActivePopup(null));
  };

  return reactDOM.createPortal(
    <div className={s.overlay} onClick={closeModalWindow}>
      <div className={`${s.popup} popup`}>
        {!loadingStatus && (
          <i
            className="close-btn"
            onClick={() => dispatch(setActivePopup(null))}
          >
            <CloseIcon width="18" height="18" />
          </i>
        )}

        {children}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Popup;
