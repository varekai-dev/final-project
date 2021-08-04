import React from 'react';

import CartList from '../../components/CartList';
import CartForm from '../../components/Form/CartForm';

import s from './CartScreen.module.scss';
const CartScreen = () => {
	return (
		<div className={s.cart}>
			<h1>My cart</h1>
			<div className={s.content}>
				<CartList />
				<CartForm />
			</div>
		</div>
	);
};

export default CartScreen;
