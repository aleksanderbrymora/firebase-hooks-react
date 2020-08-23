import { useState, useEffect } from 'react';
import { useFire } from '../context';
import handleNoImport from './handleError';
import { DocumentData } from '../types/firestore/data';

/**
 * Hook used to read a single document based on the passed id and collection string
 * @param {string} path - is a string pointing to a collection to look through in the firestore
 * @param {string} doc - is a string of a document someone is looking for
 */
export const useReadDoc = (path: string, doc: string): DocumentData => {
  const [data, setData] = useState<firebase.firestore.DocumentData>([]);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { firestore } = useFire();

  useEffect(() => {
    // this probably needs to be rethought as im probably not handling the error enough
    handleNoImport(firestore);
    (async () => {
      setLoading(true);
      try {
        const unsubscribe = await firestore!.collection(path).doc(doc).get();
        if (unsubscribe.exists) {
          setData(unsubscribe.data()!);
        }
        setLoading(false);
        return unsubscribe;
      } catch (e) {
        setError(e);
        setLoading(false);
        return null;
      }
    })();
  }, [path]);

  const returnData: DocumentData = [loading, error, data];

  return returnData;
};
