import { useState, useEffect } from 'react';
import { useFire } from '../context';
import { SetData } from './write-types';
import { timestamp } from '../utils/addTimestamp';

/**
 * Hook for setting the data. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @param doc - string pointing to a document to edit
 * @param data - an object that will be set in the firestore
 * @param merge - boolean specifying if set should overwrite or merge
 * @param callback - optional function to be called back after success
 * @returns array with `loading` state, `error` object
 */
export const useSetFS = (toSetData: SetData) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const { firestore } = useFire();

  const {
    collection, doc, data, merge, callback,
  } = toSetData;

  // storing the timestamp so its the same in the db
  const ts = timestamp();

  const timestampedData = {
    ...data,
    updatedAt: ts,
    createdAt: ts,
  };

  useEffect(() => {
    const ref = firestore!.collection(collection).doc(doc);
    (async () => {
      try {
        await ref.set(timestampedData, { merge });
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
