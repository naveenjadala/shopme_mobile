import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from 'navigation/HomeStackNavigator';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {BottomTabParamList} from 'navigation/BottomTabs';
import CustomFlatList from '../../../components/flatList/CustomFlatList';
import Header from '../../../components/Headers/Header';
import {useRemoveFavoriteMutation} from '../../../features/Favorites/favoritesApi';
import {useFavorites} from '../../../hooks/useFavorites';
import {CategoryFilter, Product} from '../../../types/types';
import ProductItem from '../components/ProductItem';
import {
  useAddToFavoritesMutation,
  useGetAllProductsQuery,
} from '../productsApi';

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  NativeStackNavigationProp<HomeStackParamList>
>;

/**
 * Renders a list of products with a header that allows the user to go back to the previous screen.
 *
 * @param route The route object that contains the route parameters.
 * @returns A JSX element that renders a list of products.
 */
const ProductsList = () => {
  const navigation = useNavigation<NavigationProp>();

  const route = useRoute<RouteProp<Record<string, object>, string>>();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [userFilters, setUserFilters] = useState<CategoryFilter>({});

  const routeParams = route.params ?? {};
  const pageSize = 10;
  const filters = useMemo(
    () => ({
      pageNo: page,
      pageSize,
      categoryFilter: {...routeParams, ...userFilters},
    }),
    [page, pageSize, userFilters, routeParams],
  );

  const {
    favorites,
    loading: favLoading,
    refetch: refetchFavorites,
  } = useFavorites();
  const {data, isFetching, isLoading, isError, error} =
    useGetAllProductsQuery(filters);

  const [removeFavorite, {isLoading: removeLoading}] =
    useRemoveFavoriteMutation();
  const [addToFavorites, {isLoading: addLoading}] = useAddToFavoritesMutation();

  useFocusEffect(
    useCallback(() => {
      refetchFavorites();
    }, [refetchFavorites]),
  );

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

  // TODO: Need to add filtering
  // const testFilters = () => {
  //   setUserFilters({
  //     subCategory: 'shoes',
  //     gender: 'women',
  //   });
  //   setAllProducts([]);
  //   setPage(1);
  // };

  const loadMore = () => {
    if (!isFetching) {
      setPage(prev => prev + 1);
    }
  };

  const isFav = useCallback(
    (id: number) => {
      return favorites.includes(id.toString());
    },
    [favorites, removeFavorite, addToFavorites],
  );

  const goToDetails = useCallback(
    (id: number) => {
      navigation.navigate('ProductDetails', {id: id});
    },
    [navigation],
  );

  const removeFav = useCallback(
    (id: number) => {
      removeFavorite(id.toString());
    },
    [removeFavorite],
  );

  const addFav = useCallback(
    (item: Product) => {
      addToFavorites(item);
    },
    [addToFavorites],
  );

  const updateFavorites = useCallback(
    (item: Product) => {
      if (isFav(item.id)) {
        removeFav(item.id);
      } else {
        addFav(item);
      }
      setTimeout(() => {
        refetchFavorites();
      }, 200);
    },
    [refetchFavorites, isFav, removeFav, addFav],
  );

  const renderProductItem = useCallback(
    ({item}: {item: Product}) => (
      <ProductItem
        item={item}
        goToDetails={goToDetails}
        getFavorites={isFav}
        setFav={updateFavorites}
      />
    ),
    [goToDetails, updateFavorites, isFav],
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  const loadFooter = () => {
    if (isFetching && data?.hasMore) {
      return <ActivityIndicator size="large" color="#000" />;
    }
    return null;
  };

  const goHome = () => {
    navigation.reset({index: 0, routes: [{name: 'Home'}]});
  };

  return (
    <Container>
      <Header backPressed={navigation.goBack} title="Products" />
      <CustomFlatList
        data={allProducts}
        renderItem={renderProductItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loadFooter}
        goHome={goHome}
      />
    </Container>
  );
};

export default ProductsList;

const Container = styled.View`
  flex: 1;
`;
