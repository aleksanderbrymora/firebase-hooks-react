import { useState } from 'react';
import { useFire } from '../context/FirebaseContext';

type StatusType = [boolean, Error | null, boolean];

type SignoutType = {
	status: StatusType;
	signout: SignoutObjectType;
};

type SignoutObjectType = {
	onClick: (e: React.SyntheticEvent) => void;
};

export const useSignout = () => {
	// [loading, error, done]
	const { auth } = useFire();
	const [status, setStatus] = useState<StatusType>([false, null, false]);
	const signOutObject: SignoutObjectType = {
		onClick: async e => {
			setStatus([true, null, false]);
			try {
				await auth!.signOut();
				setStatus([false, null, true]);
			} catch (error) {
				setStatus([false, error, true]);
			}
		},
	};

	const SignoutReturn: SignoutType = {
		status,
		signout: signOutObject,
	};

	return SignoutReturn;
};
