import {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  getAuth,
} from '@react-native-firebase/auth';
import {doc, setDoc} from '@react-native-firebase/firestore';
import {db} from '../../firebase/firebaseConfig';
import {baseApi} from '../../services';

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<
      {user: {uid: string; email: string | null; displayName: string | null}},
      {email: string; password: string}
    >({
      async queryFn({email, password}) {
        try {
          const userDetails = await getAuth().signInWithEmailAndPassword(
            email,
            password,
          );
          const user = userDetails.user;
          const safeUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          };
          return {data: {user: safeUser}};
        } catch (error) {
          return {
            error: {
              status: 500,
              statusText: error,
              data: 'Unknown error',
            },
          };
        }
      },
    }),
    signUp: builder.mutation<
      FirebaseAuthTypes.UserCredential,
      {name: string; email: string; password: string}
    >({
      async queryFn({name, email, password}) {
        try {
          const auth = getAuth();
          const userDetails = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user = userDetails.user;
          const userId = user.uid;

          await setDoc(doc(db, 'users', userId), {
            email: email,
            displayName: name,
            createdAt: new Date(),
            lastLogin: new Date(),
            isActive: true,
          });
          return {data: userDetails};
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

export const {useLoginMutation, useSignUpMutation} = authApi;
