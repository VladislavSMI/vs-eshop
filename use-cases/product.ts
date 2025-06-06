'use server';

import {
  getAllProducts,
  getProductById,
  getProductSearch,
} from '@/data/repository/ProductRepository';
import { CONST } from '@/lib/const';
import { Locale, Product, ProductDetails, SearchParams } from '@/lib/types';

export async function getProductByIdUseCase(
  id: string,
  locale: Locale,
): Promise<ProductDetails> {
  return getProductById(id, locale);
}

export async function getAllProductsUseCase(): Promise<Product[]> {
  return getAllProducts();
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
    limit = CONST.itemsPerPage,
  } = searchParams ?? {};

  return getProductSearch({
    searchTerm,
    categoryId,
    tagNames,
    sort,
    offset: (page - 1) * limit,
    limit,
  });
}
