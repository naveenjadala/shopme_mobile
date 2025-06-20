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
  description: string;
  sizes: string[];
  colors: string[];
  rating: number;
  stock: number;
  isFeatured: boolean;
  isLatest: boolean;
  reviews: {
    id: number;
    user: string;
    rating: number;
    comment: string;
  }[];
  user: string;
  image: string;
  iconImg: string;
  addedAt?: string;
}

export type CategoryFilter = {
  gender?: string;
  category?: string;
  subCategory?: string;
  brand?: string;
  color?: string;
  size?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  maxRating?: number;
  isLatest?: boolean;
  isFeatured?: boolean;
};
