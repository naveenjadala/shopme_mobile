import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';

import EmptyListState from '@components/emptyState/EmptyListState';
import CustomFlatList from '@components/flatList/CustomFlatList';
import Header from '@components/Headers/Header';
import { BottomTabParamList, HomeStackParamList } from '@navigation/types';
import { Container } from '@theme/globalStyles';
import { Product } from '../../../types/types';
import { ProductItem } from '../components/ProductItem';
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from '../favoritesApi';

type NavigationProp = CompositeNavigationProp<
BottomTabNavigationProp<BottomTabParamList, 'Favorites'>,
NativeStackNavigationProp<HomeStackParamList>
>;

/**
 * Favorites component renders a list of favorite products.
 *
 * It fetches the favorite products data using the useGetFavoritesQuery hook
 * and displays them in a grid view. Each product item is clickable and
 * navigates to the ProductDetails screen.
 *
 * @returns JSX.Element
 */
const Favorites = () => {
  const navigation = useNavigation<NavigationProp>();

  const { data: favData, isLoading } = useGetFavoritesQuery();

  const [removeFavorite] = useRemoveFavoriteMutation();

  const goToDetails = useCallback(
    (id: number) => {
      navigation.navigate('ProductDetails', { id });
    },
    [navigation],
  );

  const removeFav = useCallback(
    (id: number) => {
      removeFavorite(id.toString());
    },
    [removeFavorite],
  );

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductItem
        item={item}
        goToDetails={goToDetails}
        isFav
        setFav={removeFav}
      />
    ),
    [goToDetails, removeFav],
  );

  const keyExtractor = useCallback((item: Product) => item.id.toString(), []);

  const goHome = useCallback(() => {
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  }, [navigation]);

  return (
    <Container>
      <Header title="Favorites" isBackButton={false} />
      <CustomFlatList
        data={favData || []}
        renderItem={renderProductItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          isLoading ? null : (
            <EmptyListState
              message="No products found!"
              isIcon
              icon="heart-circle-outline"
              onPress={goHome}
            />
          )
        }
      />
    </Container>
  );
};

export default Favorites;
