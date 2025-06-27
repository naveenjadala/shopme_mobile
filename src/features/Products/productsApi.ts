import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  where,
} from '@react-native-firebase/firestore';
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';

import { getAuth } from '@react-native-firebase/auth';
import { db } from '../../firebase/firebaseConfig';
import { baseApi } from '../../services';
import { CategoryFilter, Product } from '../../types/types';
import { ProductDetailsProps } from './types';

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<
    { products: Product[]; hasMore: boolean; pageNo: number },
    { pageNo: number; pageSize: number; categoryFilter?: CategoryFilter }
    >({
      queryFn: async ({
        pageNo = 1,
        pageSize = 6,
        categoryFilter,
      }): Promise<
      QueryReturnValue<
      { products: Product[]; hasMore: boolean; pageNo: number },
      FetchBaseQueryError,
      FetchBaseQueryMeta
      >
      > => {
        try {
          let baseQuery = query(collection(db, 'products'));
          if (categoryFilter?.gender) {
            baseQuery = query(
              baseQuery,
              where('gender', '==', categoryFilter.gender),
            );
          }

          if (categoryFilter?.isLatest) {
            baseQuery = query(
              baseQuery,
              where('isLatest', '==', categoryFilter.isLatest),
            );
          }

          if (categoryFilter?.isFeatured) {
            baseQuery = query(
              baseQuery,
              where('isFeatured', '==', categoryFilter.isFeatured),
            );
          }

          if (categoryFilter?.category) {
            baseQuery = query(
              baseQuery,
              where('category', '==', categoryFilter.category),
            );
          }

          baseQuery = query(baseQuery, orderBy('createdAt', 'desc'));

          const offset = (pageNo - 1) * pageSize;

          if (offset > 0) {
            const skipQuery = query(
              collection(db, 'products'),
              ...(categoryFilter?.gender
                ? [where('gender', '==', categoryFilter.gender)]
                : []),
              orderBy('createdAt', 'desc'),
              limit(offset),
            );

            const skippedSnapshot = await getDocs(skipQuery);
            const lastDoc = skippedSnapshot.docs[skippedSnapshot.docs.length - 1];

            if (lastDoc) {
              baseQuery = query(baseQuery, startAfter(lastDoc));
            }
          }

          const finalQuery = query(baseQuery, limit(pageSize));
          const snapshot = await getDocs(finalQuery);

          const products = snapshot.docs.map((value) => {
            const data = value.data() as Product;
            return {
              ...data,
              createdAt: data.createdAt
                ? new Date(data.createdAt).toISOString()
                : '',
            };
          });

          return {
            data: {
              products,
              hasMore: snapshot.docs.length === pageSize,
              pageNo,
            },
          };
        } catch (error: unknown) {
          const errorWithCode = error as { code: string; message: string };
          return {
            error: {
              status: Number(errorWithCode?.code) || 500,
              data: {
                message: errorWithCode?.message,
                code: errorWithCode?.code || 'INTERNAL_ERROR',
              },
            },
          };
        }
      },
      providesTags: ['Product', 'Favorites'],
    }),
    getProductById: builder.query<ProductDetailsProps, { productId: number }>({
      queryFn: async ({
        productId,
      }): Promise<
      QueryReturnValue<
      ProductDetailsProps,
      FetchBaseQueryError,
      FetchBaseQueryMeta
      >
      > => {
        try {
          // 1. Validate numeric ID
          if (Number.isNaN(productId) || productId <= 0) {
            throw new Error('Invalid product ID');
          }

          const q = query(
            collection(db, 'products'),
            where('id', '==', productId),
            limit(1),
          );

          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            return {
              error: {
                status: 404,
                data: `Product with ID ${productId} not found`,
              },
            };
          }

          // const docData = querySnapshot.docs[0];
          // const productData = docData.data();
          const docData = querySnapshot.docs[0];
          const productData = docData.data() as ProductDetailsProps & {
            createdAt?: { toDate: () => Date };
          };

          return {
            data: {
              ...(productData as ProductDetailsProps),
              id: productData.id,
              createdAt:
                productData.createdAt?.toDate().toISOString()
                ?? new Date().toISOString(),
            },
          };
        } catch (error: unknown) {
          const errorWithCode = error as { code: string; message: string };
          return {
            error: {
              status: Number(errorWithCode?.code) || 500,
              data: {
                message: errorWithCode?.message,
                code: errorWithCode?.code || 'INTERNAL_ERROR',
                productId,
              },
            },
          };
        }
      },
      providesTags: ['Product', 'Favorites'],
    }),
    addToFavorites: builder.mutation<string, ProductDetailsProps>({
      queryFn: async (
        item: ProductDetailsProps,
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
          const favoritesRef = doc(
            db,
            'users',
            userId,
            'favorites',
            item.id.toString(),
          );
          await setDoc(favoritesRef, {
            ...item,
            addedAt: new Date(),
          });

          return { data: 'Favorite added successfully' };
        } catch (error: unknown) {
          const errorWithCode = error as { code: number; message: string };
          return {
            error: {
              status: errorWithCode?.code || 500,
              data: errorWithCode?.message,
            },
          };
        }
      },
      invalidatesTags: ['Favorites'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useAddToFavoritesMutation,
} = productsApi;
