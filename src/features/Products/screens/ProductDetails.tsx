import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import useFavorites from '@hooks/useFavorites';
import { serverTimestamp } from '@react-native-firebase/firestore';
import { useAddToCartMutation } from '@shared/services/cartApi';
import { useTheme } from '@theme/ThemeContext';
import Button from '../../../components/buttons/Button';
import Header from '../../../components/Headers/Header';
import Spacing from '../../../components/Spacing';
import { useRemoveFavoriteMutation } from '../../Favorites/favoritesApi';
import {
  useAddToFavoritesMutation,
  useGetProductByIdQuery,
} from '../productsApi';
import { ProductDetailRouteParams, ProductDetailsProps } from '../types';

const Container = styled.View`
  flex: 1;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 500px;
  margin-bottom: 10px;
`;

const Content = styled.View`
  padding: 15px;
`;

const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Category = styled.Text`
  margin-vertical: 2px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Description = styled.Text`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Price = styled.Text`
  margin-vertical: 10px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SizeTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SizeBox = styled.View`
  margin-horizontal: 5px;
  border-width: 0.5px;
  padding: 5px;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.border};
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 35px;
`;

const Section = styled.View`
  margin-top: 10px;
`;

/**
 * ProductDetails is a screen that shows the details of a product.
 *
 * It will display the product image, title, category, description, price, and
 * sizes. It will also display a "Add to Cart" button and a "Wishlist" button.
 *
 */
const ProductDetails = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<
  RouteProp<{ ProductDetail: ProductDetailRouteParams }, 'ProductDetail'>
  >();
  const productId = route.params?.id || 0;

  const { favorites, refetch } = useFavorites();

  const { data: product } = useGetProductByIdQuery({
    productId,
  });
  const [addToCart] = useAddToCartMutation();

  const [addToFavorites] = useAddToFavoritesMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const renderSizeItem: ListRenderItem<string> = useCallback(
    ({ item }) => (
      <SizeBox>
        <Title>{item}</Title>
      </SizeBox>
    ),
    [],
  );

  const removeFav = useCallback(() => {
    removeFavorite(productId.toString());
  }, [removeFavorite, productId]);

  const isFav = favorites.includes(productId.toString());

  const updateFav = useCallback(() => {
    if (isFav) {
      removeFav();
    } else {
      addToFavorites(product as ProductDetailsProps);
    }

    setTimeout(() => {
      refetch();
    }, 200);
  }, [addToFavorites, isFav, removeFav, product, refetch]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    const item = {
      id: product.id.toString(),
      productId: product.id.toString(),
      title: product.title,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
      createdAt: serverTimestamp(),
    };
    addToCart(item);
  }, [addToCart, product]);

  return (
    <Container>
      <Header backPressed={navigation.goBack} title={product?.title ?? ''} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <ProductImage
          source={{
            uri: product?.images?.[1] || product?.images?.[0],
          }}
          resizeMode="cover"
        />
        <Content>
          <Title>{product?.title}</Title>
          <Category>{product?.category}</Category>
          <Description>{product?.description}</Description>
          <Price>
            $
            {product?.price}
          </Price>

          <Section>
            <SizeTitle>Select Size</SizeTitle>
            <FlatList
              horizontal
              data={product?.sizes}
              keyExtractor={(item, index) => `${item}-${index}`}
              showsHorizontalScrollIndicator={false}
              renderItem={renderSizeItem}
            />
          </Section>

          <Spacing height={20} />
          <Button
            title="Add to Cart"
            type="primary"
            onPress={handleAddToCart}
          />
          <Spacing height={10} />
          <Button
            title="Wishlist"
            type="secondary"
            icon={
              isFav ? (
                <Icon name="heart" size={20} color={theme.colors.primary} />
              ) : (
                <Icon
                  name="heart-outline"
                  size={20}
                  color={theme.colors.primary}
                />
              )
            }
            onPress={updateFav}
            iconPosition="right"
          />
          <Spacing height={20} />
          <Title style={{ fontSize: 16 }}>Review</Title>
          <Title style={{ fontSize: 16 }}>View Product Details</Title>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default ProductDetails;
