import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';

import { BottomTabParamList, CartStackParamList } from '@navigation/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container } from '@theme/globalStyles';
import Button from '../../components/buttons/Button';
import EmptyListState from '../../components/emptyState/EmptyListState';
import Header from '../../components/Headers/Header';
import { useGetCartItemsQuery } from './cartApi';
import CartList from './components/CartList';

type NavigationProp = CompositeNavigationProp<
NativeStackNavigationProp<CartStackParamList, 'CartScreen'>,
BottomTabNavigationProp<BottomTabParamList>
>;

/**
 * Renders the Cart screen with a list of cart items and a checkout button.
 *
 * Uses navigation to handle product detail views and checkout process.
 * Fetches cart items data from the API and passes it to the CartList component.
 *
 * @returns A JSX element that represents the Cart screen.
 */

const Cart = () => {
  const navigation = useNavigation<NavigationProp>();

  const { data: cartData } = useGetCartItemsQuery();

  const productDetails = (itemId: number) => {
    navigation.navigate({ name: 'ProductDetails', params: { id: itemId } });
  };

  if (!cartData) {
    return (
      <EmptyListState
        message="You have no products yet in your cart"
        isIcon
        icon="cart-outline"
        onPress={() => navigation.navigate({ name: 'Home', params: {} })}
      />
    );
  }

  return (
    <Container>
      <Header title="Profile" isBackButton={false} />
      <CartList productDetails={productDetails} cateData={cartData || []} />
      <Button
        title="Checkout"
        type="primary"
        onPress={() => navigation.navigate({ name: 'Checkout' })}
        style={{ margin: 15 }}
      />
    </Container>
  );
};

export default Cart;

// const Container = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.colors.background};
//   margin-bottom: 8px;
// `;
