import { useState, useEffect } from 'react';
import { useFire } from '../context';
import { DeleteDocData } from './write-types';

/**
 * Hook for deleting a document. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @param doc - string pointing to a document to edit
 * @param callback - optional function to be called back after success
 * @returns array with `loading` state, `error` object
 */
export const useDeleteFS = (toDeleteData: DeleteDocData) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const { firestore } = useFire();

  const {
    collection, doc, callback,
  } = toDeleteData;

  useEffect(() => {
    const ref = firestore!.collection(collection).doc(doc);
    (async () => {
      try {
        await ref.delete();
        setLoading(false);
        if (callback) callback();
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    })();
  });

  const returnObject: [boolean, null | Error] = [loading, error];

  return returnObject;
};
