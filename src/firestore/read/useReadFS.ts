import { useFire } from '../../context';
import {
  CollectionData,
  DocumentData,
  FirestoreQueryType,
  InferDocType,
  QueryTypes,
} from '../../types/firestore';
import { handleUser } from '../../utils/convertToWithUser';
import handleError from '../handleError';
import { useQuery } from './useQuery';
import { useReadCollection } from './useReadCollection';
import { useReadDoc } from './useReadDoc';

/**
 *
 * @param {string|object} query - Is either a `string` or an `object`.
 * If its an object then it takes on the structure of an object with at least `collection` string
 * Read more about the [query object here](/docs/auth.md) // todo fix this path
 * If its a string then the doc parameter is allowed, but by itself will query the whole collection
 * @param {string} doc - only can be used when `query` is a string.
 * If passed then hook will do a doc query
 */
export const useReadFS = <QueryType extends QueryTypes>(
  query: QueryType,
  doc?: InferDocType<QueryType>,
  // Todo this needs to be made type-safe with `inferReturnType`
): CollectionData | DocumentData => {
  // Checking if firestore has been initialized
  const { firestore } = useFire();
  handleError(firestore); // handle if not imported

  // Checking if query has user in it and replacing it if needed
  const withUserQuery = handleUser(query) as QueryType; // not sure if that actually fixed it

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
