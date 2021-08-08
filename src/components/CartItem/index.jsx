import React from "react";
import { useDispatch } from "react-redux";
import { BasketIcon } from "../../assets/icons";
import {
  decreaseQuantity,
  increaseQuantity,
  removeProductFromOrder,
} from "../../redux/slices/ordersSlice";
import Counter from "../Counter";

import s from "./CartItem.module.scss";

const CartItem = ({ order }) => {
  const { id } = order;
  const dispatch = useDispatch();
  const decreaseCount = () => {
    dispatch(decreaseQuantity({ id }));
  };

  const increaseCount = () => {
    dispatch(increaseQuantity({ id }));
  };

  const removeOrder = () => {
    dispatch(removeProductFromOrder({ id }));
  };
  return (
    <div className={s.orderItem}>
      <img src={order.picture} alt={order.title} />

      <div className={s.orderContent}>
        <h2>{order.title}</h2>
        <div className={s.buttons}>
          <button className={s.basket} onClick={removeOrder}>
            <BasketIcon />
          </button>

          <Counter
            decreaseCount={decreaseCount}
            increaseCount={increaseCount}
            count={order.quantity}
          />
        </div>
      </div>
      <div className={s.priceBlock}>
        <div>Price:</div>
        <div className={s.price}>${order.price * order.quantity}</div>
      </div>
    </div>
  );
};

export default CartItem;
