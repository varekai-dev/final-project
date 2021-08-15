import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { changeUserData } from "../../../redux/slices/userSlice";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import SelectCountry from "../../UI/SelectCountry";
import { UserSchema } from "../../UserAccount/UserSchema";

const ChangeUserInfoForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(UserSchema),
  });
  const user = useSelector((state) => state.user.userData);
  React.useEffect(() => {
    if (user) {
      setValue("fullName", user.account.fullName);
      setValue("phone", user.account.phone);
      setValue("email", user.account.email);
      setValue("country", user.account.country);
      setValue("city", user.account.city);
      setValue("address", user.account.address);
    }
  }, [user, setValue]);
  const onSubmit = (data) => {
    dispatch(changeUserData(data));
  };
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Full Name"
        {...register("fullName")}
        type="text"
        name="fullName"
        error={!!errors.fullName}
        helperText={errors?.fullName?.message}
      />
      <Input
        label="Phone number"
        {...register("phone")}
        type="tel"
        name="phone"
        error={!!errors.phone}
        helperText={errors?.phone?.message}
      />
      <Input
        label="Email"
        {...register("email")}
        type="text"
        name="email"
        error={!!errors.email}
        helperText={errors?.email?.message}
      />
      <SelectCountry
        setValue={setValue}
        label="Country"
        {...register("country")}
        name="country"
        error={!!errors.country}
        helperText={errors?.country?.message}
        defaultValue={user?.account?.country}
        clearErrors={clearErrors}
      />
      <Input
        label="City"
        {...register("city")}
        type="text"
        name="city"
        error={!!errors.city}
        helperText={errors?.city?.message}
      />
      <Input
        label="Address"
        {...register("address")}
        type="text"
        name="address"
        error={!!errors.address}
        helperText={errors?.address?.message}
      />
      <Button
        color="orange"
        type="submit"
        disabled={Object.keys(errors).length !== 0}
      >
        Save
      </Button>
    </form>
  );
};

export default ChangeUserInfoForm;
