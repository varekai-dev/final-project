import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import { PasswordSchema } from "./PasswordSchema";

import s from "./ChangePassword.module.scss";
import PasswordInput from "../Form/PasswordInput";

const UserAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(PasswordSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className={s.changePassword}>
      <h2>Change password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput
          label="Current password"
          {...register("oldPassword")}
          type="password"
          name="oldPassword"
          error={!!errors.oldPassword}
          helperText={errors?.oldPassword?.message}
        />
        <PasswordInput
          label="New password"
          {...register("password")}
          type="password"
          name="password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <PasswordInput
          label="Confirm password"
          {...register("confirmPassword")}
          type="password"
          name="confirmPassword"
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}
        />

        <Button color="orange" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default UserAccount;
