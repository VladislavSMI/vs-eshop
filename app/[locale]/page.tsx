import { Carousel } from '@/components/ui/Carousel';
import { HeroProducts } from '@/components/product/HeroProducts';
import { LocalizedSectionHeader } from '@/components/ui/LocalizedSectionHeader';
import { getProductSearchUseCase } from '@/use-cases/product';
import { Suspense } from 'react';
import { ProductCardSkeleton } from '@/components/product/ProductCard/ProductCardSkeleton';
import { HeroProductsSkeleton } from '@/components/product/HeroProductsSkeleton';

export default async function Home() {
  const products = await getProductSearchUseCase({
    searchParams: { limit: 12 },
  });
  return (
    <>
      <Suspense fallback={<HeroProductsSkeleton />}>
        <HeroProducts />
      </Suspense>
      <LocalizedSectionHeader translationKey="sections.featuredProducts.title" />
      <Suspense fallback={<ProductCardSkeleton />}>
        <Carousel products={products} />
      </Suspense>
    </>
  );
}
