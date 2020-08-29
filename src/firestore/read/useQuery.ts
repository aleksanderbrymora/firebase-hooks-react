import { useState, useEffect } from 'react';
import { FirestoreQueryType, CollectionData, queryType } from '../../types/firestore';
import { useFire } from '../../context';

/**
 * Hook that takes an object with compound query and filters/limits the data from the firestore
 * @param {FirestoreQueryType} q - query object containing data necessary for a compound query
 */
export const useQuery = (q: FirestoreQueryType): CollectionData => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const [data, setData] = useState<firebase.firestore.DocumentData[]>([]);
  const { firestore } = useFire();

  useEffect(() => {
    setLoading(true);
    // Getting reference to the passed in collection
    const ref = firestore!.collection(q.collection);

    // Setting up a variable for the query
    let query: firebase.firestore.Query<firebase.firestore.DocumentData>;
    if (q.where) {
      // checking for multiple queries
      if (Array.isArray(q.where)) {
        // Getting rid of first element to overwrite the
        // query variable to be able to append more `where`s
        const { fieldPath, optionString, value } = q.where.shift()!;
        query = ref.where(fieldPath, optionString, value);
        q.where.forEach((w: queryType) => {
          const {
            fieldPath: fieldPathLoop,
            optionString: optionStringLoop,
            value: valueLoop,
          } = w;
          query = query.where(fieldPathLoop, optionStringLoop, valueLoop);
        });
      } else {
        const { fieldPath, optionString, value } = q.where;
        query = ref.where(fieldPath, optionString, value); // this is so weird
      }
    } else {
      // overwriting query with ref as it hasn't been 'edited' by the `wheres`
      query = ref;
    }

    // Adding ordering if present
    if (q.orderBy) query = query.orderBy(q.orderBy.by, q.orderBy.type);

    // start at pagination
    if (q.startAt) query = query.startAt(q.startAt);

    // end at pagination
    if (q.endAt) query = query.endAt(q.endAt);

    // Adding limit
    if (q.limit) query = query.limit(q.limit);

    (async () => {
      try {
        const res = await query.get();
        setData(
          res.docs.map((doc: firebase.firestore.DocumentData) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
        setLoading(false);
        return res;
      } catch (firestoreError) {
        setError(firestoreError);
        setLoading(false);
        return null;
      }
    })();

    setLoading(false);
  }, [q]);

  return [loading, error, data];
};
