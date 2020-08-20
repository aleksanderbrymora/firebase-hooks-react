import { useState } from 'react';
import { useFire } from '../../context/FirebaseContext';
import { AuthReturnType, SignoutDataType } from '../types';

export const useSignout = (callback?: () => any) => {
	const { auth } = useFire();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | Error>(null);
	const signOutObject = {
		onClick: async () => {
			setLoading(true);
			try {
				await auth!.signOut();
				setLoading(false);
				if (callback) callback();
			} catch (error) {
				setLoading(false);
				setError(error);
			}
		},
	};

	const SignoutReturn: AuthReturnType<SignoutDataType> = [
		loading,
		error,
		{ onSignout: signOutObject },
	];

	return SignoutReturn;
};
