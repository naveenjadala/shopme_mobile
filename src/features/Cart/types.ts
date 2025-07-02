import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type CartItem = {
  category: string;
  id?: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  createdAt?:
  | string
  | { _seconds: number; _nanoseconds: number }
  | FirebaseFirestoreTypes.FieldValue
  | undefined;
};

export type CartListProps = {
  productDetails: (item: number) => void;
  cateData: CartItem[];
};
