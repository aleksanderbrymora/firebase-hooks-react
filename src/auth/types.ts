import { SyntheticEvent, ChangeEvent } from 'react';

export type CallbackType = () => void;

export type InputObject = {
  value: string;
  type: string; // todo set only to available input types
  required: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

// Return structure for every useAuth hook type
// DataType is different depending on what type of auth is chosen
export type AuthReturnType<DataType> = [
  boolean, // loading
  null | Error, // error
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
