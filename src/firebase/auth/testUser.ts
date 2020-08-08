export const FIRE_USER = '__FIRE_USER';

export const convertToWithUser = (path: string): string => {
	if (path.includes(FIRE_USER)) {
		const userRegex = new RegExp(FIRE_USER, 'g')!;
		return path.replace(userRegex, 'someID'); // todo add propper userID
	} else {
		return path;
	}
};
