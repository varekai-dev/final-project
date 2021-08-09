import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { ChevronIcon } from '../../assets/icons';
import { firstLettersUpperCase } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import { selectUserData } from '../../redux/selectors';

const UserMenu = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const wrapperRef = React.useRef(null);
	const user = useSelector(selectUserData);
	const [isMenuActive, setMenuActive] = React.useState(false);
	const username = user ? user.account.fullName : false;

	const handleClickOutside = (event) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
			setMenuActive(false);
		}
	};
	React.useEffect(() => {
		document.addEventListener('click', handleClickOutside, false);
		return () => {
			document.removeEventListener('click', handleClickOutside, false);
		};
	}, []);

	const handleLogout = async () => {
		dispatch(setUser(null));
		localStorage.removeItem('user');
	};
	const handleSettings = () => {
		history.push('/settings');
		setMenuActive(false);
	};
	return (
		<div ref={wrapperRef} className="header-user__wrapper d-flex align-center">
			<div className="header-user d-flex align-center ">
				<div className="d-flex align-center justify-center" onClick={() => setMenuActive(!isMenuActive)}>
					<div>Welcome, {username}!</div>
					<div className="header-user__logo d-flex align-center justify-center">{firstLettersUpperCase(username)}</div>
					<div className={clsx('header-user__chevron', isMenuActive && 'rotate')}>
						<ChevronIcon fill="#fff" />
					</div>
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
							<button onClick={handleSettings}>Settings</button>
							<button onClick={handleLogout}>Log out</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserMenu;
