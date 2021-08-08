import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { CloseIcon } from "../../assets/icons";
import { setActivePopup } from "../../redux/slices/popupSlice";
import Button from "../Button";
import Popup from "../Popup";
import s from "./Purchase.module.scss";

const PurchasePopup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleButton = () => {
    dispatch(setActivePopup(null));
    history.push("/");
  };
  return (
    <Popup>
      <div className={s.purchase}>
        <i className="close-btn" onClick={() => dispatch(setActivePopup(null))}>
          <CloseIcon width="18" height="18" />
        </i>
        <div className={s.purchaseContent}>
          <h2>Thank you for your purchase</h2>
          <p>We will send you a notification when your order arrives to you</p>
          <Button color="orange" onClick={handleButton}>
            Continue shopping
          </Button>
          <Button color="transparent"> View order history</Button>
        </div>
      </div>
    </Popup>
  );
};

export default PurchasePopup;
