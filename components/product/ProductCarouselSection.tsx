import { getProductSearchUseCase } from '@/use-cases/product';
import { Carousel } from '@/components/ui/Carousel';
import { ProductCardWrapper } from '@/components/product/ProductCard/ProductCardWrapper';

export default async function ProductCarouselSection() {
  const products = await getProductSearchUseCase({
    searchParams: { limit: 12 },
  });

  return (
    <Carousel>
      {products.map((product) => (
        <li
          key={product.productId}
          className="relative aspect-square w-2/3 max-w-[300px] flex-none"
        >
          <ProductCardWrapper product={product} useTilt={false} useLink />
        </li>
      ))}
    </Carousel>
  );
}
