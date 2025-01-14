import { Category } from '../types';

export const getCategoryName = (id: number, categories: Category[]) =>
  categories.find((category) => category.categoryId === id)?.categoryName ||
  'Unknown';
