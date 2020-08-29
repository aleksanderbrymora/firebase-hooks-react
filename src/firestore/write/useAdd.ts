import { useState } from 'react';
import { useFire } from '../../context';
import { timestamp } from '../../utils/addTimestamp';
import { isEmpty } from '../../utils/isEmpty';
import { convertToWithUser } from '../../utils/convertToWithUser';

type UseAddType = [boolean, null | Error, AddFunction]
type AddFunction = (data: object) => void

/**
 * Hook for adding the data. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @returns a promise that resolves to void and will add an object to the firestore
 */
export const useAdd = (collection: string): UseAddType => {
  const { firestore } = useFire();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  // converting collection to contain user id if `__user` was passed in
  const withUserCollection = convertToWithUser(collection);

  /**
   * Function used to set a document in the firestore
   * @param data - an object that will be set in the firestore
   * @returns an array of:
   * - `loading` boolean,
   * - `error` null or Error,
   * - `setFunction` used to set items in firestore
   */
  const addFunction = (data: object) => {
    setLoading(true);
    setError(null);
    if (isEmpty(data)) {
      setError(new Error('You need to specify the data you want to add'));
      setLoading(false);
    } else if (typeof data !== 'object') {
      setError(new Error('Type of the data needs to be an object'));
      setLoading(false);
    } else {
      const ts = timestamp();
      const timestampedData = {
        ...data,
        updatedAt: ts,
        createdAt: ts,
      };

      (async () => {
        const ref = firestore!.collection(withUserCollection);
        try {
          await ref.add(timestampedData);
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      })();
    }
  };

  return [loading, error, addFunction];
};
