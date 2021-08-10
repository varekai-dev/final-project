import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../CartItem';

import s from './CartList.module.scss';

const CartList = () => {
	const orders = useSelector((state) => state.orders.orders);
	return <div className={s.cartList}>{orders && orders.map((order) => <CartItem key={order.id} order={order} component="order" />)}</div>;
};

export default CartList;
