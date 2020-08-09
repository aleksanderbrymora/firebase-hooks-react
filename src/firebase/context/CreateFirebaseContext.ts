import { createContext } from 'react';
// Todo this is broken

import { firebaseConfigType } from '../types/firebase-config-type';
import {
	techArray,
	auth as authType,
	database as databaseType,
	firestore as firestoreType,
	storage as storageType,
} from '../types/tech-array';
import { allowedNodeEnvironmentFlags } from 'process';

export const CreateFirebaseContext = (
	firebaseConfig: firebaseConfigType,
	tech: techArray,
) => {
	type hooksCollectionType = {
		firestore: tech.includes('firestore') ? firestoreType : never,
		database: tech
	}
};
