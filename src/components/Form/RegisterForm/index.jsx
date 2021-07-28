import React from "react";
import reactDOM from "react-dom";
import Input from "../Input";
import PasswordInput from "../PasswordInput";
import Button from "../../Button";
import Popup from "../../Popup";
import { useDispatch } from "react-redux";
import s from "../Form.module.scss";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import parsePhoneNumberFromString from "libphonenumber-js";
import { RegisterSchema } from "./RegisterSchema";
import axios from "axios";
import { setActivePopup } from "../../../redux/slices/popupSlice";
import { setUser } from "../../../redux/slices/userSlice";

const RegisterForm = () => {
  const [emailError, setEmailError] = React.useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(RegisterSchema),
  });
  const normalizePhoneNumber = (e) => {
    const { value } = e.target;
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) {
      return value;
    }
    return phoneNumber.formatInternational();
  };

  console.log(errors);
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/api/auth/register", data);
      dispatch(setUser(response.data));
      dispatch(setActivePopup(""));
    } catch (error) {
      console.log(error);
      setEmailError(error.response.data.error);
    }
  };

  return reactDOM.createPortal(
    <Popup>
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
          error={!!errors.email || emailError}
          helperText={errors?.email?.message}
          emailError={emailError}
        />
        <Input
          label="Phone number"
          ref={register}
          type="tel"
          name="phone"
          error={!!errors.phone}
          helperText={errors?.phone?.message}
          normalizePhoneNumber={normalizePhoneNumber}
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
