import {baseApi} from '../../services';
import {Product} from '../../types/types';

const favoritesApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getFavorites: builder.query<Product[], void>({
      query: () => '/favorites',
    }),
  }),
});

export const {useGetFavoritesQuery} = favoritesApi;
