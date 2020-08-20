import { useEmailPassword } from './auth-types/useEmailPassword';
import {
	AuthReturnType,
	InputObject,
	ProviderEventType,
	SignoutEventType,
	EmailPasswordEventType,
} from './types';
import { SyntheticEvent } from 'react';
import { useSignout } from './auth-types/useSignout';
import { useEmailPasswordConfirm } from './auth-types/useEmailPasswordConfirm';
import { useProviderPopup } from './auth-types/useProviderPopup';
import { googleProvider, facebookProvider } from './auth-types/authProviders';

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
	onSignup?: EmailPasswordEventType;
	onSignout?: SignoutEventType;
	popup?: ProviderEventType;
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
		case 'google':
			return useProviderPopup(googleProvider, callback);
		case 'facebook':
			return useProviderPopup(facebookProvider, callback);
		default:
			// handling wrong type of auth action
			throw new Error('No auth method with of type');
	}
};
