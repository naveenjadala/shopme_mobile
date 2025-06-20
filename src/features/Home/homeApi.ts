import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';

import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from '@react-native-firebase/firestore';
import {db} from '../../firebase/firebaseConfig';
import {baseApi} from '../../services';
import {CategoryFilter, Product} from '../../types/types';
import {CategoryData, LatestData, PromotionBanner} from './types';

interface FeaturedFilters {
  type: string;
}

export const homeApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMenTab: builder.query<CategoryData, void>({
      query: () => 'mensTab',
    }),
    getWomenTab: builder.query<CategoryData, void>({
      query: () => 'womenTab',
    }),
    getKidsTab: builder.query<CategoryData, void>({
      query: () => 'kidsTab',
    }),
    getLatestDrops: builder.query<LatestData[], Record<string, unknown>>({
      query: params => {
        const queryString = new URLSearchParams();
        Object.entries(params || {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryString.append(key, String(value));
          }
        });
        return `latestDrops?${queryString.toString()}`;
      },
    }),
    getNewFeatured: builder.query<PromotionBanner[], {type?: string}>({
      queryFn: async ({
        type,
      }): Promise<
        QueryReturnValue<
          PromotionBanner[],
          FetchBaseQueryError,
          FetchBaseQueryMeta
        >
      > => {
        try {
          let baseQuery = query(
            collection(db, 'newFeatured'),
            orderBy('createdAt', 'desc'),
          );
          if (type) {
            baseQuery = query(
              collection(db, 'newFeatured'),
              where('type', '==', type),
            );
          }

          const querySnapshot = await getDocs(baseQuery);

          if (querySnapshot.empty) {
            console.warn('No documents matching filter "type==men"');
            return {data: []};
          }

          // Process documents
          const featured: PromotionBanner[] = querySnapshot.docs.map(doc => {
            const data = doc.data() as PromotionBanner;
            return {
              id: doc.id,
              ...data,
              createdAt: data.createdAt?.toDate().toISOString(),
            };
          });
          return featured.length > 0 ? {data: featured} : {data: []};
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
    getLatestProducts: builder.query<
      {products: Product[]},
      {categoryFilter?: CategoryFilter}
    >({
      queryFn: async ({
        categoryFilter,
      }): Promise<
        QueryReturnValue<
          {products: Product[]},
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

          if (true) {
            baseQuery = query(baseQuery, where('isLatest', '==', true));
          }

          baseQuery = query(baseQuery, orderBy('createdAt', 'desc'));

          console.log(baseQuery, 'baseQuery');

          const snapshot = await getDocs(baseQuery);

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
  }),
  overrideExisting: false,
});

export const {
  useGetMenTabQuery,
  useGetWomenTabQuery,
  useGetKidsTabQuery,
  useGetLatestDropsQuery,
  useGetNewFeaturedQuery,
  useGetLatestProductsQuery,
} = homeApi;
