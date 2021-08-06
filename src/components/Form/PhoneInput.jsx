import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import s from './Input/Input.module.scss';

//TODO добавити маску на номер телефона

const PhoneInput = forwardRef(({ className, type, helperText, name, error, label, control }, ref) => {
	return (
		<div className={clsx(className, s.formItem, error && s.error)}>
			<Controller
				control={control}
				name="phone"
				render={({ field }) => {
					return <NumberFormat format="+3 (###) ### ## ##" mask=" " type={type} id={label} required="required" ref={ref} name={name} {...field} />;
				}}
			/>
			<label htmlFor={label}>{label}</label>
			{error && <span>{helperText}</span>}
		</div>
	);
});

export default PhoneInput;
