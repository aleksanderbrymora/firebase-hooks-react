import { useState, useEffect } from 'react';
import { CollectionData } from '../types';
import { useFire } from '../context';
import handleError from './handleError';

type queryType<T> = T extends string ? string : documentQueryType;
type docType<T> = T extends string ? string : never;

type documentQueryType = {
	collection: string;
	query: string[] | string[][];
	limit: number;
	orderBy: string; // todo limit this to be only special words
	order: string; // todo same as above
	startAt: number;
	endAt: number;
};

export const useFirestore = <T>(query: queryType<T>, doc?: docType<T>) => {
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
	}, [query]);

	return data;
};
