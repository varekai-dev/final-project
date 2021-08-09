import React from 'react';

import { LikeIcon, CartIcon, LogoIcon } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';

import { setActivePopup } from '../../redux/slices/popupSlice';
import { selectUserData } from '../../redux/selectors';
import { Link } from 'react-router-dom';

import UserMenu from '../UserMenu';

const Header = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUserData);
	const orders = useSelector((state) => state.orders.orders);

	return (
		<header className="header">
			<div className="header__inner d-flex justify-between align-center">
				<div className="header-left d-flex justify-between align-center flex">
					<Link to={'/'}>
						<LogoIcon />
					</Link>
					<div className="header-icons">
						<LikeIcon fill="#ffffff" />
						<Link to={'/cart'}>
							{orders.length > 0 && <span className="header-cart__count"> {orders.length}</span>}
							<CartIcon />
						</Link>
					</div>
				</div>

				<div className="header-buttons d-flex justify-between align-center">
					<div className="header-auth d-flex align-center">
						{user ? (
							<UserMenu />
						) : (
							<div className="header-auth__btns">
								<button onClick={() => dispatch(setActivePopup('register'))}>REGISTER</button>

								<button onClick={() => dispatch(setActivePopup('login'))}>LOG IN</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
