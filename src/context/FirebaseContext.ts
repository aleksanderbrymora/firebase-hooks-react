import { createContext, useContext } from 'react';
import { fireType } from '../types/firebase';

// Creating object to hold firebase actions in the provider
// and passing it into the fireContext to be available in the project
export const fire: fireType = {};
export const FirebaseContext = createContext(fire);

export const useFire = () => useContext(FirebaseContext);
