import { useState, useEffect } from 'react';
import firestore from '../init';
import { Data } from '../types';

export const useAdd = (query: string, payload: any): Data => {
	const [data, setData] = useState<Data>([null, true, []]);

	useEffect(() => {
		const unsubscribe = firestore.collection(query).onSnapshot(
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
	}, []);

	return data;
};
