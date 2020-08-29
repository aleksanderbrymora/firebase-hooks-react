import { useState, useEffect } from 'react';
import { CollectionData } from '../../types/firestore';
import { useFire } from '../../context';

/**
 * Hook used for reading the whole collection in the firestore database
 * @param {string} path - is a string pointing to a collection in the firestore
 */
export const useReadCollection = (path: string): CollectionData => {
  const [data, setData] = useState<CollectionData>([true, null, []]);
  const { firestore } = useFire();

  useEffect(() => {
    const unsubscribe = firestore!.collection(path).onSnapshot(
      (snapshot: firebase.firestore.QuerySnapshot) => {
        setData([
          false,
          null,
          snapshot.docs.map((doc: firebase.firestore.DocumentData) => ({
            id: doc.id,
            ...doc.data(),
          })),
        ]);
      },
      (error) => setData([false, error, []]),
    );
    return unsubscribe;
  }, [path]);

  return data;
};
