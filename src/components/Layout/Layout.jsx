import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { readUserInfoFromLocalStorage } from '../../utils/readUserInfoFromLocalStorage';
import LoginForm from '../Form/LoginForm';
import RegisterForm from '../Form/RegisterForm';
import Loader from '../Loader';

import GuestPopup from '../GuestPopup/GuestPopup';
import PurchasePopup from '../PurchasePopup';
import ProductPopup from '../ProductPopup';
import OrderPopup from '../OrderPopup';

const Layout = ({ children }) => {
	const id = useSelector((state) => state.popup.activeProduct);
	const activePopup = useSelector((state) => state.popup.activePopup);
	const loadingStatus = useSelector((state) => state.status.loading);
	const userInStore = useSelector((state) => state.user.userData);
	const orderInfo = useSelector((state) => state.orders.singleOrderItem);
	const popups = {
		guestPopup: <GuestPopup />,
		register: <RegisterForm />,
		login: <LoginForm />,
		purchasePopup: <PurchasePopup />,
		product: <ProductPopup id={id} />,
		orderPopup: <OrderPopup orderInfo={orderInfo} />
	};
	const dispatch = useDispatch();
	const user = readUserInfoFromLocalStorage();
	React.useEffect(() => {
		if (user && !userInStore) {
			dispatch(setUser(user));
		}
	}, [dispatch, user, userInStore]);
	return (
		<>
			<Header />
			{loadingStatus && <Loader />}
			{activePopup && popups[activePopup]}
			{children}
			<Footer />
		</>
	);
};

export default Layout;
