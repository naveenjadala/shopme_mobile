import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from '@react-native-firebase/firestore';
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';

import {db} from '../../firebase/firebaseConfig';
import {baseApi} from '../../services';
import {CategoryFilter, Product} from '../../types/types';
import {ProductDetailsProps} from './types';

const productsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllProducts: builder.query<
      {products: Product[]; hasMore: boolean; pageNo: number},
      {pageNo: number; pageSize: number; categoryFilter?: CategoryFilter}
    >({
      queryFn: async ({
        pageNo = 1,
        pageSize = 6,
        categoryFilter,
      }): Promise<
        QueryReturnValue<
          {products: Product[]; hasMore: boolean; pageNo: number},
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
            const lastDoc =
              skippedSnapshot.docs[skippedSnapshot.docs.length - 1];

            if (lastDoc) {
              baseQuery = query(baseQuery, startAfter(lastDoc));
            }
          }

          const finalQuery = query(baseQuery, limit(pageSize));
          const snapshot = await getDocs(finalQuery);

          const products = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate().toISOString(),
            };
          });

          return {
            data: {
              products: products,
              hasMore: snapshot.docs.length === pageSize,
              pageNo,
            },
          };
        } catch (error: any) {
          return {
            error: {
              status: 500,
              data: error.message,
            },
          };
        }
      },
    }),
    getProductById: builder.query<ProductDetailsProps, {productId: number}>({
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
          if (isNaN(productId) || productId <= 0) {
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

          const doc = querySnapshot.docs[0];
          const productData = doc.data();

          return {
            data: {
              ...(productData as ProductDetailsProps),
              id: productData.id as number,
              createdAt:
                productData.createdAt?.toDate?.()?.toISOString() ||
                new Date().toISOString(),
            },
          };
        } catch (error: any) {
          return {
            error: {
              status: error.code || 500,
              data: {
                message: error.message,
                code: error.code || 'INTERNAL_ERROR',
                productId,
              },
            },
          };
        }
      },
    }),
  }),
});

export const {useGetAllProductsQuery, useGetProductByIdQuery} = productsApi;
