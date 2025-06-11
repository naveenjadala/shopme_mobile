import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CartStackParamList} from 'navigation/CartStackNavigator';
import React from 'react';
import styled from 'styled-components/native';

import Button from '../../components/buttons/Button';
import Header from '../../components/Headers/Header';
import {useGetCartItemsQuery} from './cartApi';
import CartList from './components/CartList';

/**
 * Renders the Cart screen with a list of cart items and a checkout button.
 *
 * Uses navigation to handle product detail views and checkout process.
 * Fetches cart items data from the API and passes it to the CartList component.
 *
 * @returns A JSX element that represents the Cart screen.
 */

const Cart = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<CartStackParamList>>();

  const {data: cartData} = useGetCartItemsQuery();

  const productDetails = (itemId: number) => {
    navigation.navigate({name: 'ProductDetails', params: {id: itemId}});
  };

  return (
    <Container>
      <Header title="Profile" isBackButton={false} />
      <CartList productDetails={productDetails} cateData={cartData || []} />
      <Button
        title="Checkout"
        type="primary"
        onPress={() => navigation.navigate('Checkout')}
        style={{margin: 15}}
      />
    </Container>
  );
};

export default Cart;

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  margin-bottom: 8px;
`;
