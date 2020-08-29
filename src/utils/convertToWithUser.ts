import { QueryTypes } from '../types/firestore/params';
import { useR } from '../auth/useR';

export const FIRE_USER = '__user';

export const convertToWithUser = (path: string): string => {
  const { user } = useR();
  if (user && path.includes(FIRE_USER)) {
    const userRegex = new RegExp(FIRE_USER, 'g')!;
    return path.replace(userRegex, user.uid); // todo add proper userID
  }
  return path;
};

export const handleUser = (query: QueryTypes): QueryTypes => {
  if (typeof query === 'string') return convertToWithUser(query);

  return {
    ...query,
    collection: convertToWithUser(query.collection),
  };
};
