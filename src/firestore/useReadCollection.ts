import { useState, useEffect, useContext } from 'react';
import { useFire } from '../context';
import { CollectionData } from '../types/firestore/data';

export const useReadCollection = (path: string): CollectionData => {
	const [data, setData] = useState<CollectionData>([true, null, []]);
	const { firestore } = useFire();

	useEffect(() => {
		const unsubscribe = firestore!.collection(path).onSnapshot(
			(snapshot: firebase.firestore.QuerySnapshot) => {
				setData([
					false,
					null,
					snapshot.docs.map((doc: firebase.firestore.DocumentData) => ({
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
