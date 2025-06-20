import React from 'react';
import {Dimensions, Text} from 'react-native';
import styled from 'styled-components/native';
import {Product} from '../../../types/types';

const {width} = Dimensions.get('window');
const NUM_COLUMNS = 3;
const CARD_SPACING = 15;
const CARD_WIDTH = (width - CARD_SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

interface Props {
  item: Product;
  getProductDetails: (id: number) => void;
}

const HomeProductCard = React.memo(({item, getProductDetails}: Props) => {
  return (
    <Container onPress={() => getProductDetails(item?.id)}>
      <ImageView source={{uri: item.iconImg}} resizeMode="contain" />
      <ContentContainer>
        <Title numberOfLines={2}>{item.title}</Title>
        <Text>{item.price}</Text>
      </ContentContainer>
    </Container>
  );
});

export default HomeProductCard;

const Container = styled.TouchableOpacity`
  width: ${CARD_WIDTH}px;
  margin-left: 8px;
  margin-bottom: ${CARD_SPACING}px;
  overflow: 'hidden';
  align-items: 'center';
  justify-content: 'center';
`;
const ImageView = styled.Image`
  width: 100%;
  height: 120px;
`;

const ContentContainer = styled.View`
  width: '100%';
`;

const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSize.sm}px;
  font-weight: 500;
  margin-bottom: 4px;
`;
