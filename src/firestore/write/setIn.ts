import { useState } from 'react';
import { useFire } from '../../context';
import { timestamp } from '../../utils/addTimestamp';
import { isEmpty } from '../../utils/isEmpty';

type setFunction = (data: object, doc: string) => [boolean, null | Error]

/**
 * Hook for setting the data. Takes an object with these params:
 * @param collection - string pointing to a collection
 * @param merge - boolean specifying if set should overwrite or merge
 * @param callback - optional function to be called back after success
 * @returns a function that returns returns a promise with no return value after resolution
 */
export const setIn = (
  collection: string,
  merge: boolean = false,
): setFunction => {
  const { firestore } = useFire();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);

  /**
   * Function used to set a document in the firestore
   * @param data - an object that will be set in the firestore
   * @param doc - string pointing to a document to edit
   * @returns a promise that resolves to void and will set an object in firestore
   */
  // this `| undefined` is really killing me but i don't know how to deal with it
  const setFunction = (data: object, doc: string | undefined) => {
    setLoading(true);
    if (isEmpty(data)) throw new Error('You need to specify the data to update to');
    if (!doc) throw new Error('You need to pass an uid of the document you want to update');

    const promise = new Promise<void>((resolve, reject) => {
      const timestampedData = {
        ...data,
        createdAt: timestamp(),
      };
      const ref = firestore!.collection(collection).doc(doc);
      if (typeof options === 'object' && 'merge' in options) {
        ref.set(timestampedData, { merge: options ? options.merge : true })
          .then(resolve)
          .catch((e) => reject(e));
      } else {
        ref.set(timestampedData)
          .then(resolve)
          .catch((e) => reject(e));
      }
    });
    return promise;
  };

  return setFunction;
};
