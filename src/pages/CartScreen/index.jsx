import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import CartList from '../../components/CartList';
import CartForm from '../../components/Form/CartForm';

import s from './CartScreen.module.scss';
const CartScreen = () => {
	const history = useHistory();
	const orders = useSelector((state) => state.orders.orders);
	return (
		<div className={s.cart}>
			<h1>My cart</h1>
			<div className={s.content}>
				{orders.length > 0 ? (
					<>
						<CartList />
						<CartForm />
					</>
				) : (
					<div className={s.cartEmpty}>
						<div>Your cart is empty</div>
						<Button onClick={() => history.goBack()} color="orange">
							GO BACK
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartScreen;
