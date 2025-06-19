import {getAuth} from '@react-native-firebase/auth';
import {collection, getDocs, query} from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {db} from '../firebase/firebaseConfig';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = getAuth().currentUser?.uid;
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const q = query(collection(db, 'users', userId, 'favorites'));
        const querySnapshot = await getDocs(q);

        const favIds = querySnapshot.docs.map(doc => doc.id);
        setFavorites(favIds);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return {favorites, loading};
};
