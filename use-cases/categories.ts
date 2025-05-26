'use server';

import { getAllCategories } from '@/data/repository/ProductRepository';
import { Category } from '@/lib/types';

export async function getAllCategoriesUseCase(): Promise<Category[]> {
  return getAllCategories();
}
