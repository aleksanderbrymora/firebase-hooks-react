// Type for the query data
export type FirestoreQueryType = {
	collection: string;
	query?: queryType | queryType[];
	limit?: number;
	orderBy?: string; // todo limit this to be only special words
	order?: string; // todo same as above
	startAt?: number;
	endAt?: number;
};

type queryType = [
	string,
	'<' | '<=' | '==' | '>' | '>=' | 'array-contains' | 'in' | 'array-contains-any',
	string | number | boolean,
];

// Type to handle two different queries
export type QueryTypes = string | FirestoreQueryType;
// type to figure out if `doc` is needed
export type InferDocType<QueryType> = QueryType extends string ? string : never;
