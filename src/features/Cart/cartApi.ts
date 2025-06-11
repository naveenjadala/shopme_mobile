import {baseApi} from '../../services';
import {CartItem} from './types';

const cartApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCartItems: builder.query<CartItem[], void>({
      query: () => '/cart',
    }),
  }),
});

export const {useGetCartItemsQuery} = cartApi;
