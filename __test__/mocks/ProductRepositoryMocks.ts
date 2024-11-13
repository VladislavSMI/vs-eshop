import { Category, Product } from '@/lib/types';

export const mockCategories: Category[] = [
  { categoryId: 1, categoryName: 'Decks' },
  { categoryId: 2, categoryName: 'Trucks' },
  { categoryId: 3, categoryName: 'Wheels' },
];

export const mockProducts: Product[] = [
  {
    productId: '123456789',
    productName: 'Skate deck',
    categoryId: 1,
    categoryName: 'Skateboarding',
    price: 50,
    imageUrl: 'image.url',
    tags: [],
  },
  {
    productId: '987654321',
    productName: 'Skate trucks',
    categoryId: 2,
    categoryName: 'Truck',
    price: 20,
    imageUrl: 'image.url',
    tags: ['New', 'On Sale'],
  },
  {
    productId: '159357456',
    productName: 'Skate wheels',
    categoryId: 3,
    categoryName: 'Wheels',
    price: 10,
    imageUrl: 'image.url',
    tags: ['On Sale'],
  },
];
