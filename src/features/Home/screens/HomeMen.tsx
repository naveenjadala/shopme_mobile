import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from 'navigation/HomeStackNavigator';
import React from 'react';
import styled from 'styled-components/native';
import img1 from '../../../asserts/images/img1.png';
import img2 from '../../../asserts/images/img2.png';
import img3 from '../../../asserts/images/img3.png';
import {LatestDrops, NewFeatured} from '../components';
import CategoryBanner from '../components/CategoryBanner';
import {useGetLatestDropsQuery, useGetMenTabQuery} from '../homeApi';

const categories = [
  {
    label: 'Shoes',
    key: 'shoes',
    image: img1,
  },
  {
    label: 'Clothing',
    key: 'clothing',
    image: img2,
  },
  {
    label: 'Accessories',
    key: 'accessories',
    image: img3,
  },
];

/**
 * HomeMen is a component that displays a list of featured products, categories and latest products specifically for women.
 *
 * @returns {React.ReactElement} A JSX element representing the HomeWomen component.
 */
const HomeMen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {data: menData, isLoading, isError, error} = useGetMenTabQuery();
  const {data: latestDropsData, isLoading: dropsLoading} =
    useGetLatestDropsQuery({
      _page: 1,
      _limit: 9,
      gender: 'men',
    });

  const reDirectToProduct = (params: object) => {
    navigation.navigate('Products', params);
  };

  return (
    <ScrollContainer>
      <NewFeatured
        newFeatured={menData?.newAndFeatured || []}
        onClick={() => reDirectToProduct({isFeatured: true, gender: 'men'})}
        loading={isLoading}
      />
      <CategoryBanner
        categories={categories}
        onPress={category =>
          reDirectToProduct({gender: 'men', category: category})
        }
      />
      <LatestDrops
        latestData={latestDropsData || []}
        goToProducts={() => reDirectToProduct({gender: 'men', isLatest: true})}
        loading={dropsLoading}
      />
    </ScrollContainer>
  );
};

export default HomeMen;

const ScrollContainer = styled.ScrollView`
  background-color: ${({theme}) => theme.colors.background};
`;
