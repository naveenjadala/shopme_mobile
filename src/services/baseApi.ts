import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.0.0:3000/' }),
  tagTypes: ['Product', 'Favorites', 'Cart'],
  endpoints: () => ({}),
});
