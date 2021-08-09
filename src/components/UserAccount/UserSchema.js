import * as yup from 'yup';

export const UserSchema = yup.object().shape({
	fullName: yup
		.string()
		.matches(/^[a-zA-Z\s]+$/, 'Full Name should not contain numbers and special characters')
		.required('Mandatory info missing'),
	email: yup.string().email('Email should have correct format').required('Mandatory info missing'),
	phone: yup
		.string()
		.matches(/^(\+)?([0-9]){10,14}$/, 'Phone number is not valid')
		.required('Mandatory info missing'),
	country: yup.string().required('Mandatory info missing'),
	city: yup.string().required('Mandatory info missing'),
	address: yup.string().required('Mandatory info missing')
});
