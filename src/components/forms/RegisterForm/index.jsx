import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Input from "../../UI/Input";
import PasswordInput from "../../UI/PasswordInput";
import Button from "../../UI/Button";
import Popup from "../../Popup";
import { RegisterSchema } from "./RegisterSchema";
import { setActivePopup } from "../../../redux/slices/popupSlice";
import { registerUser, resetError } from "../../../redux/slices/userSlice";
import s from "../Form.module.scss";

const RegisterForm = () => {
  const registerError = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(RegisterSchema),
  });

  React.useEffect(() => {
    if (registerError) {
      setError("email", { message: registerError });
    }
  }, [registerError, setError]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };
  React.useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);
  return (
    <Popup>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>
        <Input
          label="Full Name"
          {...register("fullName")}
          type="text"
          name="fullName"
          error={!!errors.fullName}
          helperText={errors?.fullName?.message}
        />
        <Input
          label="Email"
          {...register("email")}
          type="text"
          name="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <Input
          label="Phone number"
          {...register("phone")}
          type="tel"
          name="phone"
          error={!!errors.phone}
          helperText={errors?.phone?.message}
        />
        <PasswordInput
          label="Password"
          {...register("password")}
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
    </Popup>
  );
};

export default RegisterForm;
