import { useState, useEffect, useContext } from 'react';
import { CollectionData } from '../types';
import { useFire } from '../context';
import handleNoImport from './handleError';

export const useReadCollection = (path: string): CollectionData => {
	const [data, setData] = useState<CollectionData>([null, true, []]);
	const { firestore } = useFire();

	useEffect(() => {
		// this probably needs to be rethought as im probably not handling the error enough
		handleNoImport(firestore);
		const unsubscribe = firestore!.collection(path).onSnapshot(
			(snapshot: firebase.firestore.QuerySnapshot) => {
				setData([
					null,
					false,
					snapshot.docs.map((doc: firebase.firestore.DocumentData) => ({
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