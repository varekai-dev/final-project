import React from 'react';
import { useDispatch } from 'react-redux';
import { BasketIcon } from '../../assets/icons';
import { decreaseQuantity, increaseQuantity, removeProductFromOrder } from '../../redux/slices/ordersSlice';
import Counter from '../Counter';

import s from './CartItem.module.scss';

const CartItem = ({ order, component, quantity = null, orderedPrice = null }) => {
	const { id } = order;
	console.log(component);
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
				{component === 'OrderPopup' && (
					<div className={s.items}>
						<div>
							Items: <span>{quantity}</span>{' '}
						</div>
					</div>
				)}
				{component === 'cart' && (
					<div className={s.buttons}>
						<button className={s.basket} onClick={removeOrder}>
							<BasketIcon />
						</button>
						<Counter decreaseCount={decreaseCount} increaseCount={increaseCount} count={order.quantity} />
					</div>
				)}
			</div>
			<div className={s.priceBlock}>
				<div>Price:</div>
				<div className={s.price}>
					{component === 'cart' && `$${order.price * order.quantity}`}
					{component === 'OrderPopup' && `$${orderedPrice * quantity}`}
				</div>
			</div>
		</div>
	);
};

export default CartItem;
