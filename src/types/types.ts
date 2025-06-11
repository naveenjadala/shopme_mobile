import {NavigationState} from 'react-native-tab-view';

export type TabBarProps = {
  navigationState: NavigationState<{key: string; title: string}>;
  jumpTo: (key: string) => void;
};

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  images: string[];
}
