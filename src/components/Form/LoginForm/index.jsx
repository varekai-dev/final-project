import React from "react";
import reactDOM from "react-dom";
import Input from "../Input";
import PasswordInput from "../PasswordInput";
import Button from "../../Button";
import Popup from "../../Popup";
import s from "../Form.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { loginSchema } from "./LoginShema";
import { setActivePopup } from "../../../redux/slices/popupSlice";
import { loginUser, resetError } from "../../../redux/slices/userSlice";
import { CloseIcon } from "../../../assets/icons";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.error);
  const normalizeError = loginError
    ? loginError
        .split("_")
        .map((word) => word.toLowerCase())
        .join(" ")
    : null;
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };
  React.useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  return reactDOM.createPortal(
    <Popup>
      <i className="close-btn" onClick={() => dispatch(setActivePopup(""))}>
        <CloseIcon width="18" height="18" />
      </i>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <Input
          label="Email"
          name="email"
          ref={register}
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <PasswordInput
          label="Password"
          type="password"
          ref={register}
          name="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <Button color="orange">Login</Button>
        {normalizeError && <span>{normalizeError}</span>}
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
