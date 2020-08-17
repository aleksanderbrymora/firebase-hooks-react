export type CollectionData = [
	Error | null,
	boolean,
	firebase.firestore.DocumentData | firebase.firestore.DocumentData[] | null,
];

export type DocData = [Error | null, boolean, firebase.firestore.DocumentData];
