import React from "react";
import Moment from "moment";

import CartItem from "../../CartItem";
import Popup from "../../Popup";

import s from "./OrderPopup.module.scss";

const OrderPopup = ({ orderInfo }) => {
  const { address, city, country } = orderInfo.shipment;
  const totalItems = orderInfo.items.reduce(
    (acc, currentValue) => acc + currentValue.quantity,
    0
  );
  return (
    <Popup>
      <div className={s.orderPopup}>
        <div className={s.orderContent}>
          <h1>Order details ID {orderInfo.id} </h1>
          {orderInfo.items.map((order) => (
            <CartItem
              key={order.product.id}
              order={order.product}
              component={"OrderPopup"}
              quantity={order.quantity}
              orderedPrice={order.orderedPrice}
            />
          ))}

          <div className={s.orderInfo}>
            <div className={s.orderInfoLeft}>
              <div className={s.orderInfoTitle}>
                <div>Date:</div>
                <div>Address:</div>
              </div>
              <div className={s.orderInfoData}>
                <div>{Moment(orderInfo.createdAt).format("DD/MM/YYYY ")}</div>
                <div>
                  {address}, {city}, {country}
                </div>
              </div>
            </div>
            <div className={s.orderInfoRight}>
              <div className={s.orderInfoTitle}>
                <div>Items:</div>
                <div>Total:</div>
              </div>
              <div className={s.orderInfoData}>
                <div>{totalItems}</div>
                <div>${orderInfo.totalPrice}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popup>
  );
};

export default OrderPopup;
