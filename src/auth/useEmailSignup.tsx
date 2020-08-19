import { useState } from 'react';
import { useFire } from '../context/FirebaseContext';
import { internet } from 'faker';

export const useEmailSignup = () => {
	const [emailInput, setEmail] = useState<string>(internet.email());
	const [passwordInput, setPassword] = useState<string>('chicken');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const { auth } = useFire();

	// objects to spread in the input field
	const email = {
		value: emailInput,
		type: 'email',
		required: true,
		onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
			setEmail(e.target.value),
	};
	const password = {
		value: passwordInput,
		type: 'password',
		required: true,
		onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
			setPassword(e.target.value),
	};

	const signup = {
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

	return {
		loading,
		error,
		email,
		password,
		signup,
	};
};
