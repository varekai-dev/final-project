import React from "react";
import reactDOM from "react-dom";
import Input from "../Input";
import PasswordInput from "../PasswordInput";
import Button from "../../Button";
import Popup from "../../Popup";
import s from "../Form.module.scss";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { loginSchema } from "./LoginShema";
import axios from "axios";
import { setActivePopup } from "../../../redux/slices/popupSlice";
import { setUser } from "../../../redux/slices/userSlice";

const LoginForm = () => {
  const [serverError, setServerError] = React.useState(false);
  console.log(serverError);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      dispatch(setUser(response.data));
      dispatch(setActivePopup(""));
      setServerError(false);
    } catch (error) {
      setServerError("Incorrect email or password");
    }
  };

  return reactDOM.createPortal(
    <Popup>
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
        {serverError && <span>{serverError}</span>}
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
