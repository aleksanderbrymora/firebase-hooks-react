export type InputObject<T> = {
	value: T;
	type: string; // todo set only to available input types
	required: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type SignupType = (e: React.SyntheticEvent) => Promise<void>;

export type SignupEventType = {
	onSubmit: SignupType;
};

export type SignupObjectType = {
	loading: boolean;
	error: null | Error;
	email: InputObject<string>;
	password: InputObject<string>;
	passwordConfirm: InputObject<string | null>;
	onSignup: SignupEventType;
};
