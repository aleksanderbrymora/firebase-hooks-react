import { useState, useEffect } from 'react';
import { CollectionData } from '../types';
import { useFire } from '../context';
import handleError from './handleError';
import { QueryTypes, InferDocType } from '../types/firestore-params';
import { handleUser } from '../utils/convertToWithUser';
import { useR } from '../auth/useR';

type InferReturnType<T> = [
	boolean,
	null | Error,
	T extends string ? firebase.firestore.DocumentData : firebase.firestore.DocumentData[],
];

export const useReadFS = <QueryType extends QueryTypes>(
	query: QueryType,
	doc?: InferDocType<QueryType>,
): InferReturnType<QueryType> => {
	// const [loading, setLoading] = useState<boolean>(false);
	// const [error, setError] = useState<null | Error>(null);
	// const [data, setData] = useState<CollectionData>([true, null, null]);

	// Checking if firestore has been initialized
	const { firestore } = useFire();
	handleError(firestore); // handle if not imported

	// Checking if query has user in it and replacing it if needed
	const { user } = useR();
	query = handleUser(query, user) as QueryType; // not sure if that actually fixed it

	// There are 3 parts to this hook:
	// - collection string - useReadCollection => array of document objects
	// - collection string + doc string - useReadDoc => document object
	// - query object - useReadQuery => array of document objects
	useEffect(() => {
		let unsubscribe; // Variable to keep unsubscribe methods from firebase
		// checking if query is a string
		if (typeof query === 'string') {
			if (doc) {
				// useReadCollection
				unsubscribe = firestore!
					.collection(query)
					.doc(doc)
					.onSnapshot((snapshot: firebase.firestore.DocumentData) => {
						setData([false, null, snapshot.data()]);
					});
			} else {
				// useReadDoc
				unsubscribe = firestore!.collection(query).onSnapshot(
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
			}
		} else {
			// useReadQuery
		}

		return unsubscribe; // Clean up
	}, [query, doc]);

	return data;
};
