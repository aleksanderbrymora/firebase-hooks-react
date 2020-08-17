import { useState, useEffect, useContext } from 'react';
import { Data } from '../types';
import { FirebaseContext } from '../context';
import handleNoImport from './handleError';

export const useReadCollection = (path: string): Data => {
	const [data, setData] = useState<Data>([null, true, []]);
	const fireData = useContext(FirebaseContext);

	useEffect(() => {
		// this probably needs to be rethought as im probably not handling the error enough
		handleNoImport(fireData.firestore);
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
