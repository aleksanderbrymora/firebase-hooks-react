import auth from '../init';

export const signin = async (email: string, password: string) => {
	const res = await auth.signInWithEmailAndPassword(email, password);
	return res.user;
};
