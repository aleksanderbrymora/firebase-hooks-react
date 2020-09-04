import { useEffect, useState } from 'react';
import { useFire } from '../context';

export const useR = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<false | firebase.User>(false);
  const { auth } = useFire();
  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth!.onAuthStateChanged((u) => {
      // eslint-disable-next-line no-unused-expressions
      u ? setUser(u) : setUser(false);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  return { loading, user };
};
