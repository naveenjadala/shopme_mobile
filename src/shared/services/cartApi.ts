import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';

import { CartItem } from '@features/Cart/types';
import * as cartService from './cartService';
import { baseApi } from '../../services/baseApi';

export const cartApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCartItems: builder.query<CartItem[], void>({
      queryFn: async (): Promise<
      QueryReturnValue<CartItem[], FetchBaseQueryError, FetchBaseQueryMeta>
      > => {
        try {
          const data = await cartService.getCartItems();
          const products = data.map(value => {
            const cartData = value;
            return {
              ...cartData,
              createdAt: '',
            };
          });
          console.log('products', products);

          return { data: products };
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
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation<string, Omit<CartItem, 'id' | 'quantity'>>({
      async queryFn(
        newItem,
      ): Promise<
        QueryReturnValue<string, FetchBaseQueryError, FetchBaseQueryMeta>
        > {
        try {
          await cartService.addToCart(newItem);
          console.log('Item added to cart successfully', newItem);

          return { data: 'Item added to cart successfully' };
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
      invalidatesTags: ['Cart'],
    }),

    updateCartItem: builder.mutation<
    void,
    { id: string; updates: Partial<CartItem> }
    >({
      queryFn: async ({
        id,
        updates,
      }): Promise<
      QueryReturnValue<void, FetchBaseQueryError, FetchBaseQueryMeta>
      > => {
        try {
          await cartService.updateCartItem(id, updates);
          return { data: undefined };
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
      invalidatesTags: ['Cart'],
    }),

    removeCartItem: builder.mutation<void, string>({
      async queryFn(
        id,
      ): Promise<
        QueryReturnValue<void, FetchBaseQueryError, FetchBaseQueryMeta>
        > {
        try {
          await cartService.removeCartItem(id);
          return { data: undefined };
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
      invalidatesTags: ['Cart'],
    }),

    clearCart: builder.mutation<void, void>({
      async queryFn(): Promise<
      QueryReturnValue<void, FetchBaseQueryError, FetchBaseQueryMeta>
      > {
        try {
          await cartService.clearCart();
          return { data: undefined };
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
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetCartItemsQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;
