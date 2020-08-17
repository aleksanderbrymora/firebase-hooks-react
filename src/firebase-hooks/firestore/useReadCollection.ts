import { useState, useEffect, useContext } from 'react';
import { Data } from '../types';
import { FirebaseContext } from '../context';

export const useReadCollection = (path: string): Data => {
	const [data, setData] = useState<Data>([null, true, []]);
	const fireData = useContext(FirebaseContext);

	useEffect(() => {
		const unsubscribe = fireData.firestore!.collection(path).onSnapshot(
			(snapshot) => {
				setData([
					null,
					false,
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					})),
				]);
			},
			(error) => setData([error, false, []]),
		);
		return unsubscribe;
	}, [path]);

	return data;
};
