import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import s from './CartForm.module.scss';
import { CartSchema } from './CartSchema';
import SelectWithPlaceholder from '../SelectWithPlaceholder';
import Button from '../../Button';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeOrder } from '../../../redux/slices/ordersSlice';

const CartForm = () => {
	const user = useSelector((state) => state.user.userData);
	const orders = useSelector((state) => state.orders.orders);
	const dispatch = useDispatch();
	const price = orders.reduce((current, sum) => sum.price * sum.quantity + current, 0);

	const history = useHistory();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(CartSchema)
	});
	const onSubmit = async (data) => {
		dispatch(makeOrder(data));
	};

	React.useEffect(() => {
		if (user) {
			setValue('fullName', user.account.fullName);
			setValue('phone', user.account.phone);
		}
	}, [user, setValue]);

	return (
		<div className={`${s.cartForm} cart-form`}>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<Input label="Full Name" {...register('fullName')} type="text" name="fullName" error={!!errors.fullName} helperText={errors?.fullName?.message} />
				<Input label="Phone number" {...register('phone')} type="tel" name="phone" error={!!errors.phone} helperText={errors?.phone?.message} />
				<SelectWithPlaceholder setValue={setValue} label="Country" {...register('country')} name="country" error={!!errors.country} helperText={errors?.country?.message} />
				<Input label="City" {...register('city')} type="text" name="city" error={!!errors.city} helperText={errors?.city?.message} />
				<Input label="Address" {...register('address')} type="text" name="address" error={!!errors.address} helperText={errors?.address?.message} />
				<div className={s.info}>
					<div className={s.infoItem}>
						<span>Items</span>
						<span>{orders.length}</span>
					</div>
					<div className={s.infoItem}>
						<span>Total</span>
						<span>$ {price}</span>
					</div>
				</div>
				<Button className={s.submit} color="orange" type="submit">
					Confirms the purchase
				</Button>
				<Button color="transparent" type="button" onClick={() => history.push('/')}>
					Continue shopping
				</Button>
			</form>
		</div>
	);
};

export default CartForm;
