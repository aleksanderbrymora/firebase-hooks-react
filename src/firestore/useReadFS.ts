import { useR } from '../auth/useR';
import { useFire } from '../context';
import {
  CollectionData,
  DocumentData,
  FirestoreQueryType,
  InferDocType,
  QueryTypes,
} from '../types/firestore';
import { handleUser } from '../utils/convertToWithUser';
import handleError from './handleError';
import { useQuery } from './useQuery';
import { useReadCollection } from './useReadCollection';
import { useReadDoc } from './useReadDoc';

export const useReadFS = <QueryType extends QueryTypes>(
  query: QueryType,
  doc?: InferDocType<QueryType>,
  // Todo this needs to be made type-safe with `inferReturnType`
): CollectionData | DocumentData => {
  // Checking if firestore has been initialized
  const { firestore } = useFire();
  handleError(firestore); // handle if not imported

  // Checking if query has user in it and replacing it if needed
  const { user } = useR();
  const withUserQuery = handleUser(query, user) as QueryType; // not sure if that actually fixed it

  // There are 3 parts to this hook:
  // - collection string - useReadCollection => array of document objects
  // - collection string + doc string - useReadDoc => document object
  // - query object - useReadQuery => array of document objects
  if (typeof withUserQuery === 'string') {
    return typeof doc === 'string'
      ? useReadDoc(withUserQuery, doc)
      : useReadCollection(withUserQuery);
  }
  if ('collection' in withUserQuery) {
    return useQuery(withUserQuery as FirestoreQueryType); // not sure if casting it is the way
  }
  throw new Error("You haven't passed correct information");
};
