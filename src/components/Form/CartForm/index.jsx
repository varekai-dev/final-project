import { yupResolver } from '@hookform/resolvers';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import PhoneInput from '../PhoneInput';

import s from './CartForm.module.scss';
import { CartSchema } from './CartSchema';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../../redux/slices/ordersSlice';
import Select from 'react-select';

const CartForm = () => {
	const dispatch = useDispatch();
	const countries = useSelector((state) => state.orders.countries);
	const [country, setCountry] = React.useState('');
	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(CartSchema)
	});
	const changeCountry = () => {
		setCountry();
	};
	const onSubmit = () => {};

	React.useEffect(() => {
		dispatch(fetchCountries());
	}, [dispatch]);
	return (
		<div className={s.cartForm}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input label="Full Name" ref={register} type="text" name="fullName" error={!!errors.fullName} helperText={errors?.fullName?.message} />
				<PhoneInput label="Phone number" ref={register} type="tel" name="phone" error={!!errors.phone} helperText={errors?.phone?.message} />
				<Select components={country !== null ? { DropdownIndicator: () => null } : ''} options={countries} classNamePrefix="select" isClearable isSearchable={false} placeholder="Country" onChange={changeCountry} className="react-select-container" />
			</form>
		</div>
	);
};

export default CartForm;
