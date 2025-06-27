import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { ItemProps } from '../types';

const { width } = Dimensions.get('screen');

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
  color: ${({ theme }) => theme.colors.textPrimary};
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

export const ProductItem = memo(
  ({ item, goToDetails, isFav, setFav }: ItemProps) => {
    const toggleFav = () => setFav(item.id);
    const details = () => goToDetails(item.id);

    return (
      <CardTouchable onPress={details}>
        <ProductCard>
          <ImageWrapper>
            <ProductImage source={{ uri: item.images[0] }} resizeMode="cover" />
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
  },
);
