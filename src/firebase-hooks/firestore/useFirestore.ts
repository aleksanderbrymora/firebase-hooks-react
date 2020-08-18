import { useState, useEffect } from 'react';
import { CollectionData } from '../types';
import { useFire } from '../context';
import handleError from './handleError';
import { QueryTypes, InferDocType } from '../types/firestore-params';

export const useFirestore = <QueryType extends QueryTypes>(
	query: QueryType,
	doc?: InferDocType<QueryType>,
) => {
	const [data, setData] = useState<CollectionData>([null, true, null]);
	const { firestore } = useFire();

	handleError(firestore); // handle if not imported

	// todo this is going to be a dense piece of code and it will need refactoring
	useEffect(() => {
		let unsubscribe; // Variable to keep unsubscribe methods from firebase
		if (typeof query === 'string') {
			if (doc) {
				unsubscribe = firestore!
					.collection(query)
					.doc(doc)
					.onSnapshot((snapshot: firebase.firestore.DocumentData) => {
						setData([null, false, snapshot.data()]);
					});
			} else {
				unsubscribe = firestore!.collection(query).onSnapshot(
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
			}
		} else {
		}

		return unsubscribe; // Clean up
	}, [query, doc]);

	return data;
};
