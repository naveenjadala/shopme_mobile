import auth from '@react-native-firebase/auth';
import firestore, { getFirestore } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const db = getFirestore();

export {
  auth, db, firestore, storage,
};
