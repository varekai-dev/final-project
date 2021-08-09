import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { addNotification } from '../../redux/slices/notificationSlice';
import './ReactToastify.scss';

const Notification = () => {
	const notification = useSelector((state) => state.notification.notification);
	const dispatch = useDispatch();
	React.useEffect(() => {
		const notify = () => toast.success(`${notification}`);
		if (notification) {
			notify();
			dispatch(addNotification(null));
		}
	}, [dispatch, notification]);
	return (
		<>
			<ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
		</>
	);
};

export default Notification;
