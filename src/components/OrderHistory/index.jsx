import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersFromServer } from '../../redux/slices/ordersSlice';
import OrderItem from '../OrderItem';

import s from './OrderHistory.module.scss';

const OrderHistory = () => {
	const dispatch = useDispatch();
	const ordersFromServer = useSelector((state) => state.orders.ordersFromServer);

	React.useEffect(() => {
		dispatch(fetchOrdersFromServer());
	}, [dispatch]);
	return <div className={s.orderHistory}>{ordersFromServer.length > 0 ? ordersFromServer.map((order) => <OrderItem key={order.id} order={order} />) : <div className={s.orderEmpty}>Currently you have no orders</div>}</div>;
};

export default OrderHistory;
