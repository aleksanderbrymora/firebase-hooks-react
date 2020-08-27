import firebase from 'firebase/app';

export const createDate = (date: string | Date) => ((typeof date === 'string')
  ? firebase.firestore.Timestamp.fromDate(new Date(date))
  : firebase.firestore.Timestamp.fromDate(date));
