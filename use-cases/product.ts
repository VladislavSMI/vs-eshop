'use server';

import {
  getAllProducts,
  getProductById,
  getProductSearch,
} from '@/data/repository/ProductRepository';
import { ITEMS_PER_PAGE } from '@/lib/const';
import { Locale, Product, ProductDetails, SearchParams } from '@/lib/types';

export async function getProductByIdUseCase(
  id: string,
  locale: Locale,
): Promise<ProductDetails> {
  return await getProductById(id, locale);
}

export async function getAllProductsUseCase(): Promise<Product[]> {
  return await getAllProducts();
}

export async function getProductSearchUseCase({
  searchParams,
}: {
  searchParams?: SearchParams;
}): Promise<Product[]> {
  const {
    page = 1,
    query: searchTerm,
    categoryId,
    tagNames,
    sort = 'ASC',
    limit = ITEMS_PER_PAGE,
  } = searchParams ?? {};

  return await getProductSearch({
    searchTerm,
    categoryId,
    tagNames,
    sort,
    offset: (page - 1) * limit,
    limit,
  });
}
