import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { internet } from 'faker'; // todo remove any mention of faker
import { useFire } from '../../context/FirebaseContext';
import {
  InputObject,
  EmailPasswordEventType,
  AuthReturnType,
  EmailPasswordDataType,
} from '../types';

export const useEmailPassword = (callback?: () => void) => {
  const [emailInput, setEmail] = useState<string>(internet.email());
  const [passwordInput, setPassword] = useState<string>('chicken');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const { auth } = useFire();

  // objects to spread in the input field
  const email: InputObject = {
    value: emailInput,
    type: 'email',
    required: true,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
  };

  const password: InputObject = {
    value: passwordInput,
    type: 'password',
    required: true,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
  };

  const signupAction = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      // todo auth might be undefined might need to think this through
      await auth!.createUserWithEmailAndPassword(emailInput, passwordInput);
      setLoading(false);
      // handle any after signup function
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
