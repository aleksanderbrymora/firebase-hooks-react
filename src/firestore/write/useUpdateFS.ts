import { useFire } from '../../context';
import { timestamp } from '../../utils/addTimestamp';
import { ReturnWithDoc } from '../SetReturn';
import { isEmpty } from '../../utils/isEmpty';

/**
 * Hook for updating the data
 * @param collection - string pointing to a collection
 * @returns a promise that resolves to void and will update a document in firestore
 */
export const useUpdateFS = (collection: string): ReturnWithDoc => {
  const { firestore } = useFire();

  /**
   * Function used to set a document in the firestore
   * @param data - an object that will be set in the firestore
   * @param doc - string pointing to a document to edit
   * @returns a promise that resolves to void and updates a document in firestore
   */
  // this `| undefined` is really killing me but i don't know how to deal with it
  const updateFunction = (data: object, doc: string | undefined) => {
    if (isEmpty(data)) throw new Error('You need to specify the data to update to');
    if (!doc) throw new Error('You need to pass an uid of the document you want to update');

    const promise = new Promise<void>((resolve, reject) => {
      const timestampedData = {
        ...data,
        updatedAt: timestamp(),
      };
      const ref = firestore!.collection(collection).doc(doc);

      ref.update(timestampedData)
        .then(resolve)
        .catch((e) => reject(e));
    });
    return promise;
  };

  return updateFunction;
};
