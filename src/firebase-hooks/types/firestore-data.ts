export type CollectionData = [
	Error | null,
	boolean,
	firebase.firestore.DocumentData | firebase.firestore.DocumentData[] | null, // this might be a bit broken
];

export type DocData = [Error | null, boolean, firebase.firestore.DocumentData];
