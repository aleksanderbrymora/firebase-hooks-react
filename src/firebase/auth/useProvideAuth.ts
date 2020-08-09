import { useState } from 'react';
import { userType } from '../types/user-type';
import * as authActions from './authActions/index';

const useProvideAuth = () => {
	const [user, setUser] = useState<userType>(null);
	const signin = async (email: string, password: string) => {
		const res = await authActions.signin(email, password);
		setUser(res);
		return res;
	};
};
