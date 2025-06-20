import auth from '@react-native-firebase/auth';
import firestore, {getFirestore} from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDyEAYBpcYFmZgn5Gricx3k_ZKKz0nSieE',
  authDomain: 'shopme-e7765.firebaseapp.com',
  projectId: 'shopme-e7765',
  storageBucket: 'shopme-e7765.firebasestorage.app',
  messagingSenderId: '1026085871310',
  appId: '1:1026085871310:web:212ea93a2a42dd0a143a9f',
};
const db = getFirestore();

export {auth, db, firestore, storage};
