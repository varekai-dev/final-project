import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { readUserInfoFromLocalStorage } from '../../utils/readUserInfoFromLocalStorage';

const Layout = ({ children }) => {
	const dispatch = useDispatch();
	React.useEffect(() => {
		const user = readUserInfoFromLocalStorage();
		dispatch(setUser(user));
	}, [dispatch]);
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
