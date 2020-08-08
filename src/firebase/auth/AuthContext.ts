import { createContext } from 'react';
import { userType } from './user-type';

export const AuthContext = createContext<userType>(null);
