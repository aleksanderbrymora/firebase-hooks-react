import { useEmailPassword } from './auth-types/useEmailPassword';
import {
  AuthReturnType,
  InputObject,
  ProviderEventType,
  SignoutEventType,
  EmailPasswordEventType,
  ProviderOptions,
} from './types';
import { useSignout } from './auth-types/useSignout';
import { useEmailPasswordConfirm } from './auth-types/useEmailPasswordConfirm';
import { useProviderPopup } from './auth-types/useProviderPopup';
import {
  googleProvider,
  facebookProvider,
  twitterProvider,
  githubProvider,
  appleProvider,
  microsoftProvider,
} from './auth-types/authProviders';

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
  /** email object thats meant to be spread on the input field */
  email?: InputObject;
  /** password object thats meant to be spread on the input field */
  password?: InputObject;
  /** password confirmation object thats meant to be spread on the input field */
  confirmation?: InputObject;
  /** onSignup object thats meant to be spread on the form, like an onSubmit action */
  onSignup?: EmailPasswordEventType;
  /** onSignout object thats meant to be spread on the button, like onClick action */
  onSignout?: SignoutEventType;
  /** signup with popup object thats meant to be spread on the button, like onClick action */
  popup?: ProviderEventType;
}

export const useAuth = (
  authMethod: AuthType,
  providerOptions?: ProviderOptions,
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
      return useProviderPopup(googleProvider, providerOptions, callback);
    case 'facebook':
      return useProviderPopup(facebookProvider, providerOptions, callback);
    case 'twitter':
      return useProviderPopup(twitterProvider, providerOptions, callback);
    case 'github':
      return useProviderPopup(githubProvider, providerOptions, callback);
    case 'apple':
      return useProviderPopup(appleProvider, providerOptions, callback);
    case 'microsoft':
      return useProviderPopup(microsoftProvider, providerOptions, callback);
    default:
      // handling wrong type of auth action
      throw new Error('No auth method with of type');
  }
};
