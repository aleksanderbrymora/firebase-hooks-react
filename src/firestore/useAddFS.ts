import { useFire } from '../context';
import { timestamp } from '../utils/addTimestamp';
import { isEmpty } from '../utils/isEmpty';

type SetReturn = (data: object) => Promise<void>

/**
 * Hook for adding the data. Takes an object with these params:
 * @param collection - string pointing to a collection
 */
export const useAddFS = (collection: string): SetReturn => {
  const { firestore } = useFire();

  /**
   * Function used to set a document in the firestore
   * @param data - an object that will be set in the firestore
   * @returns a promise that resolves to void and will add an object to firestore
   */
  const addFunction = (data: object) => {
    if (isEmpty(data)) throw new Error('You need to specify the data to update to');

    const promise = new Promise<void>((resolve, reject) => {
      const ts = timestamp();
      const timestampedData = {
        ...data,
        updatedAt: ts,
        createdAt: ts,
      };
      const ref = firestore!.collection(collection);
      ref.add(timestampedData)
        .then(() => resolve())
        .catch((e) => reject(e));
    });
    return promise;
  };

  return addFunction;
};
