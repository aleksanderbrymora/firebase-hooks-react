export default (firestore: firebase.firestore.Firestore | undefined) => {
  if (!firestore) {
    throw new Error("You haven't imported the firestore module when initializing your app");
  }
};
