import 'firebase/firestore';
import firebase from '../config/firebase-init';

const firestore = firebase.firestore();

// comment out if you want to disable offline support (eg: handling sensitive data)
firestore.enablePersistence().catch((err) => console.error(err));

export default firestore;
