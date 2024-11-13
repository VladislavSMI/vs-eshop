import { VALID_TAGS } from '../const';

export type Tag = (typeof VALID_TAGS)[number];

export type Category = {
  categoryId: number;
  categoryName: string;
};

export type Product = {
  productId: string;
  productName: string;
  categoryId: Category['categoryId'];
  categoryName: Category['categoryName'];
  price: number;
  imageUrl: string;
  tags: Tag[];
};
