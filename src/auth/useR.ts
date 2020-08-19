import { useEffect, useState } from 'react';
import { useFire } from '../context/FirebaseContext';
export const useR = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [user, setUser] = useState<false | firebase.User>(false);
	const { auth } = useFire();
	useEffect(() => {
		setLoading(true);
		const unsubscribe = auth!.onAuthStateChanged(user => {
			user ? setUser(user) : setUser(false);
			setLoading(false);
		});
		return unsubscribe;
	}, []);
	return { loading, user };
};
