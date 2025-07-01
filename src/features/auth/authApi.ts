import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  getAuth,
} from '@react-native-firebase/auth';
import { doc, setDoc } from '@react-native-firebase/firestore';
import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from '@reduxjs/toolkit/query';
import { db } from '../../firebase/firebaseConfig';
import { baseApi } from '../../services';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
    { user: User },
    { email: string; password: string }
    >({
      queryFn: async ({
        email,
        password,
      }): Promise<
      QueryReturnValue<
      { user: User },
      FetchBaseQueryError,
      FetchBaseQueryMeta
      >
      > => {
        try {
          const userDetails = await getAuth().signInWithEmailAndPassword(
            email,
            password,
          );
          const { user } = userDetails;
          const safeUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          };
          return { data: { user: safeUser } };
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
    }),
    signUp: builder.mutation<
    FirebaseAuthTypes.UserCredential,
    { name: string; email: string; password: string }
    >({
      async queryFn({ name, email, password }) {
        try {
          const auth = getAuth();
          const userDetails = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const { user } = userDetails;
          const userId = user.uid;

          await setDoc(doc(db, 'users', userId), {
            email,
            displayName: name,
            createdAt: new Date(),
            lastLogin: new Date(),
            isActive: true,
          });
          return { data: userDetails };
        } catch (error) {
          return {
            error: {
              status: 500,
              statusText: error,
              data: error,
            },
          };
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authApi;
