import { useState, useEffect } from 'react';
import { CollectionData } from '../types';
import { useFire } from '../context';
import handleError from './handleError';
import { QueryTypes, InferDocType } from '../types/firestore-params';
import { handleUser } from '../utils/convertToWithUser';
import { useR } from '../auth/useR';

export const useFirestore = <QueryType extends QueryTypes>(
	query: QueryType,
	doc?: InferDocType<QueryType>,
) => {
	const [data, setData] = useState<CollectionData>([true, null, null]);
	const { firestore } = useFire();
	const { user } = useR();

	handleError(firestore); // handle if not imported

	query = handleUser(query, user) as QueryType; // not sure if that actually fixed it

	// todo this is going to be a dense piece of code and it will need refactoring
	useEffect(() => {
		let unsubscribe; // Variable to keep unsubscribe methods from firebase
		if (typeof query === 'string') {
			if (doc) {
				unsubscribe = firestore!
					.collection(query)
					.doc(doc)
					.onSnapshot((snapshot: firebase.firestore.DocumentData) => {
						setData([false, null, snapshot.data()]);
					});
			} else {
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
		}

		return unsubscribe; // Clean up
	}, [query, doc]);

	return data;
};
