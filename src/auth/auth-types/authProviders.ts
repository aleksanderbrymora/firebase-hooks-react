import firebase from 'firebase/app';

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const githubProvider = new firebase.auth.GithubAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const microsoftProvider = new firebase.auth.OAuthProvider(
  'microsoft.com',
);
export const appleProvider = new firebase.auth.OAuthProvider('apple.com');

export type ProviderType =
  | firebase.auth.GoogleAuthProvider
  | firebase.auth.FacebookAuthProvider
  | firebase.auth.GithubAuthProvider
  | firebase.auth.TwitterAuthProvider
  | firebase.auth.OAuthProvider;
