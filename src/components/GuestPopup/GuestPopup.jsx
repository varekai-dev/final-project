import React from "react";
import { useDispatch } from "react-redux";
import { CloseIcon } from "../../assets/icons";
import { setActivePopup } from "../../redux/slices/popupSlice";
import Button from "../Button";
import Popup from "../Popup";

import s from "./GuestPopup.module.scss";

const GuestPopup = () => {
  const dispatch = useDispatch();
  return (
    <Popup>
      <div className={s.guestPopup}>
        <div className={s.content}>
          <i className="close-btn" onClick={() => dispatch(setActivePopup(""))}>
            <CloseIcon width="18" height="18" />
          </i>
          <h2>To continue please register or log in</h2>
          <div className={s.Btns}>
            <Button
              color="orange"
              onClick={() => dispatch(setActivePopup("login"))}
            >
              Continue to sign in
            </Button>
            <Button
              color="orange"
              onClick={() => dispatch(setActivePopup("register"))}
            >
              Continue to register
            </Button>
            <Button
              color="transparent"
              onClick={() => dispatch(setActivePopup(""))}
            >
              Continue as guest
            </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default GuestPopup;
