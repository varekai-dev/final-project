import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Button from "../Button";
import { CartSchema } from "../Form/CartForm/CartSchema";
import Input from "../Form/Input";
import SelectWithPlaceholder from "../Form/SelectWithPlaceholder";

import s from "./UserAccount.module.scss";

const UserAccount = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(CartSchema),
  });
  const user = useSelector((state) => state.user.userData);
  React.useEffect(() => {
    if (user) {
      setValue("fullName", user.account.fullName);
      setValue("phone", user.account.phone);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <div className={s.account}>
      <h2>Main information</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <SelectWithPlaceholder
          setValue={setValue}
          label="Country"
          {...register("country")}
          name="country"
          error={!!errors.country}
          helperText={errors?.country?.message}
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
        <Button color="orange" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default UserAccount;
