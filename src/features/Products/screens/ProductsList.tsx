import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from 'navigation/HomeStackNavigator';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../components/Headers/Header';
import {useFavorites} from '../../../hooks/useFavorites';
import {CategoryFilter, Product} from '../../../types/types';
import {useGetAllProductsQuery} from '../productsApi';

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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const routeParams = route.params ?? {};
  const pageSize = 10;
  const {favorites, loading: favLoading} = useFavorites();
  console.log(favorites, 'favorites');

  const [page, setPage] = useState(1);

  const [userFilters, setUserFilters] = useState<CategoryFilter>({});

  const filters = useMemo(
    () => ({
      pageNo: page,
      pageSize,
      categoryFilter: {...routeParams, ...userFilters},
    }),
    [page, pageSize, userFilters, routeParams],
  );

  const {data, isFetching, isLoading, isError, error} =
    useGetAllProductsQuery(filters);

  useEffect(() => {
    if (data?.products && !isFetching && page > 1) {
      setAllProducts(prev => {
        const newProducts = data.products.filter(
          newProduct => !prev.some(p => p.id === newProduct.id),
        );
        return [...prev, ...newProducts];
      });
    } else if (data?.products && !isFetching) {
      setAllProducts(data.products);
    }
  }, [data?.products, isFetching, page]);

  const renderItem = useCallback(
    ({item}: {item: Product}) => (
      <CardTouchable
        onPress={() => navigation.navigate('ProductDetails', {id: item.id})}>
        <ProductCard>
          <ImageWrapper>
            <ProductImage source={{uri: item.images[0]}} resizeMode="cover" />
            {/* <TouchableOpacity> */}
            <FavIcon>
              <Icon
                name={
                  favorites.includes(item.id.toString())
                    ? 'heart'
                    : 'heart-outline'
                }
                size={20}
                color={
                  favorites.includes(item.id.toString()) ? 'black' : 'gray'
                }
              />
            </FavIcon>
          </ImageWrapper>
          {/* </TouchableOpacity> */}
          <ProductInfo>
            <ProductTitle numberOfLines={1}>{item.title}</ProductTitle>
            <ProductCategory>{item.category}</ProductCategory>
            <ProductPrice>${item.price.toFixed(2)}</ProductPrice>
          </ProductInfo>
        </ProductCard>
      </CardTouchable>
    ),
    [navigation, favorites],
  );

  const testFilters = () => {
    setUserFilters({
      subCategory: 'shoes',
      gender: 'women',
    });
    setAllProducts([]);
    setPage(1);
  };

  const loadMore = () => {
    if (!isFetching) {
      setPage(prev => prev + 1);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error</Text>;
  }

  if (allProducts.length === 0) {
    {
      !isLoading && allProducts.length === 0 && (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          No products found.
        </Text>
      );
    }
  }

  return (
    <Container>
      <Header backPressed={navigation.goBack} title="Products" />
      <StyledFlatList
        data={allProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching && data?.hasMore ? (
            <ActivityIndicator size="large" color="#000" />
          ) : null
        }
      />
    </Container>
  );
};

export default ProductsList;

const Container = styled.View`
  flex: 1;
`;

const StyledFlatList = styled.FlatList.attrs(() => ({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  contentContainerStyle: {
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
  color: ${({theme}) => theme.colors.textPrimary};
`;

const ProductPrice = styled.Text`
  font-size: 13px;
  font-weight: 500;
  margin-top: 4px;
  color: ${({theme}) => theme.colors.textPrimary};
`;

const ImageWrapper = styled.View`
  width: ${width / 2}px;
  height: 200px;
  position: relative;
  overflow: hidden;
`;

const FavIcon = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.8);
`;
