import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Favorites from '../features/Favorites/screen/Favorites';
import ProductDetails from '../features/Products/screens/ProductDetails';
import ProductsList from '../features/Products/screens/ProductsList';

export type FavStackParamList = {
  FavoritesScreen: object;
  Products: object;
  ProductDetails: {id: number};
};
const CartStack = createNativeStackNavigator<FavStackParamList>();

const FavStackNavigator = () => {
  return (
    <CartStack.Navigator screenOptions={{headerShown: false}}>
      <CartStack.Screen name="FavoritesScreen" component={Favorites} />
      <CartStack.Screen name="Products" component={ProductsList} />
      <CartStack.Screen name="ProductDetails" component={ProductDetails} />
    </CartStack.Navigator>
  );
};

export default FavStackNavigator;
