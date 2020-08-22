import { useState, useEffect } from 'react';
import { useFire } from '../context';
import handleNoImport from './handleError';
import { DocumentData } from '../types/firestore/data';

export const useReadDoc = (path: string, doc: string): DocumentData => {
	const [data, setData] = useState<DocumentData>([true, null, []]);
	const { firestore } = useFire();

	useEffect(() => {
		// this probably needs to be rethought as im probably not handling the error enough
		handleNoImport(firestore);
		const unsubscribe = firestore!.collection(path).onSnapshot(
			snapshot => {
				setData([
					false,
					null,
					snapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
					})),
				]);
			},
			error => setData([false, error, []]),
		);
		return unsubscribe;
	}, [path]);

	return data;
};
