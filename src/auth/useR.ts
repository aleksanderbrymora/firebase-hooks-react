import {useEffect, useState} from 'react';
import {useFire} from '../context';

export const useR = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [user, setUser] = useState<false | firebase.User>(false);
	const { auth } = useFire();
	useEffect(() => {
		setLoading(true);
		return auth!.onAuthStateChanged(user => {
			user ? setUser(user) : setUser(false);
			setLoading(false);
		});
	}, []);
	return { loading, user };
};
