import { useState } from 'react';
import { useFire } from '../context/FirebaseContext';
import { internet } from 'faker';
import { InputObject, SignupEventType, SignupObjectType } from './types';

export const useEmailSignup = (afterSignup?: () => void) => {
	const [emailInput, setEmail] = useState<string>(internet.email());
	const [passwordInput, setPassword] = useState<string>('chicken');
	const [passwordConfirmInput, setPasswordConfirm] = useState<null | string>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const { auth } = useFire();

	// objects to spread in the input field
	const email: InputObject<string> = {
		value: emailInput,
		type: 'email',
		required: true,
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
	};

	const password: InputObject<string> = {
		value: passwordInput,
		type: 'password',
		required: true,
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
	};

	const passwordConfirm: InputObject<string | null> = {
		value: passwordConfirmInput,
		type: 'password',
		required: true,
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value),
	};

	const signupAction = async (e?: React.SyntheticEvent) => {
		if (e) e.preventDefault();
		setLoading(true);
		try {
			// todo check if passwords match if option is chosen
			if (passwordConfirm || passwordConfirm === '') {
			}
			// todo auth might be undefined might need to think this through
			await auth!.createUserWithEmailAndPassword(emailInput, passwordInput);
			setLoading(false);
			// handle any after signup function
			if (afterSignup) afterSignup();
		} catch (error) {
			setError(error);
		}
	};

	const onSignup: SignupEventType = {
		onSubmit: signupAction,
	};

	const signupObject: SignupObjectType = {
		loading,
		error,
		email,
		password,
		onSignup,
		passwordConfirm,
	};

	return signupObject;
};
