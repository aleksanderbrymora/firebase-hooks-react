import { useState, useEffect } from 'react';
import { CollectionData } from '../types';
import { useFire } from '../context';
import handleNoImport from './handleError';

export const useReadDoc = (path: string): CollectionData => {
	const [data, setData] = useState<CollectionData>([null, true, []]);
	const { firestore } = useFire();

	useEffect(() => {
		// this probably needs to be rethought as im probably not handling the error enough
		handleNoImport(firestore);
		const unsubscribe = firestore!.collection(path).onSnapshot(
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
