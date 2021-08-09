import * as yup from 'yup';

export const PasswordSchema = yup.object().shape({
	oldPassword: yup
		.string()
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,35}/, 'Password requirements - at least 1 letter, 1 special symbol, 1 number')
		.required('Mandatory info missing'),
	password: yup
		.string()
		.matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,35}/, 'Password requirements - at least 1 letter, 1 special symbol, 1 number')
		.required('Mandatory info missing'),
	confirmPassword: yup
		.string()
		.required()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
});
