import { useState } from 'react';
import { useFire } from '../../context';

type UseDeleteType = [boolean, null | Error, DeleteFunction]
type DeleteFunction = (doc: string) => void

/**
 * Hook for deleting a document. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @returns an array of:
 * - `loading` boolean,
 * - `error` null or Error,
 * - `deleteFunction` used to set items in firestore
 */

export const useDelete = (collection: string): UseDeleteType => {
  const { firestore } = useFire();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  /**
   * Function used to delete a document in the firestore
   * @param doc - string pointing to a document to delete
   */
  const deleteFunction = (doc: string): void => {
    setLoading(true);
    setError(null);
    if (!doc) {
      setError(new Error('You need to pass an uid of the document you want to delete'));
      setLoading(false);
    } else {
      (async () => {
        const ref = firestore!.collection(collection).doc(doc);
        try {
          await ref.delete();
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      })();
    }
  };

  return [loading, error, deleteFunction];
};
