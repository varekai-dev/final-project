import { yupResolver } from '@hookform/resolvers';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import PhoneInput from '../PhoneInput';

import s from './CartForm.module.scss';
import { CartSchema } from './CartSchema';
import SelectWithPlaceholder from '../SelectWithPlaceholder';
import Button from '../../Button';
import { useHistory } from 'react-router-dom';

const CartForm = () => {
	const history = useHistory();
	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(CartSchema)
	});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<div className={`${s.cartForm} cart-form`}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input label="Full Name" ref={register} type="text" name="fullName" error={!!errors.fullName} helperText={errors?.fullName?.message} />
				<PhoneInput label="Phone number" ref={register} type="tel" name="phone" error={!!errors.phone} helperText={errors?.phone?.message} />
				<SelectWithPlaceholder label="Country" ref={register} name="country" error={!!errors.country} helperText={errors?.country?.message} />
				<Input label="City" ref={register} type="text" name="city" error={!!errors.city} helperText={errors?.city?.message} />
				<Input label="Address" ref={register} type="text" name="address" error={!!errors.address} helperText={errors?.address?.message} />

				<div>
					<span>Items</span>
					<span>3</span>
				</div>
				<div>
					<span>Total</span>
					<span>$332</span>
				</div>
				<Button color="orange">Confirms the purchase</Button>
				<Button color="transparent" onClick={() => history.push('/')}>
					Continue shopping
				</Button>
			</form>
		</div>
	);
};

export default CartForm;
