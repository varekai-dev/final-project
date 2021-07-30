import axios from 'axios';
import jwtDecode from 'jwt-decode';

export function readUserInfoFromLocalStorage() {
	if (localStorage.getItem('user')) {
		let existUser;
		const user = localStorage.getItem('user');
		const { token } = JSON.parse(user);
		const decodedToken = jwtDecode(token);
		if (decodedToken.exp * 1000 < Date.now()) {
			localStorage.removeItem('user');
		} else {
			existUser = localStorage.getItem('user');
		}

		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
		return JSON.parse(existUser);
	}
}
