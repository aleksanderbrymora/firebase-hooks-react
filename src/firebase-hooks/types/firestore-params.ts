// Type for the query data
type DocumentQueryType = {
	collection: string;
	query?: string[] | string[][];
	limit?: number;
	orderBy?: string; // todo limit this to be only special words
	order?: string; // todo same as above
	startAt?: number;
	endAt?: number;
};
// Type to handle two different queries
export type QueryTypes = string | DocumentQueryType;
// type to figure out if `doc` is needed
export type InferDocType<QueryType> = QueryType extends string ? string : never;
