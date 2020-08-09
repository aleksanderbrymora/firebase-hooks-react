import { useState, useEffect } from 'react';
import firestore from '../init';
import { Data } from '../../types/firestore-data';

export const useAdd = (query: string, payload: any): Data => {
	const [data, setData] = useState<Data>([null, true, []]);

	useEffect(() => {
		const unsubscribe = firestore.collection(query).onSnapshot(
			(snapshot: { docs: any[] }) => {
				setData([
					null,
					false,
					snapshot.docs.map((doc: { id: string; data: () => object }) => ({
						id: doc.id,
						...doc.data(),
					})),
				]);
			},
			(error: Error | null) => setData([error, false, []]),
		);
		return unsubscribe;
	}, []);

	return data;
};
