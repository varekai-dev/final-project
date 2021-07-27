import React from "react";
import reactDOM from "react-dom";
import Input from "../Input";
import Button from "../../Button";
import Popup from "../../Popup";
import { useDispatch } from "react-redux";
import s from "../Form.module.scss";
import { setActivePopup } from "../../../redux";

const RegisterForm = () => {
  const dispatch = useDispatch();

  return reactDOM.createPortal(
    <Popup>
      <form>
        <h2>Register</h2>
        <Input placeholder="Full Name" />
        <Input placeholder="Email" />
        <Input placeholder="Phone number" />
        <Input placeholder="Password" type="password" />
        <p>
          The password has to be at least at least 1 letter, 1special symbol, 1
          number
        </p>
        <Button color="orange">Register</Button>
      </form>
      <div className={s.login}>
        I already have an account,{" "}
        <span onClick={() => dispatch(setActivePopup("login"))}>Log In</span>
      </div>
    </Popup>,

    document.getElementById("modal")
  );
};

export default RegisterForm;
