import React, {useCallback} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';

import {TabBarProps} from '../../../types/types';

const {width} = Dimensions.get('window');

/**
 * A tab bar component for the home screen of the app. It renders tabs for
 * men, women, and kids, and displays the corresponding home screen component
 * when a tab is selected.
 *
 * @param {{navigationState: NavigationState<{key: string; title: string}>, jumpTo: (key: string) => void}} props
 * The props passed to this component.
 * @param {NavigationState<{key: string; title: string}>} props.navigationState
 * The navigation state of the tab view.
 * @param {(key: string) => void} props.jumpTo
 * A function to call when a tab is selected.
 * @returns {React.ReactElement}
 */
const TabBar = React.memo(({navigationState, jumpTo}: TabBarProps) => {
  const renderTab = useCallback(
    (route: {key: string; title: string}, index: number) => {
      const isActive = navigationState.index === index;
      const onPress = () => jumpTo(route.key);

      return (
        <TabItem key={route.key}>
          <TabTitle isActive={isActive} onPress={onPress}>
            {route.title}
          </TabTitle>
          <TabDivider isActive={isActive} />
        </TabItem>
      );
    },
    [navigationState.index, jumpTo],
  );
  return (
    <TabContainer>
      {navigationState.routes.map(renderTab)}
      <Divider />
    </TabContainer>
  );
});

export default TabBar;

const TabItem = styled.View`
  margin: 0.8px;
`;

const Divider = styled.View`
  position: absolute;
  bottom: 0;
  height: 1px;
  width: ${width}px;
  background-color: ${({theme}) => theme.colors.divider};
`;

const TabContainer = styled.View`
  flex-direction: row;
  padding: 0 15px;
`;

const TabDivider = styled.View<{isActive: boolean}>`
  align-self: center;
  width: 80%;
  height: 2px;
  background-color: ${({theme, isActive}) =>
    isActive ? theme.colors.black : ''};
`;

const TabTitle = styled.Text<{isActive: boolean}>`
  font-size: 16px;
  font-weight: ${({isActive}) => (isActive ? 'bold' : 'normal')};
  color: ${({theme}) => theme.colors.black};
  padding: 10px 22px;
`;
