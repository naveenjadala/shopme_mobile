export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: string;
  color: string;
  size: string;
  category: string;
  productId: number;
};

export type CartListProps = {
  productDetails: (item: number) => void;
  cateData: CartItem[];
};
