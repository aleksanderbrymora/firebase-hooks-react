import { useFire } from '../../context/FirebaseContext';
import { useState, SyntheticEvent } from 'react';
import { CallbackType, AuthReturnType, ProviderDataType } from '../types';

export const useProviderPopup = (
	provider: firebase.auth.GoogleAuthProvider,
	callback?: CallbackType,
) => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<null | Error>(null);
	const { auth } = useFire();

	const signupAction = async () => {
		setLoading(true);
		try {
			await auth!.signInWithPopup(provider);
			if (callback) callback();
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	const popupObject = {
		onClick: signupAction,
	};

	const signupObject: AuthReturnType<ProviderDataType> = [
		loading,
		error,
		{ popup: popupObject },
	];

	return signupObject;
};
