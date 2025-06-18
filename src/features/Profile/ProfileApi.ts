import auth from '@react-native-firebase/auth';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {baseApi} from '../../services';

const formatError = (error: unknown): FetchBaseQueryError => {
  const err = error as {code: string; message: string};
  return {
    status: err.code.startsWith('auth/') ? 401 : 500,
    data: {
      message: err.message || 'Authentication failed',
      code: err.code || 'unknown-error',
    },
  };
};

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    logout: builder.mutation<{success: boolean}, void>({
      async queryFn() {
        try {
          await auth().signOut();
          return {data: {success: true}};
        } catch (error) {
          return {error: formatError(error)};
        }
      },
    }),
  }),
});

export const {useLogoutMutation} = authApi;
