import { Product } from '@/lib/types';
import { ProductCardWrapper } from '@/components/product/ProductCard/ProductCardWrapper';

export const Carousel = ({ products }: { products: Product[] }) => {
  if (!products?.length) return null;

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {products.map((product) => (
          <li
            key={product.productId}
            className="relative aspect-square h-[45vh] max-h-[350px] w-2/3 max-w-[300px] flex-none md:w-1/3"
          >
            <ProductCardWrapper product={product} useTilt={false} useLink />
          </li>
        ))}
      </ul>
    </div>
  );
};
