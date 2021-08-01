import React from "react";
import reactDOM from "react-dom";
import Input from "../Input";
import PasswordInput from "../PasswordInput";
import Button from "../../Button";
import Popup from "../../Popup";
import { useDispatch, useSelector } from "react-redux";
import s from "../Form.module.scss";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "./RegisterSchema";
import { setActivePopup } from "../../../redux/slices/popupSlice";
import { registerUser, resetError } from "../../../redux/slices/userSlice";
import { CloseIcon } from "../../../assets/icons";

const RegisterForm = () => {
  const registerError = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = async (data) => {
    dispatch(registerUser(data));
  };

  React.useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);
  return reactDOM.createPortal(
    <Popup>
      <i className="close-btn" onClick={() => dispatch(setActivePopup(""))}>
        <CloseIcon width="18" height="18" />
      </i>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <Input
          label="Full Name"
          ref={register}
          type="text"
          name="fullName"
          error={!!errors.fullName}
          helperText={errors?.fullName?.message}
        />
        <Input
          label="Email"
          ref={register}
          type="text"
          name="email"
          error={!!errors.email || registerError}
          helperText={errors?.email?.message}
          emailError={registerError}
        />
        <Input
          label="Phone number"
          ref={register}
          type="tel"
          name="phone"
          error={!!errors.phone}
          helperText={errors?.phone?.message}
        />
        <PasswordInput
          label="Password"
          ref={register}
          type="password"
          name="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
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
