import { useFire } from '../../context';
import { ReturnWithoutDoc } from '../SetReturn';

/**
 * Hook for deleting a document. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @returns a promise that resolves to void and will delete a document in firestore
 */
export const useDeleteFS = (collection: string): ReturnWithoutDoc => {
  const { firestore } = useFire();

  /**
   * Function used to set a document in the firestore
   * @param data - an object that will be set in the firestore
   * @param doc - string pointing to a document to edit
   * @returns a promise that resolves to void and updates a document in firestore
   */
  // this `| undefined` is really killing me but i don't know how to deal with it
  const updateFunction = (doc: string) => {
    if (!doc) throw new Error('You need to pass an uid of the document you want to update');

    const promise = new Promise<void>((resolve, reject) => {
      const ref = firestore!.collection(collection).doc(doc);

      ref.delete()
        .then(resolve)
        .catch((e) => reject(e));
    });
    return promise;
  };

  return updateFunction;
};
