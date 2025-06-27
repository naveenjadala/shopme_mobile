export type AppStackParamList = {
  Tabs: undefined;
  Product: undefined;
  Checkout: undefined;
  OrderSuccess: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type BottomTabParamList = {
  Home: object;
  Favorites: object;
  Cart: object;
  Profile: object;
};

export type CartStackParamList = {
  CartScreen: object;
  Products: object;
  ProductDetails: { id: number };
};

export type HomeStackParamList = {
  HomeScreen: object;
  Products: object;
  ProductDetails: { id: number };
};

export type FavStackParamList = {
  FavoritesScreen: object;
  Products: object;
  ProductDetails: { id: number };
};
