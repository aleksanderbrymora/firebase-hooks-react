import { useState, useEffect } from 'react';
import { useFire } from '../context';
import { WriteData } from './WriteData';

/**
 * @param collection - string pointing to a collection
 * @param doc - string pointing to a document to edit
 * @param data - an object that will be set in the firestore
 * @param merge - boolean specifying if set should overwrite or merge
 * @param callback - optional function to be called back after success
 * @returns array with `loading` state, `error` object
 */
export const useSetFS = (toSetData: WriteData) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const { firestore } = useFire();

  const {
    collection, doc, data, merge, callback,
  } = toSetData;

  useEffect(() => {
    const ref = firestore!.collection(collection).doc(doc);
    (async () => {
      try {
        ref.set(data, { merge });
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
