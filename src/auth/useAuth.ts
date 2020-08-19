import { useEmailSignup } from './useEmailSignup';
import { AuthReturnType, SignupDataType, InputObject } from './types';
import { SyntheticEvent } from 'react';
import { useSignout } from './useSignout';

type AuthType =
	| 'emailPassword'
	| 'emailPasswordConfirm'
	| 'google'
	| 'facebook'
	| 'apple'
	| 'twitter'
	| 'github'
	| 'microsoft'
	| 'yahoo'
	| 'phone'
	| 'signout';

interface AllReturnElements {
	email?: InputObject;
	password?: InputObject;
	onSignup?: { onSubmit: (e: SyntheticEvent) => void };
	signout?: { signout: (e: SyntheticEvent) => void };
}

export const useAuth = (
	authMethod: AuthType,
	callback?: () => any,
): AuthReturnType<AllReturnElements> => {
	// a good 'ol switch for all of the auth types and return hooks for each method
	switch (authMethod) {
		case 'emailPassword':
			return useEmailSignup(callback);
		case 'signout':
			return useSignout(callback);
		default:
			// handling wrong type of auth action
			throw new Error('No auth method with of type');
	}
};
