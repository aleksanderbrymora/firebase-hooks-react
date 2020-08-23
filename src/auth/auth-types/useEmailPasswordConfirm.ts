import { useState } from 'react';
import { useEmailPassword } from './useEmailPassword';
import {
  InputObject,
  EmailPasswordConfirmEventType,
  AuthReturnType,
  EmailPasswordConfirmDataType,
} from '../types';

// im not sure if this approach is good or not but i wanted to reuse already existing code
// a thing that would make this more clear is
// if i could export the setters for loading and error from the other hook
// for now this should be enough

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

  const confirmation: InputObject = {
    value: passwordConfirm,
    type: 'password',
    required: true,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value),
  };

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
