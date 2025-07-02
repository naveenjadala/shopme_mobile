import { CartItem } from '@features/Cart/types';
import { getAuth } from '@react-native-firebase/auth';
import firestore, {
  addDoc,
  collection,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@react-native-firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

const getUserCartCollectionRef = () => {
  const userId = getAuth().currentUser?.uid;
  if (!userId) throw new Error('User not authenticated');
  return collection(db, 'users', userId, 'cart');
};

// ✅ Add to cart (or increment if exists)
export const addToCart = async (item: Omit<CartItem, 'id' | 'quantity'>) => {
  const cartRef = getUserCartCollectionRef();

  const q = query(cartRef, where('productId', '==', item.productId));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docRef = snapshot.docs[0].ref;
    await updateDoc(docRef, {
      quantity: increment(1),
    });
  } else {
    await addDoc(cartRef, {
      ...item,
      quantity: 1,
      createdAt: serverTimestamp(),
    });
  }
};

// ✅ Fetch all cart items
export const getCartItems = async (): Promise<CartItem[]> => {
  const cartRef = getUserCartCollectionRef();

  const snapshot = await query(cartRef, orderBy('createdAt', 'desc')).get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as CartItem[];
};

// ✅ Update quantity or fields
export const updateCartItem = async (
  docId: string,
  updates: Partial<Omit<CartItem, 'id' | 'productId' | 'createdAt'>>,
) => {
  const cartRef = getUserCartCollectionRef();
  await cartRef.doc(docId).update(updates);
};

// ✅ Remove a cart item
export const removeCartItem = async (docId: string) => {
  const cartRef = getUserCartCollectionRef();
  await cartRef.doc(docId).delete();
};

// ✅ Clear the entire cart
export const clearCart = async () => {
  const cartRef = getUserCartCollectionRef();
  const snapshot = await cartRef.get();

  const batch = firestore().batch();
  snapshot.docs.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
};
