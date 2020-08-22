export type CollectionData = [boolean, Error | null, firebase.firestore.DocumentData[]];

export type DocumentData = [boolean, Error | null, firebase.firestore.DocumentData];

export type InferReturnType<Q, D> = Q extends string
	? D extends string
		? DocumentData
		: CollectionData
	: CollectionData;
