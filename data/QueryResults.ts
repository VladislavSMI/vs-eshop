import { Locale, OrderState } from '@/lib/types';

export type CategoryRow = {
  category_id: number;
  category_name: string;
};

export type SizeRow = {
  size_id: number;
  size: number;
  category_id: CategoryRow['category_id'];
};

export type ProductRow = {
  product_id: string;
  product_name: string;
  category_id: CategoryRow['category_id'];
  category_name: CategoryRow['category_name'];
  price: number;
  main_image_id: string;
  mime_type: string;
  tags: string[];
};

export type ProductDescriptionRow = {
  language_code: Locale;
  description: string;
};

export type ProductVariationRow = {
  variation_id: string;
  size_id: number;
  size: number;
  stock_quantity: number;
};

export type ProductReviewRow = {
  review_id: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
  helpful_votes: number;
};

export type ProductDiscountRow = {
  discount_percentage: number;
  valid_from: string;
  valid_until: string;
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
  size: number;
};

export type OrderRow = {
  order_id: string;
  cart_id: string;
  shipping_address_id: string;
  state: OrderState;
  created_at: string;
  updated_at: string;
  isPaid: boolean;

  order_item_id: string;
  product_id: string;
  size_id: number;
  quantity: number;
  product_name: string;
  price: string;
  size: number;
};

export type AddressRow = {
  address_id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  state_province: string;
  postal_code: string;
  country_id: number;
  country_name: string;
};

export type CountryRow = {
  id: number;
  code: string;
  name: string;
};

export type ReviewRow = {
  review_id: string;
  product_id: string;
  product_name: string;
  customer_name: string;
  rating: number;
  review_text: string;
  helpful_votes: number;
  created_at: string;
  main_image_id: string;
  mime_type: string;
};

export type UserRow = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};
