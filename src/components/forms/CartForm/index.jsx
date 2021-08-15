import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { CartSchema } from "./CartSchema";
import SelectCountry from "../../UI/SelectCountry";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { makeOrder } from "../../../redux/slices/ordersSlice";
import { setActivePopup } from "../../../redux/slices/popupSlice";

import s from "./CartForm.module.scss";

const CartForm = () => {
  const user = useSelector((state) => state.user.userData);
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const price = orders.reduce(
    (current, sum) => sum.price * sum.quantity + current,
    0
  );

  const history = useHistory();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(CartSchema),
  });
  const onSubmit = (data) => {
    dispatch(makeOrder(data));
  };

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

  return (
    <div className={`${s.cartForm} cart-form`}>
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
        <SelectCountry
          clearErrors={clearErrors}
          setValue={setValue}
          label="Country"
          {...register("country")}
          name="country"
          error={!!errors.country}
          helperText={errors?.country?.message}
          defaultValue={user?.account?.country}
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
        <div className={s.info}>
          <div className={s.infoItem}>
            <span>Items</span>
            <span>{orders.length}</span>
          </div>
          <div className={s.infoItem}>
            <span>Total</span>
            <span>$ {price}</span>
          </div>
        </div>
        {user ? (
          <Button className={s.submit} color="orange" type="submit">
            Confirms the purchase
          </Button>
        ) : (
          <Button
            className={s.submit}
            color="orange"
            type="button"
            onClick={() => dispatch(setActivePopup("guestPopup"))}
          >
            Confirms the purchase
          </Button>
        )}

        <Button
          color="transparent"
          type="button"
          onClick={() => history.push("/")}
        >
          Continue shopping
        </Button>
      </form>
    </div>
  );
};

export default CartForm;
