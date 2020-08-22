// Type for the query data
export type FirestoreQueryType = {
	collection: string;
	where?: queryType | queryType[];
	limit?: number;
	orderBy?: orderByType; // todo limit this to be only special words
	order?: string; // todo same as above
	startAt?: number;
	endAt?: number;
};

type orderByType = {
	by: string;
	type: 'desc' | 'asc' | undefined;
};

export type queryType = {
	fieldPath: string;
	optionString: firebase.firestore.WhereFilterOp;
	value: string | number | boolean;
};

// Type to handle two different queries
export type QueryTypes = string | FirestoreQueryType;
// type to figure out if `doc` is needed
export type InferDocType<QueryType> = QueryType extends string ? string : never;
