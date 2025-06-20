import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {FavStackParamList} from 'navigation/FavStackNavigator';
import {Product} from 'types/types';
import Header from '../../../components/Headers/Header';
import {useGetFavoritesQuery} from '../favoritesApi';
import {ItemProps} from '../types';

const {width} = Dimensions.get('screen');

const ProductItem = memo(({item, goToDetails}: ItemProps) => {
  const [isFav, setIsFav] = useState(true);
  const toggleFav = () => setIsFav(!isFav);
  const details = () => goToDetails(item.id);

  return (
    <CardTouchable onPress={details}>
      <ProductCard>
        <ImageWrapper>
          <ProductImage source={{uri: item.images[0]}} resizeMode="cover" />
          <FavIcon onPress={toggleFav}>
            <Icon
              name={isFav ? 'heart' : 'heart-outline'}
              size={20}
              color={isFav ? 'black' : 'gray'}
            />
          </FavIcon>
        </ImageWrapper>
        <ProductInfo>
          <ProductTitle numberOfLines={1}>{item.title}</ProductTitle>
        </ProductInfo>
      </ProductCard>
    </CardTouchable>
  );
});

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
  const navigation =
    useNavigation<NativeStackNavigationProp<FavStackParamList>>();

  const {data: favData, isLoading} = useGetFavoritesQuery();

  const goToDetails = (id: number) => {
    navigation.navigate('ProductDetails', {id: id});
  };

  const renderProductItem: ListRenderItem<Product> = useCallback(
    ({item}) => <ProductItem item={item} goToDetails={goToDetails} />,
    [goToDetails],
  );

  if (isLoading) {
    return <Header title="Favorites" isBackButton={false} />;
  }

  return (
    <Container>
      <Header title="Favorites" isBackButton={false} />
      <FlatList
        data={favData}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: 50}}
        renderItem={renderProductItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

export default Favorites;

const Container = styled.View`
  flex: 1;
`;

const CardTouchable = styled(TouchableOpacity)`
  flex: 1;
`;

const ProductCard = styled.View`
  width: ${width / 2 - 4}px;
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
