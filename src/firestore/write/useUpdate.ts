import { useState } from 'react';
import { useFire } from '../../context';
import { timestamp } from '../../utils/addTimestamp';
import { isEmpty } from '../../utils/isEmpty';

type UseUpdateType = [boolean, null | Error, UpdateFunction]
type UpdateFunction = (doc: string, data: object) => void

/**
 * Hook for updating the data
 * @param collection - string pointing to a collection
 * @returns an array of:
 * - `loading` boolean,
 * - `error` null or Error,
 * - `updateFunction` used to set items in firestore
 */
export const useUpdate = (collection: string): UseUpdateType => {
  const { firestore } = useFire();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  /**
   * Function used to update a document in the firestore
   * @param data - an object that will be update in the firestore
   * @param doc - string pointing to a document to edit
   */
  const updateFunction = (doc: string, data: object): void => {
    setLoading(true);
    setError(null);
    if (isEmpty(data)) {
      setError(new Error('You need to specify the data you want to set'));
      setLoading(false);
    } else if (!doc) {
      setError(new Error('You need to pass an uid of the document you want to set'));
      setLoading(false);
    } else {
      const timestampedData = {
        ...data,
        updatedAt: timestamp(),
      };

      (async () => {
        const ref = firestore!.collection(collection).doc(doc);
        try {
          await ref.update(timestampedData);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      })();
    }
  };

  return [loading, error, updateFunction];
};
