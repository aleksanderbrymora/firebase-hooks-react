import { useState } from 'react';
import { useFire } from '../../context';
import { timestamp } from '../../utils/addTimestamp';
import { isEmpty } from '../../utils/isEmpty';

type UseSetType = [boolean, null | Error, SetFunction]
type SetFunction = (doc: string, data: object) => void

/**
 * Hook for setting the data. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @param merge - boolean specifying if set should overwrite or merge, defaults to false
 * @returns an array of:
 * - `loading` boolean,
 * - `error` null or Error,
 * - `setFunction` used to set items in firestore
 */
export const useSet = (
  collection: string,
  merge: boolean = false,
): UseSetType => {
  const { firestore } = useFire();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  /**
   * Function used to set a document in the firestore
   * @param doc - string pointing to a document to edit
   * @param data - an object that will be set in the firestore
   */
  const useSetFunction = (doc: string, data: object): void => {
    setLoading(true);
    if (isEmpty(data)) {
      setError(new Error('You need to specify the data you want to set'));
      setLoading(false);
    } else if (!doc) {
      setError(new Error('You need to pass an uid of the document you want to update'));
      setLoading(false);
    } else {
      const timestampedData = {
        ...data,
        createdAt: timestamp(),
      };

      (async () => {
        const ref = firestore!.collection(collection).doc(doc);
        try {
          await ref.set(timestampedData, { merge });
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      })();
    }
  };

  return [loading, error, useSetFunction];
};
