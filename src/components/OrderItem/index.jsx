import React from "react";
import Moment from "moment";
import { useDispatch } from "react-redux";

import { setActivePopup } from "../../redux/slices/popupSlice";
import { addSingleOrderItem } from "../../redux/slices/ordersSlice";

import s from "./OrderItem.module.scss";

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();

  const openOrderById = () => {
    dispatch(addSingleOrderItem(order));
    dispatch(setActivePopup("orderPopup"));
  };
  return (
    <div className={s.orderItem}>
      <div className={s.orderLeft}>
        <div className={s.orderTitle}>
          <div>Order ID:</div>
          <div>Date: </div>
        </div>
        <div className={s.orderInfo}>
          <button onClick={openOrderById}>{order.id}</button>
          <div>{Moment(order.createdAt).format("DD.MM.YYYY ")}</div>
        </div>
      </div>
      <div className={s.orderRight}>
        Price <span className={s.orderInfo}>$ {order.totalPrice}</span>
      </div>
    </div>
  );
};

export default OrderItem;
