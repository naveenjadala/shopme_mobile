import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from 'navigation/HomeStackNavigator';
import React, {useCallback} from 'react';
import {Dimensions, FlatList, ListRenderItem} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import styled from 'styled-components/native';
import Button from '../../../components/buttons/Button';
import {LatestData} from '../types';
import HomeProductCard from './HomeProductCard';

const {width} = Dimensions.get('window');
const NUM_COLUMNS = 3;
const CARD_SPACING = 15;

const CARD_WIDTH = (width - CARD_SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

interface Props {
  latestData: LatestData[];
  goToProductDetails?: (id: number) => void;
  goToProducts: () => void;
  loading?: boolean;
}

/**
 * LatestDrops component renders a list of latest products.
 *
 * @param {LatestData[]} latestData - latest products data
 * @param {() => void} goToProducts - callback function to navigate to Products screen
 * @param {boolean} [loading=false] - whether the component is loading or not
 *
 * @returns JSX.Element
 */
const LatestDrops: React.FC<Props> = ({latestData, goToProducts, loading}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const handleProductDetails = (id: number) => {
    navigation.navigate('ProductDetails', {id});
  };

  const renderShimmerItem = () => (
    <ContainerCard>
      <ShimmerImage />
      <ContentContainer>
        <ShimmerTitle />
        <ShimmerPrice />
      </ContentContainer>
    </ContainerCard>
  );

  const renderProductCard: ListRenderItem<LatestData> = useCallback(
    ({item}) => (
      <HomeProductCard item={item} getProductDetails={handleProductDetails} />
    ),
    [handleProductDetails],
  );

  if (loading) {
    return (
      <Container>
        <Title>Latest Drops</Title>
        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          keyExtractor={item => item.toString()}
          renderItem={renderShimmerItem}
          numColumns={NUM_COLUMNS}
          scrollEnabled={false}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Title>Latest Drops</Title>
      <FlatList
        data={latestData}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{
          paddingRight: CARD_SPACING,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
        renderItem={renderProductCard}
        numColumns={NUM_COLUMNS}
        scrollEnabled={false}
      />
      <StyledViewAllButton
        onPress={goToProducts}
        title="View All"
        type="secondary"
      />
    </Container>
  );
};

export default LatestDrops;

const Container = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: ${({theme}) => theme.fontSize.lg}px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.black};
  padding: 15px;
`;

const StyledViewAllButton = styled(Button)`
  width: 25%;
  align-self: center;
  padding-vertical: 10px;
  margin-vertical: 15px;
`;

const ContainerCard = styled.TouchableOpacity`
  width: ${CARD_WIDTH}px;
  margin-left: 8px;
  margin-bottom: CARD_SPACING;
  overflow: 'hidden';
  align-items: 'center';
  justify-content: 'center';
`;

const ContentContainer = styled.View`
  width: '100%';
`;

const shimmerColors = ['#ebebeb', '#c5c5c5', '#ebebeb'];

const ShimmerImage = styled(ShimmerPlaceholder).attrs(() => ({
  shimmerColors,
  stopAutoRun: false,
  shimmerStyle: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
}))``;

const ShimmerTitle = styled(ShimmerPlaceholder).attrs(() => ({
  shimmerColors,
  shimmerStyle: {
    width: '80%',
    height: 16,
    marginBottom: 4,
  },
}))``;

const ShimmerPrice = styled(ShimmerPlaceholder).attrs(() => ({
  shimmerColors,
  shimmerStyle: {
    width: '50%',
    height: 14,
    marginBottom: 4,
  },
}))``;
