import * as yup from 'yup';

export const CartSchema = yup.object().shape({
	fullName: yup
		.string()
		.matches(/^[a-zA-Z\s]+$/, 'Full Name should not contain numbers and special characters')
		.required('Mandatory info missing'),

	phone: yup
		.string()
		.matches(/^(\+)?([0-9]){10,14}$/, 'Phone number is not valid')
		.required('Mandatory info missing')
});
