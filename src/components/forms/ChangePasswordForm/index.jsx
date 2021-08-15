import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../UI/Button";
import PasswordInput from "../../UI/PasswordInput";
import { changeUserPassword } from "../../../redux/slices/userSlice";
import { PasswordSchema } from "./PasswordSchema";

const UserAccount = () => {
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(PasswordSchema),
  });

  const onSubmit = (data) => {
    dispatch(changeUserPassword(data));
  };
  React.useEffect(() => {
    if (error) {
      setError("oldPassword", { message: error });
    }
  }, [error, setError]);
  return (
    <div>
      <h2>Change password</h2>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
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

        <Button
          color="orange"
          type="submit"
          disabled={Object.keys(errors).length !== 0}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default UserAccount;
