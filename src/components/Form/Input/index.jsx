import clsx from 'clsx';
import React, { forwardRef } from 'react';
import s from './Input.module.scss';

const Input = forwardRef((props, ref) => {
	const { className, type, helperText, error, label, ...rest } = props;

	return (
		<div className={clsx(className, s.formItem, error && s.error)}>
			<input type={type} id={label} required="required" ref={ref} {...rest} />
			<label htmlFor={label}>{label}</label>
			<span>{error && helperText}</span>
			{/* <span> {emailError && emailError}</span> */}
		</div>
	);
});

export default Input;
