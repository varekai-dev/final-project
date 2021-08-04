import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import './ReactToastify.scss';
import { addNotification } from '../../redux/slices/ordersSlice';

const Notification = () => {
	const dispatch = useDispatch();
	const notify = (title) =>
		toast.success(
			<>
				The <span> {title}</span> is successfully added to cart
			</>
		);
	const lastOrder = useSelector((state) => state.orders.lastOrder);

	React.useEffect(() => {
		if (lastOrder) {
			notify(lastOrder);
			dispatch(addNotification(null));
		}
	}, [lastOrder, dispatch]);
	return (
		<>
			<ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
		</>
	);
};

export default Notification;
