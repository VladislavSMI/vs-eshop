import type { Category, Product, ProductDetails } from '@/lib/types';

export const mockCategories: Category[] = [
  { categoryId: 1, categoryName: 'Decks' },
  { categoryId: 2, categoryName: 'Trucks' },
  { categoryId: 3, categoryName: 'Wheels' },
];

export const mockProducts: Product[] = [
  {
    productId: 'deck-1',
    productName: 'Maple Skate Deck',
    categoryId: 1,
    categoryName: 'Decks',
    price: 59.99,
    mainImageUrl: null,
    tags: [],
  },
  {
    productId: 'truck-1',
    productName: 'Pro Aluminum Trucks',
    categoryId: 2,
    categoryName: 'Trucks',
    price: 24.5,
    mainImageUrl: null,
    tags: ['New'],
  },
  {
    productId: 'wheel-1',
    productName: 'Smooth Cruiser Wheels',
    categoryId: 3,
    categoryName: 'Wheels',
    price: 18.0,
    mainImageUrl: null,
    tags: ['On Sale'],
  },
];

export const mockProductDetails: ProductDetails = {
  productId: 'deck-001',
  productName: 'Maple Skate Deck',
  categoryId: 1,
  categoryName: 'Decks',
  price: 59.99,
  mainImageUrl: null,
  tags: [],
  descriptions: [{ languageCode: 'en', description: 'A pro-grade deck.' }],
  variations: [
    { variationId: 'v1', sizeId: 8, size: 8, stockQuantity: true },
    { variationId: 'v2', sizeId: 825, size: 8.25, stockQuantity: false },
  ],
  reviews: [],
  discounts: [],
  relatedProducts: [],
};
