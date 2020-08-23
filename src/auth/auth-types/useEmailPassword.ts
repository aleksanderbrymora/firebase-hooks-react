import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { internet } from 'faker'; // todo remove any mention of faker
import { useFire } from '../../context/FirebaseContext';
import {
  EmailPasswordEventType,
  AuthReturnType,
  EmailPasswordDataType,
} from '../types';
import { createSpreadObject } from './createSpreadObject';

/**
 * Hook for signing up with email and password using firebase auth.
 *
 * @param {() => void} callback - optional callback method
 * @returns {Array} An array of:
 * - `loading` state;
 * - `error` that's coming from firebase or a `null`;
 * - `data` object with `email`, `password` and `onSignup` objects that need to be spread
 * in their according JSX elements
 */
export const useEmailPassword = (callback?: () => void) => {
  const [emailInput, setEmail] = useState<string>(internet.email());
  const [passwordInput, setPassword] = useState<string>('chicken');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { auth } = useFire();

  const email = createSpreadObject(emailInput, 'email', setEmail);
  const password = createSpreadObject(passwordInput, 'password', setPassword);
  const signupAction = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await auth!.createUserWithEmailAndPassword(emailInput, passwordInput);
      setLoading(false);
      if (callback) callback();
    } catch (err) {
      setError(err);
    }
  };

  const onSignup: EmailPasswordEventType = {
    onSubmit: signupAction,
  };

  const signupObject: AuthReturnType<EmailPasswordDataType> = [
    loading,
    error,
    { email, password, onSignup },
  ];

  return signupObject;
};
