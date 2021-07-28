import * as yup from 'yup';

export const RegisterSchema = yup.object().shape({
	fullName: yup
		.string()
		.matches(/^[a-zA-Z\s]+$/, 'Full Name should not contain numbers and special characters')
		.required('Mandatory info missing'),
	password: yup
		.string()
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,35}/, 'Password requirements - at least 1 letter, 1 special symbol, 1 number')
		.required('Mandatory info missing'),
	email: yup.string().email('Email should have correct format').required('Mandatory info missing'),
	phoneNumber: yup
		.string()
		// .matches(/^(\+)?([0-9]){10,14}$/, 'Phone number is not valid')
		.required('Mandatory info missing')
});
