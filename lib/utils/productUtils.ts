import { ProductDetails, Product, Tag, Category } from '@/lib/types';
import { CONST } from '@/lib/const';

export const isValidTag = (tag: string): tag is Tag =>
  CONST.validTags.includes(tag as Tag);

export const filterProductByTag = (products: Product[], tag: Tag) => {
  const filteredProducts = products.filter((product) =>
    product.tags.includes(tag),
  );
  const restProducts = products.filter(
    (product) => !product.tags.includes(tag),
  );

  return { filteredProducts, restProducts };
};

export function hasAvailableSizes(
  variations: ProductDetails['variations'],
): boolean {
  return variations.some((variation) => variation.stockQuantity);
}

export const getCategoryName = (id: number, categories: Category[]) =>
  categories.find((category) => category.categoryId === id)?.categoryName ||
  'Unknown';
