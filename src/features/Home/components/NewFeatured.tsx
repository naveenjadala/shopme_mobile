import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import styled from 'styled-components/native';
import {PromotionBanner} from '../types';

interface Props {
  newFeatured: PromotionBanner[];
  onClick: () => void;
  loading?: boolean;
}

const SHIMMER_ITEM_COUNT = 5;

/**
 * NewFeatured component displays a horizontal list of promotion banners.
 * It shows a shimmer effect while loading and then displays the provided banners.
 *
 * Props:
 * - newFeatured: An array of PromotionBanner objects to be displayed.
 * - onClick: A callback function to handle click events on each banner.
 * - loading: A boolean indicating whether the data is still loading.
 */

const NewFeatured: React.FC<Props> = ({newFeatured, onClick, loading}) => {
  const renderItem = useCallback(
    ({item}: {item: PromotionBanner}) => (
      <ItemTouchable onPress={onClick} activeOpacity={0.8}>
        <ItemImage
          source={{uri: item.image}}
          accessibilityLabel={item.title}
          resizeMode="cover"
          resizeMethod="scale"
        />
        <ItemTitle numberOfLines={1}>{item.title}</ItemTitle>
      </ItemTouchable>
    ),
    [onClick],
  );

  const renderShimmerItem = useCallback(
    () => (
      <View style={{marginRight: 15}}>
        <ItemTouchable activeOpacity={1}>
          <ShimmerPlaceHolder
            style={{width: 150, height: 150, borderRadius: 5, marginBottom: 10}}
          />
          <ShimmerPlaceHolder
            style={{width: 120, height: 20, borderRadius: 3}}
          />
        </ItemTouchable>
      </View>
    ),
    [],
  );

  if (loading) {
    return (
      <Container>
        <Heading>New & Featured</Heading>
        <FlatList
          data={Array.from({length: SHIMMER_ITEM_COUNT})}
          keyExtractor={(_, index) => `shimmer-${index}`}
          horizontal
          contentContainerStyle={{marginLeft: 15}}
          showsHorizontalScrollIndicator={false}
          renderItem={renderShimmerItem}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Heading>New & Featured</Heading>
      <FlatList
        data={newFeatured}
        keyExtractor={item => item.title}
        horizontal
        contentContainerStyle={{paddingLeft: 15}}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default NewFeatured;

const Container = styled.View``;

const Heading = styled.Text`
  font-size: 20px;
  font-weight: 500;
  padding: 15px;
`;

const ItemTouchable = styled.TouchableOpacity`
  margin: 5px;
  width: 150px;
`;

const ItemImage = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 5px;
  margin-bottom: 10px;
  overflow: hidden;
`;

const ItemTitle = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${({theme}) => theme.colors.textPrimary || '#000'};
`;
