import { ProductDetails, Product, Tag } from '@/lib/types';
import { VALID_TAGS } from '@/lib/const';

export const isValidTag = (tag: string): tag is Tag =>
  VALID_TAGS.includes(tag as Tag);

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
