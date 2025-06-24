import {getAuth} from '@react-native-firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from '@react-native-firebase/firestore';
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';
import {db} from '../../firebase/firebaseConfig';
import {baseApi} from '../../services';
import {Product} from '../../types/types';

const favoritesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFavorites: builder.query<Product[], void>({
      queryFn: async (): Promise<
        QueryReturnValue<
          Product[],
          FetchBaseQueryError,
          FetchBaseQueryMeta | undefined
        >
      > => {
        try {
          const auth = getAuth();
          const userId = auth.currentUser?.uid;

          if (!userId) {
            return {
              error: {
                status: 401,
                data: 'User not authenticated',
              },
            };
          }

          const favoritesRef = collection(db, 'users', userId, 'favorites');
          const q = query(favoritesRef, orderBy('addedAt', 'desc'));

          const snapshot = await getDocs(q);

          const favorites = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              ...data,
              addedAt: data.addedAt?.toDate()?.toISOString() || null,
            };
          });

          return {data: favorites as Product[]};
        } catch (error: any) {
          console.error('Failed to fetch favorites:', error);
          return {
            error: {
              status: error.code || 500,
              data: error.message || 'Unknown error occurred',
            },
          };
        }
      },
      providesTags: ['Favorites'],
    }),
    removeFavorite: builder.mutation<string, string>({
      queryFn: async (
        id: string,
      ): Promise<
        QueryReturnValue<string, FetchBaseQueryError, FetchBaseQueryMeta>
      > => {
        try {
          const userId = getAuth().currentUser?.uid;
          if (!userId) {
            return {
              error: {
                status: 401,
                data: 'User not authenticated',
              },
            };
          }
          const favoriteRef = doc(db, 'users', userId, 'favorites', id);
          await deleteDoc(favoriteRef);
          return {data: 'Favorite removed successfully'};
        } catch (error: any) {
          return {
            error: {
              status: error.code || 500,
              data: error.message,
            },
          };
        }
      },
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const {useGetFavoritesQuery, useRemoveFavoriteMutation} = favoritesApi;
