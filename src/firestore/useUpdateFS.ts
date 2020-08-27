import { useState, useEffect } from 'react';
import { useFire } from '../context';
import { UpdateData } from './write-types';
import { timestamp } from '../utils/addTimestamp';

/**
 * Hook for updating the data. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @param doc - string pointing to a document to edit
 * @param data - an object with a field to update in the firestore
 * @param callback - optional function to be called back after success
 * @returns array with `loading` state, `error` object
 */
export const useUpdateFS = (toUpdateData: UpdateData) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const { firestore } = useFire();

  const {
    collection, doc, data, callback,
  } = toUpdateData;

  const timestampedData = {
    ...data,
    updatedAt: timestamp(),
  };

  useEffect(() => {
    const ref = firestore!.collection(collection).doc(doc);
    (async () => {
      try {
        await ref.update(timestampedData);
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
