import { firestore } from 'firebase/app';

export const timestamp = (): firestore.FieldValue => firestore.FieldValue.serverTimestamp();
