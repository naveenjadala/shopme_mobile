import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParamList} from 'navigation/HomeStackNavigator';
import React from 'react';
import {ScrollView} from 'react-native';
import img1 from '../../../asserts/images/img1.png';
import img2 from '../../../asserts/images/img2.png';
import img3 from '../../../asserts/images/img3.png';
import {LatestDrops, NewFeatured} from '../components';
import CategoryBanner from '../components/CategoryBanner';
import {useGetKidsTabQuery, useGetLatestDropsQuery} from '../homeApi';

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
 * HomeKids is a component that displays a list of featured products, categories and latest products specifically for women.
 *
 * @returns {React.ReactElement} A JSX element representing the HomeWomen component.
 */
const HomeKids = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const {data: kidsData, isLoading, isError, error} = useGetKidsTabQuery();
  const {data: latestDropsData, isLoading: dropsLoading} =
    useGetLatestDropsQuery({
      _page: 1,
      _limit: 9,
      gender: 'kids',
    });

  const reDirectToProduct = (params: object) => {
    navigation.navigate('Products', params);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <NewFeatured
        newFeatured={kidsData?.newAndFeatured || []}
        onClick={() => reDirectToProduct({gender: 'kids', isFeatured: true})}
        loading={isLoading}
      />
      <CategoryBanner
        categories={categories}
        onPress={category => reDirectToProduct({category, gender: 'kids'})}
      />
      <LatestDrops
        latestData={latestDropsData || []}
        goToProducts={() => reDirectToProduct({gender: 'kids'})}
        loading={dropsLoading}
      />
    </ScrollView>
  );
};

export default HomeKids;
