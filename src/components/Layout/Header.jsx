import React from 'react';
import clsx from 'clsx';
import { LikeIcon, CartIcon, ChevronIcon, LogoIcon } from '../../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { setActivePopup } from '../../redux/slices/popupSlice';
import { selectUserData } from '../../redux/selectors';
import { Link } from 'react-router-dom';

const Header = () => {
	const [isMenuActive, setMenuActive] = React.useState(false);
	const dispatch = useDispatch();
	const user = useSelector(selectUserData);
	const orders = useSelector((state) => state.orders.orders);
	const username = user ? user.account.fullName : false;
	const firstLettersUpperCase = (username) => {
		if (!username) {
			return;
		}
		const userNameFirstLetters = username.split(' ').map((word) => word[0].toUpperCase());
		return userNameFirstLetters.join('');
	};
	const handleLogout = async () => {
		dispatch(setUser(''));
		localStorage.removeItem('user');
	};

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
							<div className="header-user__wrapper d-flex align-center" onClick={() => setMenuActive(!isMenuActive)}>
								<div>Welcome, {username}!</div>
								<div className="header-user d-flex align-center ">
									<div className="header-user__logo d-flex align-center justify-center">{firstLettersUpperCase(username)}</div>
									<div className={clsx('header-user__chevron', isMenuActive && 'rotate')}>
										<ChevronIcon fill="#fff" />
									</div>

									{isMenuActive && (
										<div className="header-settings">
											<div className="header-settings__user">
												<p>
													<b>{username}</b>
												</p>
												<p>{user.account.email}</p>
											</div>
											<div className="header-settings__btns">
												<button>Settings</button>
												<button onClick={handleLogout}>Log out</button>
											</div>
										</div>
									)}
								</div>
							</div>
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
