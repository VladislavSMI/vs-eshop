import { Locale, Tag } from './Shared';

export type Size = {
  sizeId: number;
  size: number;
};

export type Category = {
  categoryId: number;
  categoryName: string;
};

export type ProductDescription = {
  languageCode: Locale;
  description: string;
};

type BaseProductVariation = Size & {
  variationId: string;
};

// For non-admin
export type ProductVariation = BaseProductVariation & {
  stockQuantity: boolean;
};

// For admin
export type ProductVariationAdmin = BaseProductVariation & {
  stockQuantity: number;
};

export type ProductDiscount = {
  discountPercentage: number;
  validFrom: string;
  validUntil: string;
};

export type Product = {
  productId: string;
  productName: string;
  categoryId: Category['categoryId'];
  categoryName: Category['categoryName'];
  price: number;
  mainImageUrl: string | null;
  tags: Tag[];
};

export type ProductReview = {
  reviewId: string;
  productId: Product['productId'];
  productName: Product['productName'];
  customerName: string;
  rating: number;
  reviewText: string;
  helpfulVotes: number;
  createdAt: string;
  mainImageUrl?: Product['mainImageUrl'];
};

export type ProductDetails = Product & {
  descriptions: ProductDescription[];
  variations: ProductVariation[];
  reviews: ProductReview[];
  discounts: ProductDiscount[];
  relatedProducts: string[];
};

export type ProductAdmin = Omit<ProductDetails, 'variations'> & {
  variations: ProductVariationAdmin[];
  createdAt: string;
  deletedAt?: string | null;
};
