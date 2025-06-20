import firestore from '@react-native-firebase/firestore';
import {newAndFeatured} from './newfetured';
import {products} from './products';

export async function createUserProfile(
  userId: string,
  email: string,
  name: string,
) {
  await firestore().collection('users').doc(userId).set({
    email: email,
    displayName: name,
    createdAt: firestore.FieldValue.serverTimestamp(), // Better than new Date()
    lastLogin: firestore.FieldValue.serverTimestamp(),
  });
}

export const addBulkProducts = async () => {
  const batch = firestore().batch();
  const productsRef = firestore().collection('products');

  products.forEach(product => {
    const docRef = productsRef.doc(); // auto-generated ID
    batch.set(docRef, {
      ...product,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  });

  try {
    await batch.commit();
    console.log('✅ Bulk products uploaded successfully!');
  } catch (error) {
    console.error('❌ Error uploading products:', error);
  }
};

export const addBulkNewAndFeatured = async () => {
  const batch = firestore().batch();
  const productsRef = firestore().collection('newFeatured');

  newAndFeatured.forEach(product => {
    const docRef = productsRef.doc(); // auto-generated ID
    batch.set(docRef, {
      ...product,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  });

  try {
    await batch.commit();
    console.log('✅ Bulk newFeatured uploaded successfully!');
  } catch (error) {
    console.error('❌ Error uploading newFeatured:', error);
  }
};
