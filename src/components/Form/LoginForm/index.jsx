import React from "react";
import reactDOM from "react-dom";
import Input from "../Input";
import Button from "../../Button";
import Popup from "../../Popup";

import s from "../Form.module.scss";
import { useDispatch } from "react-redux";
import { setActivePopup } from "../../../redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  return reactDOM.createPortal(
    <Popup>
      <form>
        <h2>Login</h2>

        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />

        <Button color="orange">Login</Button>
      </form>
      <div className={s.login}>
        I have no account,{" "}
        <span onClick={() => dispatch(setActivePopup("register"))}>
          Register now
        </span>
      </div>
    </Popup>,

    document.getElementById("modal")
  );
};

export default LoginForm;
