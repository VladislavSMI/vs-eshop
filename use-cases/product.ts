'use server';

import {
  getAllProducts,
  getProductById,
} from '@/data/repository/ProductRepository';
import { Locale, Product, ProductDetails } from '@/lib/types';

export async function getProductByIdUseCase(
  id: string,
  locale: Locale,
): Promise<ProductDetails> {
  return await getProductById(id, locale);
}

export async function getAllProductsUseCase(): Promise<Product[]> {
  return await getAllProducts();
}
