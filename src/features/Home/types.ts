export type LatestData = {
  id: number;
  title: string;
  price: string;
  image: string;
  iconImg: string;
};

export type Item = {
  id: number;
  title: string;
  description: string;
  image: string;
};

export interface PromotionBanner {
  createdAt?: any;
  title: string;
  image: string;
  alt: string;
  link: string;
  cta: string;
  ctaLink: string;
  releaseDate: string;
  type: string;
}

export interface CategoryData {
  newAndFeatured: PromotionBanner[];
}
