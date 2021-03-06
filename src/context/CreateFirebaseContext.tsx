/* eslint-disable react/prop-types */
import React from 'react';
import firebase from 'firebase/app';
import { firebaseConfigType } from '../types/firebase';
import { techArray } from '../types/firebase/tech-array';
import { fire, FirebaseContext } from './FirebaseContext';

// import all of the pieces for firebase
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

export const CreateFirebaseContext = (firebaseConfig: firebaseConfigType, tech: techArray) => {
  // initialize app
  const app: firebase.app.App = firebase.initializeApp(firebaseConfig);

  // Adding packages if necessary
  if (tech.includes('auth')) fire.auth = app.auth();
  if (tech.includes('firestore')) fire.firestore = app.firestore();
  if (tech.includes('database')) fire.db = app.database();
  if (tech.includes('storage')) fire.storage = app.storage();

  // create fireProvider wrapper
  const FireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <FirebaseContext.Provider value={fire}>{children}</FirebaseContext.Provider>
  );

  // sharing the provider
  return FireProvider;
};
