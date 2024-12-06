import { Locale } from '@/lib/types';

export type CategoryRow = {
  category_id: number;
  category_name: string;
};

export type SizeRow = {
  size_id: number;
  size: string;
  category_id: CategoryRow['category_id'];
};

export type ProductRow = {
  product_id: string;
  product_name: string;
  category_id: CategoryRow['category_id'];
  category_name: CategoryRow['category_name'];
  price: string;
  image_url: string;
  tags: string[];
};

export type ProductDescriptionRow = {
  language_code: Locale;
  description: string;
};

export type ProductVariationRow = {
  variation_id: string;
  size_id: number;
  size: string;
  stock_quantity: number;
};

export type ProductReviewRow = {
  customer_name: string;
  rating: number;
  review_text: string;
  review_date: string;
  helpful_votes: number;
};

export type ProductDiscountRow = {
  discount_percentage: string;
  valid_from: string;
  valid_until?: string;
};

export type ProductRowDetails = ProductRow & {
  descriptions: ProductDescriptionRow[];
  variations: ProductVariationRow[];
  reviews: ProductReviewRow[];
  discounts: ProductDiscountRow[];
  related_products: string[];
};

export type ProductRowAdmin = ProductRowDetails & {
  created_at: string;
  deleted_at?: string;
};

export type CartRow = {
  cart_id: string;
  cart_item_id: string;
  product_id: string;
  size_id: number;
  quantity: number;
  product_name: string;
  price: number;
  size: string;
};
