import React from 'react';
import reactDOM from 'react-dom';
import Input from '../Input';
import PasswordInput from '../PasswordInput';
import Button from '../../Button';
import Popup from '../../Popup';
import { useDispatch } from 'react-redux';
import s from '../Form.module.scss';
import { setActivePopup, setUser } from '../../../redux';
import { yupResolver } from '@hookform/resolvers';
import { useForm } from 'react-hook-form';

// import parsePhoneNumberFromString from 'libphonenumber-js';
import { RegisterSchema } from './RegisterSchema';
import axios from 'axios';

const RegisterForm = () => {
	const [emailError, setEmailError] = React.useState(false);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		errors,
		formState: { isDirty, isValid }
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(RegisterSchema)
	});
	const onSubmit = async (data) => {
		try {
			const response = await axios.post('/api/auth/register', data);
			console.log(response);
			dispatch(setUser(response));
			dispatch(setActivePopup(''));
		} catch (error) {
			console.log(error);
			setEmailError(error.response.data);
		}
	};

	return reactDOM.createPortal(
		<Popup>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>Register</h2>
				<Input label="Full Name" ref={register} type="text" name="fullName" error={!!errors.fullName} helperText={errors?.fullName?.message} />
				<Input label="Email" ref={register} type="text" name="email" error={!!errors.email} helperText={errors?.email?.message} />
				<Input label="Phone number" ref={register} type="number" name="phone" error={!!errors.phone} helperText={errors?.phone?.message} />
				<Input label="Password" ref={register} type="password" name="password" error={!!errors.password} helperText={errors?.password?.message} />
				<p>The password has to be at least at least 1 letter, 1special symbol, 1 number</p>
				<Button color="orange">Register</Button>
			</form>
			<div className={s.login}>
				I already have an account, <span onClick={() => dispatch(setActivePopup('login'))}>Log In</span>
			</div>
		</Popup>,

		document.getElementById('modal')
	);
};

export default RegisterForm;
