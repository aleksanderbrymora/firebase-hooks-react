import { useState } from 'react';
import {
  AuthReturnType,
  EmailPasswordConfirmDataType,
  EmailPasswordConfirmEventType,
} from '../types';
import { createSpreadObject } from './createSpreadObject';
import { useEmailPassword } from './useEmailPassword';

/**
 * Hook for signing up with email and password using firebase auth.
 *
 * @param {() => void} callback - optional callback method
 * @returns {Array} An array of:
 * - `loading` state;
 * - `error` that's coming from firebase or a `null`;
 * - `data` object with `email`, `password`, `confirmation`
 * and onSignup objects that need to be spread
 * in their according JSX elements
 */
export const useEmailPasswordConfirm = (callback?: () => void) => {
  const [
    normalLoading,
    normalError,
    { email, password, onSignup: normalSignup },
  ] = useEmailPassword(callback);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [passwordConfirm, setPasswordConfirm] = useState('chicken');
  const [isConfirmationPhase, setIsConfirmationPhase] = useState(true);

  const confirmation = createSpreadObject(passwordConfirm, 'password', setPasswordConfirm);

  const signupAction = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    if (password.value !== passwordConfirm) {
      // todo check if thats actually correct
      setError({ message: "Passwords don't match", name: 'password mismatch' });
      setLoading(false);
    } else {
      setIsConfirmationPhase(false);
      await normalSignup.onSubmit(e);
    }
  };

  const onSignup: EmailPasswordConfirmEventType = {
    onSubmit: signupAction,
  };

  const signupObject: AuthReturnType<EmailPasswordConfirmDataType> = [
    isConfirmationPhase ? loading : normalLoading,
    isConfirmationPhase ? error : normalError,
    {
      email,
      password,
      confirmation,
      onSignup,
    },
  ];

  return signupObject;
};
