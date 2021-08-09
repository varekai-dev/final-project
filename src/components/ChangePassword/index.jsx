import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { PasswordSchema } from './PasswordSchema';
import s from './ChangePassword.module.scss';
import PasswordInput from '../Form/PasswordInput';
import { changeUserPassword } from '../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserAccount = () => {
	const error = useSelector((state) => state.user.error);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(PasswordSchema)
	});

	const onSubmit = async (data) => {
		dispatch(changeUserPassword(data));
	};
	return (
		<div className={s.changePassword}>
			<h2>Change password</h2>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<PasswordInput label="Current password" {...register('oldPassword')} type="password" name="oldPassword" error={!!errors.oldPassword || error} helperText={errors?.oldPassword?.message} />
				<PasswordInput label="New password" {...register('password')} type="password" name="password" error={!!errors.password} helperText={errors?.password?.message} />
				<PasswordInput label="Confirm password" {...register('confirmPassword')} type="password" name="confirmPassword" error={!!errors.confirmPassword} helperText={errors?.confirmPassword?.message} />

				<Button color="orange" type="submit" disabled={Object.keys(errors).length !== 0}>
					Save
				</Button>
			</form>
		</div>
	);
};

export default UserAccount;
