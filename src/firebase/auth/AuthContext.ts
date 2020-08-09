import { createContext } from 'react';
import { userType } from '../types/user-type';

export const AuthContext = createContext<userType>(null);
