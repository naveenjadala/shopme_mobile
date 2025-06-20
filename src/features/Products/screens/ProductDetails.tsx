import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

import {getAuth} from '@react-native-firebase/auth';
import {doc, setDoc} from '@react-native-firebase/firestore';
import Button from '../../../components/buttons/Button';
import Header from '../../../components/Headers/Header';
import Spacing from '../../../components/Spacing';
import {db} from '../../../firebase/firebaseConfig';
import {useGetProductByIdQuery} from '../productsApi';
import {ProductDetailRouteParams} from '../types';

/**
 * ProductDetails is a screen that shows the details of a product.
 *
 * It will display the product image, title, category, description, price, and
 * sizes. It will also display a "Add to Cart" button and a "Wishlist" button.
 *
 */
const ProductDetails = () => {
  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<{ProductDetail: ProductDetailRouteParams}, 'ProductDetail'>
    >();
  const productId = route.params?.id || 0;
  console.log(productId, 'productId');

  const {data: product, isLoading} = useGetProductByIdQuery({
    productId: productId,
  });

  const renderSizeItem: ListRenderItem<string> = useCallback(
    ({item}) => (
      <SizeBox>
        <Title style={{fontSize: 14}}>{item}</Title>
      </SizeBox>
    ),
    [],
  );

  // const fav = async product => {
  //   const userId = getAuth().currentUser?.uid;
  //   console.log(userId, 'userId');

  //   if (!userId) return;
  //   const favoritesRef = doc(db, 'users', userId, 'favorites', product.id);
  //   console.log('Product added to favorites successfully!', favoritesRef);
  //   await setDoc(favoritesRef, {
  //     ...product,
  //     addedAt: new Date(),
  //   });
  //   console.log('Product added to favorites successfully!');
  // };

  async function addToFavorites(item) {
    try {
      const userId = getAuth().currentUser?.uid;
      console.log(userId, 'userId');

      if (!userId) return;
      console.log(item, 'item');

      const favoritesRef = doc(
        db,
        'users',
        userId,
        'favorites',
        item.id.toString(),
      );
      await setDoc(favoritesRef, {
        ...item,
        addedAt: new Date(),
      });
      console.log('Added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <Container>
      <Header backPressed={navigation.goBack} title={product?.title ?? ''} />
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}>
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
          <Price>$ {product?.price}</Price>

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
          <Button title="Add to Cart" type="rounded" onPress={() => {}} />
          <Spacing height={10} />
          <Button
            title="Wishlist"
            type="secondary"
            icon={<Icon name="heart-outline" size={20} color="#111" />}
            onPress={() => {
              addToFavorites(product);
            }}
            iconPosition="right"
          />
          <Spacing height={20} />
          <Title style={{fontSize: 16}}>Review</Title>
          <Title style={{fontSize: 16}}>View Product Details</Title>
        </Content>
      </ScrollView>
    </Container>
  );
};

export default ProductDetails;

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
  font-size: 20px;
  font-weight: 500;
`;

const Category = styled.Text`
  margin-vertical: 2px;
`;

const Description = styled.Text``;

const Price = styled.Text`
  margin-vertical: 10px;
  font-size: 16px;
  font-weight: 500;
`;

const SizeTitle = styled.Text`
  font-size: 14px;
  font-weight: 500;
`;

const SizeBox = styled.View`
  margin-horizontal: 5px;
  border-width: 0.5px;
  padding: 5px;
  border-radius: 5px;
  border-color: ${({theme}) => theme.colors.border};
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 35px;
`;

const Section = styled.View`
  margin-top: 10px;
`;
