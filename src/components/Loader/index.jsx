import React from "react";
import reactDom from "react-dom";
import Popup from "../Popup";

import s from "./Loader.module.scss";

const Loader = () => {
  return reactDom.createPortal(
    <Popup>
      <div class={s.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Popup>,

    document.getElementById("modal")
  );
};

export default Loader;
