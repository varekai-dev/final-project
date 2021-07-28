import React from 'react';
import reactDOM from 'react-dom';
import Input from '../Input';
import PasswordInput from '../PasswordInput';
import Button from '../../Button';
import Popup from '../../Popup';
import s from '../Form.module.scss';
import { useDispatch } from 'react-redux';
import { setActivePopup, setUser } from '../../../redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { loginSchema } from './LoginShema';
import axios from 'axios';

const LoginForm = () => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		errors,
		formState: { isDirty, isValid }
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(loginSchema)
	});
	const onSubmit = async (data) => {
		try {
			const response = await axios.post('/api/auth/login', data);
			console.log(response);
			dispatch(setUser(response.data));
			dispatch(setActivePopup(''));
		} catch (error) {
			console.log(error);
		}
	};

	return reactDOM.createPortal(
		<Popup>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<h2>Login</h2>
				<Input label="Email" name="email" ref={register} error={!!errors.email} helperText={errors?.email?.message} />
				<PasswordInput label="Password" type="password" ref={register} name="password" error={!!errors.password} helperText={errors?.password?.message} />
				<Button color="orange">Login</Button>
			</form>
			<div className={s.login}>
				I have no account, <span onClick={() => dispatch(setActivePopup('register'))}>Register now</span>
			</div>
		</Popup>,

		document.getElementById('modal')
	);
};

export default LoginForm;
