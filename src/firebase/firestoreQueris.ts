import firestore from '@react-native-firebase/firestore';

const createUserProfile = async (
  userId: string,
  email: string,
  name: string,
) => {
  await firestore().collection('users').doc(userId).set({
    email,
    displayName: name,
    createdAt: firestore.FieldValue.serverTimestamp(), // Better than new Date()
    lastLogin: firestore.FieldValue.serverTimestamp(),
  });
};

export default createUserProfile;
