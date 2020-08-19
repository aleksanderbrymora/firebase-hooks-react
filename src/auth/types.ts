export type InputObject = {
	value: string;
	type: string; // todo set only to available input types
	required: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type SignupType = {
	onSubmit: (e: React.SyntheticEvent) => Promise<void>;
};

export type SignupObjectType = {
	loading: boolean;
	error: null | Error;
	email: InputObject;
	password: InputObject;
	signup: SignupType;
};
