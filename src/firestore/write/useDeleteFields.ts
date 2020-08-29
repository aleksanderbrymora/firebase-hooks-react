import firebase from 'firebase/app';
import { useState } from 'react';
import { useFire } from '../../context';
import { timestamp } from '../../utils/addTimestamp';

/**
 * Hook for deleting a field in a doc. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @returns an array of:
 * - `loading` boolean,
 * - `error` null or Error,
 * - `deleteFieldsFunction` used to delete a fields in a document
 */
export const useDeleteFields = (collection: string) => {
  const { firestore } = useFire();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  /**
   * Function used to update a document in the firestore
   * @param doc - string pointing to a document to edit
   * @param fields - an array of strings, of the names of the fields
   * that will be deleted from the document
   */
  const deleteFieldsFunction = (doc: string, fields: string[]): void => {
    setLoading(true);
    if (!doc) {
      setError(new Error('You need to pass an uid of the document you want to delete a field in'));
      setLoading(false);
    } else if (!Array.isArray(fields)) {
      setError(new Error('You need to pass an array of fields you want to delete'));
      setLoading(false);
    } else if (fields.length === 0) {
      setError(new Error('You need to specify at least one field to delete'));
      setLoading(false);
    } else {
      (async () => {
        const ref = firestore!.collection(collection).doc(doc);
        try {
          await Promise.all(fields.map((f: string) => ref.update({
            [f]: firebase.firestore.FieldValue.delete(),
          })));
          ref.update({
            updatedAt: timestamp(),
          });
          setLoading(false);
        } catch (e) {
          setError(e);
          setLoading(false);
        }
      })();
    }
  };

  return [loading, error, deleteFieldsFunction];
};
