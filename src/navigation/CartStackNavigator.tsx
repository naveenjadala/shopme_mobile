import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkout from 'features/Checkout/Checkout';
import React from 'react';

import Cart from '../features/Cart/Cart';
import ProductDetails from '../features/Products/screens/ProductDetails';
import ProductsList from '../features/Products/screens/ProductsList';
import { CartStackParamList } from './types';

const CartStack = createNativeStackNavigator<CartStackParamList>();

const CartStackNavigator = () => (
  <CartStack.Navigator screenOptions={{ headerShown: false }}>
    <CartStack.Screen name="CartScreen" component={Cart} />
    <CartStack.Screen name="Products" component={ProductsList} />
    <CartStack.Screen name="ProductDetails" component={ProductDetails} />
    <CartStack.Screen name="Checkout" component={Checkout} />
  </CartStack.Navigator>
);

export default CartStackNavigator;
