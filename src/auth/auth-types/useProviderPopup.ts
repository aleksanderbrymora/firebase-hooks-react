import firebase from 'firebase/app';
import { useState } from 'react';
import { useFire } from '../../context/FirebaseContext';
import {
  CallbackType,
  AuthReturnType,
  ProviderDataType,
  ProviderOptions,
} from '../types';
import { ProviderType } from './authProviders';

/**
 * Creates a signup hook with provider, like Google
 *
 * @param {ProviderType} provider - a type of provider (like Google) for the authorization
 * @param {ProviderOptions} providerOptions - optional options for things like scoping
 * the data available after signup
 * @param callback - optional callback function
 */
export const useProviderPopup = (
  provider: ProviderType,
  providerOptions?: ProviderOptions,
  callback?: CallbackType,
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const { auth } = useFire();

  const signupAction = async () => {
    setLoading(true);
    try {
      if (providerOptions?.customParameters) {
        provider.setCustomParameters(providerOptions.customParameters);
      }
      // Twitter is one of the only providers without the addScope method
      if (
        providerOptions?.scopes
        && !(provider instanceof firebase.auth.TwitterAuthProvider)
      ) {
        providerOptions.scopes.forEach((s) => provider.addScope(s));
      }
      await auth!.signInWithPopup(provider);
      if (callback) callback();
    } catch (e) {
      setError(e);
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
