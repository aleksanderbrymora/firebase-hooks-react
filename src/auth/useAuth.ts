import { useEmailPassword } from './auth-types/useEmailPassword';
import { AuthReturnType, InputObject } from './types';
import { SyntheticEvent } from 'react';
import { useSignout } from './auth-types/useSignout';
import { useEmailPasswordConfirm } from './auth-types/useEmailPasswordConfirm';

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
	confirmation?: InputObject;
	onSignup?: { onSubmit: (e: SyntheticEvent) => void };
	onSignout?: { onClick: (e: SyntheticEvent) => void };
}

export const useAuth = (
	authMethod: AuthType,
	callback?: () => any,
): AuthReturnType<AllReturnElements> => {
	// a good 'ol switch for all of the auth types and return hooks for each method
	switch (authMethod) {
		case 'emailPassword':
			return useEmailPassword(callback);
		case 'signout':
			return useSignout(callback);
		case 'emailPasswordConfirm':
			return useEmailPasswordConfirm(callback);

		default:
			// handling wrong type of auth action
			throw new Error('No auth method with of type');
	}
};
