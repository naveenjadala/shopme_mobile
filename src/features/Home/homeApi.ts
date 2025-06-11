import {baseApi} from '../../services';
import {CategoryData, LatestData} from './types';

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
  }),
  overrideExisting: false,
});

export const {
  useGetMenTabQuery,
  useGetWomenTabQuery,
  useGetKidsTabQuery,
  useGetLatestDropsQuery,
} = homeApi;
