import { QueryTypes } from '../types/firestore/params';
export const FIRE_USER = '__user';

export const convertToWithUser = (path: string, user: false | firebase.User): string => {
	if (user && path.includes(FIRE_USER)) {
		const userRegex = new RegExp(FIRE_USER, 'g')!;
		return path.replace(userRegex, user.uid); // todo add proper userID
	} else {
		return path;
	}
};

export const handleUser = (query: QueryTypes, user: false | firebase.User): QueryTypes => {
	if (typeof query === 'string') return convertToWithUser(query, user);
	else {
		return {
			...query,
			collection: convertToWithUser(query.collection, user),
		};
	}
};
