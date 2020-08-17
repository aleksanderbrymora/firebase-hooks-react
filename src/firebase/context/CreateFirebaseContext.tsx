import React, { createContext } from 'react';
import { firebaseConfigType } from '../types';
import { techArray } from '../types/tech-array';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

export const CreateFirebaseContext = (
	firebaseConfig: firebaseConfigType,
	tech: techArray,
) => {
	// initialize app
	const app: firebase.app.App = firebase.initializeApp(firebaseConfig);

	// Creating object to hold firebase actions in the provider
	const fire: fireType = {};

	// Adding packages if necessary
	if (tech.includes('auth')) fire.auth = app.auth();
	if (tech.includes('firestore')) fire.firestore = app.firestore();
	if (tech.includes('database')) fire.db = app.database();
	if (tech.includes('storage')) fire.storage = app.storage();

	// create context
	const FireContext = createContext(fire);

	// create fireProvider wrapper
	const FireProvider: React.FC<{ children: React.ReactNode }> = ({
		children,
	}) => <FireContext.Provider value={fire}>{children}</FireContext.Provider>;

	// sharing the provider
	return FireProvider;
};

type fireType = {
	auth?: firebase.auth.Auth;
	db?: firebase.database.Database;
	firestore?: firebase.firestore.Firestore;
	storage?: firebase.storage.Storage;
};
