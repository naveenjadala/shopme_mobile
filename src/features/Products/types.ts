import {Product} from '../../types/types';

export interface ProductDetailsProps extends Product {
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
}

export type ProductDetailRouteParams = {
  id: number;
};
