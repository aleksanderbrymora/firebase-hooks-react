import { SyntheticEvent, ChangeEvent } from 'react';

export type CallbackType = () => void;

export type InputObject = {
  /** The value that will be populated in the input field */
  value: string;
  /** Type of the input field */
  type: string; // todo set only to available input types
  /** Is the input field required */
  required: boolean;
  /** On change handler for the input field */
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * Return structure for every useAuth hook type
 * @param DataType - different depending on what type of auth is chosen
 */
export type AuthReturnType<DataType> = [
  /** Loading indicator */
  boolean,
  /** Error object - can be `null` or an `error` */
  null | Error,
  /** An object with actions/variables used for Authentication */
  DataType,
];

// Types for objects to be spread in the jsx elements
export type EmailPasswordEventType = {
  onSubmit: (e: SyntheticEvent) => Promise<void>;
};

export type SignoutEventType = {
  onClick: (e: SyntheticEvent) => Promise<void>;
};

export type EmailPasswordConfirmEventType = {
  onSubmit: (e: SyntheticEvent) => Promise<void>;
};

export type ProviderEventType = {
  onClick: (e: SyntheticEvent) => Promise<void>;
};

// DataType types for useAuth
export type EmailPasswordDataType = {
  email: InputObject;
  password: InputObject;
  onSignup: EmailPasswordEventType;
};

export type EmailPasswordConfirmDataType = {
  email: InputObject;
  password: InputObject;
  confirmation: InputObject;
  onSignup: EmailPasswordEventType;
};

export type SignoutDataType = {
  onSignout: SignoutEventType;
};

export type ProviderDataType = {
  popup: ProviderEventType;
};

export type ProviderOptions = {
  scopes: string[];
  customParameters: Object;
};
