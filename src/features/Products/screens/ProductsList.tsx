import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from 'navigation/HomeStackNavigator';
import React, {useCallback} from 'react';
import {Dimensions, FlatList, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import Header from '../../../components/Headers/Header';
import {Product} from '../../../types/types';
import {useGetProductsQuery} from '../productsApi';

const {width} = Dimensions.get('window');
const CARD_MARGIN = 4;
const CARD_WIDTH = width / 2 - CARD_MARGIN;

/**
 * Renders a list of products with a header that allows the user to go back to the previous screen.
 *
 * @param route The route object that contains the route parameters.
 * @returns A JSX element that renders a list of products.
 */
const ProductsList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<RouteProp<Record<string, object>, string>>();
  const routeParams = route.params ?? {};

  const {data, isLoading, isError} = useGetProductsQuery({
    ...routeParams,
  });

  const renderItem = useCallback(
    ({item}: {item: Product}) => (
      <CardTouchable
        onPress={() => navigation.navigate('ProductDetails', {id: item.id})}>
        <ProductCard>
          <ProductImage source={{uri: item.images[0]}} resizeMode="cover" />
          <ProductInfo>
            <ProductTitle numberOfLines={1}>{item.title}</ProductTitle>
            <ProductCategory>{item.category}</ProductCategory>
            <ProductPrice>${item.price.toFixed(2)}</ProductPrice>
          </ProductInfo>
        </ProductCard>
      </CardTouchable>
    ),
    [navigation],
  );

  return (
    <Container>
      <Header backPressed={navigation.goBack} title="Products" />
      <StyledFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default ProductsList;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const StyledFlatList = styled.FlatList.attrs(() => ({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  contentContainerStyle: {
    paddingTop: 12,
    paddingBottom: 32,
  },
}))`` as unknown as typeof FlatList;

const CardTouchable = styled(TouchableOpacity)`
  flex: 1;
`;

const ProductCard = styled.View`
  width: ${CARD_WIDTH}px;
  overflow: hidden;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 200px;
`;

const ProductInfo = styled.View`
  padding: 10px;
`;

const ProductTitle = styled.Text`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({theme}) => theme.colors.textPrimary};
`;

const ProductCategory = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.colors.textSecondary};
`;

const ProductPrice = styled.Text`
  font-size: 13px;
  font-weight: 500;
  margin-top: 4px;
  color: ${({theme}) => theme.colors.textPrimary};
`;
