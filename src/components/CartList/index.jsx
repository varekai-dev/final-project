import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../CartItem';
import Button from '../Button';
import { useHistory } from 'react-router-dom';

import s from './CartList.module.scss';

const CartList = () => {
	const history = useHistory();
	const orders = useSelector((state) => state.orders.orders);
	return (
		<div className={s.cartList}>
			{orders.length > 0 ? (
				orders.map((order) => <CartItem key={order.id} order={order} />)
			) : (
				<div className={s.cartEmpty}>
					<div>Your cart is empty</div>
					<Button onClick={() => history.goBack()} color="orange">
						GO BACK
					</Button>
				</div>
			)}
		</div>
	);
};

export default CartList;
