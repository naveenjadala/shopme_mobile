import React, {useCallback} from 'react';
import {useWindowDimensions} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import styled from 'styled-components/native';
import {TabBarProps} from 'types/types';
import {TabBar} from '../components';
import HomeKids from './HomeKids';
import HomeMen from './HomeMen';
import HomeWomen from './HomeWomen';

type Route = {key: 'men' | 'women' | 'kids'; title: string};

const routes: Route[] = [
  {key: 'men', title: 'Men'},
  {key: 'women', title: 'Women'},
  {key: 'kids', title: 'Kids'},
];

const renderScene = SceneMap({
  men: HomeMen,
  women: HomeWomen,
  kids: HomeKids,
});

/**
 * A tab view component for the home screen of the app. It renders tabs for
 * men, women, and kids, and displays the corresponding home screen component
 * when a tab is selected.
 *
 * @returns {React.ReactElement}
 */
const HomeTabView = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState<number>(0);

  const renderTabBar = useCallback(
    ({navigationState, jumpTo}: TabBarProps) => (
      <TabBar {...{navigationState, jumpTo}} />
    ),
    [],
  );

  return (
    <Container>
      <Title>Shop</Title>
      <TabView
        renderScene={renderScene}
        navigationState={{index, routes}}
        renderTabBar={renderTabBar}
        initialLayout={{width: layout.width / 4}}
        swipeEnabled={false}
        lazy
        onIndexChange={setIndex}
      />
    </Container>
  );
};

export default HomeTabView;

const Container = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  padding: 15px;
  color: ${({theme}) => theme.colors.black};
`;
