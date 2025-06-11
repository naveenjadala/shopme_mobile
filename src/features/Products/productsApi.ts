import {baseApi} from '../../services';
import {Product} from '../../types/types';
import {ProductDetailsProps} from './types';

const productsApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => 'products',
    }),
    getProducts: builder.query<Product[], Record<string, unknown>>({
      query: params => {
        const queryString = new URLSearchParams();
        Object.entries(params || {}).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryString.append(key, String(value));
          }
        });
        return `products?${queryString.toString()}`;
      },
    }),
    getProductById: builder.query<ProductDetailsProps, number>({
      query: id => ({
        url: `products`,
        params: {id},
      }),
      transformResponse: (
        response: ProductDetailsProps[],
      ): ProductDetailsProps => response[0] as ProductDetailsProps,
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
} = productsApi;
