import { Product } from '../../types/types';

export interface ItemProps {
  item: Product;
  goToDetails: (id: number) => void;
  isFav: boolean;
  setFav: (id: number) => void;
}
