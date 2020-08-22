import { useFire } from '../context';
import handleError from './handleError';
import { QueryTypes, InferDocType } from '../types/firestore/params';
import { handleUser } from '../utils/convertToWithUser';
import { useR } from '../auth/useR';
import { useReadCollection } from './useReadCollection';
import { useReadDoc } from './useReadDoc';
import { useQuery } from './useQuery';
import { InferReturnType, CollectionData, DocumentData } from '../types/firestore/data';

export const useReadFS = <QueryType extends QueryTypes, Doc extends InferDocType<QueryType>>(
	query: QueryType,
	doc?: Doc,
): CollectionData | DocumentData => {
	// Todo this needs to be made type-safe with `inferReturnType`
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
	if (typeof query === 'string') {
		if (typeof doc === 'string') {
			// useReadDoc
			return useReadDoc(query, doc);
		} else {
			// useReadCollection
			return useReadCollection(query);
		}
	} else {
		// useReadQuery
		return useQuery(query);
	}
};
