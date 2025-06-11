import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from '../features/Cart/Cart';
import ProductDetails from '../features/Products/screens/ProductDetails';
import ProductsList from '../features/Products/screens/ProductsList';

export type CartStackParamList = {
  CartScreen: object;
  Products: object;
  ProductDetails: {id: number};
};
const CartStack = createNativeStackNavigator<CartStackParamList>();

const CartStackNavigator = () => {
  return (
    <CartStack.Navigator screenOptions={{headerShown: false}}>
      <CartStack.Screen name="CartScreen" component={Cart} />
      <CartStack.Screen name="Products" component={ProductsList} />
      <CartStack.Screen name="ProductDetails" component={ProductDetails} />
    </CartStack.Navigator>
  );
};

export default CartStackNavigator;
