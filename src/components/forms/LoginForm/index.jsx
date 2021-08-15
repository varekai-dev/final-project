import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Input from "../../UI/Input";
import PasswordInput from "../../UI/PasswordInput";
import Button from "../../UI/Button";
import Popup from "../../Popup";
import { loginSchema } from "./LoginShema";
import { setActivePopup } from "../../../redux/slices/popupSlice";
import { loginUser, resetError } from "../../../redux/slices/userSlice";

import s from "../Form.module.scss";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.error);
  const normalizeError = loginError
    ? loginError
        .split("_")
        .map((word) => word.toLowerCase())
        .join(" ")
    : null;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };
  React.useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  return (
    <Popup>
      <form className={s.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <Input
          label="Email"
          {...register("email")}
          type="text"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <PasswordInput
          label="Password"
          type="password"
          {...register("password")}
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
    </Popup>
  );
};

export default LoginForm;
