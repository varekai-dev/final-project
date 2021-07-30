import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { HideIcon, VisibleIcon } from '../../../assets/icons';
import s from '../Input/Input.module.scss';

const PasswordInput = forwardRef((props, ref) => {
	const { className, type, helperText, error, label, ...rest } = props;
	const [passwordShown, setPasswordShown] = React.useState(false);
	const togglePasswordVisiblity = () => {
		setPasswordShown(passwordShown ? false : true);
	};
	return (
		<div className={clsx(className, s.formItem, error && s.error)}>
			<i onClick={togglePasswordVisiblity}>{passwordShown ? <VisibleIcon height="18" width="24" /> : <HideIcon height="24" width="24" />}</i>
			<input type={!passwordShown ? 'password' : 'text'} id={label} required="required" ref={ref} {...rest} />
			<label htmlFor={label}>{label}</label>
			<span>{error && helperText}</span>
			{/* <span> {emailError && emailError}</span> */}
		</div>
	);
});

export default PasswordInput;
