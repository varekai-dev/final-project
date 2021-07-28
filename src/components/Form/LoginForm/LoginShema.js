import * as yup from 'yup';

export const loginSchema = yup.object().shape({
	email: yup.string().email('Email should have correct format').required('Mandatory info missing'),
	password: yup
		.string()
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,35}/, 'Password requirements - at least 1 letter, 1 special symbol, 1 number')
		.required('Mandatory info missing')
});
