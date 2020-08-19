export type InputObject = {
	value: string;
	type: string; // todo set only to available input types
	required: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// Return structure for every useAuth hook type
// DataType is different depending on what type of auth is chosen
export type AuthReturnType<DataType> = [
	boolean, // loading
	null | Error, // error
	DataType,
];

// Types for objects to be spread in the jsx elements
export type SignupEventType = {
	onSubmit: (e: React.SyntheticEvent) => Promise<void>;
};

export type SignoutEventType = {
	onClick: (e: React.SyntheticEvent) => Promise<void>;
};

// DataType types for useAuth
export type SignupDataType = {
	email: InputObject;
	password: InputObject;
	onSignup: SignupEventType;
};

export type SignoutDataType = {
	signout: SignoutEventType;
};
