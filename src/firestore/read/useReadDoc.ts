import { useState, useEffect } from 'react';
import { DocumentData } from '../../types/firestore';
import { useFire } from '../../context';

export const useReadDoc = (path: string, doc: string): DocumentData => {
  const [data, setData] = useState<firebase.firestore.DocumentData>([]);
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { firestore } = useFire();

  useEffect(() => {
    if (!firestore) throw new Error("You haven't imported the firestore module when initializing your app");
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
