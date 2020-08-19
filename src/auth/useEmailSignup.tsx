import { useState } from 'react';
import { useFire } from '../context/FirebaseContext';
import { internet } from 'faker';
import { InputObject, SignupType, SignupObjectType } from './types';

export const useEmailSignup = () => {
	const [emailInput, setEmail] = useState<string>(internet.email());
	const [passwordInput, setPassword] = useState<string>('chicken');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const { auth } = useFire();

	// objects to spread in the input field
	const email: InputObject = {
		value: emailInput,
		type: 'email',
		required: true,
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
	};
	const password: InputObject = {
		value: passwordInput,
		type: 'password',
		required: true,
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
	};

	const signup: SignupType = {
		onSubmit: async (e: React.SyntheticEvent) => {
			e.preventDefault();
			// todo auth might be undefined might need to think this through
			setLoading(true);
			try {
				await auth!.createUserWithEmailAndPassword(emailInput, passwordInput);
				setLoading(false);
			} catch (error) {
				setError(error);
			}
		},
	};

	const signupObject: SignupObjectType = {
		loading,
		error,
		email,
		password,
		signup,
	};

	return signupObject;
};
