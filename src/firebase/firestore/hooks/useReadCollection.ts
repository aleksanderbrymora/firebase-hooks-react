import { useState, useEffect } from 'react';
import firestore from '../init';
import { Data } from '../../types/firestore-data';

export const useReadCollection = (path: string): Data => {
	const [data, setData] = useState<Data>([null, true, []]);

	useEffect(() => {
		const unsubscribe = firestore.collection(path).onSnapshot(
			(snapshot: { docs: any[] }) => {
				setData([
					null,
					false,
					snapshot.docs.map((doc: { id: number; data: () => object[] }) => ({
						id: doc.id,
						...doc.data(),
					})),
				]);
			},
			(error: firebase.FirebaseError) => setData([error, false, []]),
		);
		return unsubscribe;
	}, [path]);

	return data;
};
