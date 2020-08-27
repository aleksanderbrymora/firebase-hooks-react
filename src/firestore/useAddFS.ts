import { useState, useEffect } from 'react';
import { useFire } from '../context';
import { AddData } from './write-types';
import { timestamp } from '../utils/addTimestamp';

/**
 * Hook for adding the data. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @param data - an object that will be added to the firestore
 * @param callback - optional function to be called back after success that has id as a parm
 * @returns array with `loading` state, `error` object
 */
export const useAddFS = (toSetData: AddData) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const { firestore } = useFire();

  const { collection, data, callback } = toSetData;

  // storing the timestamp so its the same in the db
  const ts = timestamp();

  const timestampedData = {
    ...data,
    updatedAt: ts,
    createdAt: ts,
  };

  useEffect(() => {
    const ref = firestore!.collection(collection);
    (async () => {
      try {
        const res = await ref.add(timestampedData);
        setLoading(false);
        if (callback) callback(res.id);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    })();
  });

  const returnObject: [boolean, null | Error] = [loading, error];

  return returnObject;
};
