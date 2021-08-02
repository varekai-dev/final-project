import clsx from 'clsx';
import React, { forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import s from './Input/Input.module.scss';

const PhoneInput = forwardRef(({ className, type, helperText, error, label, emailError = false, ...rest }, ref) => {
	return (
		<div className={clsx(className, s.formItem, error && s.error)}>
			<NumberFormat format="+3 (###) ### ## ##" mask=" " type={type} id={label} required="required" ref={ref} {...rest} />
			<label htmlFor={label}>{label}</label>
			{error && <span>{helperText}</span>}
		</div>
	);
});

export default PhoneInput;
