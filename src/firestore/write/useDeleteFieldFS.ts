import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { DeleteFieldData } from '../write-types';
import { useFire } from '../../context';

/**
 * Hook for deleting a field in a doc. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @param doc - string pointing to a document to edit
 * @param callback - optional function to be called back after success
 * @returns array with `loading` state, `error` object
 */
export const useDeleteFieldFS = (toDeleteData: DeleteFieldData) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const { firestore } = useFire();

  const {
    collection, doc, callback, fields,
  } = toDeleteData;

  useEffect(() => {
    const ref = firestore!.collection(collection).doc(doc);
    (async () => {
      try {
        await Promise.all(fields.map((f: string) => ref.update({
          [f]: firebase.firestore.FieldValue.delete(),
        })));
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
