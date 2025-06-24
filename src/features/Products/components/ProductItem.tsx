import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {Product} from 'types/types';

const {width} = Dimensions.get('window');
const CARD_MARGIN = 4;
const CARD_WIDTH = width / 2 - CARD_MARGIN;

interface ItemProps {
  item: Product;
  goToDetails: (id: number) => void;
  getFavorites: (id: number) => boolean;
  setFav: (item: Product) => void;
}

const ProductItem = React.memo(
  ({item, goToDetails, getFavorites, setFav}: ItemProps) => {
    const handleDetails = () => {
      goToDetails(item.id);
    };
    const isFav = () => {
      return getFavorites(item.id);
    };

    const setFavorites = () => {
      setFav(item);
    };

    return (
      <CardTouchable onPress={handleDetails}>
        <ProductCard>
          <ImageWrapper>
            <ProductImage source={{uri: item.images[0]}} resizeMode="cover" />
            <FavIcon onPress={setFavorites}>
              <Icon
                name={isFav() ? 'heart' : 'heart-outline'}
                size={20}
                color={isFav() ? 'black' : 'gray'}
              />
            </FavIcon>
          </ImageWrapper>
          <ProductInfo>
            <ProductTitle numberOfLines={1}>{item.title}</ProductTitle>
            <ProductCategory>{item.category}</ProductCategory>
            <ProductPrice>${item.price.toFixed(2)}</ProductPrice>
          </ProductInfo>
        </ProductCard>
      </CardTouchable>
    );
  },
);

export default ProductItem;

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
